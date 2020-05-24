import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list.component';

export const routes: Routes = [  {path:'shopping-list',component:ShoppingListComponent} ]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class ShoppingListRoutingModule { }

