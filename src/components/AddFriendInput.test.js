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
    it('should try to add empty data for creating a new friend', () => {
        const component = shallow(<AddFriendInput {...propsData} />);
        component.setState({ name: '', gender: MALE });
        component.find('button').simulate('click');
        expect(component.state().error).not.toBeNull();
    });
    it('should have the friend properties for submit', () => {
        const component = shallow(<AddFriendInput {...propsData} />);
        component.setState({ name: 'JEST HEAVEN', gender: MALE  });
        component.find('button').simulate('click');
        expect(component.state().error).toBeNull();
        expect(propsData.addFriend.mock.calls.length).toBe(1);
    })
});
