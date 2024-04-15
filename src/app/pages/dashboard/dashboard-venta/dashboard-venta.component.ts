import { Component, OnInit } from '@angular/core'
import { VentaService, ClientesService,TipoComprobanteService,MetodoPagoService,UsuarioAccesoService,SucursalService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Venta, Clientes,TipoComprobante,MetodoPago,UsuarioAcceso,Sucursal } from 'src/app/models'
import { fillVentaList, fillClientesList,fillTipoComprobanteList,fillMetodoPagoList,fillUsuarioAccesoList,fillSucursalList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-venta',
  templateUrl: './dashboard-venta.component.html',
  styleUrls: ['./dashboard-venta.component.scss']
})
export class DashboardVentaComponent implements OnInit{
  constructor(

    private ventaService: VentaService,
    private clientesService: ClientesService,
    private usuarioAccesoService: UsuarioAccesoService,
    private tipoComprobanteService:TipoComprobanteService,
    private meotodPagoService:MetodoPagoService,
    private sucursalService:SucursalService,


    
    public store: Store<{
      dashboardState: {
        ventaLista: Array<Venta>,
        clientesLista: Array<Clientes>,
        usuarioAccesoLista: Array<UsuarioAcceso>,
        tipoComprobanteLista:Array<TipoComprobante>,
        metodoPagoLista:Array<MetodoPago>,
        sucursalLista:Array<Sucursal>
      
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-venta'

  //VARIABLES
  public ventaLista: Array<Venta> = []
  public clientesLista: Array<Clientes> = []
  public usuarioAccesoLista: Array<UsuarioAcceso> = []
  public tipoComprobanteLista: Array<TipoComprobante> = []
  public metodoPagoLista: Array<MetodoPago> = []
  public sucursalLista: Array<Sucursal> = []

  
  public ventaForm = new FormGroup({
    //Campos Ocultos
      idVenta: new FormControl(
        0
      ),
    //Campos a Mostrar
      
    idCliente: new FormControl(
      0,
      [Validator.required]
    ),
    fechaVenta: new FormControl(
      '',
      [Validator.required]
    ),
      igv: new FormControl(
        0,
        [Validator.required]
      ),
      subtotal: new FormControl(
        0,
        [Validator.required]
      ),
      costoVenta: new FormControl(
        0,
        [Validator.required]
      ),
      idTipoComprobante: new FormControl(
        0,
        [Validator.required]
      ),
      idMetodoPago: new FormControl(
        0,
        [Validator.required]
      ),
      montoAcuenta: new FormControl(
        0,
        [Validator.required]
      ),
      idUsuarioAcceso: new FormControl(
        0,
        [Validator.required]
      ),
      nroComprobante: new FormControl(
        '',
        [Validator.required]
      ),
      saldo: new FormControl(
        0,
        [Validator.required]
      ),
      idSucursal: new FormControl(
        0,
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  ventaNew: Venta = new Venta();


  public ventaToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.ventaForm.patchValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.ventaForm.patchValue(this.ventaNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.ventaService.createItem(this.ventaForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idVenta')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.ventaService.updateItem(this.ventaForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idVenta')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.ventaToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.ventaService.deleteItem(this.ventaToDelete.idVenta).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.ventaForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.ventaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillVentaList({data: result}))
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
  loadAllTipoComprobante(){
    this.tipoComprobanteService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillTipoComprobanteList({data: result}))
      }
    })
  }
  loadAllMetodoPago(){
    this.meotodPagoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillMetodoPagoList({data: result}))
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
      this.ventaLista = data.ventaLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.usuarioAccesoLista = data.usuarioAccesoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.clientesLista = data.clientesLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.tipoComprobanteLista = data.tipoComprobanteLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.metodoPagoLista = data.metodoPagoLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.sucursalLista = data.sucursalLista
    })
 

    //Lamando afunciones que cargan datos iniciales
    this.loadAllUsuarioAcceso()
    this.loadAllMetodoPago()
    this.loadAllSucursal()
    this.loadAllTipoComprobante()
    this.loadAllClientes()
    this.loadAllItems()
  }
}


