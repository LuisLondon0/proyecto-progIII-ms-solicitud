import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {ComiteSolicitud} from './comite-solicitud.model';
import {Comite} from './comite.model';
import {TipoSolicitud} from './tipo-solicitud.model';
import {Modalidad} from './modalidad.model';
import {Recordatorio} from './recordatorio.model';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';

@model()
export class Solicitud extends Entity {
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

  @hasMany(() => Comite, {through: {model: () => ComiteSolicitud}})
  comites: Comite[];

  @belongsTo(() => TipoSolicitud)
  tipoSolicitudId: number;

  @belongsTo(() => Modalidad)
  modalidadId: number;

  @hasMany(() => Recordatorio)
  recordatorios: Recordatorio[];

  @hasMany(() => EvaluacionSolicitud)
  evaluacionSolicitudes: EvaluacionSolicitud[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
