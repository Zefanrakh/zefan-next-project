/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import MainNavigationComponent from "../navigations/MainNavigation";
import MobileNavigationComponent from "../navigations/MobileNavigation";
import BreadCrumbsComponent from "./breadcrumbs/BreadCrumbs";
import NavigationContext from "../../store/navigation_context";

const SiteHeader = styled("header")<{}>({
  padding: "50px 0",
  "& *": { zoom: 1 },
  "&:after": {
    content: '" "',
    clear: "both",
    display: "block",
    overflow: "hidden",
    height: 0,
  },
});

type ContainerProps = {
  isMainContent?: boolean;
};

const Container = styled("div")<ContainerProps>(
  {
    marginRight: "auto",
    marginLeft: "auto",
    paddingLeft: "15px",
    paddingRight: "15px",
    "& *": {
      zoom: 1,
    },
    "&:after": {
      content: '" "',
      clear: "both",
      display: "block",
      overflow: "hidden",
      height: "0",
    },
    "@media (min-width: 768px)": {
      width: "750px",
    },
    "@media (min-width: 992px)": {
      width: "970px",
    },
    "@media (min-width: 1200px)": {
      width: "1170px",
    },
  },
  (props: ContainerProps): CSSObject => {
    if (props.isMainContent) {
      return {
        background: "white",
        borderRadius: "5px",
        padding: "30px",
      };
    }
    return {};
  }
);

const Branding = styled("a")<{}>({
  float: "left",
  "& img": {
    marginRight: "10px",
    display: "inline-block",
  },
  "& div": {
    display: "inline-block",
    "& h1": {
      margin: "0",
      textTransform: "uppercase",
      color: "white",
      fontSize: "1.0666666667em",
    },
    "& small": {
      fontSize: "0.8666666667em",
      color: "#9198af",
    },
  },
});

const Page = styled("div")<{}>({
  "& figure": {
    marginBottom: "30px",
  },
  "& img": {
    maxWidth: "100%",
  },
});

const Footer = styled("footer")<{}>({
  padding: "50px 0",
});
const Colophon = styled("div")<{}>({
  paddingTop: "30px",
});

type propsType = {
  children: React.ReactNode;
};

const MainLayout = (props: propsType) => {
  const [navbarShown, showNavbar] = useState(false);

  return (
    <div>
      <SiteHeader>
        <Container>
          <Branding>
            <img src="images/logo.png" alt="" />
            <div>
              <h1>Company Name</h1>
              <small>Tagline goes here</small>
            </div>
          </Branding>
          <NavigationContext.Provider
            value={{
              isExpanded: false,
              setExpandState: () => {},
              isToggleNavigation: navbarShown,
              setToggleNavigation: () => {
                showNavbar(!navbarShown);
              },
            }}
          >
            <MainNavigationComponent />
            <MobileNavigationComponent />
          </NavigationContext.Provider>
        </Container>
      </SiteHeader>
      <main>
        <Container isMainContent>
          <Page>
            <BreadCrumbsComponent />
            {props.children}
          </Page>
        </Container>
      </main>
      <Footer>
        <Container>
          <Colophon>

          </Colophon>
        </Container>
      </Footer>
    </div>
  );
};

export default MainLayout;
