import { Component, OnInit } from '@angular/core'
import { ProductoService ,SucursalService,KardexService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Producto,Sucursal,Kardex } from 'src/app/models'
import {  fillProductoList,fillSucursalList,fillKardexList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-kardex',
  templateUrl: './dashboard-kardex.component.html',
  styleUrls: ['./dashboard-kardex.component.scss']
})
export class DashboardKardexComponent implements OnInit{
  constructor(

    private kardexService: KardexService,
    private productoService: ProductoService,
    private sucursalService: SucursalService,
    
    public store: Store<{
      dashboardState: {
        kardexLista: Array<Kardex>,
        sucursalLista: Array<Sucursal>,
        productoLista: Array<Producto>,
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-kardex'

  //VARIABLES
  public kardexLista: Array<Kardex> = []
  public sucursalLista: Array<Sucursal> = []
  public productoLista: Array<Producto> = []

  
  public kardexForm = new FormGroup({
    //Campos Ocultos
      idKardex: new FormControl(
        ""
      ),
    //Campos a Mostrar
      
    idProducto: new FormControl(
      0,
      [Validator.required]
    ),
    idSucursal: new FormControl(
      0,
      [Validator.required]
    ),
    cantidadIngreso: new FormControl(
      0,
      [Validator.required]
    ),
      cantidadSalida: new FormControl(
        0,
        [Validator.required]
      ),
      stock: new FormControl(
        0,
        [Validator.required]
      ),
     
      ultimoPrecioCosto: new FormControl(
        0,
        [Validator.required]
      ),
      ultimoPrecioVenta: new FormControl(
        0,
        [Validator.required]
      ),
      ultimoPrecioUtil: new FormControl(
        0,
        [Validator.required]
      ),
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  kardexNew: Kardex = new Kardex();


  public kardexToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.kardexForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.kardexForm.patchValue(this.kardexNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.kardexService.createItem(this.kardexForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idKardex')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.kardexService.updateItem(this.kardexForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idKardex')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.kardexToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.kardexService.deleteItem(this.kardexToDelete.idKardex).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.kardexForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.kardexService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillKardexList({data: result}))
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
  loadAllSucursal(){
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
      this.kardexLista = data.kardexLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.productoLista = data.productoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.sucursalLista = data.sucursalLista
    })
 
    //Lamando afunciones que cargan datos iniciales
    this.loadAllProducto()
    this.loadAllSucursal()
    this.loadAllItems()
  }
}


