import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import Button from 'components/common/core/Button';
import Select from 'components/common/core/Select';
import DatePicker from 'components/common/core/DatePicker';
import { DateUtils } from 'businessLogic/utils';


interface ReportManagerProps {
    exchanges: string[];
    noData?: boolean;
    getReportData(filters: any);
}

type TimeRangeOptions = 'today' | 'lastWeek' | 'custom';

interface ReportManagerState {
    exchanges?: string[];
    start_date?: Date;
    end_date?: Date;
    timeRange?: TimeRangeOptions;
    status?: string;
}

export default class FilterBar extends React.Component<ReportManagerProps, ReportManagerState> {

    constructor(props) {
        super(props);
        this.state = { timeRange: 'today', start_date: new Date(), end_date: new Date() };
        this.execute = this.execute.bind(this);
    }

    private execute() {
        const { exchanges, status, start_date, end_date } = this.state;

        this.props.getReportData({
            exchanges,
            statuses: status,
            start_date,
            end_date
        });
    }

    private updateTimeRange() {
        const timeRange = this.state.timeRange;
        if (timeRange === 'custom') return;

        let start_date = new Date();
        let end_date = new Date();

        if (timeRange === 'lastWeek') {
            start_date = DateUtils.lastWeek();
        }

        this.setState({ start_date, end_date });
    }

    render() {

        const { exchanges, timeRange, status, start_date, end_date } = this.state;

        return (
            <div className={styles.filterBar}>
                {/* <span>Filter By:</span> */}

                <div className={styles.filter}>
                    <span className={styles.label}>Date:</span>
                    <Select selectedValue={timeRange} theme='white' onChange={(e) => this.setState({ timeRange: e.target.value }, () => this.updateTimeRange())}>
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
                        onChange={(e) => this.setState({ exchanges: e.target.value })}
                        formLabelText='Exchange'
                        multiple
                        renderAsMenu
                        theme='white' options={this.props.exchanges} />
                </div>

                <span className={styles.splitter}>|</span>

                <div className={styles.filter}>
                    <span className={styles.label}>Status:</span>
                    <Select
                        selectedValue={status}
                        onChange={(e) => this.setState({ status: e.target.value })}
                        theme='white'>
                        <option />
                        <option>Cancelled</option>
                        <option>Finished</option>
                        <option>Make Order</option>
                        <option>Make Order Sent</option>
                        <option>Make Order Executed</option>
                    </Select>
                </div>

                <Button onClick={this.execute} className={styles.execBtn} iconName='play_circle_filled'>GO</Button>
                <Button onClick={this.execute} className={styles.exportBtn} iconName='save_alt' disabled={this.props.noData}>Export</Button>
            </div>
        );
    }
}