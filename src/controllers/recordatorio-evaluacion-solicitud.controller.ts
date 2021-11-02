import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  EvaluacionSolicitud, Recordatorio
} from '../models';
import {RecordatorioRepository} from '../repositories';

//@authenticate("admin")
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
