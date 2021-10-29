import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_proponente_solicitud: {
        name: 'fk_solicitud_proponente_solicitud',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'solicitudId',
      }
    },
  },
})
export class SolicitudProponente extends Entity {
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
  proponenteId: number;

  @property({
    type: 'number',
    required: true,
  })
  solicitudId: number;

  constructor(data?: Partial<SolicitudProponente>) {
    super(data);
  }
}

export interface SolicitudProponenteRelations {
  // describe navigational properties here
}

export type SolicitudProponenteWithRelations = SolicitudProponente & SolicitudProponenteRelations;
