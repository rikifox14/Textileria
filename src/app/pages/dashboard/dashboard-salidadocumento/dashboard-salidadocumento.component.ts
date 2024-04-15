import { Component, OnInit } from '@angular/core'
import { SalidaDocumentoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { SalidaDocumento} from 'src/app/models'
import { fillSalidaDocumentoList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-salidadocumento',
  templateUrl: './dashboard-salidadocumento.component.html',
  styleUrls: ['./dashboard-salidadocumento.component.scss']
})
export class DashboardSalidaDocumentoComponent implements OnInit {
  constructor(
    private salidaDocumentoService: SalidaDocumentoService,
    
    public store: Store<{
      dashboardState: {
        salidaDocumentoLista: Array<SalidaDocumento>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-salidadocumento'

  //VARIABLES
  public salidaDocumentoLista: Array<SalidaDocumento> = []
  
  
  public salidadocumentoForm = new FormGroup({
    //Campos Ocultos
      idSalidaDocumento: new FormControl(
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
  
  salidadocumentoNew: SalidaDocumento = new SalidaDocumento();


  public salidadocumentoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.salidadocumentoForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.salidadocumentoForm.patchValue(this.salidadocumentoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.salidaDocumentoService.createItem(this.salidadocumentoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idSalidaDocumento')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.salidaDocumentoService.updateItem(this.salidadocumentoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idSalidaDocumento')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.salidadocumentoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.salidaDocumentoService.deleteItem(this.salidadocumentoToDelete.idSalidaDocumento).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.salidadocumentoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.salidaDocumentoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillSalidaDocumentoList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.salidaDocumentoLista = data.salidaDocumentoLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}
