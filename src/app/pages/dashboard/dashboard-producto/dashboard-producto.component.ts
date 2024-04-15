import { Component, OnInit } from '@angular/core'
import { ProductoService, TipoTelaService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Producto, TipoTela } from 'src/app/models'
import { fillProductoList,fillTipoTelaList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-producto',
  templateUrl: './dashboard-producto.component.html',
  styleUrls: ['./dashboard-producto.component.scss']
})
export class DashboardProductoComponent implements OnInit{
  constructor(

    private tipoTelaService: TipoTelaService,
    private productoService: ProductoService,
    
    
    public store: Store<{
      dashboardState: {
        productoLista: Array<Producto>,
        tipoTelaLista: Array<TipoTela>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-producto'

  //VARIABLES
  public productoLista: Array<Producto> = []
  public tipoTelaLista: Array<TipoTela> = []
  
  
  public productoForm = new FormGroup({
    //Campos Ocultos
      idProducto: new FormControl(
        0
      ),
    //Campos a Mostrar
      
      stock: new FormControl(
        0,
        [Validator.required]
      ),
      nombre: new FormControl(
        '',
        [Validator.required]
      ),
      imagen: new FormControl(
        '',
        [Validator.required]
      ),
      idTipoTela: new FormControl(
        0,
        [Validator.required]
      ),
      precio: new FormControl(
        0,
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
   productoNew: Producto = new Producto();

  public productoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.productoForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.productoForm.patchValue(this.productoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.productoService.createItem(this.productoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idProducto')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.productoService.updateItem(this.productoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idProducto')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.productoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.productoService.deleteItem(this.productoToDelete.idProducto).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.productoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.productoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillProductoList({data: result}))
      }
    })
  }
  
  loadAllTipoTela(){
    this.tipoTelaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillTipoTelaList({data: result}))
      }
    })
  }

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.productoLista = data.productoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.tipoTelaLista = data.tipoTelaLista
    })

    //Lamando afunciones que cargan datos iniciales
    this.loadAllTipoTela()
    this.loadAllItems()
  }
}
