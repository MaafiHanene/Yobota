import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Media from "react-media";
import { Layout, Menu, Icon /*Button, Popconfirm */ } from "antd";

import App from "./App";
import i18n from './i18n';
import NavOptions from "./components/NavOptions";
import appRoutes from "./providers/appRoutes";
// interface Props {}

// interface State {}

// const Footer = styled(LayoutFooter)(`
//         padding: ${WebMetrics.defaultMetrics.noPadding};
// `);

// const App = styled('div')`
//     opacity: 0;
//     transition: opacity 1s ease-out;
//     &.application-mounted {
//         opacity: 1;
//     }
// `;

const { Header, Content, Sider } = Layout;
const menuStyle = {
  paddingTop: "10px"
};
const Item = Menu.Item;

const AppWrapper = ({ store, client, history }: any) => {
  const [pageKey, setPagekey] = useState("Table View");

  useEffect(() => {
    const navMenu = NavOptions.find(
      nav => nav.path.includes(window.location.pathname)
    );
    if (navMenu && navMenu.key !== pageKey) setPagekey(navMenu.key);
  }, []);

  const handlePageChange = (e: any) => {
    setPagekey(e.key);
    history.push(
      e.key === "Table View"
        ? appRoutes.tableView(i18n.language)
        : appRoutes.chartView(i18n.language)
    );
  };
  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
  };

  const renderSider = (isMatch: boolean) => {
    const width = isMatch ? 200 : 41;
    const collapsedWidth = isMatch ? 64 : 0;
    return (
      <Sider
        id="nav"
        breakpoint="lg"
        width={width}
        collapsedWidth={collapsedWidth}
        collapsible={true}
        collapsed={false}
        trigger={null}
        onCollapse={onCollapse}
      >
        <Menu
          theme="dark"
          style={menuStyle}
          defaultSelectedKeys={["Table View"]}
          onClick={handlePageChange}
          selectedKeys={[pageKey]}
        >
          <Item key="3" style={{ background: "rgb(20, 41, 61)" }}>
            Logo
          </Item>
          {NavOptions.map(el => {
            return (
              <Menu.Item key={el.key}>
                {/* <Link to={el.path}> */}
                <Icon type={el.iconType} />
                <span>{el.key}</span>
                {/* </Link> */}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    );
  };

  return (
    <Layout>
      <Media query={{ minWidth: "200px" }}>
        {isMatch => renderSider(isMatch)}
      </Media>
      <Layout style={{ minHeight: "100vh" }}>
        <Header id="header">
          {/* <Popconfirm
                title="Are you sure you want to disconnect ?"
                placement="bottomRight"
                icon={
                  <Icon type="question-circle-o" style={{ color: "red" }} />
                }
              >
                <Button style={{ left: "95%" }}>Log out</Button>
              </Popconfirm> */}
        </Header>
        <Content>
          <App store={store} client={client} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(AppWrapper);
