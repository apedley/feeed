import { ISource } from '../source.model';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sourceFilterPipe'
})
@Injectable()
export class SourceFilterPipe implements PipeTransform {
  transform(sources: ISource[], searchString: string, category: string): ISource[] {
    let filteredSources = sources;
    if (searchString) {
      filteredSources = sources.filter(source => {
        return source.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
               source.description.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
        })
    }

    if (category) {
      filteredSources = filteredSources.filter(source => {
        return source.category === category;
      })
    }
    return filteredSources;
  }
}