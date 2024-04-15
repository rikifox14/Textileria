import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.scss']
})
export class DashboardUsuarioComponent implements OnInit{
  constructor(
    public store: Store<{
      dashboardState: {
        usuarioLista: Array<any>
      }
    }>,
    
  ){
    
  }



  ngOnInit(): void {
    
  }
}
