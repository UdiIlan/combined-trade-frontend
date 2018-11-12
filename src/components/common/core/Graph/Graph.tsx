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
    LineSeriesCanvas,
    Hint
} from 'react-vis';

export interface GraphProps {
    data: object[];
    xTitle: string;
    yTitle: string;

}

export interface GraphState {

}

export default class Graph extends React.Component<GraphProps, GraphState> {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {

        const graph = (
            <XYPlot width={800} height={300}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title={this.props.xTitle} style={{
                    line: { stroke: '#ADDDE1' },
                    ticks: { stroke: '#ADDDE1' },
                    text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }} />
                <YAxis title={this.props.yTitle} />
                <LineSeriesCanvas
                    className='first-series'
                    data={this.props.data}
                />
            </XYPlot>
        );

        return graph;
    }

}