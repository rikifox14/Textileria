import { createAction, props } from "@ngrx/store"
import { Persona } from "src/app/models"

//ACCIONES GENERALES
export const updateActiveMenu = createAction(
  '[Dashboad Page] Update activeMenu',
  props<{id:number}>()
)

//ACCIONES CRUD
export const fillPersonList = createAction(
  '[Dashboad Page] Fill fillPersonList',
  props<{data:any}>()
)

export const fillTipoDocumentoList = createAction(
  '[Dashboad Page] Fill fillTipoDocumentoList',
  props<{data:any}>()
)
export const fillCargoList = createAction(
  '[Dashboad Page] Fill fillCargoList',
  props<{data:any}>()
)
export const fillClientesList = createAction(
  '[Dashboad Page] Fill fillClientesList',
  props<{data:any}>()
)
export const fillSucursalList = createAction(
  '[Dashboad Page] Fill fillSucursalList',
  props<{data:any}>()
)
export const fillRolList = createAction(
  '[Dashboad Page] Fill fillRolList',
  props<{data:any}>()
)
export const fillEstadoList = createAction(
  '[Dashboad Page] Fill fillEstadoList',
  props<{data:any}>()
)
export const fillMetodoPagoList = createAction(
  '[Dashboad Page] Fill fillMetodoPagoList',
  props<{data:any}>()
)
export const fillTipoTelaList = createAction(
  '[Dashboad Page] Fill fillTipoTelaList',
  props<{data:any}>()
)
export const fillProductoList = createAction(
  '[Dashboad Page] Fill fillProductoList',
  props<{data:any}>()
)
export const fillTipoComprobanteList = createAction(
  '[Dashboad Page] Fill fillTipoComprobanteList',
  props<{data:any}>()
)
export const fillDetallePedidoList = createAction(
  '[Dashboad Page] Fill fillDetallePedidoList',
  props<{data:any}>()
)
export const fillDetalleVentaList = createAction(
  '[Dashboad Page] Fill fillDetalleVentaList',
  props<{data:any}>()
)
export const fillDocEntradaList = createAction(
  '[Dashboad Page] Fill fillDocEntradaList',
  props<{data:any}>()
)
export const fillDocEntradaProductoList = createAction(
  '[Dashboad Page] Fill fillDocEntradaProductoList',
  props<{data:any}>()
)
export const fillDocSalidaList = createAction(
  '[Dashboad Page] Fill fillDocSalidaList',
  props<{data:any}>()
)
export const fillDocSalidaProductoList = createAction(
  '[Dashboad Page] Fill fillDocSalidaProductoList',
  props<{data:any}>()
)
export const fillEmpleadoList = createAction(
  '[Dashboad Page] Fill fillEmpleadoList',
  props<{data:any}>()
)
export const fillEntradaDocumentoList = createAction(
  '[Dashboad Page] Fill fillEntradaDocumentoList',
  props<{data:any}>()
)

export const fillKardexList = createAction(
  '[Dashboad Page] Fill fillKardexList',
  props<{data:any}>()
)

export const fillPedidosList = createAction(
  '[Dashboad Page] Fill fillPedidosList',
  props<{data:any}>()
)

export const fillProveedorList = createAction(
  '[Dashboad Page] Fill fillProveedorList',
  props<{data:any}>()
)
export const fillSalidaDocumentoList = createAction(
  '[Dashboad Page] Fill fillSalidaDocumentoList',
  props<{data:any}>()
)
export const fillUsuarioAccesoList = createAction(
  '[Dashboad Page] Fill fillUsuarioAccesoList',
  props<{data:any}>()
)
export const fillVentaList = createAction(
  '[Dashboad Page] Fill fillVentaList',
  props<{data:any}>()
)

