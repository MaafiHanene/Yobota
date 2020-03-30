import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import configureStore from 'redux-mock-store';

import NavBar from '../../../components/Navigation';

configure({ adapter: new Adapter() });

// eslint-disable-next-line react/jsx-filename-extension
jest.mock('../../../components/SearchBar', () => () => (<div id="searchBar" />));

describe('NavBar Layout Component', () => {
  let Location;
  const initialState = { user: { firstName: 'John', lastName: 'Smith' } };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  test('The NavBar renders', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </MemoryRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('User is displayed', () => {
    const navBar = mount(
      <MemoryRouter initialEntries={['/somewhere']}>
        <Provider store={store}>
          <NavBar />
          <Route
            path="*"
            render={({ location }) => { Location = location; return null; }}
          />
        </Provider>
      </MemoryRouter>,
    );
    const user = navBar.find('.user');
    expect(user.text()).toBe('John Smith');
  })

  test('Clicking on the logo will redirect you home', () => {
    const navBar = mount(
      <MemoryRouter initialEntries={['/somewhere']}>
        <Provider store={store}>
          <NavBar />
          <Route
            path="*"
            render={({ location }) => { Location = location; return null; }}
          />
        </Provider>
      </MemoryRouter>,
    );
    const logo = navBar.find('.logo').at(0);
    expect(logo.props().to).toBe('/');
  });
});
