import { Source } from './../source.model';
import * as ArticlesActions from './articles.actions';
import { IArticle } from '../article.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';


const articlesAdapter = createEntityAdapter<IArticle>();

export interface ArticlesState {
  articles: IArticle[]
  selectedSource: Source | null;
};

const initialState: ArticlesState = {
  articles: [],
  selectedSource: null
}

export function articlesReducer(state: ArticlesState = initialState, action: ArticlesActions.ArticlesActions): ArticlesState {
  switch (action.type) {
    case (ArticlesActions.FETCH_ARTICLES_FOR_SOURCE):
      return {
        ...state,
        selectedSource: action.payload
      }
    case (ArticlesActions.SAVE_ARTICLES):
      return {
        ...state,
        selectedSource: null,
        articles: [ ...action.payload ]
      };
    default:
      return state;
  }
}


// import { Source } from './../source.model';
// import * as ArticlesActions from './articles.actions';
// import { IArticle } from '../article.model';
// import { createEntityAdapter, EntityState } from '@ngrx/entity';


// const articlesAdapter = createEntityAdapter<IArticle>();

// export interface ArticlesState extends EntityState<IArticle> {
//   selectedSource: Source | null;
// };

// const initialState: ArticlesState = articlesAdapter.getInitialState({
//   selectedSource: null
// });

// export function articlesReducer(state: ArticlesState = initialState, action: ArticlesActions.ArticlesActions): ArticlesState {
//   switch (action.type) {
//     case (ArticlesActions.FETCH_ARTICLES_FOR_SOURCE):
//       return {
//         ...state,
//         selectedSource: action.payload
//       }
//     case (ArticlesActions.SAVE_ARTICLES):
//       return {
//         ...articlesAdapter.addMany(action.payload, state),
//         selectedSource: null,
//       };
//     default:
//       return state;
//   }
// }

