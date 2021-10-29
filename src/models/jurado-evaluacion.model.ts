import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_evaluacion_jurado_evaluacion: {
        name: 'fk_evaluacion_jurado_evaluacion',
        entity: 'EvaluacionSolicitud',
        entityKey: 'id',
        foreignKey: 'evaluacionId',
      }
    },
  },
})
export class JuradoEvaluacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  juradoId: number;

  @property({
    type: 'number',
    required: true,
  })
  evaluacionId: number;


  constructor(data?: Partial<JuradoEvaluacion>) {
    super(data);
  }
}

export interface JuradoEvaluacionRelations {
  // describe navigational properties here
}

export type JuradoEvaluacionWithRelations = JuradoEvaluacion & JuradoEvaluacionRelations;
