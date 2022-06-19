/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../navigations/NavBar";
import SideBar from "../navigations/SideBar";
import PropTypes from "prop-types";
import { useMediaQuery, Context as ResponsiveContext } from "react-responsive";
import NavigationContext from "../../store/navigation_context";

PropTypes.element.isRequired;

declare const Transition: any;
declare const RouterView: any;

type SideBarBorderProp = {
  isExpanded: boolean;
  transition: number;
  maxSidebarWidth: number;
};

const SideBarBorder = styled("div")<SideBarBorderProp>(
  {
    width: "5px",
    cursor: "pointer",
    top: "0px",
    bottom: "0px",
    background: "#f1f1f1",
    position: "fixed",
    "&:hover": {
      width: "9px",
      background: "#9e9e9e",
    },
  },
  (props: SideBarBorderProp): CSSObject => {
    return {
      left: props.isExpanded ? `${props.maxSidebarWidth}px` : "80px",
      transition: `left ease-in-out ${props.transition}s, width ease-in-out 0.25s, background ease-in-out 0.25s`,
    };
  }
);

type propsType = {
  children: React.ReactNode;
};

const MainLayout = (props: propsType) => {
  const { children } = props;
  const [isExpanded, setExpandState] = useState(true);
  const [mounted, setMounted] = useState(false);
  const isMobileOrTabletAtMaxWidth768 = useMediaQuery(
    { maxWidth: 768 },
    undefined,
    () => {
      setTransitionIsUsed(false);
    }
  );
  const [isUseTransition, setTransitionIsUsed] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxSidebarWidth = 350;

  const transition = 0.25;

  return (
    <NavigationContext.Provider
      value={{
        isExpanded: isExpanded,
        setExpandState,
        isToggleNavigation: false,
        setToggleNavigation: () => {},
      }}
    >
      <div css={{ position: "relative" }}>
        {/* <NavBar
          transition={transition}
          sidebarWidth={isExpanded ? maxSidebarWidth : 80}
        /> */}
        <div css={{ display: "flex" }}>
          <div
            css={{
              position: "relative",
              zIndex: 20,
              display:
                mounted && !isMobileOrTabletAtMaxWidth768 ? "unset" : "none",
            }}
          >
            <SideBar
              maxSidebarWidth={maxSidebarWidth}
              transition={transition}
              toggleSidebar={setExpandState}
            />
            <SideBarBorder
              onClick={(): void => {
                setTransitionIsUsed(true);
                setExpandState(!isExpanded);
              }}
              isExpanded={isExpanded}
              transition={transition}
              maxSidebarWidth={maxSidebarWidth}
            />
          </div>
          {/* )} */}
          <div
            css={{
              paddingLeft:
                (mounted && isMobileOrTabletAtMaxWidth768) || !mounted
                  ? "0%"
                  : isExpanded
                  ? `${maxSidebarWidth + 70}px`
                  : "100px",
              marginTop: "100px",
              width: "98%",
              transition: `ease-in-out padding-left ${
                mounted && isMobileOrTabletAtMaxWidth768
                  ? 0
                  : isUseTransition
                  ? transition
                  : 0
              }s`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </NavigationContext.Provider>
  );
};

export default MainLayout;
