import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Configuracion} from '../llaves/configuracion';
import {CorreoNotificacion, Jurado, NotificacionSms} from '../models';
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

  EnviarSms(datos: NotificacionSms) {
    let url = `${Configuracion.urlMensajeTexto}?${Configuracion.destinoArg}=${datos.destino}&${Configuracion.mensajeArg}=${datos.mensaje}&${Configuracion.hashArg}=${Configuracion.hashNotificacion}`;
    fetch(url)
      .then((res: any) => {
        console.log(res.text())
      })
  }

  GetProponente(id: number) {
    let url = `${Configuracion.urlGetProponente}/${id}`;
    fetch(url)
      .then((res: any) => {
        console.log(res.text())
        return res;
      })
    return ""
  }

  async GetJurado(id: number): Promise<Jurado | undefined> {
    let url = `${Configuracion.urlGetJurado}${id}`;
    let jurado;

    await fetch(url)
      .then((res: {json: () => any;}) => res.json())
      .then((json: any) => {
        if (!json.error) {
          jurado = new Jurado();
          jurado.id = json.id;
          jurado.nombre = json.nombre;
          jurado.apellidos = json.apellidos;
          jurado.correo = json.correo;
          jurado.entidad = json.entidad;
          jurado.telefono = json.telefono;
        }
      });
    return jurado
  }
}
