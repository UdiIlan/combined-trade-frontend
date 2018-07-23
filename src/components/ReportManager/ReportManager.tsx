import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import { getOrdersReport } from './redux/actions';
import FilterBar from './FilterBar';
import ReportData from './ReportData';


interface ReportManagerProps {
    data?: any[];
    loading?: boolean;
    exchanges: string[];
    getOrdersReport(filters: any);
}

class ReportManager extends React.Component<ReportManagerProps, any> {

    constructor(props) {
        super(props);
    }

    render() {

        const { data, getOrdersReport, exchanges, loading } = this.props;

        return (
            <div className={styles.reportManager}>
                <FilterBar getReportData={getOrdersReport} exchanges={exchanges} loading={loading} noData={_.isEmpty(data)} />
                <ReportData data={data} />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        data: _.get(state, 'reportManager.data', []),
        loading: _.get(state, 'reportManager.loading', false),
        exchanges: _.map(_.get(state, 'orderBook.exchanges', []), exchange => exchange.name)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrdersReport: (filters) => dispatch(getOrdersReport(filters))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportManager);