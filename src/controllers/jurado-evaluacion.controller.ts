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
import {CorreoNotificacion, EvaluacionJurado, JuradoEvaluacion} from '../models';
import {EvaluacionSolicitudRepository, JuradoEvaluacionRepository, ModalidadRepository, SolicitudRepository, TipoSolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class JuradoEvaluacionController {
  constructor(
    @repository(JuradoEvaluacionRepository)
    public juradoEvaluacionRepository: JuradoEvaluacionRepository,
    @repository(EvaluacionSolicitudRepository)
    public evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(ModalidadRepository)
    public modalidadRepository: ModalidadRepository,
    @repository(TipoSolicitudRepository)
    public tipoSolicitudRepository: TipoSolicitudRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/jurado-evaluaciones')
  @response(200, {
    description: 'JuradoEvaluacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(JuradoEvaluacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionJurado, {
            title: 'NewJuradoEvaluacion'
          }),
        },
      },
    })
    EvaluacionJurado: EvaluacionJurado,
  ): Promise<JuradoEvaluacion> {
    let evaluacion = {
      solicitudId: EvaluacionJurado.solicitudId,
      fechaInvitacion: EvaluacionJurado.fechaInvitacion
    }
    let creado = await this.evaluacionSolicitudRepository.create(evaluacion);
    let solicitud = await this.solicitudRepository.findById(EvaluacionJurado.solicitudId);
    let modalidad = await this.modalidadRepository.findById(solicitud.modalidadId);
    let tipoSolicitud = await this.tipoSolicitudRepository.findById(solicitud.tipoSolicitudId);

    /**
     * Buscar jurado por el ID enviado en (EvaluacionJurado.juradoId)
     * para obtener el correo y demas datos
     */

    let datos = new CorreoNotificacion();
    datos.destinatario = "luis.1701814700@ucaldas.edu.co";
    datos.asunto = Configuracion.asuntoInvitacionEvaluacion;
    datos.mensaje = `Hola Luis <br/>${Configuracion.mensajeInvitacionEvaluacion} <br/>Nombre del Trabajo: ${solicitud.nombreTrabajo}<br/>Modalidad: ${modalidad.nombre}<br/>Area Investigacion: Ciencias<br/>Descripcion: ${solicitud.descripcion}<br/>Tipo de Solicitud: ${tipoSolicitud.nombre}`

    this.servicioNotificaciones.EnviarCorreo(datos);

    let juradoEvaluacion = {
      juradoId: EvaluacionJurado.juradoId,
      evaluacionId: creado.getId()
    }
    let juradoEvaluacionCreado = await this.juradoEvaluacionRepository.create(juradoEvaluacion)


    return juradoEvaluacionCreado;
  }

  @get('/jurado-evaluaciones/count')
  @response(200, {
    description: 'JuradoEvaluacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(JuradoEvaluacion) where?: Where<JuradoEvaluacion>,
  ): Promise<Count> {
    return this.juradoEvaluacionRepository.count(where);
  }

  @get('/jurado-evaluaciones')
  @response(200, {
    description: 'Array of JuradoEvaluacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(JuradoEvaluacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(JuradoEvaluacion) filter?: Filter<JuradoEvaluacion>,
  ): Promise<JuradoEvaluacion[]> {
    return this.juradoEvaluacionRepository.find(filter);
  }

  @patch('/jurado-evaluaciones')
  @response(200, {
    description: 'JuradoEvaluacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoEvaluacion, {partial: true}),
        },
      },
    })
    juradoEvaluacion: JuradoEvaluacion,
    @param.where(JuradoEvaluacion) where?: Where<JuradoEvaluacion>,
  ): Promise<Count> {
    return this.juradoEvaluacionRepository.updateAll(juradoEvaluacion, where);
  }

  @get('/jurado-evaluaciones/{id}')
  @response(200, {
    description: 'JuradoEvaluacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(JuradoEvaluacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(JuradoEvaluacion, {exclude: 'where'}) filter?: FilterExcludingWhere<JuradoEvaluacion>
  ): Promise<JuradoEvaluacion> {
    return this.juradoEvaluacionRepository.findById(id, filter);
  }

  @patch('/jurado-evaluaciones/{id}')
  @response(204, {
    description: 'JuradoEvaluacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoEvaluacion, {partial: true}),
        },
      },
    })
    juradoEvaluacion: JuradoEvaluacion,
  ): Promise<void> {
    await this.juradoEvaluacionRepository.updateById(id, juradoEvaluacion);
  }

  @put('/jurado-evaluaciones/{id}')
  @response(204, {
    description: 'JuradoEvaluacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() juradoEvaluacion: JuradoEvaluacion,
  ): Promise<void> {
    await this.juradoEvaluacionRepository.replaceById(id, juradoEvaluacion);
  }

  @del('/jurado-evaluaciones/{id}')
  @response(204, {
    description: 'JuradoEvaluacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoEvaluacionRepository.deleteById(id);
  }
}
