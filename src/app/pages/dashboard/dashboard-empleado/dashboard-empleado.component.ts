import { Component, OnInit } from '@angular/core'
import { EmpleadoService, CargoService,EstadoService,PedidosService, PersonaService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Empleado, Cargo,Estado,Pedidos, Persona } from 'src/app/models'
import { fillEmpleadoList, fillCargoList,fillEstadoList,fillPedidosList, fillPersonList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-empleado',
  templateUrl: './dashboard-empleado.component.html',
  styleUrls: ['./dashboard-empleado.component.scss']
})
export class DashboardEmpleadoComponent implements OnInit{
  constructor(

    private empleadoService: EmpleadoService,
    private cargoService: CargoService,
    private estadoService: EstadoService,
    private personaService:PersonaService,
    
    public store: Store<{
      dashboardState: {
        empleadoLista: Array<Empleado>,
        cargoLista: Array<Cargo>,
        estadoLista: Array<Estado>,
        personaLista: Array<Persona>,
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-empleado'

  //VARIABLES
  public empleadoLista: Array<Empleado> = []
  public cargoLista: Array<Cargo> = []
  public estadoLista: Array<Estado> = []
  public personaLista: Array<Persona> = []

  
  public empleadoForm = new FormGroup({
    //Campos Ocultos
      idEmpleado: new FormControl(
        0
      ),
    //Campos a Mostrar
      
    idCargo: new FormControl(
      0,
      [Validator.required]
    ),
    idEstado: new FormControl(
      0,
      [Validator.required]
    ),
    idPersona: new FormControl(
      0,
      [Validator.required]
    ),
    sueldo: new FormControl(
        0,
        [Validator.required]
      ),
  
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  empleadoNew: Empleado = new Empleado();


  public empleadoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.empleadoForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.empleadoForm.patchValue(this.empleadoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.empleadoService.createItem(this.empleadoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idEmpleado')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.empleadoService.updateItem(this.empleadoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idEmpleado')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.empleadoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.empleadoService.deleteItem(this.empleadoToDelete.idEmpleado).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.empleadoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.empleadoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillEmpleadoList({data: result}))
      }
    })
  }
  
  loadAllCargo(){
    this.cargoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillCargoList({data: result}))
      }
    })
  }
  loadAllEstado(){
    this.estadoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillEstadoList({data: result}))
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
      this.empleadoLista = data.empleadoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.cargoLista = data.cargoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.estadoLista = data.estadoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.personaLista = data.personaLista
    })

    //Lamando afunciones que cargan datos iniciales
    this.loadAllPersona()
    this.loadAllCargo()
    this.loadAllEstado()
    this.loadAllItems()
  }
}


