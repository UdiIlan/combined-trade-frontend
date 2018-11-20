import * as React from 'react';
import { expect } from 'chai';
// const enzyme = require('enzyme');
import {  shallow, mount } from 'enzyme';
import LineGraph from './LineGraph';

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

function callOnClick(x: number, y: number) {
  alert(`${x} and ${y} pressed on graph`);
}

describe('LineGraph Component', () => {
    it('renders the LineGraph', () => {
      const data = [{ x: new Date(2018, 6, 4), y: 0 }, { x: new Date(2018, 7, 4), y: 8 }, { x: new Date(2018, 8, 4), y: 14 }, { x: new Date(2018, 9, 4), y: 17 }];
      const wrapper = enzyme.shallow(<LineGraph  data = {data} xTitle='time' yTitle='rate' dataType='time' onClick={callOnClick} graphStyle={{ opacityLevel: 0.5, color: 'cadetblue' }}>
        <div>ahoy!</div>
      </LineGraph>
      );
      expect(wrapper.html()).equal('<div>ahoy!</div>');
      wrapper.unmount();
    });
});