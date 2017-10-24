import { Source } from './../source.model';
import { Action } from '@ngrx/store';

export const FETCH_SOURCES = 'FETCH_SOURCES';
export const SET_SOURCES = 'SET_SOURCES';
export const FILTER_SOURCES = 'FILTER_SOURCES';

export class FetchSources implements Action {
  readonly type = FETCH_SOURCES;
}

export class SetSources implements Action {
  readonly type = SET_SOURCES;

  constructor(public payload: Source[]) { }
}

export class FilterSources implements Action {
  readonly type = FILTER_SOURCES;

  constructor(public payload: string) { }
}

export type SourcesActions = FetchSources | SetSources | FilterSources;
