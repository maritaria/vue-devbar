import {getDevbarOptions} from './util';

export function DebugNoSnipe(something) {
  console.assert(something.__decorators__, 'Use decorator after @Component');
  something.__decorators__.push(options => {
    const devbar = getDevbarOptions(options);
    devbar.nosnipe = true;
  });
  return something;
}
