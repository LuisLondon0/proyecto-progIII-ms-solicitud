import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  EvaluacionSolicitud, ResultadoEvaluacion
} from '../models';
import {ResultadoEvaluacionRepository} from '../repositories';

//@authenticate("admin", "jury")
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
