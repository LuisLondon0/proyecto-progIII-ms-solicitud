import {Model, model, property} from '@loopback/repository';

@model()
export class AceptarRechazarSolicitud extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  respuesta: number;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;


  constructor(data?: Partial<AceptarRechazarSolicitud>) {
    super(data);
  }
}

export interface AceptarRechazarSolicitudRelations {
  // describe navigational properties here
}

export type ACeptarRechazarSolicitudWithRelations = AceptarRechazarSolicitud & AceptarRechazarSolicitudRelations;
