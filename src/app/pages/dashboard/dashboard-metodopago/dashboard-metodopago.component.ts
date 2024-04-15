import { Component, OnInit } from '@angular/core'
import { MetodoPagoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { MetodoPago} from 'src/app/models'
import { fillMetodoPagoList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-metodopago',
  templateUrl: './dashboard-metodopago.component.html',
  styleUrls: ['./dashboard-metodopago.component.scss']
})
export class DashboardMetodoPagoComponent implements OnInit {
  constructor(
    private metodopagoService: MetodoPagoService,
    
    public store: Store<{
      dashboardState: {
        metodoPagoLista: Array<MetodoPago>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-metodopago'

  //VARIABLES
  public metodoPagoLista: Array<MetodoPago> = []
  
  
  public metodopagoForm = new FormGroup({
    //Campos Ocultos
      idMetodoPago: new FormControl(
        0
      ),
    //Campos a Mostrar
      nombreMetodoPago: new FormControl(
        '',
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  public metodopagoNew: any = {
    idMetodoPago: 0,
    nombreMetodoPago: '',
 
  }

  public metodopagoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.metodopagoForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.metodopagoForm.setValue(this.metodopagoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.metodopagoService.createItem(this.metodopagoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idMetodoPago')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.metodopagoService.updateItem(this.metodopagoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idMetodoPago')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.metodopagoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.metodopagoService.deleteItem(this.metodopagoToDelete.idMetodoPago).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.metodopagoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.metodopagoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillMetodoPagoList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.metodoPagoLista = data.metodoPagoLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}

