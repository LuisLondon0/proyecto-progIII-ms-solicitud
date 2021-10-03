import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {TipoSolicitud, TipoSolicitudRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class TipoSolicitudRepository extends DefaultCrudRepository<
  TipoSolicitud,
  typeof TipoSolicitud.prototype.id,
  TipoSolicitudRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof TipoSolicitud.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof TipoSolicitud.prototype.id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(TipoSolicitud, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
