import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import Button from 'components/common/core/Button';
import Spinner from 'components/common/core/Spinner';
import Select from 'components/common/core/Select';
import DatePicker from 'components/common/core/DatePicker';
import { DateUtils } from 'businessLogic/utils';
import { getLocalizedText } from 'lang';

const ORDER_STATUS_OPTIONS = ['Cancelled', 'Finished', 'Make Order', 'Make Order Sent', 'Make Order Executed', 'Timed Take Order', 'Timed Order'];

interface ReportManagerProps {
    exchanges: string[];
    loading?: boolean;
    noData?: boolean;
    getReportData(filters: any);
    export();
}

type TimeRangeOptions = 'today' | 'lastWeek' | 'custom';

interface ReportManagerState {
    exchanges?: string[];
    startDate?: Date;
    endDate?: Date;
    timeRange?: TimeRangeOptions;
    status?: string[];
}

export default class FilterBar extends React.Component<ReportManagerProps, ReportManagerState> {

    constructor(props) {
        super(props);
        this.state = {
            timeRange: 'today',
            startDate: new Date(),
            endDate: new Date(),
            status: ORDER_STATUS_OPTIONS,
            exchanges: props.exchanges
        };
        this.execute = this.execute.bind(this);
    }
    componentWillMount() {
        this.updateTimeRange();
    }

    private normalizeDate(date: Date) {
        const now = new Date();
        date.setHours(now.getHours());
        date.setMinutes(now.getMinutes());
        const utcDate = DateUtils.toUTC(date);
        return DateUtils.format(utcDate, 'YYYY-MM-DD HH:mm');
    }

    private execute() {
        const { exchanges, status, startDate, endDate } = this.state;


        let filterObj = {
            statuses: _.isEmpty(status) || status.length === ORDER_STATUS_OPTIONS.length ? undefined : status,
            start_date: this.normalizeDate(startDate),
            end_date: this.normalizeDate(endDate),
            exchanges: _.isEmpty(exchanges) || exchanges.length === this.props.exchanges.length ? undefined : exchanges
        };

        this.props.getReportData(filterObj);
    }

    private updateTimeRange() {
        const timeRange = this.state.timeRange;
        if (timeRange === 'custom') return;

        let startDate;
        let endDate = new Date();

        if (timeRange === 'today') {
            startDate = DateUtils.yesterday();
        }
        else if (timeRange === 'lastWeek') {
            startDate = DateUtils.lastWeek();
        }

        this.setState({ startDate, endDate });
    }

    render() {

        const { exchanges, timeRange, status, startDate, endDate } = this.state;

        return (
            <div className={styles.filterBar}>

                <div className={styles.filter}>
                    <span className={styles.label}>Date:</span>
                    <Select selectedValue={timeRange} onChange={(selection) => this.setState({ timeRange: selection }, () => this.updateTimeRange())}>
                        <option value='today'>Last Day</option>
                        <option value='lastWeek'>Last Week</option>
                        <option value='custom'>Date Range</option>
                    </Select>

                    {timeRange === 'custom' &&
                        <div className={styles.dateFilters}>
                            <span className={styles.label}>From:</span>
                            <DatePicker className={styles.dateControl} showTodayButton value={startDate} onChange={date => this.setState({ startDate: date })} />
                            <span className={styles.label}>To:</span>
                            <DatePicker className={styles.dateControl} showTodayButton value={endDate} onChange={date => this.setState({ endDate: date })} />
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
                        options={this.props.exchanges} />
                </div>

                <span className={styles.splitter}>|</span>

                <div className={styles.filter}>
                    <span className={styles.label}>Status:</span>
                    <Select
                        selectedValue={status}
                        multiple
                        onChange={(selection) => this.setState({ status: selection })}
                        options={ORDER_STATUS_OPTIONS} />
                </div>

                {this.props.loading ?
                    <Spinner size={20} className={styles.loading} />
                    :
                    <Button type='contained' onClick={this.execute} className={styles.execBtn} iconName='play_circle_filled'>{getLocalizedText('go')}</Button>
                }

                <Button tooltip='Export to CSV' onClick={this.props.export} className={styles.exportBtn} iconName='save_alt' disabled={this.props.noData}>{getLocalizedText('export')}</Button>
            </div>
        );
    }
}