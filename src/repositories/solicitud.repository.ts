import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {Comite, ComiteSolicitud, EvaluacionSolicitud, Modalidad, Solicitud, SolicitudRelations, TipoSolicitud} from '../models';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {ComiteRepository} from './comite.repository';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';
import {ModalidadRepository} from './modalidad.repository';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly comites: HasManyThroughRepositoryFactory<Comite, typeof Comite.prototype.id,
    ComiteSolicitud,
    typeof Solicitud.prototype.id
  >;

  public readonly tipoSolicitud: BelongsToAccessor<TipoSolicitud, typeof Solicitud.prototype.id>;

  public readonly modalidad: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly evaluacionSolicitudes: HasManyRepositoryFactory<EvaluacionSolicitud, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('ComiteRepository') protected comiteRepositoryGetter: Getter<ComiteRepository>, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
    this.evaluacionSolicitudes = this.createHasManyRepositoryFactoryFor('evaluacionSolicitudes', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('evaluacionSolicitudes', this.evaluacionSolicitudes.inclusionResolver);
    this.modalidad = this.createBelongsToAccessorFor('modalidad', modalidadRepositoryGetter,);
    this.registerInclusionResolver('modalidad', this.modalidad.inclusionResolver);
    this.tipoSolicitud = this.createBelongsToAccessorFor('tipoSolicitud', tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tipoSolicitud', this.tipoSolicitud.inclusionResolver);
    this.comites = this.createHasManyThroughRepositoryFactoryFor('comites', comiteRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('comites', this.comites.inclusionResolver);
  }
}
