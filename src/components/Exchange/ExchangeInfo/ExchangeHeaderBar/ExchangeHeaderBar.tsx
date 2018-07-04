import * as React from 'react';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
import IconButton from 'components/common/core/IconButton';
import { ExchangeStatus } from 'businessLogic/model';

export interface ExchangeHeaderBarProps {
    status: ExchangeStatus;
    signedInUser?: string;
    name: string;
}

export default class ExchangeActions extends React.Component<ExchangeHeaderBarProps, any> {

    constructor(props: ExchangeHeaderBarProps) {
        super(props);
    }


    render() {

        const isExchangedStopped = this.props.status === ExchangeStatus.STOPPED;
        const isUserLoggedIn = this.props.status === ExchangeStatus.LOGGED_IN;
        const isUserLoggingIn = this.props.status === ExchangeStatus.LOGGING_IN;
        const isRunningButLoggedOut = this.props.status === ExchangeStatus.RUNNING;

        return (
            <div className={styles.exchangeActions}>

                <h4 className={styles.headerText}>{this.props.name}</h4>

                {isExchangedStopped ?
                    <IconButton disabled aria-label='Play' iconName='play_circle_filled_white' onClick={(e) => alert('Hey')} />
                    :
                    <IconButton aria-label='Stop' iconName='pause_circle_outline'  onClick={(e) => alert('Hey')} />
                }

                {isExchangedStopped || isRunningButLoggedOut ?
                    <IconButton disabled={isExchangedStopped} aria-label='log-in' iconName='vpn_key' />
                    :
                    <IconButton disabled={isUserLoggingIn} aria-label='log-out' iconName='exit_to_app' />
                }


            </div>
        );
    }

}