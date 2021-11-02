import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Recordatorio,
  EvaluacionSolicitud,
} from '../models';
import {RecordatorioRepository} from '../repositories';

export class RecordatorioEvaluacionSolicitudController {
  constructor(
    @repository(RecordatorioRepository)
    public recordatorioRepository: RecordatorioRepository,
  ) { }

  @get('/recordatorios/{id}/evaluacion-solicitud', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud belonging to Recordatorio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EvaluacionSolicitud)},
          },
        },
      },
    },
  })
  async getEvaluacionSolicitud(
    @param.path.number('id') id: typeof Recordatorio.prototype.id,
  ): Promise<EvaluacionSolicitud> {
    return this.recordatorioRepository.evaluacionSolicitud(id);
  }
}
