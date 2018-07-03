import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
// import { Exchange as IExchange } from 'businessLogic/model';

export interface ExchangeDataProps {

}

export default class Exchange extends React.Component<ExchangeDataProps, any> {

    constructor(props: ExchangeDataProps) {
        super(props);
    }

    render() {
        return (
            <div className={styles.exchangeData}>

            </div>
        );
    }
}