import * as React from 'react';
// import * as format from 'date-fns/format';
import { DatePicker as MIDatePicker } from 'material-ui-pickers';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils  from 'material-ui-pickers/utils/date-fns-utils';

// class LocalizedUtils extends DateFnsUtils {
//     getDatePickerHeaderText(date: Date) {
//       return format(date, 'D MMM YYYY', { locale: this.locale });
//     }
//   }

export default function DatePicker(props) {
    return (
        <MuiPickersUtilsProvider {...props} utils={DateFnsUtils } >
            <MIDatePicker {...props} />
        </MuiPickersUtilsProvider>
    );
}