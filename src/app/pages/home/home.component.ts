import { Component, OnInit } from '@angular/core'
import { Producto } from 'src/app/models'

import { ProductoService } from 'src/app/services'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private productoService: ProductoService) { }


  public appCart: Array<Producto> = []
  public totalCart: number = 0

  public  temporalProduct: Producto = {
    idProducto: 1,
    stock: 0,
    nombre: '',
    imagen: '',
    idTipoTela: 0,
    price: 0,
    precio: 0,
    number: 1,
    parcial: 0
  }

  public productList: Array<Producto> = [
    /* {idProducto: 1, nombre:'Casaca Mujer impermeable Avar', price:'99.00'},
    {idProducto: 2, nombre:'Casaca Hombre impermeable Avar', price:'110.94'},
    {idProducto: 3, nombre:'Casaca Hombre Sintética Insulated', price:'149.90'},
    {idProducto: 4, nombre:'Casaca Hombre Impermeable Whisper', price:'133.50'},
    {idProducto: 5, nombre:'Cortaviento Hombre Alder Wind', price:'84.93'},
    {idProducto: 6, nombre:'Cortaviento Hombre Supplex Anorak', price:'165.94'},
    {idProducto: 7, nombre:'Casaca Hombre Impermeable Fallon', price:'154.00'},
    {idProducto: 8, nombre:'Casaca Hombre Pluma Ridgevent', price:'159.99'},
    {idProducto: 9, nombre:'Casaca Hombre Polar Sherpa', price:'115.99'}, */
  ]

  viewAddCart(product: Producto) {
    this.temporalProduct = product
    this.temporalProduct.number = 1
    document.getElementById('viewProductModalBtn')!.click()
  }

  changeNumber(action: string) {
    if (action === 'add') {
      this.temporalProduct.number += 1
    } else if (action === 'remove' && this.temporalProduct.number != 1){
      this.temporalProduct.number -= 1
    }
  }

  addCart() {
    this.appCart.push(this.temporalProduct)
    setTimeout(() => {
      this.temporalProduct = {
        idProducto: 1,
        stock: 0,
        nombre: '',
        imagen: '',
        idTipoTela: 0,
        price:0,
        precio: 0,
        number: 1,
        parcial: 0
      }

      this.calculatetotalCart()
    }, 500)
    document.getElementById('closeViewProductModalBtn')!.click()
  }

  calculatetotalCart() {
    this.totalCart = 0
    this.appCart.forEach(item => {
      const parcial = (Math.round((item.number * item.precio) * 100) / 100)
      item.parcial = parcial
      this.totalCart += (Math.round(parcial * 100) / 100),2
    })
  }

  loadAllItems(){
    this.productoService.getAllItems().subscribe((result: Array<Producto>)=>{
      if (result.length) {
        result.forEach(item => {
          item.price = Math.round((Math.random() * (500 - 75) + 75) * 100) / 100
          this.productList.push(item)
        })
      }
    })
  }
  
  ngOnInit(): void {
    this.loadAllItems()
  }
}
