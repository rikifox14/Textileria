import { Component, OnInit } from '@angular/core'
import { DocEntradaProductoService, DocEntradaService,ProductoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Producto, DocEntradaProducto,DocEntrada } from 'src/app/models'
import { fillDocEntradaList, fillProductoList,fillDocEntradaProductoList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-docentradaproducto',
  templateUrl: './dashboard-docentradaproducto.component.html',
  styleUrls: ['./dashboard-docentradaproducto.component.scss']
})
export class DashboardDocEntradaProductoComponent implements OnInit{
  constructor(

    private productoService: ProductoService,
    private docEntradaProductoService: DocEntradaProductoService,
    private docEntradaService: DocEntradaService,
    
    
    public store: Store<{
      dashboardState: {
        productoLista: Array<Producto>,
        docEntradaLista: Array<DocEntrada>,
        docEntradaProductoLista: Array<DocEntradaProducto>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-docentradaproducto'

  //VARIABLES
  public productoLista: Array<Producto> = []
  public docEntradaLista: Array<DocEntrada> = []
  public docEntradaProductoLista: Array<DocEntradaProducto> = []

  
  
  public docentradaproductoForm = new FormGroup({
    //Campos Ocultos
      idDocEntradaProducto: new FormControl(
        0
      ),
    //Campos a Mostrar
      
      idDocEntrada: new FormControl(
        0,
        [Validator.required]
      ),
      idProducto: new FormControl(
        0,
        [Validator.required]
      ),
      lote: new FormControl(
        '',
        [Validator.required]
      ),
      cantidad: new FormControl(
        '',
        [Validator.required]
      ),
      precioCosto: new FormControl(
        0,
        [Validator.required]
      ),
      stockMinimo: new FormControl(
        '',
        [Validator.required]
      ),
      precioVenta: new FormControl(
        0,
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  docentradaproductoNew: DocEntradaProducto = new DocEntradaProducto();


  public docentradaproductoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.docentradaproductoForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.docentradaproductoForm.patchValue(this.docentradaproductoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.docEntradaProductoService.createItem(this.docentradaproductoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idDocEntradaProducto')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.docEntradaProductoService.updateItem(this.docentradaproductoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idDocEntradaProducto')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.docentradaproductoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.docEntradaProductoService.deleteItem(this.docentradaproductoToDelete.idDocEntradaProducto).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.docentradaproductoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.docEntradaProductoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillDocEntradaProductoList({data: result}))
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
  loadAllDocEntrada(){
    this.docEntradaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillDocEntradaList({data: result}))
      }
    })
  }

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.docEntradaProductoLista = data.docEntradaProductoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.docEntradaLista = data.docEntradaLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.productoLista = data.productoLista
    })

    //Lamando afunciones que cargan datos iniciales
    this.loadAllProducto()
    this.loadAllDocEntrada()
    this.loadAllItems()
  }
}

