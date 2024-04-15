import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { updateActiveMenu } from 'src/app/store/dashboard/dashboard.actions'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  constructor(
    private router: Router,
    public store: Store<{
      dashboardState: {
        activeMenu:number,
        dashboardMenu: Array<any>
      }
    }>
  ){
    
  }
  
  public activeMenu?: number
  public dashboardMenu?: Array<any> = []
  
  changeMenuDashboard(id: number, ruta: string) {
    this.store.dispatch(updateActiveMenu({id}))
    this.router.navigate(['dashboard/' + ruta])
  }


  ngOnInit(): void {
    this.store.select('dashboardState').subscribe( data => {
      this.activeMenu = data.activeMenu
    })

    this.store.select('dashboardState').subscribe( data => {
      this.dashboardMenu = data.dashboardMenu
    })
  }
}
