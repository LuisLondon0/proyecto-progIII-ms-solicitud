import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {ComiteSolicitud, ComiteSolicitudRelations} from '../models';

export class ComiteSolicitudRepository extends DefaultCrudRepository<
  ComiteSolicitud,
  typeof ComiteSolicitud.prototype.id,
  ComiteSolicitudRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(ComiteSolicitud, dataSource);
  }
}
