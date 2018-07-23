import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import Button from 'components/common/core/Button';
import Spinner from 'components/common/core/Spinner';
import Select from 'components/common/core/Select';
import DatePicker from 'components/common/core/DatePicker';
import { DateUtils } from 'businessLogic/utils';

const ORDER_STATUS_OPTIONS = ['Cancelled', 'Finished', 'Make Order', 'Make Order Sent', 'Make Order Executed'];

interface ReportManagerProps {
    exchanges: string[];
    loading?: boolean;
    noData?: boolean;
    getReportData(filters: any);
}

type TimeRangeOptions = 'today' | 'lastWeek' | 'custom';

interface ReportManagerState {
    exchanges?: string[];
    start_date?: Date;
    end_date?: Date;
    timeRange?: TimeRangeOptions;
    status?: string[];
}

export default class FilterBar extends React.Component<ReportManagerProps, ReportManagerState> {

    constructor(props) {
        super(props);
        this.state = {
            timeRange: 'today',
            start_date: new Date(),
            end_date: new Date(),
            status: ORDER_STATUS_OPTIONS,
            exchanges: props.exchanges
        };
        this.execute = this.execute.bind(this);
    }
    componentWillMount() {
        this.updateTimeRange();
    }

    private execute() {
        const { exchanges, status, start_date, end_date } = this.state;

        let filterObj = {
            statuses: _.isEmpty(status) ? undefined : status,
            start_date: DateUtils.format(start_date, 'YYYY-MM-DD hh:mm'),
            end_date: DateUtils.format(end_date, 'YYYY-MM-DD hh:mm'),
            exchanges: _.isEmpty(exchanges) ? undefined : exchanges
        };

        this.props.getReportData(filterObj);
    }

    private updateTimeRange() {
        const timeRange = this.state.timeRange;
        if (timeRange === 'custom') return;

        let start_date;
        let end_date = new Date();

        if (timeRange === 'today') {
            start_date = DateUtils.yesterday();
        }
        else if (timeRange === 'lastWeek') {
            start_date = DateUtils.lastWeek();
        }

        this.setState({ start_date, end_date });
    }

    render() {

        const { exchanges, timeRange, status, start_date, end_date } = this.state;

        return (
            <div className={styles.filterBar}>

                <div className={styles.filter}>
                    <span className={styles.label}>Date:</span>
                    <Select selectedValue={timeRange} theme='white' onChange={(selection) => this.setState({ timeRange: selection }, () => this.updateTimeRange())}>
                        <option value='today'>Today</option>
                        <option value='lastWeek'>Last Week</option>
                        <option value='custom'>Date Range</option>
                    </Select>

                    {timeRange === 'custom' &&
                        <div className={styles.dateFilters}>
                            <span className={styles.label}>From:</span>
                            <DatePicker className={styles.dateControl} showTodayButton value={start_date} onChange={date => this.setState({ start_date: date })} />
                            <span className={styles.label}>To:</span>
                            <DatePicker className={styles.dateControl} showTodayButton value={end_date} onChange={date => this.setState({ end_date: date })} />
                        </div>
                    }

                </div>

                <span className={styles.splitter}>|</span>

                <div className={styles.filter}>
                    <span className={styles.label}>Exchange:</span>
                    <Select
                        selectedValue={exchanges}
                        onChange={(selection) => this.setState({ exchanges: selection })}
                        formLabelText='Exchange'
                        multiple
                        theme='white' options={this.props.exchanges} />
                </div>

                <span className={styles.splitter}>|</span>

                <div className={styles.filter}>
                    <span className={styles.label}>Status:</span>
                    <Select
                        selectedValue={status}
                        multiple
                        onChange={(selection) => this.setState({ status: selection })}
                        theme='white'
                        options={ORDER_STATUS_OPTIONS} />
                </div>

                {this.props.loading ?
                    <Spinner size={20} className={styles.loading} />
                    :
                    <Button onClick={this.execute} className={styles.execBtn} iconName='play_circle_filled'>GO</Button>
                }

                <Button onClick={this.execute} className={styles.exportBtn} iconName='save_alt' disabled={this.props.noData}>Export</Button>
            </div>
        );
    }
}