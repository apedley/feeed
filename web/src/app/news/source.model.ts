export interface ISource {
  id: string,
  name: string,
  category?: string,
  url?: string,
  country?: string,
  description?: string,
  language?: string
}

export class Source {
  constructor(
    public id: string,
    public name: string
  ) {}
}

export interface ISourcesResponse {
  status: string,
  sources?: ISource[]
}