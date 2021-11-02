import {Model, model, property} from '@loopback/repository';

@model()
export class ProponenteSolicitud extends Model {
  @property({
    type: 'number',
    required: true,
  })
  proponenteId: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreTrabajo: string;

  @property({
    type: 'number',
    required: true,
  })
  areaInvestigacionId: number;

  @property({
    type: 'any',
  })
  archivoZip?: any;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  tipoSolicitudId: number;

  @property({
    type: 'number',
    required: true,
  })
  modalidad: number;


  constructor(data?: Partial<ProponenteSolicitud>) {
    super(data);
  }
}

export interface ProponenteSolicitudRelations {
  // describe navigational properties here
}

export type ProponenteSolicitudWithRelations = ProponenteSolicitud & ProponenteSolicitudRelations;
