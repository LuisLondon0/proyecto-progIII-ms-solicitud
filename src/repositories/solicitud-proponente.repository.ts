import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AzureDataSource} from '../datasources';
import {SolicitudProponente, SolicitudProponenteRelations} from '../models';

export class SolicitudProponenteRepository extends DefaultCrudRepository<
  SolicitudProponente,
  typeof SolicitudProponente.prototype.id,
  SolicitudProponenteRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(SolicitudProponente, dataSource);
  }
}
