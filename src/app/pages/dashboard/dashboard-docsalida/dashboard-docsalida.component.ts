import { Component, OnInit } from '@angular/core'
import { DocSalidaService, ProveedorService,SucursalService,SalidaDocumentoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { DocSalida, Proveedor,Sucursal,SalidaDocumento } from 'src/app/models'
import { fillDocSalidaList, fillProveedorList,fillSucursalList,fillSalidaDocumentoList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-docsalida',
  templateUrl: './dashboard-docsalida.component.html',
  styleUrls: ['./dashboard-docsalida.component.scss']
})
export class DashboardDocSalidaComponent implements OnInit{
  constructor(

    private docSalidaService: DocSalidaService,
    private proveedorService: ProveedorService,
    private sucursalService: SucursalService,
    private salidaDocumentoService:SalidaDocumentoService,
    
    public store: Store<{
      dashboardState: {
        docSalidaLista: Array<DocSalida>,
        proveedorLista: Array<Proveedor>,
        sucursalLista: Array<Sucursal>,
        salidaDocumentoLista: Array<SalidaDocumento>,
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-docsalida'

  //VARIABLES
  public docSalidaLista: Array<DocSalida> = []
  public proveedorLista: Array<Proveedor> = []
  public sucursalLista: Array<Sucursal> = []
  public salidaDocumentoLista: Array<SalidaDocumento> = []

  
  public docsalidaForm = new FormGroup({
    //Campos Ocultos
      idDocSalida: new FormControl(
        0
      ),
    //Campos a Mostrar
      
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
      idProveedor: new FormControl(
        0,
        [Validator.required]
      ),
      idSucursal: new FormControl(
        0,
        [Validator.required]
      ),
     
      idSalidaDocumento: new FormControl(
        0,
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  docsalidaNew: DocSalida = new DocSalida();


  public docsalidaToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.docsalidaForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.docsalidaForm.patchValue(this.docsalidaNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.docSalidaService.createItem(this.docsalidaForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idDocSalida')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.docSalidaService.updateItem(this.docsalidaForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idDocSalida')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.docsalidaToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.docSalidaService.deleteItem(this.docsalidaToDelete.idDocSalida).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.docsalidaForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.docSalidaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillDocSalidaList({data: result}))
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
  loadAllSalidaDocumento(){
    this.salidaDocumentoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillSalidaDocumentoList({data: result}))
      }
    })
  }

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.docSalidaLista = data.docSalidaLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.proveedorLista = data.proveedorLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.sucursalLista = data.sucursalLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.salidaDocumentoLista = data.salidaDocumentoLista
    })

    //Lamando afunciones que cargan datos iniciales
    this.loadAllSalidaDocumento()
    this.loadAllProveedor()
    this.loadAllSucursal()
    this.loadAllItems()
  }
}


