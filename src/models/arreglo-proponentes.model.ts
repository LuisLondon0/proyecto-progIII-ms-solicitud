import {Model, model, property} from '@loopback/repository';

@model()
export class ArregloProponentes extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  proponentes: number[];

  constructor(data?: Partial<ArregloProponentes>) {
    super(data);
  }
}

export interface ArregloProponentesRelations {
  // describe navigational properties here
}

export type ArregloProponentesWithRelations = ArregloProponentes & ArregloProponentesRelations;
