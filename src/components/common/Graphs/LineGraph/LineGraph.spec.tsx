import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import LineGraph from './LineGraph';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, Crosshair, AreaSeries, LineSeriesCanvas, LineMarkSeriesCanvas } from 'react-vis';



function callOnClick(x: number, y: number) {
  alert(`${x} and ${y} pressed on graph`);
}

describe('LineGraph Component', () => {
  const graphData = [{ x: new Date(2018, 6, 4), y: 0 }, { x: new Date(2018, 7, 4), y: 8 }, { x: new Date(2018, 8, 4), y: 14 }, { x: new Date(2018, 9, 4), y: 17 }];
  it('renders the LineGraph', () => {

    const wrapper = shallow(<LineGraph data={graphData} xTitle='time' yTitle='rate' type='area' numberOfTicks={5} dataType='time' onClick={callOnClick} graphStyle={{ opacityLevel: 0.5, color: 'cadetblue' }}>
    </LineGraph>
    );
    const yAxis = <YAxis title='rate' />;
    const xAxis = <XAxis title='time' tickTotal={5} />;

    const lineSeriesProps = {
      animation: true,
      data: graphData,
      opacity: 0.5,
      color: 'cadetblue',
      stroke: '#3C6266',
      onNearestX: d => {
        this.setState({ value: d });
      }
    };

    const Component = <AreaSeries />;
    expect(wrapper.contains(yAxis)).to.equal(true);
    expect(wrapper.contains(xAxis)).to.equal(true);
    expect(wrapper.containsMatchingElement(Component)).to.equal(true);
    wrapper.unmount();
  });

  it('getDataType', () => {
    const wrapper = shallow(<LineGraph data={graphData} xTitle='time' yTitle='rate' numberOfTicks={5} dataType='time' onClick={callOnClick} graphStyle={{ opacityLevel: 0.5, color: 'cadetblue' }} />);
    expect(wrapper.instance().getDataType('numeric')).to.equal('linear');
    expect(wrapper.instance().getDataType('alphanumeric')).to.equal('ordinal');
    expect(wrapper.instance().getDataType('category')).to.equal('category');
    expect(wrapper.instance().getDataType('time')).to.equal('time');
    expect(wrapper.instance().getDataType()).to.equal('linear');

  });

  it('getComponent without points', () => {
    const wrapper = shallow(<LineGraph data={graphData} xTitle='time' yTitle='rate' numberOfTicks={5} dataType='time' onClick={callOnClick} graphStyle={{ opacityLevel: 0.5, color: 'cadetblue' }} />);
    expect(wrapper.instance().getComponent('line')).to.equal(LineSeriesCanvas);
    expect(wrapper.instance().getComponent('area')).to.equal(AreaSeries);
    expect(wrapper.instance().getComponent()).to.equal(AreaSeries);
  });

  it('getComponent with points', () => {
    const wrapper = shallow(<LineGraph data={graphData} xTitle='time' yTitle='rate' numberOfTicks={5} showPoints={true} dataType='time' onClick={callOnClick} graphStyle={{ opacityLevel: 0.5, color: 'cadetblue' }} />);
    expect(wrapper.instance().getComponent('line')).to.equal(LineMarkSeriesCanvas);
    expect(wrapper.instance().getComponent('area')).to.equal(AreaSeries);
    expect(wrapper.instance().getComponent()).to.equal(AreaSeries);
  });
});