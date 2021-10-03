import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Comite, ComiteRelations, Solicitud, ComiteSolicitud} from '../models';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ComiteRepository extends DefaultCrudRepository<
  Comite,
  typeof Comite.prototype.id,
  ComiteRelations
> {

  public readonly solicitudes: HasManyThroughRepositoryFactory<Solicitud, typeof Solicitud.prototype.id,
          ComiteSolicitud,
          typeof Comite.prototype.id
        >;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Comite, dataSource);
    this.solicitudes = this.createHasManyThroughRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
