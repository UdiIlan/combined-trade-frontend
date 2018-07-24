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
import IconButton from 'components/common/core/IconButton';
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

type SortDirection = 'asc' | 'desc';

export interface GridProps {
    data: any[];
    columns: GridColumn[];
    className?: string;
    sortDirection?: SortDirection;
    sortBy?: string;
    nested?: boolean;
    renderNestedItems?(item: any);
}

export interface GridState {
    sortDirection?: SortDirection;
    sortBy?: string;
    selected?: any[];
    page?: number;
    rowsPerPage?: number;
    expandedRow?: number;
}

const NESTING_CONTROL_COLUMN_ID = 'nestingControl';
const NESTING_CONTROL_COLUMN = { id: NESTING_CONTROL_COLUMN_ID, title: ' ' };

export default class Grid extends React.Component<GridProps, GridState> {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 50,
            sortBy: props.sortBy,
            sortDirection: props.sortDirection
        };
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    }

    handleRequestSort = (event, property: string) => {
        const sortBy = property;
        let sortDirection;

        if (this.state.sortBy === property && this.state.sortDirection === 'desc') {
            sortDirection = 'asc';
        }
        else {
            sortDirection = 'desc';
        }

        this.setState({ sortDirection, sortBy });
    }

    render() {
        const { data, className, renderNestedItems, nested } = this.props;
        const columns = [...this.props.columns];

        // set nesting control (or empty column in case of a nested grid)
        if (nested)
            columns.splice(0, 0, { id: 'nestedPlaceHolder', title: ' ', render: (item) => '' });
        else if (!!renderNestedItems && columns.indexOf(NESTING_CONTROL_COLUMN) < 0)
            columns.splice(0, 0, NESTING_CONTROL_COLUMN);

        const { sortDirection, sortBy, rowsPerPage, page } = this.state;

        if (_.isEmpty(data) || _.isEmpty(columns)) return <div className={styles.noData}>No Data</div>;

        return (
            <div className={cx(styles.tableWrapper, className)}>
                <Table className={styles.table}>
                    {!nested && <EnhancedTableHead
                        order={sortDirection}
                        orderBy={sortBy}
                        columns={columns}
                        onRequestSort={this.handleRequestSort}
                    />
                    }
                    <TableBody>
                        {data
                            .sort(getSorting(sortDirection, sortBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => this.renderGridRow(index, item, columns)
                            )}
                    </TableBody>
                    {!nested && <TableFooter>
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
                    }
                </Table>
            </div>
        );
    }

    private toggleRow(rowIndex) {
        if (this.state.expandedRow === rowIndex)
            this.setState({ expandedRow: undefined });
        else
            this.setState({ expandedRow: rowIndex });
    }

    private renderGridRow(index: number, item: any, columns: GridColumn[]) {

        const isExpanded = this.state.expandedRow === index;
        const rowCells =
            _.map(columns, (col: GridColumn) => {
                let colContent;
                if (col.id === NESTING_CONTROL_COLUMN_ID) {
                    colContent = _.isEmpty(item.children) ? '' : <IconButton iconName={isExpanded ? 'expand_less' : 'chevron_right'} onClick={() => this.toggleRow(index)} />;
                }
                else {
                    colContent = !col.render ? item[col.id] : col.render(item);
                }
                return <TableCell key={`GridRow_${index}_${col.id}`} numeric={col.numeric}>{colContent}</TableCell>;
            });

        return (
            <TableRow
                className={cx({ expandedRow: isExpanded })}
                hover
                tabIndex={-1}
                key={`GridRow_${index}`}
            >
                {isExpanded ?
                    [
                        <td key={0} className={styles.expandedRowCells}>
                            <table><tbody><tr>{rowCells}</tr></tbody></table>
                        </td>,
                        <td className={styles.expandedRowPanel} key={1} >
                            {this.props.renderNestedItems(item)}
                        </td>
                    ] :
                    rowCells
                }
            </TableRow>
        );
    }
}