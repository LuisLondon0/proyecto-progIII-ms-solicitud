import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {EvaluacionSolicitud, EvaluacionSolicitudRelations, Solicitud, ResultadoEvaluacion} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {ResultadoEvaluacionRepository} from './resultado-evaluacion.repository';

export class EvaluacionSolicitudRepository extends DefaultCrudRepository<
  EvaluacionSolicitud,
  typeof EvaluacionSolicitud.prototype.id,
  EvaluacionSolicitudRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof EvaluacionSolicitud.prototype.id>;

  public readonly resultadoEvaluaciones: HasManyRepositoryFactory<ResultadoEvaluacion, typeof EvaluacionSolicitud.prototype.id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('ResultadoEvaluacionRepository') protected resultadoEvaluacionRepositoryGetter: Getter<ResultadoEvaluacionRepository>,
  ) {
    super(EvaluacionSolicitud, dataSource);
    this.resultadoEvaluaciones = this.createHasManyRepositoryFactoryFor('resultadoEvaluaciones', resultadoEvaluacionRepositoryGetter,);
    this.registerInclusionResolver('resultadoEvaluaciones', this.resultadoEvaluaciones.inclusionResolver);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
