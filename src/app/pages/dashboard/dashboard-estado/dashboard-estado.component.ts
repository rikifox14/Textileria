import { Component, OnInit } from '@angular/core'
import { EstadoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Estado} from 'src/app/models'
import { fillEstadoList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-estado',
  templateUrl: './dashboard-estado.component.html',
  styleUrls: ['./dashboard-estado.component.scss']
})
export class DashboardEstadoComponent implements OnInit {
  constructor(
    private estadoService: EstadoService,
    
    public store: Store<{
      dashboardState: {
        estadoLista: Array<Estado>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-estado'

  //VARIABLES
  public estadoLista: Array<Estado> = []
  
  
  public estadoForm = new FormGroup({
    //Campos Ocultos
      idEstado: new FormControl(
        0
      ),
    //Campos a Mostrar
      descripcionEstado: new FormControl(
        '',
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  public estadoNew: any = {
    idEstado: 0,
    descripcionEstado: '',
 
  }

  public estadoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.estadoForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.estadoForm.setValue(this.estadoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.estadoService.createItem(this.estadoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idEstado')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.estadoService.updateItem(this.estadoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idEstado')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.estadoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.estadoService.deleteItem(this.estadoToDelete.idEstado).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.estadoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.estadoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillEstadoList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.estadoLista = data.estadoLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}

