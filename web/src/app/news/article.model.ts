import { ISource } from './source.model';



export interface IArticle {
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  source?: ISource
}

export class Article implements IArticle {
  constructor(
    public author: string,
    public title: string,
    public description: string,
    public url: string,
    public urlToImage: string,
    public publishedAt: string
  ) {}
}

export interface IArticleResponse {
  status: string,
  articles?: Article[]
}