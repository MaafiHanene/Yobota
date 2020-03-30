import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { render, wait } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import LessonContainer, { ACTIVITIES_QUERY } from '../../../components/Lesson/containers/LessonContainer';

const mocks = [
    {
        request: {
            query: ACTIVITIES_QUERY,
            variables: { id: 1, lang: 'EN' },
        },
        result: {
            data: {
                activity: {
                    id: '1',
                    image: 'http://www.example.com/image1.jpg',
                    titles: [
                        {
                            lang: 'en',
                            title: 'Course 1'
                        }
                    ],
                    type: 'lesson',
                    url: '',
                    activities: [
                        {
                            id: '11',
                            image: 'http://www.example.com/image11.jpg',
                            titles: [
                                {
                                    lang: 'en',
                                    title: 'PDF 11'
                                }
                            ],
                            type: 'pdf',
                            url: 'http://www.example.com/pdf11.pdf',
                        },
                        {
                            id: '12',
                            image: 'http://www.example.com/image12.jpg',
                            titles: [
                                {
                                    lang: 'en',
                                    title: 'video 12'
                                }
                            ],
                            type: 'video',
                            url: 'http://www.example.com/video12.mp4',
                        },


                    ]
                }
            },
        },
    },
];

describe('LessonContainer Component', () => {
    test('The LessonContainer renders', () => {

        const component = renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <LessonContainer activityID={'11'} lessonID={'1'} />
                </MemoryRouter>
            </MockedProvider>
      ,
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('The LessonContainer renders a PDF', async () => {
        const { getByText, container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <LessonContainer activityID={'11'} lessonID={'1'} />
                </MemoryRouter>
            </MockedProvider>
        );
        expect(getByText('Loading...')).toBeDefined();
        await wait(() => expect(container.querySelector('.ActivityViewerCourse')).toBeDefined());
        expect(getByText('Course 1')).toBeDefined();
        expect(container.querySelector('iframe')).toBeDefined();
        expect(container.querySelector('iframe').src).toBe('http://www.example.com/pdf11.pdf');
        expect(container.querySelector('iframe').title).toBe('PDF 11');
        act(() => {
            container.querySelector('.lessonNavigation').click()
        })
        act(() => {
            container.querySelector('.lessonNavigation').click()
        })
    });

    test('The LessonContainer renders a video', async () => {

        const { getByText, container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <LessonContainer activityID={'12'} lessonID={'1'} />
                </MemoryRouter>
            </MockedProvider>
        );
        expect(getByText('Loading...')).toBeDefined();
        await wait(() => expect(container.querySelector('.ActivityViewerCourse')).toBeDefined());
        expect(container.querySelector('source').src).toBe('http://www.example.com/video12.mp4');
        expect(getByText('video 12')).toBeDefined();

    });

    test('The LessonContainer click on second item in carousel open the new activity', async () => {

        const { getByText, container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <LessonContainer activityID={'11'} lessonID={'1'} />
                </MemoryRouter>
            </MockedProvider>
        );
        expect(getByText('Loading...')).toBeDefined();
        await wait(() => expect(container.querySelector('.ActivityViewerCourse')).toBeDefined());
        act(() => {
            container.querySelectorAll('.playlistItem')[1].click()
        })

    });
});
