import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import IconButton from 'components/common/core/IconButton';
import { ExchangeStatus } from 'businessLogic/model';

export interface ExchangeHeaderBarProps {
    status: ExchangeStatus;
    signedInUser?: string;
    name: string;
    signInToExchange();
    logOutFromExchange();
}

export default class ExchangeHeaderBar extends React.Component<ExchangeHeaderBarProps, any> {

    constructor(props: ExchangeHeaderBarProps) {
        super(props);
    }

    shouldComponentUpdate(nextProps: ExchangeHeaderBarProps) {
        return !_.isEqual(this.props, nextProps);
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
                    <IconButton disabled tooltip='Start' aria-label='Play' iconName='play_circle_filled_white' onClick={(e) => alert('Hey')} />
                    :
                    <IconButton tooltip='Stop' aria-label='Stop' iconName='pause_circle_outline' onClick={(e) => alert('Hey')} />
                }

                {isExchangedStopped || isRunningButLoggedOut ?
                    <IconButton tooltip='Log In' onClick={(e) => this.props.signInToExchange()} disabled={isExchangedStopped} aria-label='log-in' iconName='vpn_key' />
                    :
                    <IconButton tooltip={getLocalizedText('logout', 'Log Out')} onClick={(e) => this.props.logOutFromExchange()} disabled={isUserLoggingIn} aria-label='log-out' iconName='exit_to_app' />
                }

            </div>
        );
    }

}