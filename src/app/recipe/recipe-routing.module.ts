import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeComponent } from './recipe.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeDetailDefaultComponent } from './recipe-detail-default/recipe-detail-default.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';

export const routes: Routes = [
    {path:'',component:RecipeComponent,canActivate:[AuthGuard],children:[
    {path:'', component:RecipeDetailDefaultComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
    {path:':id/edit', component:RecipeEditComponent,resolve:[RecipeResolverService]}
  ]},]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class RecipeRoutingModule { }

