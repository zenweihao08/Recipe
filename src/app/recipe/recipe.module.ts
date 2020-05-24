import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecipeComponent } from './recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailDefaultComponent } from './recipe-detail-default/recipe-detail-default.component';
import { RecipeRoutingModule } from './recipe-routing.module';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        RecipeRoutingModule
    ],
    declarations: [
        RecipeComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent,
        RecipeDetailDefaultComponent
    ],
    providers: [],
})
export class RecipeModule { }
