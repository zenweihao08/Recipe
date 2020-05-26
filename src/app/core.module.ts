import { NgModule } from '@angular/core';
import { ShoppingListService } from './shared/shopping-list.service';
import { RecipeService } from './shared/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [ShoppingListService,
                RecipeService,
                {provide:HTTP_INTERCEPTORS,
                useClass:AuthInterceptorService,
                multi:true}]
})
export class CoreModule { }
