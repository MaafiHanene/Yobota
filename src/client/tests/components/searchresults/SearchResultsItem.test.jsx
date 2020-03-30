import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter, Route } from "react-router-dom";
import { mount, configure } from "enzyme";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SearchResultsItem from "../../../components/searchResultsItem";

configure({ adapter: new Adapter() });

describe("SearchResultsItem Layout Component", () => {
  test("The SearchResultsItem renders", () => {
    const activityData = {
      id: "1",
      title: "Test Title",
      type: "pdf",
      image: "test.jpg",
      playList: []
    };
    let Location;
    const activity = mount(
      <MemoryRouter initialEntries={["/"]}>
        {/* // eslint-disable-next-line react/jsx-filename-extension */}
        <SearchResultsItem {...activityData} />
        <Route
          path="*"
          render={({ location }) => {
            Location = location;
            return null;
          }}
        />
      </MemoryRouter>
    );

    const title = activity.find(".title").first();
    expect(title.text()).toBe(activityData.title);
    title.props().onClick();
    expect(Location.pathname).toBe(`/view-activity/${activityData.id}`);
    expect(activity).toMatchSnapshot();
  });

  test("if there is no Image provided it should show a blank image", () => {
    const searchResultsItemData = {
      id: "1",
      title: "Test Title",
      type: "pdf",
      image: undefined,
      playList: []
    };
    const { getByText, container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchResultsItem {...searchResultsItemData} />
      </MemoryRouter>
    );
    expect(getByText(searchResultsItemData.title)).toBeDefined();
    expect(container.querySelector(".searchResultsItemImage").src).toBe(
      "http://localhost/emptyImage.svg"
    );
  });

  test("click on title will redirect to new window", () => {
    const searchResultsItemData = {
      id: "1",
      title: "Test Title",
      type: "pdf",
      image: "test.jpg",
      playList: []
    };
    const { getByText, container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchResultsItem {...searchResultsItemData} />
        <Route
          path="*"
          render={({ history }) => (
            <div className="location">{history.location.pathname}</div>
          )}
        />
      </MemoryRouter>
    );
    expect(getByText(searchResultsItemData.title)).toBeDefined();
    expect(container.querySelector(".location").innerHTML).toBe("/");
    act(() => {
      container.querySelector(".title").click();
    });
    expect(container.querySelector(".location").innerHTML).toBe(
      `/view-activity/${searchResultsItemData.id}`
    );
  });
  test("click on Image will redirect to new window", () => {
    const searchResultsItemData = {
      id: "1",
      title: "Test Title",
      type: "pdf",
      image: "test.jpg",
      playList: []
    };
    const { getByText, container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchResultsItem {...searchResultsItemData} />
        <Route
          path="*"
          render={({ history }) => (
            <div className="location">{history.location.pathname}</div>
          )}
        />
      </MemoryRouter>
    );
    expect(getByText(searchResultsItemData.title)).toBeDefined();
    expect(container.querySelector(".location").innerHTML).toBe("/");
    act(() => {
      container.querySelector(".searchResultsItemImage").click();
    });
    expect(container.querySelector(".location").innerHTML).toBe(
      `/view-activity/${searchResultsItemData.id}`
    );
  });

  test("click on addplus will open add to playlist", () => {
    const searchResultsItemData = {
      id: "1",
      title: "Test Title",
      type: "pdf",
      image: "test.jpg",
      playList: []
    };
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchResultsItem {...searchResultsItemData} />
      </MemoryRouter>
    );

    act(() => {
      container.querySelector(".addPlus").click();
    });
    expect("My new playlist").toBeDefined();
  });
  test("click on addplus will show the available playlists", () => {
    const searchResultsItemData = {
      id: "1",
      title: "Test Title",
      type: "pdf",
      image: "test.jpg",
      playList: [
        {
          id: "1",
          name: "playlist1"
        },
        {
          id: "1",
          name: "playlist2"
        }
      ]
    };
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchResultsItem {...searchResultsItemData} />
      </MemoryRouter>
    );

    act(() => {
      container.querySelector(".addPlus").click();
    });
    expect("My new playlist").toBeDefined();
    expect(searchResultsItemData.playList[0].name).toBeDefined();
    expect(searchResultsItemData.playList[1].name).toBeDefined();
  });
  test("click on playlist (+) will call addToPlaylist", () => {
    const addToPlaylistPlusMock = jest.fn();
    const searchResultsItemData = {
      id: "1",
      title: "Test Title",
      type: "pdf",
      image: "test.jpg",
      playList: [],
      addToPlaylist: addToPlaylistPlusMock
    };
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchResultsItem {...searchResultsItemData} />
      </MemoryRouter>
    );

    act(() => {
      container.querySelector(".addPlus").click();
    });
    expect("My new playlist").toBeDefined();
    act(() => {
      container
        .querySelector(".availablePlayListCreate")
        .querySelector("img")
        .click();
    });
    expect(addToPlaylistPlusMock).toHaveBeenCalled();
    expect(addToPlaylistPlusMock).toBeCalledWith("1", null, "My new playlist");
  });

  test("click on the specified playlist  will call addToPlaylist with playlist and activity ID", () => {
    const addToPlaylist1Mock = jest.fn();
    const searchResultsItemData = {
      id: "1",
      title: "Test Title",
      type: "pdf",
      image: "test.jpg",
      playList: [
        {
          id: "2",
          name: "playlist123"
        }
      ],
      addToPlaylist: addToPlaylist1Mock
    };
    const { getByText, container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <SearchResultsItem {...searchResultsItemData} />
      </MemoryRouter>
    );

    act(() => {
      container.querySelector(".addPlus").click();
    });
    expect("My new playlist").toBeDefined();
    act(() => {
      getByText(searchResultsItemData.playList[0].name).click();
    });
    expect(addToPlaylist1Mock).toHaveBeenCalled();
    expect(addToPlaylist1Mock).toBeCalledWith("1", "2", "My new playlist");
  });
});
