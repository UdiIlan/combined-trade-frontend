import * as React from 'react';
import IconButton from 'components/common/core/IconButton';
const styles = require('./styles.scss');


export default class GridPaginationControl extends React.Component<any, any> {

    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    }

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    }

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    }

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    }

    render() {
        const { count, page, rowsPerPage } = this.props;

        return (
            <div className={styles.pagination}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label='First Page'
                    iconName='first_page'
                />
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label='Previous Page'
                    iconName='chevron_left'
                />
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label='Next Page'
                    iconName='chevron_right'
                />
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label='Last Page'
                    iconName='last_page'
                />

            </div>
        );
    }
}
