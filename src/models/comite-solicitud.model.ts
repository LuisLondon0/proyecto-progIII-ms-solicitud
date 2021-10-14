import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_comite: {
        name: 'fk_solicitud_comite',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'solicitudId',
      },
      fk_comite: {
        name: 'fk_comite',
        entity: 'Comite',
        entityKey: 'id',
        foreignKey: 'comiteId'
      }
    },
  },
})
export class ComiteSolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  respuesta?: string;

  @property({
    type: 'number',
  })
  comiteId?: number;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  constructor(data?: Partial<ComiteSolicitud>) {
    super(data);
  }
}

export interface ComiteSolicitudRelations {
  // describe navigational properties here
}

export type ComiteSolicitudWithRelations = ComiteSolicitud & ComiteSolicitudRelations;
