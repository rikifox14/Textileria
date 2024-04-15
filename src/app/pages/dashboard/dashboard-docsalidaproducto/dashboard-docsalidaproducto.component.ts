import { Component, OnInit } from '@angular/core'
import { DocSalidaService, ProductoService,DocSalidaProductoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { DocSalida,Producto,DocSalidaProducto } from 'src/app/models'
import { fillDocSalidaList,fillProductoList,fillDocSalidaProductoList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-docsalidaproducto',
  templateUrl: './dashboard-docsalidaproducto.component.html',
  styleUrls: ['./dashboard-docsalidaproducto.component.scss']
})
export class DashboardDocSalidaProductoComponent implements OnInit{
  constructor(

    private docSalidaService: DocSalidaService,
    private productoService: ProductoService,
    private docSalidaProductoService: DocSalidaProductoService,

    
    public store: Store<{
      dashboardState: {
        docSalidaLista: Array<DocSalida>,
        productoLista: Array<Producto>,
        docSalidaProductoLista: Array<DocSalidaProducto>,
      
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-docsalidaproducto'

  //VARIABLES
  public docSalidaLista: Array<DocSalida> = []
  public productoLista: Array<Producto> = []
  public docSalidaProductoLista: Array<DocSalidaProducto> = []

  
  public docsalidaproductoForm = new FormGroup({
    //Campos Ocultos
      idDocSalidaProducto: new FormControl(
        0
      ),
    //Campos a Mostrar
      
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
     
      idDocSalida: new FormControl(
        0,
        [Validator.required]
      ),
      idProducto: new FormControl(
        0,
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  docsalidaproductoNew: DocSalidaProducto = new DocSalidaProducto();


  public docsalidaproductoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.docsalidaproductoForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.docsalidaproductoForm.patchValue(this.docsalidaproductoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.docSalidaProductoService.createItem(this.docsalidaproductoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idDocSalidaProducto')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.docSalidaProductoService.updateItem(this.docsalidaproductoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idDocSalidaProducto')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.docsalidaproductoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.docSalidaProductoService.deleteItem(this.docsalidaproductoToDelete.idDocSalidaProducto).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.docsalidaproductoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.docSalidaProductoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillDocSalidaProductoList({data: result}))
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
  loadAllDocSalida(){
    this.docSalidaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillDocSalidaList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.docSalidaProductoLista = data.docSalidaProductoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.docSalidaLista = data.docSalidaLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.productoLista = data.productoLista
    })
    

    //Lamando afunciones que cargan datos iniciales
    this.loadAllProducto()
    this.loadAllDocSalida()
    this.loadAllItems()
  }
}


