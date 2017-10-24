import { Source } from './../source.model';
import { IArticle } from './../article.model';
import { Action } from '@ngrx/store';

export const FETCH_TOP_ARTICLES = 'FETCH_TOP_ARTICLES';
export const FETCH_ARTICLES_FOR_SOURCE = 'FETCH_ARTICLES_FOR_SOURCE';
export const SAVE_ARTICLES = 'SAVE_ARTICLES';


export class FetchTopArticles implements Action {
  readonly type = FETCH_TOP_ARTICLES;

}

export class FetchArticlesForSource implements Action {
  readonly type = FETCH_ARTICLES_FOR_SOURCE;

  constructor(public payload: Source) { }
}


export class SaveArticles implements Action {
  readonly type = SAVE_ARTICLES;

  constructor(public payload: IArticle[]) { }
}


export type ArticlesActions
  = FetchTopArticles
  | FetchArticlesForSource
  | SaveArticles;