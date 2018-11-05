import * as React from 'react';
import * as _ from 'lodash';
import { OrderActionStatus } from 'businessLogic/model';
import { default as Grid, GridColumn } from 'components/common/dataLayouts/Grid';



interface MyOrdersProps {
    userLastOrders: OrderActionStatus[];
}

export default class MyOrders extends React.Component<MyOrdersProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                {
                    _.isEmpty(this.props.userLastOrders) ?
                        'N/A'
                        :
                        <Grid
                            data={this.props.userLastOrders}
                            disablePagination={true}
                            columns={[
                                { id: 'crypto_type', title: 'Crypto Type' },
                                { id: 'action_type', title: 'Action Type' },
                                { id: 'price_fiat', title: 'Price' },
                                { id: 'crypto_size', title: 'Size' }
                            ]}
                        />
                }
            </div>
        );
    }
}