import { Component, OnInit } from '@angular/core'
import { CargoService } from 'src/app/services'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { Validator } from 'src/app/utils/helpers'
import { Cargo} from 'src/app/models'
import { fillCargoList } from 'src/app/store/dashboard/dashboard.actions'


@Component({
  selector: 'app-dashboard-cargo',
  templateUrl: './dashboard-cargo.component.html',
  styleUrls: ['./dashboard-cargo.component.scss']
})
export class DashboardCargoComponent implements OnInit {
  constructor(
    private cargoService: CargoService,
    
    public store: Store<{
      dashboardState: {
        cargoLista: Array<Cargo>,
        
        
      }
    }>,
  )
   
  {
    
  }

  public validatorTemplate = Validator

  // ID unico del Modal de este componente (No se debe repetir en ningun otro componente)
  public idModal: string = 'modal-dashboard-cargo'

  //VARIABLES
  public cargoLista: Array<Cargo> = []
  
  
  public cargoForm = new FormGroup({
    //Campos Ocultos
      idCargo: new FormControl(
        0
      ),
    //Campos a Mostrar
      descripcionCargo: new FormControl(
        '',
        [Validator.required]
      ),
      
	})
  
  public stateModal: string = ''
  
  public errorMessage: string = ''
  
  public cargoNew: any = {
    idCargo: 0,
    descripcionCargo: '',
 
  }

  public cargoToDelete: any = {}

  //FUNCIONES
  openModalItem(action: string, data: any) {
    this.stateModal = action

    if (action === 'Editar') {
      this.cargoForm.setValue(data)
      document.getElementById(this.idModal + '-btn')!.click()
    } else {
      this.cargoForm.setValue(this.cargoNew)
      document.getElementById(this.idModal + '-btn')!.click()
    }
  }
  
  registrarItem() {
    this.cargoService.createItem(this.cargoForm.value).subscribe((result: any)=>{
      if (result.hasOwnProperty('idCargo')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  actualizarItem() {
    this.cargoService.updateItem(this.cargoForm.value).subscribe((result: any)=>{
      console.log(result)
      if (result.hasOwnProperty('idCargo')) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  openModalDelete(item: any) {
    this.cargoToDelete = item
    document.getElementById(this.idModal + '-delete-btn')!.click()
  }
  
  eliminarItem() {
    this.cargoService.deleteItem(this.cargoToDelete.idCargo).subscribe((result: any)=>{
      if (result == 1) {
        this.loadAllItems()
        document.getElementById(this.idModal + '-delete-btn-close')!.click()
      } else {
        this.errorMessage = result.mensaje
      }
    })
  }
  
  formAction(){
    if (!this.cargoForm.invalid) {
      this.stateModal === 'Editar' ? this.actualizarItem() : this.registrarItem()
    } else {
      this.errorMessage = 'Algunos datos no son validos o están vacíos'
    }
  }
  
  loadAllItems(){
    this.cargoService.getAllItems().subscribe((result)=>{
      if (result.length) {
        this.store.dispatch(fillCargoList({data: result}))
      }
    })
  }
  

  //FUNCION DE CARGA INICIAL DEL COMPONENTE
  ngOnInit(): void {
    //Creando Observables del Store
    this.store.select('dashboardState').subscribe( data => {
      this.cargoLista = data.cargoLista
    })
    
    
    //Lamando afunciones que cargan datos iniciales
    
    this.loadAllItems()
  }

}
