import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Configuracion} from '../llaves/configuracion';
import {CorreoNotificacion} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  EnviarCorreo(datos: CorreoNotificacion) {
    let url = `${Configuracion.urlCorreo}?${Configuracion.destinoArg}=${datos.destinatario}&${Configuracion.asuntoArg}=${datos.asunto}&${Configuracion.mensajeArg}=${datos.mensaje}&${Configuracion.hashArg}=${Configuracion.hashNotificacion}`;
    fetch(url)
      .then((res: any) => {
        console.log(res.text())
      })
  }
}
