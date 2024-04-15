import { Component, OnInit } from '@angular/core'
import { ProductoService, DetalleVentaService,VentaService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Producto, DetalleVenta,Venta } from 'src/app/models'
import { fillDetalleVentaList, fillProductoList,fillVentaList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-detalleventa',
  templateUrl: './dashboard-detalleventa.component.html',
  styleUrls: ['./dashboard-detalleventa.component.scss']
})
export class DashboardDetalleVentaComponent implements OnInit{
  constructor(

    private productoService: ProductoService,
    private detalleVentaService: DetalleVentaService,
    private ventaService: VentaService,
    
    
    public store: Store<{
      dashboardState: {
        productoLista: Array<Producto>,
        ventaLista: Array<Venta>,
        detalleVentaLista: Array<DetalleVenta>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-detalleventa'

  //VARIABLES
  public productoLista: Array<Producto> = []
  public ventaLista: Array<Venta> = []
  public detalleVentaLista: Array<DetalleVenta> = []

  
  
  public detalleventaForm = new FormGroup({
    //Campos Ocultos
      idDetalleVenta: new FormControl(
        0
      ),
    //Campos a Mostrar
      
      idProducto: new FormControl(
        0,
        [Validator.required]
      ),
      idVenta: new FormControl(
        0,
        [Validator.required]
      ),
      descuento: new FormControl(
        0,
        [Validator.required]
      ),
      importe: new FormControl(
        0,
        [Validator.required]
      ),
      precioUnitario: new FormControl(
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
  
  detalleventaNew: DetalleVenta = new DetalleVenta();


  public detalleventaToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.detalleventaForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.detalleventaForm.patchValue(this.detalleventaNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.detalleVentaService.createItem(this.detalleventaForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idDetalleVenta')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.detalleVentaService.updateItem(this.detalleventaForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idDetalleVenta')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.detalleventaToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.detalleVentaService.deleteItem(this.detalleventaToDelete.idDetalleVenta).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.detalleventaForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.detalleVentaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillDetalleVentaList({data: result}))
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
  loadAllVenta(){
    this.ventaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillVentaList({data: result}))
      }
    })
  }

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.detalleVentaLista = data.detalleVentaLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.productoLista = data.productoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.ventaLista = data.ventaLista
    })

    //Lamando afunciones que cargan datos iniciales
    this.loadAllProducto()
    this.loadAllVenta()
    this.loadAllItems()
  }
}

