import { Component, OnInit } from '@angular/core'
import { UsuarioAccesoService, EstadoService,RolService,EmpleadoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { UsuarioAcceso, Estado,Rol,Empleado } from 'src/app/models'
import { fillUsuarioAccesoList,fillEstadoList,fillRolList,fillEmpleadoList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-usuarioacceso',
  templateUrl: './dashboard-usuarioacceso.component.html',
  styleUrls: ['./dashboard-usuarioacceso.component.scss']
})
export class DashboardUsuarioAccesoComponent implements OnInit{
  constructor(

    private usuarioAccesoService: UsuarioAccesoService,
    private estadoService: EstadoService,
    private rolService: RolService,
    private empleadoService: EmpleadoService,



    public store: Store<{
      dashboardState: {
        usuarioAccesoLista: Array<UsuarioAcceso>,
        estadoLista: Array<Estado>,
        rolLista: Array<Rol>,
        empleadoLista: Array<Empleado>,
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-usuarioacceso'

  //VARIABLES
  public usuarioAccesoLista: Array<UsuarioAcceso> = []
  public estadoLista: Array<Estado> = []
  public rolLista: Array<Rol> = []
  public empleadoLista: Array<Empleado> = []

  
  public usuarioaccesoForm = new FormGroup({
    //Campos Ocultos
      idUsuarioAcceso: new FormControl(
        0
      ),
    //Campos a Mostrar
      usuario: new FormControl(
        '',
        [Validator.required]
      ),
      password: new FormControl(
      '',
        [Validator.required]
      ),
      correo: new FormControl(
        '',
        [Validator.required, Validator.email]
        ),
      fechaDeCreacion: new FormControl(
          '',
            [Validator.required]
          ),
          idEstado: new FormControl(
            0,
              [Validator.required]
            ),   
            idRol: new FormControl(
              0,
                [Validator.required]
              ), 
              idEmpleado: new FormControl(
                0,
                  [Validator.required]
                ), 
              

	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  usuarioaccesoNew: UsuarioAcceso = new UsuarioAcceso();


  public usuarioaccesoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.usuarioaccesoForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.usuarioaccesoForm.setValue(this.usuarioaccesoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.usuarioAccesoService.createItem(this.usuarioaccesoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idUsuarioAcceso')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.usuarioAccesoService.updateItem(this.usuarioaccesoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idUsuarioAcceso')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.usuarioaccesoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.usuarioAccesoService.deleteItem(this.usuarioaccesoToDelete.idUsuarioAcceso).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.usuarioaccesoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.usuarioAccesoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillUsuarioAccesoList({data: result}))
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
  loadAllRol(){
    this.rolService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillRolList({data: result}))
      }
    })
  }
  loadAllEmpleado(){
    this.empleadoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillEmpleadoList({data: result}))
      }
    })
  }
 

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.usuarioAccesoLista = data.usuarioAccesoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.estadoLista = data.estadoLista
    })

    this.store.select('dashboardState').subscribe( data => {
      this.rolLista = data.rolLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.empleadoLista = data.empleadoLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    this.loadAllEstado()
    this.loadAllRol()
    this.loadAllEmpleado()
    this.loadAllItems()
  }
}

