import { Component, OnInit } from '@angular/core'
import { TipoDocumentoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { TipoDocumento} from 'src/app/models'
import { fillTipoDocumentoList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-tipodocumento',
  templateUrl: './dashboard-tipodocumento.component.html',
  styleUrls: ['./dashboard-tipodocumento.component.scss']
})
export class DashboardTipoDocumentoComponent implements OnInit {
  constructor(
    private tipodocumentoService: TipoDocumentoService,
    
    public store: Store<{
      dashboardState: {
        tipoDocumentoLista: Array<TipoDocumento>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-tipodocumento'

  //VARIABLES
  public tipoDocumentoLista: Array<TipoDocumento> = []
  
  
  public tipodocumentoForm = new FormGroup({
    //Campos Ocultos
      idTipoDocumento: new FormControl(
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
  
  tipodocumentoNew:TipoDocumento = new TipoDocumento();

  public tipodocumentoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.tipodocumentoForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.tipodocumentoForm.patchValue(this.tipodocumentoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.tipodocumentoService.createItem(this.tipodocumentoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idTipoDocumento')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.tipodocumentoService.updateItem(this.tipodocumentoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idTipoDocumento')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.tipodocumentoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.tipodocumentoService.deleteItem(this.tipodocumentoToDelete.idTipoDocumento).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.tipodocumentoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.tipodocumentoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillTipoDocumentoList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.tipoDocumentoLista = data.tipoDocumentoLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}

