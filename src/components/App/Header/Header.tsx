import * as React from 'react';
import * as _ from 'lodash';

const styles = require('./styles.scss');
import { Menu, MenuItem } from 'components/common/core/Menu';
import Button from 'components/common/core/Button';
import Select from 'components/common/core//Select';
import IconButton from 'components/common/core/IconButton';
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

    // handleClose = () => {
    //     this.setState({ langMenu: null });
    // }

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

                    <Button type='inline-floating' iconName='compare_arrows' aria-label='Buy or Cell' className={styles.buySellBtn}>Trade</Button>

                    {this.renderCurrencyMenu()}

                    {this.renderLanguageMenu()}

                </div>
            </header>
        );
    }

    private renderCurrencyMenu() {
        return (
            <Select
                selectedValue={this.props.currentCurrency}
                onChange={(e) => this.props.setCurrency(e.target.value as SupportedCurrencies)}
                theme='white'>
                <option value='BTC'>{getLocalizedText('btc_usd_option')}</option>
                <option value='BCH'>{getLocalizedText('bch_usd_option')}</option>
            </Select>
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
                    tooltip='Change Language'
                    onClick={this.handleClick}>
                    <img className={styles.langIco} src={require(`assets/icons/${this.props.currentLang}.ico`)} />
                </IconButton>
                <Menu
                    id='lang-menu'
                    /* anchorEl={langMenu} */
                    openTarget={langMenu}
                    /* onClose={this.handleClose} */
                    options={this.getLanguageOptions()} />
            </div>
        );
    }

    getLanguageOptions() {
        return _.map([{ lang: 'en_us', displayName: 'English' }, { lang: 'zh_cn', displayName: '中文' }, { lang: 'he_il', displayName: 'עברית' }], (item) => {
            return {
                displayText: item.displayName,
                icoSrc: require(`assets/icons/${item.lang}.ico`),
                icoStyle: styles.langIco,
                onClick: () => this.selectLang(item.lang),
                selected: this.props.currentLang === item.lang
            } as MenuItem;
        });
    }


}
