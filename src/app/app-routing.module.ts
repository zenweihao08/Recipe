import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipeDetailDefaultComponent } from './recipe/recipe-detail-default/recipe-detail-default.component';


const routes: Routes = [
  {path:'',redirectTo:'/recipe',pathMatch:'full'},
  {path:'shopping-list',component:ShoppingListComponent},
  {path:'recipe',component:RecipeComponent,canActivate:[AuthGuard],children:[
    {path:'', component:RecipeDetailDefaultComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
    {path:':id/edit', component:RecipeEditComponent,resolve:[RecipeResolverService]}
  ]},
  {path:'auth', component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
