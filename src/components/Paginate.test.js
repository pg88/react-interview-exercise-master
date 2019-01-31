import React from 'react';
import { mount, shallow } from 'enzyme';
import Paginate from './Paginate';
import { Provider, connect } from 'react-redux';
import * as reducers from '../reducers';
import GenderSelection from './GenderSelection';
import { combineReducers, createStore } from 'redux';
import { FriendList, AddFriendInput, FriendListItem } from '../components';

const initialState = {
    friendsById: [
        {
            name: 'Theodore Roosevelt',
            starred: true
        },
        {
            name: 'Abraham Lincoln',
            starred: false
        },
        {
            name: 'George Washington',
            starred: false
        }
    ],
    settings: {
        firstPage: 1,
        itemsToShow: 2
    },
    actions: {
        starFriend: jest.fn(),
        deleteFriend: jest.fn()
    }
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

describe('Paginate tests', () => {
    const { propsData } = initialState;

    it('should have the list and the right properties on the list for pagination', () => {
        expect(initialState.friendsById.length>0);
        expect(Object.keys(initialState.friendsById[0]).includes('name'))
    });
    it('should have elements on the list to paginate', () => {
        expect(initialState.friendsById).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: 'Theodore Roosevelt' })
            ])
        )
    });
    it('should have right pagination settings', () => {
        expect(initialState.settings).toMatchObject({
            firstPage: 1,
            itemsToShow: 2
        });
    });
    it('should render correctly components', () => {
        const component = <Provider store={ store }>
            <Paginate {...propsData} />
        </Provider>;
        const shallowedComponent = shallow(component);
        expect(shallowedComponent).toMatchSnapshot();
    });
    xit('should render correctly pagination', () => {
        const component = <Provider store={ store }>
            <Paginate {...propsData} />
        </Provider>;
        const mountedComponent = mount(component);
        expect(mountedComponent.find('#prev'));
        expect(mountedComponent.find('#prevaaa'));
    });
});