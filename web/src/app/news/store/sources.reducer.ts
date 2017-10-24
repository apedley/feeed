import { Source } from '../source.model';

import * as SourcesActions from './sources.actions';

export interface State {
  sources: Source[];
  filterString: string;
}

const initialState = {
  sources: [],
  filterString: ''
}

export function sourcesReducer(state = initialState, action: SourcesActions.SourcesActions) {
  switch (action.type) {
    case (SourcesActions.SET_SOURCES): 
      
      return {
        ...state,
        sources: [ ...action.payload ]
      }
    case (SourcesActions.FILTER_SOURCES):
      return {
        ...state,
        filterString: action.payload
      }
    default:
      return state;
  }
}
