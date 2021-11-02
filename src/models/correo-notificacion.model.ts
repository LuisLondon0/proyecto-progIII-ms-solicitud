import {Model, model, property} from '@loopback/repository';

@model()
export class CorreoNotificacion extends Model {
  @property({
    type: 'string',
    required: true,
  })
  destinatario: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;


  constructor(data?: Partial<CorreoNotificacion>) {
    super(data);
  }
}

export interface CorreoNotificacionRelations {
  // describe navigational properties here
}

export type CorreoNotificacionWithRelations = CorreoNotificacion & CorreoNotificacionRelations;
