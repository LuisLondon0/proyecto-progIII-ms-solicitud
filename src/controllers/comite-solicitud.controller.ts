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
import {ArregloComites} from '../models/arreglo-comites.model';
import {ComiteRepository, ComiteSolicitudRepository, SolicitudRepository} from '../repositories';

//@authenticate("admin")
export class ComiteSolicitudController {
  constructor(
    @repository(ComiteRepository) protected comiteRepository: ComiteRepository,
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
    @repository(ComiteSolicitudRepository) protected comiteSolicitudRepository: ComiteSolicitudRepository,
  ) { }

  @get('/solicitud/{id}/comites', {
    responses: {
      '200': {
        description: 'Array of Comite has many Solicitud through ComiteSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comite)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comite>,
  ): Promise<Comite[]> {
    return this.solicitudRepository.comites(id).find(filter);
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

  @post('/relacionar-comites-a-solicitud/{id}', {
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
          schema: getModelSchemaRef(ArregloComites, {}),
        },
      },
    }) datos: ArregloComites,
    @param.path.number('id') solicitudId: number
  ): Promise<Boolean> {
    if (datos.comites.length > 0) {
      datos.comites.forEach(async (comiteId: number) => {
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
  @post('/comite-solicitud', {
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
