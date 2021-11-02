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
  EvaluacionSolicitud,
  Recordatorio,
} from '../models';
import {EvaluacionSolicitudRepository} from '../repositories';

export class EvaluacionSolicitudRecordatorioController {
  constructor(
    @repository(EvaluacionSolicitudRepository) protected evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
  ) { }

  @get('/evaluacion-solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Array of EvaluacionSolicitud has many Recordatorio',
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
    return this.evaluacionSolicitudRepository.recordatorios(id).find(filter);
  }

  @post('/evaluacion-solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recordatorio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EvaluacionSolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {
            title: 'NewRecordatorioInEvaluacionSolicitud',
            exclude: ['id'],
            optional: ['evaluacionSolicitudId']
          }),
        },
      },
    }) recordatorio: Omit<Recordatorio, 'id'>,
  ): Promise<Recordatorio> {
    return this.evaluacionSolicitudRepository.recordatorios(id).create(recordatorio);
  }

  @patch('/evaluacion-solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud.Recordatorio PATCH success count',
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
    return this.evaluacionSolicitudRepository.recordatorios(id).patch(recordatorio, where);
  }

  @del('/evaluacion-solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud.Recordatorio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Recordatorio)) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.recordatorios(id).delete(where);
  }
}
