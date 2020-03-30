import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';

import Playlist from '../../../components/playlist';
import { PLAYLIST_QUERY } from '../../../schemas/playlist';

configure({ adapter: new Adapter() });

// eslint-disable-next-line react/jsx-filename-extension
// jest.mock('react-slick', () => () => (<div id="searchBar" />));

describe('Playlist Component', () => {
    beforeAll(() => {

    });
    const mocks = [
        {
            request: {
                query: PLAYLIST_QUERY,
                variables: { lang: 'EN' },
            },
            result: {
                data: {
                    activities: [
                    ],
                },
            },
        },
    ];

    test('The Playlist renders empty', () => {
        const initialState = {};
        const mockStore = configureStore();
        const store = mockStore(initialState);
        const component = mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <Playlist store={store} />
                </MemoryRouter>
            </MockedProvider>,
        );
        expect(component).toMatchSnapshot();
    });

    test('no activities defined', () => {
        const initialState = {};
        const mockStore = configureStore();
        const store = mockStore(initialState);
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <Playlist store={store} playlistToRender={[]} />
                </MemoryRouter>
            </MockedProvider>,
        );
        const viewAllText = getByText('View All');
        const noActs = getByText('You currently have no activities in your playlist');
        expect(noActs).toBeDefined();
        expect(viewAllText).toBeDefined();
    });

    test('The playlist renders activity list carousel', () => {
        const initialState = {};
        const mockStore = configureStore();
        const store = mockStore(initialState);
        const mockedPlaylistData = [{
            id: 0,
            user_id: "d4cd70a6-15e0-11ea-8d71-362b9e155667",
            name: "Playlist Name 0",
            activity_list:
                [
                    {
                        id: 3,
                        image: "http://localhost:8001/image4.jpg",
                        type: "video",
                        url: "http://localhost:8001/video1",
                        titles: [
                            {
                                "lang": "en",
                                "title": "ENGLISH Video (3)"
                            }
                        ]
                    }
                ]
        }]
        const { debug, getByText } = render(

            <MemoryRouter>
                <Playlist store={store} session={"d4cd70a6-15e0-11ea-8d71-362b9e155667"} playlistToRender={mockedPlaylistData} />
            </MemoryRouter>

        );
        expect(getByText(mockedPlaylistData[0].name)).toBeDefined();
    });

    test('clicking on the card re-directs you to the activity', () => {
        let Location;
        const initialState = {};
        const mockStore = configureStore();
        const store = mockStore(initialState);
        const mockedPlaylistData = [{
            id: 0,
            user_id: "d4cd70a6-15e0-11ea-8d71-362b9e155667",
            name: "Playlist Name 0",
            activity_list:
                [
                    {
                        id: 3,
                        image: "http://localhost:8001/image4.jpg",
                        type: "video",
                        url: "http://localhost:8001/video1",
                        titles: [
                            {
                                "lang": "en",
                                "title": "ENGLISH Video (3)"
                            }
                        ]
                    }
                ]
        }];
        const { container } = render(
            <MemoryRouter>
                <Playlist store={store} playlistToRender={mockedPlaylistData} />
                <Route
                    path="*"
                    render={({ location }) => { Location = location; return null; }}
                />
            </MemoryRouter>,
        );
        const openPlaylistIcon = container.querySelector('.openPlaylistIcon');
        act(() => {
            openPlaylistIcon.click()
        })
        expect(Location.pathname).toBe(`/view-playlist/${mockedPlaylistData[0].id}`);
    });
});