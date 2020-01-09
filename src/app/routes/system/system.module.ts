import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';


@NgModule({
  imports: [
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [MenuComponent, RoleComponent, UserComponent]
})
export class SystemModule { }
