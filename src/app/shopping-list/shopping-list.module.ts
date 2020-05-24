import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module'
import { ShoppingListComponent } from './shopping-list.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ShoppingListRoutingModule
    ],
    exports: [
        ShoppingEditComponent
    ],
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent
    ],
    providers: [],
})
export class ShoppingListModule { }
