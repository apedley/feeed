import { environment } from './../../../environments/environment';
import { AuthService } from './../../auth/auth.service';
import { ISourcesResponse } from './../source.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as SourcesActions from './sources.actions';
import * as firebase from 'firebase';
import * as fromSources from './sources.reducer';


@Injectable()
export class SourcesEffects {
  @Effect()
  getSources = this.actions$
    .ofType(SourcesActions.FETCH_SOURCES)
    .switchMap((action: SourcesActions.FetchSources) => {
      
      const body = {
        url: `http://beta.newsapi.org/v2/sources?language=en&`
      }
      const url = `${environment.apiBaseUrl}/news/request`;
      
      return this.httpClient.post<ISourcesResponse>(url, body, {
        headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)  
      });
    }).map((sourceResponse: ISourcesResponse) => {
      return {
        type: SourcesActions.SET_SOURCES,
        payload: sourceResponse.sources
      }
    });

  constructor(private actions$: Actions, 
    private httpClient: HttpClient, 
    private store: Store<fromSources.State>, 
    private authService: AuthService) { }
}
// @Injectable()
// export class RecipeEffects {
//   @Effect()
//   recipeFetch = this.actions$
//     .ofType(RecipeActions.FETCH_RECIPES)
//     .switchMap((action: RecipeActions.FetchRecipes) => {
//       return this.httpClient.get<Recipe[]>('https://recipeappangular.firebaseio.com/recipes.json', {
//         observe: 'body',
//         responseType: 'json'
//       })
//     })
//     .map(
//       (recipes) => {
//         console.log(recipes);
//         // tslint:disable-next-line:prefer-const
//         for (let recipe of recipes) {
//           if (!recipe['ingredients']) {
//             recipe['ingredients'] = [];
//           }
//         }
//         return {
//           type: RecipeActions.SET_RECIPES,
//           payload: recipes
//         };
//       }
//     );
  
//   @Effect({ dispatch: false })
//   recipeStore = this.actions$
//     .ofType(RecipeActions.STORE_RECIPES)
//     .withLatestFrom(this.store.select('recipes'))
//     .switchMap(([action, state]) => {
//       const req = new HttpRequest('PUT', 'https://recipeappangular.firebaseio.com/recipes.json', state.recipes, {reportProgress: true});
//       return this.httpClient.request(req);
//     });

//   constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) {}
// }