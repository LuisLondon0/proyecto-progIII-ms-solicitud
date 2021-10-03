import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoSolicitud,
  Solicitud,
} from '../models';
import {TipoSolicitudRepository} from '../repositories';

export class TipoSolicitudSolicitudController {
  constructor(
    @repository(TipoSolicitudRepository)
    public tipoSolicitudRepository: TipoSolicitudRepository,
  ) { }

  @get('/tipo-solicituds/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to TipoSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof TipoSolicitud.prototype.id,
  ): Promise<Solicitud> {
    return this.tipoSolicitudRepository.solicitud(id);
  }
}
