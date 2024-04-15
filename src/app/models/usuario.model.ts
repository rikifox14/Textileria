export interface RespuestaLogin {
  success:     boolean;
  mensaje:     string;
  token:       string;
  tokenExpira: string;
  usuario:     Usuario;
  rol:         Rol;
  persona:     null;
}

export interface Rol {
  idRol:       number;
  descripcion: string;
  funcion:     string;
}

export interface Usuario {
  idUsuarioAcceso: number;
  usuario:         string;
  password:        string;
  correo:          string;
  idEstado:        number;
  idEmpleado:      number;
}
