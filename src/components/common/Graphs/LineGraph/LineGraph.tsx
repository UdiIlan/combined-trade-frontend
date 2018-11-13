import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import '../../../../../node_modules/react-vis/dist/style.css';
import { curveCatmullRom } from 'd3-shape';

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    AreaSeries,
    LineSeriesCanvas,
    Crosshair,
    CanvasComponent,
    LineMarkSeriesCanvas
} from 'react-vis';

export interface LineGraphProps {
    type?: string;
    data: object[];
    xTitle: string;
    yTitle: string;
    onClick(x: number, y: number);

}

export interface LineGraphState {

}


const colorRanges = {
    typeA: ['#59E4EC', '#0D676C'],
    typeB: ['#EFC1E3', '#B52F93']
};

export default class LineGraph extends React.Component<LineGraphProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            drawMode: 0,
            data: this.props.data,
            colorType: 'typeA',
            strokeWidth: '3px',
            showMarks: true,
            value: false,
            hideComponent: false
        };
    }


    render() {
        const {
            drawMode,
            colorType,
            data,
            hideComponent,
            strokeWidth,
            showMarks,
            value
        } = this.state;

        const lineSeriesProps = {
            animation: true,
            className: 'mark-series-example',
            sizeRange: [5, 15],
            color: colorType === 'typeA' ? '#0D676C' : '#B52F93',
            colorRange: colorRanges[colorType],
            opacityType: 'literal',
            strokeWidth: '3px',
            data: this.props.data,
            onNearestX: d => this.setState({ value: d }),
            opacity: 0.3
        };

        const graph = (
            <XYPlot width={800} height={300} onMouseLeave={() => this.setState({ value: false })}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title={this.props.xTitle} style={{
                    line: { stroke: '#ADDDE1' },
                    ticks: { stroke: '#ADDDE1' },
                    text: { stroke: 'none', fontWeight: 600 }
                }} />
                <YAxis title={this.props.yTitle} />
                <AreaSeries
                    className='third-series'
                    {...lineSeriesProps}
                    />
                {value && <Crosshair values={[value]} />}
            </XYPlot>
        );

        return graph;
    }
}