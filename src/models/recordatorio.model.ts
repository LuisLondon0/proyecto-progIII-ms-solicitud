import {belongsTo, Entity, model, property} from '@loopback/repository';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_recordatorio_evaluacion: {
        name: 'fk_recordatorio_evaluacion',
        entity: 'EvaluacionSolicitud',
        entityKey: 'id',
        foreignKey: 'evaluacionSolicitudId',
      }
    },
  },
})
export class Recordatorio extends Entity {
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
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  resumen: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @belongsTo(() => EvaluacionSolicitud)
  evaluacionSolicitudId: number;

  constructor(data?: Partial<Recordatorio>) {
    super(data);
  }
}

export interface RecordatorioRelations {
  // describe navigational properties here
}

export type RecordatorioWithRelations = Recordatorio & RecordatorioRelations;
