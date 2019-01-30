import React from 'react';
import { shallow } from 'enzyme';
import AddFriendInput from './AddFriendInput';
import GenderSelection from './GenderSelection';
import { MALE } from '../constants/ActionTypes';



describe('AddFriendInput', () => {
    const propsData = {
        addFriend: jest.fn()
    };
    it('should render correctly', () => {
        expect(shallow(<AddFriendInput {...propsData} />)).toMatchSnapshot();
    });
    /*it('should try to add empty data for', () => {
        const component = shallow(<AddFriendInput {...propsData} />);
        component.setState({ name: '', gender: MALE });
        component.find('button').simulate('click');
        expect(component.state().error).not.toBeNull();
    });
    it('should have the friend properties', () => {
        const component = shallow(<AddFriendInput {...propsData} />);
        expect(component.find("input[type='radio']").length).toBe(GENDER.length);
        expect(component.find("input[type='text']").length).toBe(1);
        expect(component.find('button').length).toBe(1);
    })*/
});
