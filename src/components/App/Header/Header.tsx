import * as React from 'react';
import * as _ from 'lodash';
import { Route, Switch as RSwitch } from 'react-router-dom';

const styles = require('./styles.scss');
import { Menu, MenuItem } from 'components/common/core/Menu';
import Button from 'components/common/core/Button';
import Select from 'components/common/core//Select';
import IconButton from 'components/common/core/IconButton';
import { getLocalizedText, SupportedLanguages } from 'lang';
import { SupportedCurrencies, AppTheme } from 'businessLogic/model';
import Switch from 'components/common/core/Switch';

export interface HeaderProps {
    currentLang: SupportedLanguages;
    currentCurrency: SupportedCurrencies;
    theme: AppTheme;
    sesLanguage(newLang: SupportedLanguages);
    setCurrency(newCurrency: SupportedCurrencies);
    manageExchanges();
    setTheme(theme: AppTheme);
}

export interface HeaderState {
    langMenu: any;
    userMenu: any;
}

export default class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props) {
        super(props);
        this.state = { langMenu: null, userMenu: null };
    }

    handleLangMenuClick = event => {
        this.setState({ langMenu: event.currentTarget });
    }

    handleUserMenuClick = event => {
        this.setState({ userMenu: event.currentTarget });
    }

    closeMenu = () => {
        this.setState({ langMenu: undefined, userMenu: undefined });
    }

    selectLang(lang: SupportedLanguages) {
        this.props.sesLanguage(lang);
        this.setState({ langMenu: null });
    }

    render() {

        return (
            <header className={styles.header}>
                <div className={styles.logo} />

                <h1 className={styles.mainHeader}>
                    {getLocalizedText('orderbook_header')}
                </h1>

                <div className={styles.actions}>
                    {this.renderCurrentRouteActions()}
                    {this.renderCommonActions()}
                </div>

            </header>
        );
    }

    /**
     * Render route-specific actions.
     */
    private renderCurrentRouteActions() {
        return (
            <RSwitch>
                <Route exact path='/' render={(props) => {
                    return (
                        [
                            this.renderCurrencyMenu(),
                            <Button key='reports' iconName='assessment' type='contained' aria-label='Reports' linkTo='/reports' tooltip='Reports' className={styles.actionsBtn} />,
                            <Button key='chooseEx' onClick={this.props.manageExchanges} type='contained' iconName='ballot' aria-label='Choose Exchanges' tooltip='Choose Exchanges' className={styles.actionsBtn} />
                        ]
                    );
                }}
                />

                <Button key='orderBook' aria-label='Reports' linkTo='/' className={styles.actionsBtn}>Back to Order Book</Button>
            </RSwitch>
        );
    }

    /**
     * Render common actions
     */
    private renderCommonActions() {
        return [
            this.renderUserMenu(),
            this.renderLanguageMenu()
        ];
    }

    private renderCurrencyMenu() {
        return (
            <div key='selectCurrency' className={styles.selectCurrency}>
                <span className={styles.label}>Selected Currency:</span>
                <Select
                    selectedValue={this.props.currentCurrency}
                    onChange={(e) => this.props.setCurrency(e.target.value as SupportedCurrencies)}
                    theme='white'>
                    <option value='BTC'>{getLocalizedText('btc_usd_option')}</option>
                    <option value='BCH'>{getLocalizedText('bch_usd_option')}</option>
                </Select>
            </div>
        );
    }

    private renderLanguageMenu() {

        const { langMenu } = this.state;

        return (
            <div key='langMenu'>
                <IconButton
                    aria-label='More'
                    aria-owns={langMenu ? 'simple-menu' : null}
                    aria-haspopup='true'
                    tooltip='Change Language'
                    onClick={this.handleLangMenuClick}>
                    <img className={styles.langIco} src={require(`assets/icons/${this.props.currentLang}.ico`)} />
                </IconButton>
                <Menu
                    id='lang-menu'
                    openTarget={langMenu}
                    onClose={this.closeMenu}
                    options={this.getLanguageOptions()} />
            </div>
        );
    }

    private getLanguageOptions() {
        return _.map([{ lang: 'en_us', displayName: 'English' }, { lang: 'zh_cn', displayName: '中文' }/* , { lang: 'he_il', displayName: 'עברית' } */], (item) => {
            return {
                displayText: item.displayName,
                icoSrc: require(`assets/icons/${item.lang}.ico`),
                icoStyle: styles.langIco,
                onClick: () => this.selectLang(item.lang),
                selected: this.props.currentLang === item.lang
            } as MenuItem;
        });
    }

    private renderUserMenu() {
        const { userMenu } = this.state;

        return (
            <div key='userMenu' className={styles.userMenu}>
                <IconButton
                    aria-label='More'
                    aria-owns={userMenu ? 'simple-menu' : null}
                    aria-haspopup='true'
                    tooltip='User Settings'
                    iconName='person'
                    className={styles.userIco}
                    onClick={this.handleUserMenuClick}>
                </IconButton>
                <Menu
                    id='lang-menu'
                    openTarget={userMenu}
                    onClose={this.closeMenu}
                    options={[
                        { displayText: 'Contact Support', iconName: 'help', onClick: (e) => window.location.href = 'mailto:support@bitmaintech.com?Subject=Live%20Order%20Book%20-%20Support' },
                        {
                            children: <Switch
                                checked={this.props.theme === 'dark'}
                                onChange={(e) => this.props.setTheme(e.target.checked ? 'dark' : 'light')}
                                value='checkedTheme'
                                label='Dark theme'
                                labelClass={styles.themeSelector}
                            />
                        }
                    ]} />
            </div >
        );
    }


}
