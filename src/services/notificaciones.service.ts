import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Configuracion} from '../llaves/configuracion';
import {CorreoNotificacion, Jurado, LineaInvestigacion, NotificacionSms, Proponente} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  EnviarCorreo(datos: CorreoNotificacion) {
    let url = `${Configuracion.urlCorreo}?${Configuracion.destinoArg}=${datos.destinatario}&${Configuracion.asuntoArg}=${datos.asunto}&${Configuracion.mensajeArg}=${datos.mensaje}&${Configuracion.hashArg}=${Configuracion.hashNotificacion}`;
    fetch(url)
      .then((res: {text: () => any;}) => res.text())
      .then((body: any) => {
        console.log(body)
      });
  }

  EnviarSms(datos: NotificacionSms) {
    let url = `${Configuracion.urlMensajeTexto}?${Configuracion.destinoArg}=${datos.destino}&${Configuracion.mensajeArg}=${datos.mensaje}&${Configuracion.hashArg}=${Configuracion.hashNotificacion}`;
    fetch(url)
      .then((res: {text: () => any;}) => res.text())
      .then((body: any) => console.log(body));
  }

  async GetProponente(id: number): Promise<Proponente | undefined> {
    let url = `${Configuracion.urlGetProponente}${id}`;
    let proponente;

    await fetch(url)
      .then((res: {json: () => any;}) => res.json())
      .then((json: any) => {
        if (!json.error) {
          proponente = new Proponente();
          proponente.id = json.id;
          proponente.documento = json.documento;
          proponente.primerNombre = json.primerNombre;
          proponente.otroNombre = json.otroNombre;
          proponente.primerApellido = json.primerApellido;
          proponente.otroApellido = json.otroApellido;
          proponente.correo = json.correo;
          proponente.celular = json.celular;
        }
      });
    return proponente
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

  async GetLineaInvestigacion(id: number): Promise<LineaInvestigacion | undefined> {
    let url = `${Configuracion.urlGetLineaInvestigacion}${id}`;
    let lineaInvestigacion;

    await fetch(url)
      .then((res: {json: () => any;}) => res.json())
      .then((json: any) => {
        if (!json.error) {
          lineaInvestigacion = new LineaInvestigacion();
          lineaInvestigacion.id = json.id;
          lineaInvestigacion.nombre = json.nombre;
        }
      });
    return lineaInvestigacion
  }
}
