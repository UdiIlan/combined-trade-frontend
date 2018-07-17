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
    hideActions?: boolean;
    signInToExchange();
    logOutFromExchange();
    stopExchange();
    startExchange();
    removeExchange(stop?: boolean);
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

        const actions = [];
        if (!this.props.hideActions) {

            // if (isExchangedStopped)
            //     actions.push(<IconButton
            //         key='start' tooltip='Start' aria-label='Play' iconName='play_circle_filled_white' onClick={(e) => this.props.startExchange()} />);
            // else



            if (isExchangedStopped || isRunningButLoggedOut)
                actions.push(<IconButton key='logIn' tooltip='Log In'
                    onClick={(e) => this.props.signInToExchange()} disabled={isExchangedStopped} aria-label='log-in' iconName='vpn_key' />);
            else
                actions.push(<IconButton className={styles.logOut} key='logOut' tooltip={`${getLocalizedText('logout', 'Log Out')} - (${this.props.signedInUser})`}
                    onClick={(e) => this.props.logOutFromExchange()} disabled={isUserLoggingIn} aria-label='log-out' iconName='exit_to_app' />);

            actions.push(<IconButton key='hide' tooltip='Hide' aria-label='Hide' iconName='visibility_off' onClick={(e) => this.props.removeExchange()} />);

            actions.push(<IconButton key='remove' tooltip='Remove' aria-label='Remove' iconName='cancel' onClick={(e) => this.props.removeExchange(true)} />);
        }

        return (
            <div className={styles.exchangeActions}>

                <h4 className={styles.headerText}>{this.props.name}</h4>

                {!this.props.hideActions && actions}

            </div>
        );
    }

}