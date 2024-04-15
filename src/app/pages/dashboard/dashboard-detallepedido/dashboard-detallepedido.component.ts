import { Component, OnInit } from '@angular/core'
import { DetallePedidoService, PedidosService,ProductoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { DetallePedido, Pedidos,Producto } from 'src/app/models'
import { fillDetallePedidoList, fillPedidosList,fillProductoList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-detallepedido',
  templateUrl: './dashboard-detallepedido.component.html',
  styleUrls: ['./dashboard-detallepedido.component.scss']
})
export class DashboardDetallePedidoComponent implements OnInit{
  constructor(

    private detallePedidoService: DetallePedidoService,
    private pedidosService: PedidosService,
    private productoService: ProductoService,
    
    
    public store: Store<{
      dashboardState: {
        detallePedidoLista: Array<DetallePedido>,
        pedidosLista: Array<Pedidos>,
        productoLista: Array<Producto>,
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-detallepedido'

  //VARIABLES
  public detallePedidoLista: Array<DetallePedido> = []
  public pedidosLista: Array<Pedidos> = []
  public productoLista: Array<Producto> = []
  
  
  public detallepedidoForm = new FormGroup({
    //Campos Ocultos
      idDetallePedido: new FormControl(
        0
      ),
    //Campos a Mostrar
      
      idProducto: new FormControl(
        0,
        [Validator.required]
      ),
      idPedidos: new FormControl(
        0,
        [Validator.required]
      ),
      cantidad: new FormControl(
        0,
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  detallepedidoNew: DetallePedido = new DetallePedido();


  public detallepedidoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.detallepedidoForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.detallepedidoForm.patchValue(this.detallepedidoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.detallePedidoService.createItem(this.detallepedidoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idDetallePedido')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.detallePedidoService.updateItem(this.detallepedidoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idDetallePedido')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.detallepedidoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.detallePedidoService.deleteItem(this.detallepedidoToDelete.idDetallePedido).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.detallepedidoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.detallePedidoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillDetallePedidoList({data: result}))
      }
    })
  }
  
  loadAllProducto(){
    this.productoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillProductoList({data: result}))
      }
    })
  }

  loadAllPedidos(){
    this.pedidosService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillPedidosList({data: result}))
      }
    })
  }

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.detallePedidoLista = data.detallePedidoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.pedidosLista = data.pedidosLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.productoLista = data.productoLista
    })

    //Lamando afunciones que cargan datos iniciales
    this.loadAllProducto()
    this.loadAllPedidos()
    this.loadAllItems()
  }
}



