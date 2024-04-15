import { Component, OnInit } from '@angular/core'
import { EntradaDocumentoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { EntradaDocumento} from 'src/app/models'
import { fillEntradaDocumentoList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-entradadocumento',
  templateUrl: './dashboard-entradadocumento.component.html',
  styleUrls: ['./dashboard-entradadocumento.component.scss']
})
export class DashboardEntradaDocumentoComponent implements OnInit {
  constructor(
    private entradaDocumentoService: EntradaDocumentoService,
    
    public store: Store<{
      dashboardState: {
        entradaDocumentoLista: Array<EntradaDocumento>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-entradadocumento'

  //VARIABLES
  public entradaDocumentoLista: Array<EntradaDocumento> = []
  
  
  public entradadocumentoForm = new FormGroup({
    //Campos Ocultos
      idEntradaDocumento: new FormControl(
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
  
  entradadocumentoNew: EntradaDocumento = new EntradaDocumento();


  public entradadocumentoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.entradadocumentoForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.entradadocumentoForm.patchValue(this.entradadocumentoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.entradaDocumentoService.createItem(this.entradadocumentoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idEntradaDocumento')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.entradaDocumentoService.updateItem(this.entradadocumentoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idEntradaDocumento')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.entradadocumentoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.entradaDocumentoService.deleteItem(this.entradadocumentoToDelete.idEntradaDocumento).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.entradadocumentoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.entradaDocumentoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillEntradaDocumentoList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.entradaDocumentoLista = data.entradaDocumentoLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}
