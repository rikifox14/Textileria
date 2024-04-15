import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MenuBarComponent } from './components/layout/menu-bar/menu-bar.component'
import { SidebarComponent } from './components/layout/sidebar/sidebar.component'
import { FooterComponent } from './components/layout/footer/footer.component'

import { HomeComponent } from './pages/home/home.component'
import { SignInComponent } from './pages/sign-in/sign-in.component'

import { DashboardPersonaComponent } from './pages/dashboard/dashboard-persona/dashboard-persona.component'

import { DashboardReducer } from './store';
import { DashboardUsuarioComponent } from './pages/dashboard/dashboard-usuario/dashboard-usuario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardCargoComponent } from './pages/dashboard/dashboard-cargo/dashboard-cargo.component';
import { DashboardClientesComponent } from './pages/dashboard/dashboard-clientes/dashboard-clientes.component';
import { DashboardSucursalComponent } from './pages/dashboard/dashboard-sucursal/dashboard-sucursal.component';
import { DashboardRolComponent } from './pages/dashboard/dashboard-rol/dashboard-rol.component';
import { DashboardEstadoComponent } from './pages/dashboard/dashboard-estado/dashboard-estado.component';
import { DashboardMetodoPagoComponent } from './pages/dashboard/dashboard-metodopago/dashboard-metodopago.component';
import { DashboardTipoTelaComponent } from './pages/dashboard/dashboard-tipotela/dashboard-tipotela.component';
import { DashboardProductoComponent } from './pages/dashboard/dashboard-producto/dashboard-producto.component';
import { DashboardTipoComprobanteComponent } from './pages/dashboard/dashboard-tipocomprobante/dashboard-tipocomprobante.component';
import { DashboardTipoDocumentoComponent } from './pages/dashboard/dashboard-tipodocumento/dashboard-tipodocumento.component';
import { DashboardDetalleVentaComponent } from './pages/dashboard/dashboard-detalleventa/dashboard-detalleventa.component';
import { DashboardDocEntradaComponent } from './pages/dashboard/dashboard-docentrada/dashboard-docentrada.component';
import { DashboardDocEntradaProductoComponent } from './pages/dashboard/dashboard-docentradaproducto/dashboard-docentradaproducto.component';
import { DashboardDocSalidaComponent } from './pages/dashboard/dashboard-docsalida/dashboard-docsalida.component';
import { DashboardDocSalidaProductoComponent } from './pages/dashboard/dashboard-docsalidaproducto/dashboard-docsalidaproducto.component';
import { DashboardEmpleadoComponent } from './pages/dashboard/dashboard-empleado/dashboard-empleado.component';
import { DashboardEntradaDocumentoComponent } from './pages/dashboard/dashboard-entradadocumento/dashboard-entradadocumento.component';
import { DashboardKardexComponent } from './pages/dashboard/dashboard-kardex/dashboard-kardex.component';
import { DashboardPedidosComponent } from './pages/dashboard/dashboard-pedidos/dashboard-pedidos.component';
import { DashboardProveedorComponent } from './pages/dashboard/dashboard-proveedor/dashboard-proveedor.component';
import { DashboardSalidaDocumentoComponent } from './pages/dashboard/dashboard-salidadocumento/dashboard-salidadocumento.component';
import { DashboardUsuarioAccesoComponent } from './pages/dashboard/dashboard-usuarioacceso/dashboard-usuarioacceso.component';
import { DashboardVentaComponent } from './pages/dashboard/dashboard-venta/dashboard-venta.component';
import { DashboardDetallePedidoComponent } from './pages/dashboard/dashboard-detallepedido/dashboard-detallepedido.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    SidebarComponent,
    FooterComponent,
    
    HomeComponent,
    SignInComponent,
    DashboardPersonaComponent,
    DashboardUsuarioComponent,
    DashboardComponent,
    DashboardCargoComponent,
    DashboardClientesComponent,
    DashboardSucursalComponent,
    DashboardRolComponent,
    DashboardEstadoComponent,
    DashboardMetodoPagoComponent,
    DashboardTipoTelaComponent,
    DashboardProductoComponent,
    DashboardTipoComprobanteComponent,
    DashboardTipoDocumentoComponent,

    DashboardDetalleVentaComponent,
    DashboardDocEntradaComponent,
    DashboardDocEntradaProductoComponent,
    DashboardDocSalidaComponent,
    DashboardDocSalidaProductoComponent,
    DashboardEmpleadoComponent,
    DashboardEntradaDocumentoComponent,
    DashboardKardexComponent,
    DashboardPedidosComponent,
    DashboardProveedorComponent,
    DashboardSalidaDocumentoComponent,
    DashboardUsuarioAccesoComponent,
    DashboardVentaComponent,
    DashboardDetallePedidoComponent,
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ dashboardState: DashboardReducer}, {}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
