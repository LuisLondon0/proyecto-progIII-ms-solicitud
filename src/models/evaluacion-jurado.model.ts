import {Model, model, property} from '@loopback/repository';

@model()
export class EvaluacionJurado extends Model {
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
    type: 'number',
    required: true,
  })
  solicitudId: number;


  constructor(data?: Partial<EvaluacionJurado>) {
    super(data);
  }
}

export interface EvaluacionJuradoRelations {
  // describe navigational properties here
}

export type EvaluacionJuradoWithRelations = EvaluacionJurado & EvaluacionJuradoRelations;
