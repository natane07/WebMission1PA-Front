import moment from 'moment';

export class DateValueConverter {

  toView(value, format) {
    return moment(value).format(format.toUpperCase());
  }

}
