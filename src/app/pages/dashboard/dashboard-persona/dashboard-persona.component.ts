import { Component, OnInit } from '@angular/core'
import { PersonaService, TipoDocumentoService,EstadoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Persona, TipoDocumento,Estado } from 'src/app/models'
import { fillPersonList, fillTipoDocumentoList,fillEstadoList } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-dashboard-persona',
  templateUrl: './dashboard-persona.component.html',
  styleUrls: ['./dashboard-persona.component.scss']
})
export class DashboardPersonaComponent implements OnInit{
  constructor(

    private personaService: PersonaService,
    private tipoDocService: TipoDocumentoService,
    private estadoService:EstadoService,

    public store: Store<{
      dashboardState: {
        personaLista: Array<Persona>,
        tipoDocLista: Array<TipoDocumento>,
        estadoLista: Array<Estado>,
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-persona'

  //VARIABLES
  public personaLista: Array<Persona> = []
  public tipoDocLista: Array<TipoDocumento> = []
  public estadoLista: Array<Estado> = []

  
  public personaForm = new FormGroup({
    //Campos Ocultos
      idPersona: new FormControl(
        0
      ),
    //Campos a Mostrar
      rsocial: new FormControl(
        '',
        [Validator.required]
      ),
      idTipoDoc: new FormControl(
        '',
        [Validator.required]
      ),
      idEstado: new FormControl(
        '',
        [Validator.required]
      ),
      nroDocumento: new FormControl(
        '',
        [Validator.required]
      ),
      correo: new FormControl(
        '',
        [Validator.required, Validator.email]
      ),
      fechaNacimiento: new FormControl(
        '',
        [Validator.required]
      ),
      telefono: new FormControl(
        '',
        [Validator.required]
      ),
      direccion: new FormControl(
        '',
        [Validator.required]
      ),
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  public personaNew: any = {
    idPersona: 0,
    rsocial: '',
    direccion: '',
    telefono: '',
    fechaNacimiento: new Date(),
    correo: '',
    nroDocumento: '',
    idTipoDoc: 1,
    idEstado:1,
  }

  public personaToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.personaForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.personaForm.setValue(this.personaNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.personaService.createItem(this.personaForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idPersona')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.personaService.updateItem(this.personaForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idPersona')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.personaToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.personaService.deleteItem(this.personaToDelete.idPersona).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.personaForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.personaService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillPersonList({data: result}))
      }
    })
  }
  
  loadAllTipoDocumento(){
    this.tipoDocService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillTipoDocumentoList({data: result}))
      }
    })
  }
  loadAllEstado(){
    this.estadoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillEstadoList({data: result}))
      }
    })
  }

  validarDni(){
    const dni: any = this.personaForm.get('nroDocumento')?.value
    if (dni.length > 7) {
      this.personaService.requestDniApi(dni).subscribe((result)=>{
        if (result.apellidoPaterno !== '') {
          this.personaForm.setValue({
            rsocial: result.nombres + ' ' + result.apellidoPaterno + ' ' + result.apellidoMaterno,
            idPersona: 0,
            idTipoDoc: '1',
            idEstado: '1',
            nroDocumento: result.dni,
            correo: '',
            fechaNacimiento: '',
            telefono: '',
            direccion: ''
          })
        }
      })
    }
    
  }

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.personaLista = data.personaLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.tipoDocLista = data.tipoDocLista
    })
    this.store.select('dashboardState').subscribe( data => {
      this.estadoLista = data.estadoLista
    })
    
    //Lamando afunciones que cargan datos iniciales
    this.loadAllEstado()
    this.loadAllTipoDocumento()
    this.loadAllItems()
  }
}
