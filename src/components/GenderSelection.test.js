import React from 'react';
import { mount, shallow } from 'enzyme';
import GenderSelection from './GenderSelection';
import { OTHER, FEMALE } from '../constants/ActionTypes';

describe('GenderSelection tests', () => {
    const selectFunction = jest.fn();
    it('should render correctly', () => {
        const component = shallow(<GenderSelection/>);
        expect(component).toMatchSnapshot();
    });
    it('should select some gender from the available', () => {
        const component = shallow(<GenderSelection/>);
        component.find(`#${ FEMALE }`).simulate('click');
        component.setState({ gender: FEMALE });
        expect(selectFunction.mock.calls.length).toBeDefined();
        expect(component.state().gender).toBeDefined()
    });
});