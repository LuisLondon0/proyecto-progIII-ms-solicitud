import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EvaluacionSolicitud,
  Solicitud,
} from '../models';
import {EvaluacionSolicitudRepository} from '../repositories';

export class EvaluacionSolicitudSolicitudController {
  constructor(
    @repository(EvaluacionSolicitudRepository)
    public evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
  ) { }

  @get('/evaluacion-solicituds/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to EvaluacionSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof EvaluacionSolicitud.prototype.id,
  ): Promise<Solicitud> {
    return this.evaluacionSolicitudRepository.solicitud(id);
  }
}
