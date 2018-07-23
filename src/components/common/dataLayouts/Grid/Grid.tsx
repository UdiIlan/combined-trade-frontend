import * as React from 'react';
import * as _ from 'lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import GridPaginationControl from './GridPaginationControl';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);


function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}


export interface GridColumn {
    id: string;
    title: string;
    numeric?: boolean;
    render?(item);
}

interface EnhancedTableHeadProps {
    columns: GridColumn[];
    order?: 'asc' | 'desc';
    orderBy?: string;
    onRequestSort(event, property);
}

class EnhancedTableHead extends React.Component<EnhancedTableHeadProps, any> {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    }

    render() {
        const { order, orderBy, columns } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columns.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                /* padding={column.disablePadding ? 'none' : 'default'} */
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={order}
                                    onClick={this.createSortHandler(column.id)}
                                >
                                    {column.title}
                                </TableSortLabel>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export interface GridProps {
    data: any[];
    columns: GridColumn[];
    className?: string;
}

export interface GridState {
    order?: 'asc' | 'desc';
    orderBy?: string;
    selected?: any[];
    page?: number;
    rowsPerPage?: number;
}

export default class Grid extends React.Component<GridProps, GridState> {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 50,
        };
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    }

    handleRequestSort = (event, property: string) => {
        const orderBy = property;
        let order;

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        else {
            order = 'desc';
        }

        this.setState({ order, orderBy });
    }

    render() {
        const { data, columns, className } = this.props;
        const { order, orderBy, rowsPerPage, page } = this.state;

        if (_.isEmpty(data) || _.isEmpty(columns)) return <div className={styles.noData}>No Data</div>;

        return (
            <div className={cx(styles.tableWrapper, className)}>
                <Table className={styles.table}>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        columns={columns}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                        {data
                            .sort(getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => this.renderGridRow(index, item, columns)
                            )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={3}
                                rowsPerPageOptions={[10, 50, 100]}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={GridPaginationControl}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }

    private renderGridRow(index: number, item: any, columns: GridColumn[]) {
        return (
            <TableRow
                hover
                tabIndex={-1}
                key={`GridRow_${index}`}
            >
                {_.map(columns, (col: GridColumn) => {
                    const colContent = !col.render ? item[col.id] : col.render(item);
                    return <TableCell key={`GridRow_${index}_${col.id}`} numeric={col.numeric}>{colContent}</TableCell>;
                })}
            </TableRow>
        );
    }
}