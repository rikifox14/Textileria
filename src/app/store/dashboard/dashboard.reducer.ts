import { createReducer, on } from "@ngrx/store"

import { updateActiveMenu, fillPersonList, fillTipoDocumentoList, fillCargoList, fillClientesList, fillSucursalList, fillRolList, fillEstadoList, fillMetodoPagoList, fillTipoTelaList, fillProductoList, fillTipoComprobanteList, fillDetallePedidoList, fillDetalleVentaList, fillDocEntradaList, fillDocEntradaProductoList, fillDocSalidaList, fillDocSalidaProductoList, fillEmpleadoList, fillEntradaDocumentoList, fillKardexList, fillPedidosList, fillProveedorList, fillSalidaDocumentoList, fillUsuarioAccesoList, fillVentaList } from "./dashboard.actions"

const initialDashboardState = {
  activeMenu: 43,
  dashboardMenu: [
     {
       id: 1,
      name: 'Usuarios',
       icon: 'person-fill-check',
       path:'usuarioacceso',
       submenu: null,
     },
    
    {
      id: 3,
      name: 'Inventario',
      icon: 'grid',
      path:'inventario',
      submenu: [

        {
          id: 31,
          name: 'Tipos de Telas',
          icon: 'bi bi-box2-heart-fill',
          path:'tipotela',
        },
        {
          id: 32,
          name: 'Productos',
          icon: 'bi bi-backpack-fill',
          path:'producto',
        },
        {
          id: 33,
          name: 'DocEntrada',
          icon: 'bi bi-arrow-up-square-fill',
          path:'docentrada',
        },
        {
          id: 34,
          name: 'DocEntradaProducto',
          icon: 'bi bi-badge-ad-fill',
          path:'docentradaproducto',
        },
        {
          id: 35,
          name: 'DocSalida',
          icon: 'bi bi-arrow-down-square-fill',
          path:'docsalida',
        },
        {
          id: 36,
          name: 'DocSalidaProducto',
          icon: 'bi bi-box-arrow-down-right',
          path:'docsalidaproducto',
        },
        {
          id: 37,
          name: 'EntradaDocumento',
          icon: 'bi bi-box-arrow-in-up-left',
          path:'entradadocumento',
        },
        {
          id: 38,
          name: 'Kardex',
          icon: 'bi bi-box-seam-fill',
          path:'kardex',
        },
        {
          id: 39,
          name: 'SalidaDocumento',
          icon: 'bi bi-file-earmark',
          path:'salidadocumento',
        },


      ],
    },
    {
      id: 4,
      name: 'Personal',
      icon: 'people-fill',
      path: null,
      submenu: [
        {
          id: 41,
          name: 'Cargos',
          icon: 'person-vcard-fill',
          path:'cargo',
        },
        {
          id: 42,
          name: 'Estados',
          icon: 'toggles',
          path:'estado',
        },
        {
          id: 43,
          name: 'Personas',
          icon: 'file-person',
          path:'persona',
        },
        {
          id: 44,
          name: 'Roles',
          icon: 'person-badge-fill',
          path:'rol',
          
        },
        {
          id: 45,
          name: 'Sucursales',
          icon: 'bi bi-geo-alt-fill',
          path:'sucursal',
          
        },
        {
          id: 46,
          name: 'Empleado',
          icon: 'bi bi-person-lines-fill',
          path:'empleado',
          
        },
        
      ],
    },
    {
      id: 5,
      name: 'Ventas',
      icon: 'bi bi-bag-check',
      path:'null',
      submenu: [
        {
          id: 51,
          name: 'MetodoPago',
          icon: 'bi bi-cash-coin',
          path:'metodopago',
        },
        {
          id: 52,
          name: 'TipoComprobante',
          icon: 'bi bi-receipt',
          path:'tipocomprobante',
        },
        {
          id: 53,
          name: 'TipoDocumento',
          icon: 'bi bi-receipt',
          path:'tipodocumento',
        },
        {
          id: 54,
          name: 'DetallePedido',
          icon: 'bi bi-receipt',
          path:'detallepedido',
        },
        {
          id: 55,
          name: 'DetalleVenta',
          icon: 'bi bi-receipt',
          path:'detalleventa',
        },
        {
          id: 56,
          name: 'Pedidos',
          icon: 'bi bi-receipt',
          path:'pedidos',
        },
        {
          id: 57,
          name: 'Venta',
          icon: 'bi bi-bag-check',
          path:'venta',
        },
    
      ]
    },
    {
      id: 6,
      name: 'Clientes',
      icon: 'bi bi-person-add',
      path:'null',
      submenu: [
        {
          id: 61,
          name: 'Proveedor',
          icon: 'bi bi-person-arms-up',
          path:'proveedor',
        },
        {
          id: 62,
          name: 'Clientes',
          icon: 'bi bi-person-add',
          path:'clientes',
        },

      ]
    },
    
  ],

  personaLista: [],
  tipoDocumentoLista: [],
  usuarioLista: [],
  cargoLista:[],
  clientesLista:[],
  sucursalLista:[],
  rolLista:[],
  estadoLista:[],
  metodoPagoLista:[],
  tipoTelaLista:[],
  productoLista:[],
  tipoComprobanteLista:[],
  detallePedidoLista : [],
  detalleVentaLista : [],
  docEntradaLista : [],
  docEntradaProductoLista : [],
  docSalidaLista : [],
  docSalidaProductoLista : [],
  empleadoLista:[],
  entradaDocumentoLista:[],
  kardexLista:[],
  pedidosLista:[],
  proveedorLista:[],
  salidaDocumentoLista:[],
  usuarioAcceso:[],
  venta:[],
}

export const DashboardReducer = createReducer( initialDashboardState,
  on( updateActiveMenu, (state, {id}) => {
    return {
      ...state,
      activeMenu: id
    }
  }),
  on( fillPersonList, (state, {data}) => {
    return {
      ...state,
      personaLista: data
    }
  }),
  on( fillTipoDocumentoList, (state, {data}) => {
    return {
      ...state,
      tipoDocumentoLista: data
    }
  }),
  on( fillCargoList, (state, {data}) => {
    return {
      ...state,
      cargoLista: data
    }
  }),
  on( fillClientesList, (state, {data}) => {
    return {
      ...state,
      clientesLista: data
    }
  }),
  on( fillSucursalList, (state, {data}) => {
    return {
      ...state,
      sucursalLista: data
    }
  }),
  on( fillRolList, (state, {data}) => {
    return {
      ...state,
      rolLista: data
    }
  }),
  on( fillEstadoList, (state, {data}) => {
    return {
      ...state,
      estadoLista: data
    }
  }),
  on( fillMetodoPagoList, (state, {data}) => {
    return {
      ...state,
      metodoPagoLista: data
    }
  }),
  on( fillTipoTelaList, (state, {data}) => {
    return {
      ...state,
      tipoTelaLista: data
    }
  }),
  on( fillProductoList, (state, {data}) => {
    return {
      ...state,
      productoLista: data
    }
  }),
  on( fillTipoComprobanteList, (state, {data}) => {
    return {
      ...state,
      tipoComprobanteLista: data
    }
  }),
  on( fillDetallePedidoList, (state, {data}) => {
    return {
      ...state,
      detallePedidoLista: data
    }
  }),
  on( fillDetalleVentaList, (state, {data}) => {
    return {
      ...state,
      detalleVentaLista: data
    }
  }),
  on( fillDocEntradaList, (state, {data}) => {
    return {
      ...state,
      docEntradaLista: data
    }
  }),
  on( fillDocEntradaProductoList, (state, {data}) => {
    return {
      ...state,
      docEntradaProductoLista: data
    }
  }),
  on( fillDocSalidaList, (state, {data}) => {
    return {
      ...state,
      docSalidaLista: data
    }
  }),
  on( fillDocSalidaProductoList, (state, {data}) => {
    return {
      ...state,
      docSalidaProductoLista: data
    }
  }),
  on( fillEmpleadoList, (state, {data}) => {
    return {
      ...state,
      empleadoLista: data
    }
  }),
  on( fillEntradaDocumentoList, (state, {data}) => {
    return {
      ...state,
      entradaDocumentoLista: data
    }
  }),
  on( fillKardexList, (state, {data}) => {
    return {
      ...state,
      kardexLista: data
    }
  }),
  on( fillPedidosList, (state, {data}) => {
    return {
      ...state,
      pedidosLista: data
    }
  }),
  on( fillProveedorList, (state, {data}) => {
    return {
      ...state,
      proveedorLista: data
    }
  }),
  on( fillSalidaDocumentoList, (state, {data}) => {
    return {
      ...state,
      salidaDocumentoLista: data
    }
  }),
  on( fillUsuarioAccesoList, (state, {data}) => {
    return {
      ...state,
      usuarioAccesoLista: data
    }
  }),
  on( fillVentaList, (state, {data}) => {
    return {
      ...state,
      ventaLista: data
    }
  }),
)
