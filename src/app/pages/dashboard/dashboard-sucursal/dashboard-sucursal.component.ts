import { Component, OnInit } from '@angular/core'
import { SucursalService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Sucursal} from 'src/app/models'
import { fillSucursalList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-sucursal',
  templateUrl: './dashboard-sucursal.component.html',
  styleUrls: ['./dashboard-sucursal.component.scss']
})
export class DashboardSucursalComponent implements OnInit {
  constructor(
    private sucursalService: SucursalService,
    
    public store: Store<{
      dashboardState: {
        sucursalLista: Array<Sucursal>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-sucursal'

  //VARIABLES
  public sucursalLista: Array<Sucursal> = []
  
  
  public sucursalForm = new FormGroup({
    //Campos Ocultos
      idSucursal: new FormControl(
        0
      ),
    //Campos a Mostrar
      distrito: new FormControl(
        '',
        [Validator.required]
      ),
      ubicacion: new FormControl(
        '',
        [Validator.required]
      ),
      telefono: new FormControl(
        '',
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  public sucursalNew: any = {
    idSucursal: 0,
    distrito: '',
    ubicacion: '',
    telefono: '',
 
  }

  public sucursalToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.sucursalForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.sucursalForm.setValue(this.sucursalNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.sucursalService.createItem(this.sucursalForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idSucursal')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.sucursalService.updateItem(this.sucursalForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idSucursal')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.sucursalToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.sucursalService.deleteItem(this.sucursalToDelete.idSucursal).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.sucursalForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.sucursalService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillSucursalList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.sucursalLista = data.sucursalLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}

