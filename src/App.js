import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  withRouter,
} from "react-router-dom";
import {
  Breadcrumb,
  Layout,
  Menu,
  Row,
  Col,
  Dropdown,
  Button,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import favicon from "./assets/favicon.png";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  DownOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Users from "./pages/Users";
import FreeUsers from "./pages/FreeUsers";
import PaidUsers from "./pages/PaidUsers";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import ChangeAddress from "./components/ChangeAddress";
import VipUsers from "./pages/VipUsers";
import vvipUsers from "./pages/vvip";
import freePaid from "./pages/freepaid";

const breadcrumbNameMap = {
  "/": "All Users",
  "/free-users": "Free Users",
  "/paid-users": "Paid Users",
  "/change-password": "Change Password",
};

const { Header, Sider, Content, Footer } = Layout;
const Home = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">All Users</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  const handleChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("DD-MM-YYYY") : "None"}`
    );
  };
 const googleTranslateElementInit=()=> {
    /* eslint-disable no-new */
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      "google_translate_element"
    );
    var flags = document.getElementsByClassName("flag_link");
   
    Array.prototype.forEach.call(flags, function (e) {
      e.addEventListener("click", function () {
        var lang = e.getAttribute("data-lang");
        var languageSelect = document.querySelector("select.goog-te-combo");
        languageSelect.value = lang;
        languageSelect.dispatchEvent(new Event("change"));
        window.localStorage.setItem("localLang",lang);
      });
    });
   }

  const handleMenuClick = (e) => {
    console.log("click", e);
    if (e.key == "3") {
      message.info("Signing out...");
      logOut();
    }
  };
  useEffect(()=>{
    const script = document.createElement("script");
 script.src =
   "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
 script.async = true;
 document.body.appendChild(script);
 window.googleTranslateElementInit = googleTranslateElementInit;

  })
    


  
 // Google Translate
 

  const [collapsed, setCollapsed] = useState(false);
  const { SubMenu } = Menu;
 
  const languages = [
    {
      code: "en",
      name: "English",
      country_code: "UK",
    },
    {
      code: "ta",
      name: "Tamil",
      country_code: "India",
    },
  ];
  const logOut = () => {
    window.localStorage.removeItem("isLoggedInAdmin");
    window.localStorage.removeItem("adminToken");
    window.location.href = "/";
  };
  const menu = (
    <Menu
      onClick={(e) => {
        handleMenuClick(e);
      }}
    >
      <Menu.Item key="1" icon={<EditOutlined />}>
        <Link to="/change-password">Change Password</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<EditOutlined />}>
        <Link to="/change-address">Change Address</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img
            className={collapsed ? "small_logo_img" : "large_logo_img"}
            src={favicon}
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">All Users</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserAddOutlined />}>
            <Link to="/free-users">Free Users</Link>
          </Menu.Item>
          <SubMenu title="Language Setting" popupClassName="langmenu">
          {languages.map(({ code, name, country_code }) => {
            return (
              <Menu.Item
                key={code}
                onClick={() => {
                  document.getElementById(code).click();
                }}
              >
                {name}
              </Menu.Item>
            );
          })}
        </SubMenu>
          <Menu.Item key="3" icon={<UserSwitchOutlined />}>
            <Link to="/paid-users">Paid Users</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserSwitchOutlined />}>
            <Link to="/vip-users">Vip Users</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserSwitchOutlined />}>
            <Link to="/vvip-users">VVIP Users</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<UserSwitchOutlined />}>
            <Link to="/freepaid-users">Free-Paid Users</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col xs={12}>
              {collapsed ? (
                <MenuUnfoldOutlined
                  id="mob_trigger"
                  className="trigger_icon"
                  onClick={() => setCollapsed(!collapsed)}
                />
              ) : (
                <MenuFoldOutlined
                  className="trigger_icon"
                  onClick={() => setCollapsed(!collapsed)}
                />
              )}
            </Col>
            <Col xs={12} align="right" className="trigger_icon">
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button>
                  Action <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content className="content-layout-background">
          {/* <Breadcrumb>{breadcrumbItems}</Breadcrumb> */}
          <Switch>
            <Route path="/free-users" component={FreeUsers} />
            <Route path="/paid-users" component={PaidUsers} />
            <Route path="/vip-users" component={VipUsers} />
            <Route path="/vvip-users" component={vvipUsers} />

            <Route path="/freepaid-users" component={freePaid} />

            <Route path="/change-password" component={ChangePassword} />
            <Route path="/change-address" component={ChangeAddress} />
            <Route path="/" component={Users} />
          </Switch>
        </Content>
        <div id="google_translate_element"></div>
              <div
                className="flag"
                // style={{ display: "inline-block", marginTop: 9 }}
                style={{ display: "none" }}
              >
                <a href="#" className="flag_link en navLink" data-lang="en" id="en">
                  <span className="lang_text lang-text"> English</span>
                </a>

                <a
                  href="#"
                  className="flag_link ta navLink"
                  data-lang="ta"
                  id="ta"
                >
                  <span className="lang_text  lang-text"> Tamil</span>
                </a>
              </div>
        <Footer style={{ textAlign: "center" }}>
          GANESHKONGUMATRIMONY ©2021 Created By VINVINCIBLES
        </Footer>
      </Layout>
    </Layout>
  );
});

const App = () => {
  const bool = window.localStorage.getItem("isLoggedInAdmin");
  return <Router>{bool ? <Home /> : <Login />}</Router>;
};
export default App;
