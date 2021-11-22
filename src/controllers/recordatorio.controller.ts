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
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Configuracion} from '../llaves/configuracion';
import {CorreoNotificacion, NotificacionSms, Recordatorio} from '../models';
import {EvaluacionSolicitudRepository, JuradoEvaluacionRepository, RecordatorioRepository} from '../repositories';
import {NotificacionesService} from '../services';

//@authenticate("admin")
export class RecordatorioController {
  constructor(
    @repository(RecordatorioRepository)
    public recordatorioRepository: RecordatorioRepository,
    @repository(EvaluacionSolicitudRepository)
    public evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
    @repository(JuradoEvaluacionRepository)
    public juradoEvaluacionRepository: JuradoEvaluacionRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/recordatorios')
  @response(200, {
    description: 'Recordatorio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recordatorio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {
            title: 'NewRecordatorio',
            exclude: ['id'],
          }),
        },
      },
    })
    recordatorio: Omit<Recordatorio, 'id'>,
  ): Promise<Recordatorio> {
    let evaluacion = await this.evaluacionSolicitudRepository.findById(recordatorio.evaluacionSolicitudId);

    if (evaluacion.respuesta == null) {
      let get = await this.juradoEvaluacionRepository.findOne({
        where: {
          evaluacionId: evaluacion.id
        }
      })

      if (get) {
        let jurado = await this.servicioNotificaciones.GetJurado(get.juradoId);

        if (jurado) {
          let creado = await this.recordatorioRepository.create(recordatorio);
          switch (creado.tipo) {
            case "Correo":
              let datos = new CorreoNotificacion();
              datos.destinatario = jurado.correo;
              datos.asunto = Configuracion.asuntoRecordatorio;
              datos.mensaje = `Hola ${jurado.nombre} <br/>${Configuracion.mensajeRecordatorio}`

              this.servicioNotificaciones.EnviarCorreo(datos);
              break;

            case "SMS":
              let sms = new NotificacionSms();
              sms.destino = "3207027958";
              sms.mensaje = `Hola Luis <br/>${Configuracion.mensajeRecordatorio}`

              this.servicioNotificaciones.EnviarSms(sms);
              break;
          }
          return creado;
        }
        throw new HttpErrors[404](`Entity not found: Jurado with id ${get.juradoId}`)
      }
      throw new HttpErrors[404](`Entity not found: Evaluacion with id ${evaluacion.id}`)
    }
    throw new HttpErrors[400](`La evaluacion con id ${evaluacion.id}, ya fue calificada`)
  }

  @get('/recordatorios/count')
  @response(200, {
    description: 'Recordatorio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recordatorio) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.recordatorioRepository.count(where);
  }

  @get('/recordatorios')
  @response(200, {
    description: 'Array of Recordatorio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recordatorio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recordatorio) filter?: Filter<Recordatorio>,
  ): Promise<Recordatorio[]> {
    return this.recordatorioRepository.find(filter);
  }

  @patch('/recordatorios')
  @response(200, {
    description: 'Recordatorio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Recordatorio,
    @param.where(Recordatorio) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.recordatorioRepository.updateAll(recordatorio, where);
  }

  @get('/recordatorios/{id}')
  @response(200, {
    description: 'Recordatorio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recordatorio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Recordatorio, {exclude: 'where'}) filter?: FilterExcludingWhere<Recordatorio>
  ): Promise<Recordatorio> {
    return this.recordatorioRepository.findById(id, filter);
  }

  @patch('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Recordatorio,
  ): Promise<void> {
    await this.recordatorioRepository.updateById(id, recordatorio);
  }

  @put('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recordatorio: Recordatorio,
  ): Promise<void> {
    await this.recordatorioRepository.replaceById(id, recordatorio);
  }

  @del('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recordatorioRepository.deleteById(id);
  }
}
