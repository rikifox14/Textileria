import { Component, OnInit } from '@angular/core'
import { TipoTelaService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { TipoTela} from 'src/app/models'
import { fillTipoTelaList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-tipotela',
  templateUrl: './dashboard-tipotela.component.html',
  styleUrls: ['./dashboard-tipotela.component.scss']
})
export class DashboardTipoTelaComponent implements OnInit {
  constructor(
    private tipotelaService: TipoTelaService,
    
    public store: Store<{
      dashboardState: {
        tipoTelaLista: Array<TipoTela>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-tipotela'

  //VARIABLES
  public tipoTelaLista: Array<TipoTela> = []
  
  
  public tipotelaForm = new FormGroup({
    //Campos Ocultos
      idTipoTela: new FormControl(
        0
      ),
    //Campos a Mostrar
      descripcion: new FormControl(
        '',
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  public tipotelaNew: any = {
    idTipoTela: 0,
    descripcion: '',
 
  }

  public tipotelaToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.tipotelaForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.tipotelaForm.setValue(this.tipotelaNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.tipotelaService.createItem(this.tipotelaForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idTipoTela')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.tipotelaService.updateItem(this.tipotelaForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idTipoTela')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.tipotelaToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.tipotelaService.deleteItem(this.tipotelaToDelete.idTipoTela).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.tipotelaForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.tipotelaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillTipoTelaList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.tipoTelaLista = data.tipoTelaLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}


