import {belongsTo, Entity, model, property} from '@loopback/repository';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_evaluacion_solicitud: {
        name: 'fk_evaluacion_solicitud',
        entity: 'EvaluacionSolicitud',
        entityKey: 'id',
        foreignKey: 'evaluacionSolicitudId',
      }
    },
  },
})
export class ResultadoEvaluacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  resultado?: string;

  @property({
    type: 'string',
    required: true,
  })
  formatoDiligenciado: string;

  @belongsTo(() => EvaluacionSolicitud)
  evaluacionSolicitudId: number;

  constructor(data?: Partial<ResultadoEvaluacion>) {
    super(data);
  }
}

export interface ResultadoEvaluacionRelations {
  // describe navigational properties here
}

export type ResultadoEvaluacionWithRelations = ResultadoEvaluacion & ResultadoEvaluacionRelations;
