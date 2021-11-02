import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Comite, ComiteSolicitud, Solicitud
} from '../models';
import {ArregloSolicitudes} from '../models/arreglo-solicitudes.model';
import {ComiteRepository, ComiteSolicitudRepository} from '../repositories';

//@authenticate("admin")
export class ComiteSolicitudController {
  constructor(
    @repository(ComiteRepository) protected comiteRepository: ComiteRepository,
    @repository(ComiteSolicitudRepository) protected comiteSolicitudRepository: ComiteSolicitudRepository,
  ) { }

  @get('/comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Comite has many Solicitud through ComiteSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.comiteRepository.solicitudes(id).find(filter);
  }

  @post('/comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'create a Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comite.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInComite',
            exclude: ['id'],
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.comiteRepository.solicitudes(id).create(solicitud);
  }

  @patch('/comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Comite.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.comiteRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Comite.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.comiteRepository.solicitudes(id).delete(where);
  }

  @post('/relacionar-solicitudes-a-comite/{id}', {
    responses: {
      '200': {
        description: 'create a AreaInvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(ComiteSolicitud)}},
      },
    },
  })
  async createRelations(

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArregloSolicitudes, {}),
        },
      },
    }) datos: ArregloSolicitudes,
    @param.path.number('id') comiteId: number
  ): Promise<Boolean> {
    if (datos.solicitudes.length > 0) {
      datos.solicitudes.forEach(async (solicitudId: number) => {
        let existe = await this.comiteSolicitudRepository.findOne({
          where: {
            comiteId: comiteId,
            solicitudId: solicitudId
          }
        })
        if (!existe) {
          this.comiteSolicitudRepository.create({
            comiteId: comiteId,
            solicitudId: solicitudId
          })
        }
      })
      return true

    }
    return false

  }
  //////////////
  @post('/evaluacion-jurado', {
    responses: {
      '200': {
        description: 'create a AreaInvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(ComiteSolicitud)}},
      },
    },
  })
  async createRelation(

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ComiteSolicitud, {
            title: 'NewAreaInvestigacionInJurado',
            exclude: ['id'],
          }),
        },
      },
    }) datos: Omit<ComiteSolicitud, 'id'>,
  ): Promise<ComiteSolicitud | null> {
    let registro = await this.comiteSolicitudRepository.create(datos)
    return registro
  }
}
