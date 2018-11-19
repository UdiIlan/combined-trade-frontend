import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import '../../../../../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, Crosshair, AreaSeries, LineSeriesCanvas, LineMarkSeriesCanvas } from 'react-vis';

export type GraphType = 'area' | 'line';
export type GraphDataType = 'numeric' | 'alphanumeric' | 'category' | 'time';

export interface GraphStyle {
    opacityLevel: number;
    color: string;
}

export interface LineGraphProps {
    type?: GraphType;
    showPoints?: boolean;
    data: object[];
    dataType?: GraphDataType;
    numberOfTicks?: number;
    xTitle: string;
    yTitle: string;
    className?: string;
    graphStyle: GraphStyle;
    onClick?(x: number, y: number);
}

export interface LineGraphState {
    value: boolean;
}


export default class LineGraph extends React.Component<LineGraphProps, LineGraphState> {

    constructor(props) {
        super(props);
        this.state = {
            value: false
        };
    }

    private graphDom;

    handleResize = () => {
        this.forceUpdate();
    }

      componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
      }

    render() {
        const { value } = this.state;

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

        const getDataType = (type: GraphDataType) => {
            switch (type) {
                case 'numeric':
                    return 'linear';
                case 'alphanumeric':
                    return 'ordinal';
                case 'category':
                    return 'category';
                case 'time':
                    return 'time';
                default:
                    return 'linear';
            }
        };

        const Component = getComponent(this.props.type);

        const dataType = getDataType(this.props.dataType);

        const lineSeriesProps = {
            animation: true,
            data: this.props.data,
            opacity: this.props.graphStyle.opacityLevel,
            color: this.props.graphStyle.color,
            stroke: '#3C6266',
            onNearestX: d => {
                this.setState({ value: d });
            }
        };

        const graph = (
            <div className={cx(styles.graph, this.props.className)}>
                <div ref={(graphDom) => this.graphDom = graphDom} className={styles.graphWrapper}>
                    <XYPlot width={this.graphDom ? this.graphDom.offsetWidth : 800} height={this.graphDom ? this.graphDom.offsetHeight : 300} xType={dataType} onMouseLeave={() => this.setState({ value: false })}>
                        <HorizontalGridLines />
                        <VerticalGridLines />
                        <XAxis title={this.props.xTitle} tickTotal={this.props.numberOfTicks ? this.props.numberOfTicks : null} />
                        <YAxis title={this.props.yTitle} />
                        <Component {...lineSeriesProps} />
                        {value && <Crosshair values={[value]} titleFormat={(values) => {
                            return this.props.dataType === 'time' ? { title: 'Date', value: values[0].x.toDateString() } : { title: 'Value', value: values[0].x };
                        }}
                            itemsFormat={(values) => [{ title: 'Value', value: values[0].y }]}
                        />}
                    </XYPlot>
                </div>
            </div>
        );

        return graph;
    }
}