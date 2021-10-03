import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {ComiteSolicitud} from './comite-solicitud.model';

@model()
export class Comite extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Solicitud, {through: {model: () => ComiteSolicitud}})
  solicitudes: Solicitud[];

  constructor(data?: Partial<Comite>) {
    super(data);
  }
}

export interface ComiteRelations {
  // describe navigational properties here
}

export type ComiteWithRelations = Comite & ComiteRelations;
