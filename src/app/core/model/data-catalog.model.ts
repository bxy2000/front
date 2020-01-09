import { IDataCatalog } from '@core/model/data-catalog.model';
import { IDatabaseConnection } from '@core/model/database-connection.model';

export interface IDataCatalog {
  id?: number;
  title?: string;
  type?: string;
  icon?: string;
  tableName?: string;
  tableType?: string;
  remarks?: string;
  relationGraph?: string;
  children?: IDataCatalog[];
  dbConnection?: IDatabaseConnection;
  parent?: IDataCatalog;
}

export class DataCatalog implements IDataCatalog {
  constructor(
    public id?: number,
    public title?: string,
    public type?: string,
    public icon?: string,
    public tableName?: string,
    public tableType?: string,
    public remarks?: string,
    public relationGraph?: string,
    public children?: IDataCatalog[],
    public dbConnection?: IDatabaseConnection,
    public parent?: IDataCatalog
  ) {}
}
