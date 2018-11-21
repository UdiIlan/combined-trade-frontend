import * as React from 'react';
import { expect } from 'chai';
import {  shallow, mount } from 'enzyme';
import LineGraph from './LineGraph';



function callOnClick(x: number, y: number) {
  alert(`${x} and ${y} pressed on graph`);
}

describe('LineGraph Component', () => {
    it('renders the LineGraph', () => {
      const data = [{ x: new Date(2018, 6, 4), y: 0 }, { x: new Date(2018, 7, 4), y: 8 }, { x: new Date(2018, 8, 4), y: 14 }, { x: new Date(2018, 9, 4), y: 17 }];
      const wrapper = mount(<LineGraph  data = {data} xTitle='time' yTitle='rate' dataType='time' onClick={callOnClick} graphStyle={{ opacityLevel: 0.5, color: 'cadetblue' }}>

      </LineGraph>
      );
      expect(LineGraph.prototype.componentDidMount).to.have.property('resize', 1);
      // expect(wrapper.contains(<div>ahoy!</div>)).to.equal(true);
      // expect(wrapper.html()).contains('<div>ahoy!</div>');
      wrapper.unmount();
    });
});