import { Component, OnInit } from '@angular/core'
import { DocEntradaService, ProveedorService,SucursalService,EntradaDocumentoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { DocEntrada, Proveedor,Sucursal,EntradaDocumento } from 'src/app/models'
import { fillDocEntradaList, fillProveedorList,fillSucursalList,fillEntradaDocumentoList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-docentrada',
  templateUrl: './dashboard-docentrada.component.html',
  styleUrls: ['./dashboard-docentrada.component.scss']
})
export class DashboardDocEntradaComponent implements OnInit{
  constructor(

    private docEntradaService: DocEntradaService,
    private proveedorService: ProveedorService,
    private sucursalService: SucursalService,
    private entradaDocumentoService:EntradaDocumentoService,
    
    public store: Store<{
      dashboardState: {
        docEntradaLista: Array<DocEntrada>,
        proveedorLista: Array<Proveedor>,
        sucursalLista: Array<Sucursal>,
        entradaDocumentoLista: Array<EntradaDocumento>,
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-docentrada'

  //VARIABLES
  public docEntradaLista: Array<DocEntrada> = []
  public proveedorLista: Array<Proveedor> = []
  public sucursalLista: Array<Sucursal> = []
  public entradaDocumentoLista: Array<EntradaDocumento> = []

  
  public docentradaForm = new FormGroup({
    //Campos Ocultos
      idDocEntrada: new FormControl(
        0
      ),
    //Campos a Mostrar
      
      idProveedor: new FormControl(
        0,
        [Validator.required]
      ),
      idSucursal: new FormControl(
        0,
        [Validator.required]
      ),
      nroDoc: new FormControl(
        '',
        [Validator.required]
      ),
      fecha: new FormControl(
        '',
        [Validator.required]
      ),
      montoCredito: new FormControl(
        0,
        [Validator.required]
      ),
      idEntradaDocumento: new FormControl(
        0,
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  docentradaNew: DocEntrada = new DocEntrada();


  public docentradaToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.docentradaForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.docentradaForm.patchValue(this.docentradaNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.docEntradaService.createItem(this.docentradaForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idDocEntrada')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.docEntradaService.updateItem(this.docentradaForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idDocEntrada')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.docentradaToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.docEntradaService.deleteItem(this.docentradaToDelete.idDocEntrada).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.docentradaForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.docEntradaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillDocEntradaList({data: result}))
      }
    })
  }
  
  loadAllProveedor(){
    this.proveedorService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillProveedorList({data: result}))
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
  loadAllEntradaDocumento(){
    this.entradaDocumentoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillEntradaDocumentoList({data: result}))
      }
    })
  }

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.docEntradaLista = data.docEntradaLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.proveedorLista = data.proveedorLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.sucursalLista = data.sucursalLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.entradaDocumentoLista = data.entradaDocumentoLista
    })

    //Lamando afunciones que cargan datos iniciales
    this.loadAllEntradaDocumento()
    this.loadAllProveedor()
    this.loadAllSucursal()
    this.loadAllItems()
  }
}

