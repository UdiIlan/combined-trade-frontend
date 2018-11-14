import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import '../../../../../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, Crosshair, AreaSeries, LineSeriesCanvas, LineMarkSeriesCanvas } from 'react-vis';

export type GraphType = 'area' | 'line';
export type GraphDataType = ('linear'|'ordinal'|'category'|'time'|'time-utc'|'log'|'literal');

export interface LineGraphProps {
    type?: GraphType;
    showPoints?: boolean;
    data: object[];
    dataType?: GraphDataType;
    numberOfTicks?: number;
    xTitle: string;
    yTitle: string;
    onClick(x: number, y: number);

}

export interface LineGraphState {
    value: boolean;
}

export default class LineGraph extends React.Component<LineGraphProps, LineGraphState> {

    constructor(props) {
        super(props);
        this.state = {
            value: false,
        };
    }

    render() {
        const {
            value
        } = this.state;

        const getComponent = (type: GraphType) => {
            switch (type) {
                case 'area':
                    return AreaSeries;
                case 'line':
                    return this.props.showPoints ? LineMarkSeriesCanvas : LineSeriesCanvas;
                default:
                    return AreaSeries;
            }
        };

        const Component = getComponent(this.props.type);

        const lineSeriesProps = {
            animation: true,
            color: '#0D676C',
            opacityType: 'literal',
            data: this.props.data,
            onNearestX: d => {
                this.setState({ value: d });
            },
            opacity: 0.3
        };

        const graph = (
            <XYPlot width={800} height={300} xType={this.props.dataType ? this.props.dataType : 'linear'} onMouseLeave={() => this.setState({ value: false })}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title={this.props.xTitle} tickTotal={this.props.numberOfTicks ? this.props.numberOfTicks : null} />
                <YAxis title={this.props.yTitle} />
                <Component {...lineSeriesProps} />
                {value && <Crosshair values={[value]} titleFormat={(values) => { return { title: 'Date', value: values[0].x.toDateString() }; }}
                    itemsFormat={(values) => [{ title: 'Value', value: values[0].y }]}
                />}
            </XYPlot>
        );

        return graph;
    }
}