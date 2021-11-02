import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {EvaluacionSolicitud, EvaluacionSolicitudRelations, Solicitud, ResultadoEvaluacion, Recordatorio} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {ResultadoEvaluacionRepository} from './resultado-evaluacion.repository';
import {RecordatorioRepository} from './recordatorio.repository';

export class EvaluacionSolicitudRepository extends DefaultCrudRepository<
  EvaluacionSolicitud,
  typeof EvaluacionSolicitud.prototype.id,
  EvaluacionSolicitudRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof EvaluacionSolicitud.prototype.id>;

  public readonly resultadoEvaluaciones: HasManyRepositoryFactory<ResultadoEvaluacion, typeof EvaluacionSolicitud.prototype.id>;

  public readonly recordatorios: HasManyRepositoryFactory<Recordatorio, typeof EvaluacionSolicitud.prototype.id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('ResultadoEvaluacionRepository') protected resultadoEvaluacionRepositoryGetter: Getter<ResultadoEvaluacionRepository>, @repository.getter('RecordatorioRepository') protected recordatorioRepositoryGetter: Getter<RecordatorioRepository>,
  ) {
    super(EvaluacionSolicitud, dataSource);
    this.recordatorios = this.createHasManyRepositoryFactoryFor('recordatorios', recordatorioRepositoryGetter,);
    this.registerInclusionResolver('recordatorios', this.recordatorios.inclusionResolver);
    this.resultadoEvaluaciones = this.createHasManyRepositoryFactoryFor('resultadoEvaluaciones', resultadoEvaluacionRepositoryGetter,);
    this.registerInclusionResolver('resultadoEvaluaciones', this.resultadoEvaluaciones.inclusionResolver);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
