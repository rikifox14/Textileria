import { Component, OnInit } from '@angular/core'
import { TipoComprobanteService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { TipoComprobante} from 'src/app/models'
import { fillTipoComprobanteList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-tipocomprobante',
  templateUrl: './dashboard-tipocomprobante.component.html',
  styleUrls: ['./dashboard-tipocomprobante.component.scss']
})
export class DashboardTipoComprobanteComponent implements OnInit {
  constructor(
    private tipocomprobanteService: TipoComprobanteService,
    
    public store: Store<{
      dashboardState: {
        tipoComprobanteLista: Array<TipoComprobante>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-tipocomprobante'

  //VARIABLES
  public tipoComprobanteLista: Array<TipoComprobante> = []
  
  
  public tipocomprobanteForm = new FormGroup({
    //Campos Ocultos
      idTipoComprobante: new FormControl(
        0
      ),
    //Campos a Mostrar
      nombreTipoComprobante: new FormControl(
        '',
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  public tipocomprobanteNew: any = {
    idTipoComprobante: 0,
    nombreTipoComprobante: '',
 
  }

  public tipocomprobanteToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.tipocomprobanteForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.tipocomprobanteForm.setValue(this.tipocomprobanteNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.tipocomprobanteService.createItem(this.tipocomprobanteForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idTipoComprobante')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.tipocomprobanteService.updateItem(this.tipocomprobanteForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idTipoComprobante')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.tipocomprobanteToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.tipocomprobanteService.deleteItem(this.tipocomprobanteToDelete.idTipoComprobante).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.tipocomprobanteForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.tipocomprobanteService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillTipoComprobanteList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.tipoComprobanteLista = data.tipoComprobanteLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}


