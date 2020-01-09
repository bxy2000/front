import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatabaseConnection} from "@core/model/database-connection.model";
import {DatabaseConnectionComponent} from "./database-connection/database-connection.component";

const routes: Routes = [
  {path: 'database-connection', component: DatabaseConnectionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
