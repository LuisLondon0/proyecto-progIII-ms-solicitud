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
  Solicitud,
} from '../models';
import {RecordatorioRepository} from '../repositories';

export class RecordatorioSolicitudController {
  constructor(
    @repository(RecordatorioRepository)
    public recordatorioRepository: RecordatorioRepository,
  ) { }

  @get('/recordatorios/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Recordatorio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof Recordatorio.prototype.id,
  ): Promise<Solicitud> {
    return this.recordatorioRepository.solicitud(id);
  }
}
