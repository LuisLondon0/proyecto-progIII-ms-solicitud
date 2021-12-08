import {Model, model, property} from '@loopback/repository';

@model()
export class ArregloComites extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  comites: number[];

  constructor(data?: Partial<ArregloComites>) {
    super(data);
  }
}

export interface ArregloComitesRelations {
  // describe navigational properties here
}

export type ArregloSolicitudesWithRelations = ArregloComites & ArregloComitesRelations;
