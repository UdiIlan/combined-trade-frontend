import * as React from 'react';
import * as _ from 'lodash';
import IconButton from 'components/common/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
const styles = require('./styles.scss');
import { getLocalizedText, SupportedLanguages } from 'lang';
import { SupportedCurrencies } from 'businessLogic/model';

export interface HeaderProps {
    sesLanguage(newLang: SupportedLanguages);
    setCurrency(newCurrency: SupportedCurrencies);
    currentLang: SupportedLanguages;
    currentCurrency: SupportedCurrencies;
}

export default class Header extends React.Component<HeaderProps, any> {

    constructor(props) {
        super(props);
        this.state = { langMenu: null };
    }

    handleClick = event => {
        this.setState({ langMenu: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ langMenu: null });
    }

    selectLang(lang: SupportedLanguages) {
        this.props.sesLanguage(lang);
        this.handleClose();
    }

    render() {

        return (
            <header className={styles.header}>
                <div className={styles.logo} />

                <h1 className={styles.mainHeader}>
                    {getLocalizedText('orderbook_header')}
                </h1>


                {this.renderCurrencyMenu()}

                {this.renderLanguageMenu()}


            </header>
        );
    }

    private renderCurrencyMenu() {
        return (
            <div className={styles.currencyMenu}>
                <Select
                    native
                    value={this.props.currentCurrency}
                    onChange={(e) => this.props.setCurrency(e.target.value as SupportedCurrencies)}
                    classes={{
                        root: styles.whiteSelect,
                        select: styles.whiteSelect,
                        icon: styles.whiteSelect,
                    }}
                    input={<Input classes={{ root: styles.whiteInput, underline: styles.whiteInput }} />}
                >
                    <option value='BTC'>{getLocalizedText('btc_usd_option')}</option>
                    <option value='BCH'>{getLocalizedText('bch_usd_option')}</option>
                </Select>
            </div>
        );
    }

    private renderLanguageMenu() {

        const { langMenu } = this.state;

        return (
            <div className={styles.langMenu}>
                <IconButton
                    aria-label='More'
                    aria-owns={langMenu ? 'simple-menu' : null}
                    aria-haspopup='true'
                    onClick={this.handleClick}>
                    <img className={styles.langIco} src={require(`assets/icons/${this.props.currentLang}.ico`)} />
                </IconButton>
                <Menu
                    id='lang-menu'
                    anchorEl={langMenu}
                    open={Boolean(langMenu)}
                    onClose={this.handleClose}>
                    {this.renderLanguageOptions()}
                </Menu>
            </div>
        );
    }

    renderLanguageOptions() {
        return _.map([{ lang: 'en_us', displayName: 'English' }, { lang: 'zh_cn', displayName: '中文' }, { lang: 'he_il', displayName: 'עברית' }], (item, index) => {
            return (
                <MenuItem key={index} selected={this.props.currentLang === item.lang} onClick={() => this.selectLang(item.lang)}>
                    <ListItemIcon>
                        <img className={styles.langIco} src={require(`assets/icons/${item.lang}.ico`)} />
                    </ListItemIcon >
                    <ListItemText inset primary={item.displayName} />
                </MenuItem>
            );
        });
    }

}
