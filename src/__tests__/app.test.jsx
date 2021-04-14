import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { App } from '../app'

configure({ adapter: new Adapter() });

// TODO: Tests are optional but are considered extra credit
// Should consider writing some basic level jest unit tests.
// **Writing some puppeteer tests would be pretty slick**

describe('app', () => {
  it('renders <App /> components', () => {
    const component = shallow(<App />)
    expect(component).toMatchSnapshot()
  });
});
