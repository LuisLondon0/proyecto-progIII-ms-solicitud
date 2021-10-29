import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {JuradoEvaluacion} from '../models';
import {JuradoEvaluacionRepository} from '../repositories';

export class JuradoEvaluacionController {
  constructor(
    @repository(JuradoEvaluacionRepository)
    public juradoEvaluacionRepository : JuradoEvaluacionRepository,
  ) {}

  @post('/jurado-evaluaciones')
  @response(200, {
    description: 'JuradoEvaluacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(JuradoEvaluacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoEvaluacion, {
            title: 'NewJuradoEvaluacion',
            exclude: ['id'],
          }),
        },
      },
    })
    juradoEvaluacion: Omit<JuradoEvaluacion, 'id'>,
  ): Promise<JuradoEvaluacion> {
    return this.juradoEvaluacionRepository.create(juradoEvaluacion);
  }

  @get('/jurado-evaluaciones/count')
  @response(200, {
    description: 'JuradoEvaluacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(JuradoEvaluacion) where?: Where<JuradoEvaluacion>,
  ): Promise<Count> {
    return this.juradoEvaluacionRepository.count(where);
  }

  @get('/jurado-evaluaciones')
  @response(200, {
    description: 'Array of JuradoEvaluacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(JuradoEvaluacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(JuradoEvaluacion) filter?: Filter<JuradoEvaluacion>,
  ): Promise<JuradoEvaluacion[]> {
    return this.juradoEvaluacionRepository.find(filter);
  }

  @patch('/jurado-evaluaciones')
  @response(200, {
    description: 'JuradoEvaluacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoEvaluacion, {partial: true}),
        },
      },
    })
    juradoEvaluacion: JuradoEvaluacion,
    @param.where(JuradoEvaluacion) where?: Where<JuradoEvaluacion>,
  ): Promise<Count> {
    return this.juradoEvaluacionRepository.updateAll(juradoEvaluacion, where);
  }

  @get('/jurado-evaluaciones/{id}')
  @response(200, {
    description: 'JuradoEvaluacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(JuradoEvaluacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(JuradoEvaluacion, {exclude: 'where'}) filter?: FilterExcludingWhere<JuradoEvaluacion>
  ): Promise<JuradoEvaluacion> {
    return this.juradoEvaluacionRepository.findById(id, filter);
  }

  @patch('/jurado-evaluaciones/{id}')
  @response(204, {
    description: 'JuradoEvaluacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoEvaluacion, {partial: true}),
        },
      },
    })
    juradoEvaluacion: JuradoEvaluacion,
  ): Promise<void> {
    await this.juradoEvaluacionRepository.updateById(id, juradoEvaluacion);
  }

  @put('/jurado-evaluaciones/{id}')
  @response(204, {
    description: 'JuradoEvaluacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() juradoEvaluacion: JuradoEvaluacion,
  ): Promise<void> {
    await this.juradoEvaluacionRepository.replaceById(id, juradoEvaluacion);
  }

  @del('/jurado-evaluaciones/{id}')
  @response(204, {
    description: 'JuradoEvaluacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoEvaluacionRepository.deleteById(id);
  }
}
