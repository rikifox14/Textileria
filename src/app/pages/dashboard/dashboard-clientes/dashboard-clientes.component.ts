import { Component, OnInit } from '@angular/core'
import { PersonaService, ClientesService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Persona, Clientes } from 'src/app/models'
import { fillPersonList, fillClientesList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-clientes',
  templateUrl: './dashboard-clientes.component.html',
  styleUrls: ['./dashboard-clientes.component.scss']
})
export class DashboardClientesComponent implements OnInit{
  constructor(

    private clientesService: ClientesService,
    private personaService: PersonaService,
    
    
    public store: Store<{
      dashboardState: {
        clientesLista: Array<Clientes>,
        personaLista: Array<Persona>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-clientes'

  //VARIABLES
  public clientesLista: Array<Clientes> = []
  public personaLista: Array<Persona> = []
  
  
  public clientesForm = new FormGroup({
    //Campos Ocultos
      idCliente: new FormControl(
        0
      ),
    //Campos a Mostrar
      
      idPersona: new FormControl(
        '',
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  public clientesNew: any = {
    idCliente: 0,
    idPersona: 1,
  }

  public clientesToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.clientesForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.clientesForm.setValue(this.clientesNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.clientesService.createItem(this.clientesForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idCliente')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.clientesService.updateItem(this.clientesForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idCliente')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.clientesToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.clientesService.deleteItem(this.clientesToDelete.idCliente).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.clientesForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.clientesService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillClientesList({data: result}))
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
      this.clientesLista = data.clientesLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.personaLista = data.personaLista
    })

    //Lamando afunciones que cargan datos iniciales
    this.loadAllPersona()
    this.loadAllItems()
  }
}
