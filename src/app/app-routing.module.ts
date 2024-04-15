import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { SignInComponent } from './pages/sign-in/sign-in.component'

import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { DashboardPersonaComponent } from './pages/dashboard/dashboard-persona/dashboard-persona.component'
import { DashboardUsuarioComponent } from './pages/dashboard/dashboard-usuario/dashboard-usuario.component'
import { DashboardCargoComponent } from './pages/dashboard/dashboard-cargo/dashboard-cargo.component'
import { DashboardSucursalComponent } from './pages/dashboard/dashboard-sucursal/dashboard-sucursal.component'
import { DashboardRolComponent } from './pages/dashboard/dashboard-rol/dashboard-rol.component'
import { DashboardEstadoComponent } from './pages/dashboard/dashboard-estado/dashboard-estado.component'
import { DashboardMetodoPagoComponent } from './pages/dashboard/dashboard-metodopago/dashboard-metodopago.component'
import { DashboardTipoTelaComponent } from './pages/dashboard/dashboard-tipotela/dashboard-tipotela.component'
import { DashboardClientesComponent } from './pages/dashboard/dashboard-clientes/dashboard-clientes.component'
import { DashboardProductoComponent,  } from './pages/dashboard/dashboard-producto/dashboard-producto.component'
import { DashboardTipoComprobanteComponent } from './pages/dashboard/dashboard-tipocomprobante/dashboard-tipocomprobante.component'
import { DashboardTipoDocumentoComponent } from './pages/dashboard/dashboard-tipodocumento/dashboard-tipodocumento.component'
import { DashboardDetallePedidoComponent } from './pages/dashboard/dashboard-detallepedido/dashboard-detallepedido.component'
import { DashboardDetalleVentaComponent } from './pages/dashboard/dashboard-detalleventa/dashboard-detalleventa.component'
import { DashboardDocEntradaComponent } from './pages/dashboard/dashboard-docentrada/dashboard-docentrada.component'
import { DashboardDocEntradaProductoComponent } from './pages/dashboard/dashboard-docentradaproducto/dashboard-docentradaproducto.component'
import { DashboardDocSalidaComponent } from './pages/dashboard/dashboard-docsalida/dashboard-docsalida.component'
import { DashboardDocSalidaProductoComponent } from './pages/dashboard/dashboard-docsalidaproducto/dashboard-docsalidaproducto.component'
import { DashboardEntradaDocumentoComponent } from './pages/dashboard/dashboard-entradadocumento/dashboard-entradadocumento.component'
import { DashboardKardexComponent } from './pages/dashboard/dashboard-kardex/dashboard-kardex.component'
import { DashboardEmpleadoComponent } from './pages/dashboard/dashboard-empleado/dashboard-empleado.component'
import { DashboardPedidosComponent } from './pages/dashboard/dashboard-pedidos/dashboard-pedidos.component'
import { DashboardProveedorComponent } from './pages/dashboard/dashboard-proveedor/dashboard-proveedor.component'
import { DashboardSalidaDocumentoComponent } from './pages/dashboard/dashboard-salidadocumento/dashboard-salidadocumento.component'
import { DashboardVentaComponent } from './pages/dashboard/dashboard-venta/dashboard-venta.component'
import { DashboardUsuarioAccesoComponent } from './pages/dashboard/dashboard-usuarioacceso/dashboard-usuarioacceso.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'dashboard', redirectTo: '/dashboard/persona', pathMatch: 'full'},

  { path:'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'persona',
        component: DashboardPersonaComponent
      },
      {
        path: 'usuario',
        component: DashboardUsuarioComponent
      },
      {
        path: 'cargo',
        component: DashboardCargoComponent
      },     
      {
        path: 'sucursal',
        component: DashboardSucursalComponent
      },
      {
        path: 'rol',
        component: DashboardRolComponent
      },
      {
        path: 'estado',
        component: DashboardEstadoComponent
      },
      {
        path: 'metodopago',
        component: DashboardMetodoPagoComponent
      },
      {
        path: 'tipotela',
        component: DashboardTipoTelaComponent
      },
      {
        path: 'clientes',
        component: DashboardClientesComponent
      },
      {
        path: 'producto',
        component: DashboardProductoComponent
      },
      {
        path: 'tipocomprobante',
        component: DashboardTipoComprobanteComponent
      },
      {
        path: 'tipodocumento',
        component: DashboardTipoDocumentoComponent
      },
      {
        path: 'detallepedido',
        component: DashboardDetallePedidoComponent
      },
      {
        path: 'detalleventa',
        component: DashboardDetalleVentaComponent
      },
      {
        path: 'docentrada',
        component: DashboardDocEntradaComponent
      },
      {
        path: 'docentradaproducto',
        component: DashboardDocEntradaProductoComponent
      },
      {
        path: 'docsalida',
        component: DashboardDocSalidaComponent
      },
      {
        path: 'docsalidaproducto',
        component: DashboardDocSalidaProductoComponent
      },
      {
        path: 'entradadocumento',
        component: DashboardEntradaDocumentoComponent
      },
      {
        path: 'kardex',
        component: DashboardKardexComponent
      },
      {
        path: 'empleado',
        component: DashboardEmpleadoComponent
      },
      {
        path: 'pedidos',
        component: DashboardPedidosComponent
      },
      {
        path: 'proveedor',
        component: DashboardProveedorComponent
      },
      {
        path: 'salidadocumento',
        component: DashboardSalidaDocumentoComponent
      },
      {
        path: 'venta',
        component: DashboardVentaComponent
      },
      {
        path: 'usuarioacceso',
        component: DashboardUsuarioAccesoComponent
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
