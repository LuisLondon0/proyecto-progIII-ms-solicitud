import {Model, model, property} from '@loopback/repository';

@model()
export class ArregloSolicitudes extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  solicitudes: number[];

  constructor(data?: Partial<ArregloSolicitudes>) {
    super(data);
  }
}

export interface ArregloSolicitudesRelations {
  // describe navigational properties here
}

export type ArregloSolicitudesWithRelations = ArregloSolicitudes & ArregloSolicitudesRelations;
