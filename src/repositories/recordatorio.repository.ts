import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Recordatorio, RecordatorioRelations, EvaluacionSolicitud} from '../models';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';

export class RecordatorioRepository extends DefaultCrudRepository<
  Recordatorio,
  typeof Recordatorio.prototype.id,
  RecordatorioRelations
> {

  public readonly evaluacionSolicitud: BelongsToAccessor<EvaluacionSolicitud, typeof Recordatorio.prototype.id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>,
  ) {
    super(Recordatorio, dataSource);
    this.evaluacionSolicitud = this.createBelongsToAccessorFor('evaluacionSolicitud', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('evaluacionSolicitud', this.evaluacionSolicitud.inclusionResolver);
  }
}
