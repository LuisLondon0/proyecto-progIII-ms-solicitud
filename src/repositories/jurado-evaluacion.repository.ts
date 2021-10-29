import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {JuradoEvaluacion, JuradoEvaluacionRelations} from '../models';

export class JuradoEvaluacionRepository extends DefaultCrudRepository<
  JuradoEvaluacion,
  typeof JuradoEvaluacion.prototype.id,
  JuradoEvaluacionRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(JuradoEvaluacion, dataSource);
  }
}
