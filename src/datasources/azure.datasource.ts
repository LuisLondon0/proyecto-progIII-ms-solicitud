import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Azure',
  connector: 'mssql',
  url: '',
  host: 'prog3server.database.windows.net',
  port: 0,
  user: 'adminProyecto',
  password: 'HNCkda11',
  database: 'Proyecto Prog III 2021-2'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AzureDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Azure';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Azure', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
