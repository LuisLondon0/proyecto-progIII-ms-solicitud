import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';

@model()
export class EvaluacionSolicitud extends Entity {
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
    type: 'date',
    required: true,
  })
  fechaInvitacion: string;

  @property({
    type: 'date',
  })
  fechaRespuesta?: string;

  @property({
    type: 'string',
  })
  respuesta?: string;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @belongsTo(() => Solicitud)
  solicitudId: number;

  @hasMany(() => ResultadoEvaluacion)
  resultadoEvaluaciones: ResultadoEvaluacion[];

  constructor(data?: Partial<EvaluacionSolicitud>) {
    super(data);
  }
}

export interface EvaluacionSolicitudRelations {
  // describe navigational properties here
}

export type EvaluacionSolicitudWithRelations = EvaluacionSolicitud & EvaluacionSolicitudRelations;
