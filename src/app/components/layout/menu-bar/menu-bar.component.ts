import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  constructor( private router: Router ) {

  }
  
  public menuHome: Array <any> = [
    {name:'Inicio', section:'home'},
    {name:'Productos', section:'product'},
    {name:'Nosotros', section:'ours'},
  ]

  changeMenu(id:string){
    console.log(id)
  }

  openCart(){
    document.getElementById('appCartBtn')!.click()
  }

  goToLogin(){
    this.router.navigate(['sign-in'])
  }
}
