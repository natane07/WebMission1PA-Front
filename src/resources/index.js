export function configure(config) {
  config.globalResources([
    './elements/svg/check.html',
    './elements/svg/cross.html',
    './elements/svg/arrow-left.html',
    './elements/svg/arrow-right.html',
    './value-converters/take',
    './value-converters/date',
    './elements/arrow-list/arrow-list'
  ]);
}
