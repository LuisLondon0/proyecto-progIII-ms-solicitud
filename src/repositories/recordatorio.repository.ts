import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Recordatorio, RecordatorioRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class RecordatorioRepository extends DefaultCrudRepository<
  Recordatorio,
  typeof Recordatorio.prototype.id,
  RecordatorioRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Recordatorio.prototype.id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Recordatorio, dataSource);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
