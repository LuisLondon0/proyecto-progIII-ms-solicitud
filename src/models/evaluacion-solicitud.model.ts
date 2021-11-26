import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Recordatorio} from './recordatorio.model';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_evaluacion: {
        name: 'fk_solicitud_evaluacion',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'solicitudId',
      }
    },
  },
})
export class EvaluacionSolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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

  @property({
    type: 'number',
  })
  juradoId: number

  @belongsTo(() => Solicitud)
  solicitudId: number;

  @hasMany(() => ResultadoEvaluacion)
  resultadoEvaluaciones: ResultadoEvaluacion[];

  @hasMany(() => Recordatorio)
  recordatorios: Recordatorio[];

  constructor(data?: Partial<EvaluacionSolicitud>) {
    super(data);
  }
}

export interface EvaluacionSolicitudRelations {
  // describe navigational properties here
}

export type EvaluacionSolicitudWithRelations = EvaluacionSolicitud & EvaluacionSolicitudRelations;
