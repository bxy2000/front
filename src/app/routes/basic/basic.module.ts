import { NgModule } from '@angular/core';
import { BasicRoutingModule } from './basic-routing.module';
import { DatabaseConnectionComponent } from './database-connection/database-connection.component';
import {SharedModule} from "@shared";


@NgModule({
  declarations: [DatabaseConnectionComponent],
  imports: [
    SharedModule,
    BasicRoutingModule
  ]
})
export class BasicModule { }
