import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Configuracion} from '../llaves/configuracion';
import {AceptarRechazarSolicitud, CorreoNotificacion, EvaluacionSolicitud} from '../models';
import {EvaluacionSolicitudRepository, SolicitudProponenteRepository, SolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class EvaluacionSolicitudController {
  constructor(
    @repository(EvaluacionSolicitudRepository)
    public evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
    @repository(SolicitudProponenteRepository)
    public solicitudProponenteRepository: SolicitudProponenteRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/evaluacion-solicitudes')
  @response(200, {
    description: 'EvaluacionSolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(EvaluacionSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {
            title: 'NewEvaluacionSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    evaluacionSolicitud: Omit<EvaluacionSolicitud, 'id'>,
  ): Promise<EvaluacionSolicitud> {
    return this.evaluacionSolicitudRepository.create(evaluacionSolicitud);
  }

  @get('/evaluacion-solicitudes/count')
  @response(200, {
    description: 'EvaluacionSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EvaluacionSolicitud) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.count(where);
  }

  @get('/evaluacion-solicitudes')
  @response(200, {
    description: 'Array of EvaluacionSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EvaluacionSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EvaluacionSolicitud) filter?: Filter<EvaluacionSolicitud>,
  ): Promise<EvaluacionSolicitud[]> {
    return this.evaluacionSolicitudRepository.find(filter);
  }

  @patch('/evaluacion-solicitudes')
  @response(200, {
    description: 'EvaluacionSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: EvaluacionSolicitud,
    @param.where(EvaluacionSolicitud) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.updateAll(evaluacionSolicitud, where);
  }

  @get('/evaluacion-solicitudes/{id}')
  @response(200, {
    description: 'EvaluacionSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EvaluacionSolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EvaluacionSolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<EvaluacionSolicitud>
  ): Promise<EvaluacionSolicitud> {
    return this.evaluacionSolicitudRepository.findById(id, filter);
  }

  @patch('/evaluacion-solicitudes/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: EvaluacionSolicitud,
  ): Promise<void> {
    await this.evaluacionSolicitudRepository.updateById(id, evaluacionSolicitud);
  }

  @put('/evaluacion-solicitudes/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evaluacionSolicitud: EvaluacionSolicitud,
  ): Promise<void> {
    await this.evaluacionSolicitudRepository.replaceById(id, evaluacionSolicitud);
  }

  @del('/evaluacion-solicitudes/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.evaluacionSolicitudRepository.deleteById(id);
  }

  @post('/aceptar-rechazar-solicitud')
  @response(200, {
    description: 'Aceptar o rechazar la solicitud',
    content: {'application/json': {schema: getModelSchemaRef(EvaluacionSolicitud)}},
  })
  async aceptarRechazarSolicitud(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AceptarRechazarSolicitud, {
            title: 'Respuesta Invitacion'
          }),
        },
      },
    })
    aceptarRechazarSolicitud: AceptarRechazarSolicitud,
  ): Promise<void> {
    let evaluacion = await this.evaluacionSolicitudRepository.findById(aceptarRechazarSolicitud.id)

    //let get = await this.solicitudProponenteRepository.findById(evaluacion.solicitudId)
    //let proponente = this.servicioNotificaciones.GetProponente(get.proponenteId);
    //console.log(`Proponente: ${proponente}`)

    let solicitud = await this.solicitudRepository.findById(aceptarRechazarSolicitud.id)

    let datos = new CorreoNotificacion();
    datos.destinatario = "luis.1701814700@ucaldas.edu.co";
    let nombre = "Luis"
    //datos.destinatario = proponente.correo;
    //let nombre = proponente.primerNombre;

    let answer = ""

    if (aceptarRechazarSolicitud.respuesta == 1) {
      datos.asunto = Configuracion.asuntoAceptarSolicitud;
      datos.mensaje = `Hola ${nombre} <br/>${Configuracion.mensajeAceptarSolicitud} <br/>Nombre del Trabajo: ${solicitud.nombreTrabajo}<br/>Fecha invitacion: ${evaluacion.fechaInvitacion}<br/>Fecha Respuesta: ${aceptarRechazarSolicitud.fecha}<br/>Respuesta: Aceptada<br/>Observaciones: ${aceptarRechazarSolicitud.observaciones}`

      answer = "Aceptada"
    }
    else {
      datos.asunto = Configuracion.asuntoRechazarSolicitud;
      datos.mensaje = `Hola ${nombre} <br/>${Configuracion.mensajeRechazarSolicitud} <br/>Nombre del Trabajo: ${solicitud.nombreTrabajo}<br/>Fecha invitacion: ${evaluacion.fechaInvitacion}<br/>Fecha Respuesta: ${aceptarRechazarSolicitud.fecha}<br/>Respuesta: Rechazada<br/>Observaciones: ${aceptarRechazarSolicitud.observaciones}`

      answer = "Rechazada"
    }

    this.servicioNotificaciones.EnviarCorreo(datos);

    let data = {
      fechaRespuesta: aceptarRechazarSolicitud.fecha,
      respuesta: answer,
      observaciones: aceptarRechazarSolicitud.observaciones
    }
    return await this.evaluacionSolicitudRepository.updateById(aceptarRechazarSolicitud.id, data);
  }
}
