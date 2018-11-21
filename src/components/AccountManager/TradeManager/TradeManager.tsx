import * as React from 'react';
import Card from 'components/common/containers/Card';
import Grid from 'components/common/dataLayouts/Grid';
const styles = require('./styles.scss');
import * as classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default class TradeManager extends React.Component<any, any> {
  render() {

    const columns = [];
    return (
      <div className={styles.tradeManager}>
        <Card className={cx(styles.tradesData, { blurring: this.props.loading })}>
          <Grid
            sortBy='orderTime'
            sortDirection='desc'
            className={styles.grid}
            data={this.props.data}
            columns={columns}
          />
        </Card>
      </div>
    );
  }
}