import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ResultadoEvaluacion,
  EvaluacionSolicitud,
} from '../models';
import {ResultadoEvaluacionRepository} from '../repositories';

export class ResultadoEvaluacionEvaluacionSolicitudController {
  constructor(
    @repository(ResultadoEvaluacionRepository)
    public resultadoEvaluacionRepository: ResultadoEvaluacionRepository,
  ) { }

  @get('/resultado-evaluacions/{id}/evaluacion-solicitud', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud belonging to ResultadoEvaluacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EvaluacionSolicitud)},
          },
        },
      },
    },
  })
  async getEvaluacionSolicitud(
    @param.path.number('id') id: typeof ResultadoEvaluacion.prototype.id,
  ): Promise<EvaluacionSolicitud> {
    return this.resultadoEvaluacionRepository.evaluacionSolicitud(id);
  }
}
