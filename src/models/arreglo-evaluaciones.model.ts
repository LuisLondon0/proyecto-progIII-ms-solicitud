import {Model, model, property} from '@loopback/repository';

@model()
export class ArregloEvaluaciones extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  evaluaciones: number[];

  constructor(data?: Partial<ArregloEvaluaciones>) {
    super(data);
  }
}

export interface ArregloEvaluacionesRelations {
  // describe navigational properties here
}

export type ArregloEvaluacionesWithRelations = ArregloEvaluaciones & ArregloEvaluacionesRelations;
