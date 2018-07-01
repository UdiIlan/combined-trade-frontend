import * as React from 'react';
import * as _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
const styles = require('./styles.scss');
import { getLocalizedText, SupportedLanguages } from 'lang';

export interface HeaderProps {
    sesLanguage(newLang: SupportedLanguages);
    currentLang: SupportedLanguages;
}

export default class Header extends React.Component<HeaderProps, any> {

    constructor(props) {
        super(props);
        this.state = { anchorEl: null };
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    selectLang(lang: SupportedLanguages) {
        this.props.sesLanguage(lang);
        this.handleClose();
    }

    render() {

        const { anchorEl } = this.state;

        return (
            <header className={styles.header}>
                <div className={styles.logo} />

                <h1 className={styles.mainHeader}>
                    {getLocalizedText('orderbook_header')}
                </h1>

                <div className={styles.langMenu}>
                    <IconButton
                        aria-label='More'
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup='true'
                        onClick={this.handleClick}>
                        <img className={styles.langIco} src={require(`assets/icons/${this.props.currentLang}.ico`)} />
                    </IconButton>
                    <Menu
                        id='lang-menu'
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}>
                        {this.renderLanguageOptions()}
                    </Menu>
                </div>

            </header>
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
