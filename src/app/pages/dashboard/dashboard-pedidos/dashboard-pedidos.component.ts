import { Component, OnInit } from '@angular/core'
import { PedidosService, ClientesService,UsuarioAccesoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Pedidos, Clientes,UsuarioAcceso } from 'src/app/models'
import { fillPedidosList, fillClientesList,fillUsuarioAccesoList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-pedidos',
  templateUrl: './dashboard-pedidos.component.html',
  styleUrls: ['./dashboard-pedidos.component.scss']
})
export class DashboardPedidosComponent implements OnInit{
  constructor(

    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private usuarioAccesoService: UsuarioAccesoService,
    
    public store: Store<{
      dashboardState: {
        pedidosLista: Array<Pedidos>,
        clientesLista: Array<Clientes>,
        usuarioAccesoLista: Array<UsuarioAcceso>,
      
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-pedidos'

  //VARIABLES
  public pedidosLista: Array<Pedidos> = []
  public clientesLista: Array<Clientes> = []
  public usuarioAccesoLista: Array<UsuarioAcceso> = []

  
  public pedidosForm = new FormGroup({
    //Campos Ocultos
      idPedidos: new FormControl(
        0
      ),
    //Campos a Mostrar
      
    fechaEntrega: new FormControl(
      '',
      [Validator.required]
    ),
    idCliente: new FormControl(
      0,
      [Validator.required]
    ),
    fechaPedido: new FormControl(
      '',
      [Validator.required]
    ),
      fechaRequerimiento: new FormControl(
        '',
        [Validator.required]
      ),
      idUsuarioAcceso: new FormControl(
        0,
        [Validator.required]
      ),
     
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  pedidosNew: Pedidos = new Pedidos();


  public pedidosToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.pedidosForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.pedidosForm.patchValue(this.pedidosNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.pedidosService.createItem(this.pedidosForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idPedidos')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.pedidosService.updateItem(this.pedidosForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idPedidos')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.pedidosToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.pedidosService.deleteItem(this.pedidosToDelete.idPedidos).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.pedidosForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.pedidosService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillPedidosList({data: result}))
      }
    })
  }
  
  loadAllClientes(){
    this.clientesService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillClientesList({data: result}))
      }
    })
  }
  loadAllUsuarioAcceso(){
    this.usuarioAccesoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillUsuarioAccesoList({data: result}))
      }
    })
  }


  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.pedidosLista = data.pedidosLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.usuarioAccesoLista = data.usuarioAccesoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.clientesLista = data.clientesLista
    })
 

    //Lamando afunciones que cargan datos iniciales
    this.loadAllUsuarioAcceso()
    this.loadAllClientes()
    this.loadAllItems()
  }
}


