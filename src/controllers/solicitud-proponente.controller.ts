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
import {CorreoNotificacion, ProponenteSolicitud, SolicitudProponente} from '../models';
import {ModalidadRepository, SolicitudProponenteRepository, SolicitudRepository, TipoSolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';

//@authenticate("admin")
export class SolicitudProponenteController {
  constructor(
    @repository(SolicitudProponenteRepository)
    public solicitudProponenteRepository: SolicitudProponenteRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(ModalidadRepository)
    public modalidadRepository: ModalidadRepository,
    @repository(TipoSolicitudRepository)
    public tipoSolicitudRepository: TipoSolicitudRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/solicitud-proponentes', {
    responses: {
      '200': {
        description: 'create a Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudProponente)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProponenteSolicitud, {
            title: 'NewSolicitudInComite'
          }),
        },
      },
    }) ProponenteSolicitud: ProponenteSolicitud,
  ): Promise<object> {
    let solicitud = {
      fecha: ProponenteSolicitud.fecha,
      nombreTrabajo: ProponenteSolicitud.nombreTrabajo,
      modalidadId: ProponenteSolicitud.modalidad,
      areaInvestigacionId: ProponenteSolicitud.areaInvestigacionId,
      archivoZip: ProponenteSolicitud.archivoZip,
      descripcion: ProponenteSolicitud.descripcion,
      tipoSolicitudId: ProponenteSolicitud.tipoSolicitudId
    }
    let creado = await this.solicitudRepository.create(solicitud);

    let modalidad = await this.modalidadRepository.findById(solicitud.modalidadId);
    let tipoSolicitud = await this.tipoSolicitudRepository.findById(solicitud.tipoSolicitudId);

    /**
     * Buscar proponente por el ID enviado en (ProponenteSolicitud.proponenteId)
     * para obtener el correo y demas datos
     * Buscar area de investigacion por el ID enviado en (ProponenteSolicitud.areaInvestigacionId)
     * para obtener el nombre del area
     */
    let datos = new CorreoNotificacion();
    datos.destinatario = "luis.1701814700@ucaldas.edu.co";
    datos.asunto = Configuracion.asuntoCreacionSolicitud;
    datos.mensaje = `Hola Luis <br/>${Configuracion.mensajeSolicitudCreada} <br/>Fecha: ${solicitud.fecha}<br/>Nombre del Trabajo: ${solicitud.nombreTrabajo}<br/>Modalidad: ${modalidad.nombre}<br/>Area Investigacion: Ciencias<br/>Descripcion: ${solicitud.descripcion}<br/>Tipo de Solicitud: ${tipoSolicitud.nombre}<br/>Material: ${solicitud.archivoZip}`

    this.servicioNotificaciones.EnviarCorreo(datos);

    let solicitudProponente = {
      proponenteId: ProponenteSolicitud.proponenteId,
      solicitudId: creado.getId()
    }
    let solicitudProponenteCreado = await this.solicitudProponenteRepository.create(solicitudProponente)


    return solicitudProponenteCreado;
  }

  @get('/solicitud-proponentes/count')
  @response(200, {
    description: 'SolicitudProponente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudProponente) where?: Where<SolicitudProponente>,
  ): Promise<Count> {
    return this.solicitudProponenteRepository.count(where);
  }

  @get('/solicitud-proponentes')
  @response(200, {
    description: 'Array of SolicitudProponente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudProponente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudProponente) filter?: Filter<SolicitudProponente>,
  ): Promise<SolicitudProponente[]> {
    return this.solicitudProponenteRepository.find(filter);
  }

  @patch('/solicitud-proponentes')
  @response(200, {
    description: 'SolicitudProponente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudProponente, {partial: true}),
        },
      },
    })
    solicitudProponente: SolicitudProponente,
    @param.where(SolicitudProponente) where?: Where<SolicitudProponente>,
  ): Promise<Count> {
    return this.solicitudProponenteRepository.updateAll(solicitudProponente, where);
  }

  @get('/solicitud-proponentes/{id}')
  @response(200, {
    description: 'SolicitudProponente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudProponente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SolicitudProponente, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudProponente>
  ): Promise<SolicitudProponente> {
    return this.solicitudProponenteRepository.findById(id, filter);
  }

  @patch('/solicitud-proponentes/{id}')
  @response(204, {
    description: 'SolicitudProponente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudProponente, {partial: true}),
        },
      },
    })
    solicitudProponente: SolicitudProponente,
  ): Promise<void> {
    await this.solicitudProponenteRepository.updateById(id, solicitudProponente);
  }

  @put('/solicitud-proponentes/{id}')
  @response(204, {
    description: 'SolicitudProponente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudProponente: SolicitudProponente,
  ): Promise<void> {
    await this.solicitudProponenteRepository.replaceById(id, solicitudProponente);
  }

  @del('/solicitud-proponentes/{id}')
  @response(204, {
    description: 'SolicitudProponente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudProponenteRepository.deleteById(id);
  }
}
