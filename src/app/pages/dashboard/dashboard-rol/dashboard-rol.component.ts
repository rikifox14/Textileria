import { Component, OnInit } from '@angular/core'
import { RolService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Rol} from 'src/app/models'
import { fillRolList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-rol',
  templateUrl: './dashboard-rol.component.html',
  styleUrls: ['./dashboard-rol.component.scss']
})
export class DashboardRolComponent implements OnInit {
  constructor(
    private rolService: RolService,
    
    public store: Store<{
      dashboardState: {
        rolLista: Array<Rol>,
        
      }
    }>,
  ){
    
  }
  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-rol'

  //VARIABLES
  public rolLista: Array<Rol> = []
  
  
  public rolForm = new FormGroup({
    //Campos Ocultos
      idRol: new FormControl(
        0
      ),
    //Campos a Mostrar
      descripcion: new FormControl(
        '',
        [Validator.required]
      ),
      funcion: new FormControl(
        '',
        [Validator.required]
      ),
         
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  public rolNew: any = {
    idRol: 0,
    descripcion: '',
    funcion: '',
 
  }

  public rolToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.rolForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.rolForm.setValue(this.rolNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.rolService.createItem(this.rolForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idRol')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.rolService.updateItem(this.rolForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idRol')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.rolToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.rolService.deleteItem(this.rolToDelete.idRol).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.rolForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.rolService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillRolList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.rolLista = data.rolLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}


