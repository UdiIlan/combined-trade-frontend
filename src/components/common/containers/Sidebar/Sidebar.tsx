import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import IconButton from 'components/common/core/IconButton';

export interface SidebarProps {
    header: string;
    align: 'left' | 'right';
    className?: string;
    children?: any;
    collapsible?: boolean;
}

export interface SidebarState {
    collapsed?: boolean;
}

export default class Sidebar extends React.Component<SidebarProps, SidebarState> {

    constructor(props) {
        super(props);
        this.state = {};
        this.toggle = this.toggle.bind(this);
    }

    private toggle() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    open() {
        this.setState({ collapsed: false });
    }

    render() {
        const isCollapsed = this.state.collapsed;
        const { align, collapsible, className, children, header } = this.props;

        if (!collapsible)
            return (
                <div className={cx(styles.sidebar, className)}>
                    <div className={styles.container}>
                        <span className={cx(styles.header, styles.static)}>{header}</span>
                        {children}
                    </div>
                </div>
            );


        let iconName;
        if (align === 'left') {
            iconName = isCollapsed ? 'chevron_right' : 'chevron_left';
        }
        else {
            iconName = isCollapsed ? 'chevron_left' : 'chevron_right';
        }

        return (
            <div className={cx(styles.sidebar, { collapsed: isCollapsed }, className)} >

                <div className={cx(styles.toggle, { collapsed: isCollapsed })}>
                    <IconButton id='toggle_sidebar_btn' onClick={this.toggle} iconName={iconName} className={styles.icon} />
                </div>

                <div className={cx(styles.container, { collapsed: isCollapsed })}>

                    <span onClick={this.toggle} className={cx(styles.header, { collapsed: isCollapsed })}>{header}</span>

                    {!isCollapsed && <div className={styles.content}>{children}</div>}

                </div>

            </div>
        );
    }
}
