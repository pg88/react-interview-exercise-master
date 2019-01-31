import React from 'react';
import { shallow, mount } from 'enzyme';
import FriendListItem from './FriendListItem';
import { OTHER, FEMALE, MALE } from '../constants/ActionTypes';

describe('FriendListItem', () => {
    const propsData = {
        id: 1,
        starred: true,
        gender: "Male",
        commonFriends: 123,
        starFriend: jest.fn(),
        deleteFriend: jest.fn(),
        name: 'Theodore Roosevelt'

    };
    it('should render correctly', () => {
        expect(shallow(<FriendListItem {...propsData} />)).toMatchSnapshot();
    });
    it('should have the right props', () => {
        expect(Object.keys(propsData).includes('name','id', 'starred', 'commonFriends', 'gender','starFriend', 'deleteFriend'));
    });
    it('should have a valid "id" on the friend props and be a number', () => {
        expect(propsData.id).toBeDefined();
        expect(propsData.id).toBeGreaterThanOrEqual(1);
    });
    it('should have a valid "name" on the friend props and be not empty', () => {
        expect(propsData.name).toBeDefined();
        expect(propsData.name).toMatch(/^[a-zA-Z\s\.]*$/);
    });
    it('should have a valid "starred" on the friend props and be boolean', () => {
        expect(propsData.starred).toBeDefined();
        expect(propsData.starred).toBeTruthy();
    });
    it('should have a valid "commonFriends" on the friend props and be a number', () => {
        expect(propsData.commonFriends).toBeDefined();
        expect(propsData.commonFriends).toBeGreaterThanOrEqual(1);
    });
    xit('should have a valid "starFriend" on the friend props and be a function', () => {
        const component= <FriendListItem {...propsData}/>;
        const mountedComponent= mount(component);
        FriendListItem.waitUntilRender().then(() => {
            mountedComponent.find('.fa-starred').toBe(1);
            done();

        })
    });
    xit('should have a valid "GENDER" on the friend props and be not empty', () => {
        expect(propsData.gender).toBeDefined();
        expect(propsData.gender).toBeDefined();

    })
});