import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitud,
  Recordatorio,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudRecordatorioController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Recordatorio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recordatorio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Recordatorio>,
  ): Promise<Recordatorio[]> {
    return this.solicitudRepository.recordatorios(id).find(filter);
  }

  @post('/solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recordatorio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {
            title: 'NewRecordatorioInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) recordatorio: Omit<Recordatorio, 'id'>,
  ): Promise<Recordatorio> {
    return this.solicitudRepository.recordatorios(id).create(recordatorio);
  }

  @patch('/solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Solicitud.Recordatorio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Partial<Recordatorio>,
    @param.query.object('where', getWhereSchemaFor(Recordatorio)) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.solicitudRepository.recordatorios(id).patch(recordatorio, where);
  }

  @del('/solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Solicitud.Recordatorio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Recordatorio)) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.solicitudRepository.recordatorios(id).delete(where);
  }
}
