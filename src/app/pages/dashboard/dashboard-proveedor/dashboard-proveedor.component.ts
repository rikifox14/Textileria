import { Component, OnInit } from '@angular/core'
import { PersonaService, ProveedorService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Persona, Proveedor } from 'src/app/models'
import { fillPersonList,fillProveedorList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-proveedor',
  templateUrl: './dashboard-proveedor.component.html',
  styleUrls: ['./dashboard-proveedor.component.scss']
})
export class DashboardProveedorComponent implements OnInit{
  constructor(

    private personaService: PersonaService,
    private proveedorService: ProveedorService,

    public store: Store<{
      dashboardState: {
        personaLista: Array<Persona>,
        proveedorLista: Array<Proveedor>,
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-proveedor'

  //VARIABLES
  public personaLista: Array<Persona> = []
  public proveedorLista: Array<Proveedor> = []

  
  public proveedorForm = new FormGroup({
    //Campos Ocultos
      idProveedor: new FormControl(
        0
      ),
    //Campos a Mostrar
      ruc: new FormControl(
        '',
        [Validator.required]
      ),
      idPersona: new FormControl(
        0,
        [Validator.required]
      ),
     
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  proveedorNew: Proveedor = new Proveedor();


  public proveedorToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.proveedorForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.proveedorForm.setValue(this.proveedorNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.personaService.createItem(this.proveedorForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idProveedor')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.personaService.updateItem(this.proveedorForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idProveedor')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.proveedorToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.personaService.deleteItem(this.proveedorToDelete.idProveedor).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.proveedorForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.proveedorService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillProveedorList({data: result}))
      }
    })
  }
  
  loadAllPersona(){
    this.personaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillPersonList({data: result}))
      }
    })
  }
 

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.personaLista = data.personaLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.proveedorLista = data.proveedorLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    this.loadAllPersona()
    this.loadAllItems()
  }
}

