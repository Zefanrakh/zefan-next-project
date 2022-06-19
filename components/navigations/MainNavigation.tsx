import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { ReactElement, useContext } from "react";
import { useRouter } from "next/router";
import NavigationContext from "../../store/navigation_context";

const MAIN_PATH_REGEX = RegExp("(?<=[a-zA-Z0-9])\\/\\[.*\\]|\\[.*\\]");

type Menu = {
  name: string;
  link: string;
};

const menus: Menu[] = [
  {
    name: "Animes",
    link: "/",
  },
  {
    name: "Collections",
    link: "/collections",
  },
];

const MainNavigation = styled("div")<{}>({
  float: "right",
  background: "white",
  borderRadius: "5px",
});

const MainNavigationMenuToggle = styled("button")<{}>({
  color: "#333",
  border: "none",
  background: "none",
  fontSize: "1.2em",
  padding: "8px 15px",
  display: "none",
  outline: "none",
  verticalAlign: "middle",
  "@media screen and (max-width: 990px)": {
    display: "inline-block",
  },
  "@media screen and (min-width: 991px)": {
    display: "none !important",
  },
});

const MainNavigationMenuContainer = styled("ul")<{}>({
  listStyle: "none",
  margin: "0",
  verticalAlign: "middle",
  "@media screen and (max-width: 990px)": {
    display: "none",
  },
  "@media screen and (min-width: 991px)": {
    display: "inline-block !important",
  },
});

type MainNavigationMenuItemProps = {
  isFocus?: boolean;
};

const MainNavigationMenuItem = styled("li")<MainNavigationMenuItemProps>(
  {
    display: "inline-block",
    padding: "10px 0",
    cursor: "pointer",
    "& a": {
      padding: "0 15px",
      display: "inline-block",
      color: "#84878d",
      fontSize: "0.9333333333em",
      fontWeight: "400",
      lineHeight: "1",
      borderRight: "1px solid #eeeeef",
    },
    "&:hover": {
      position: "relative",
      "&:after": {
        content: '" "',
        position: "absolute",
        width: "80%",
        height: "3px",
        backgroundColor: "#ffaa3c",
        bottom: "-3px",
        left: "0",
        right: "0",
        margin: "0 auto",
        display: "block",
      },
    },
  },
  (props: MainNavigationMenuItemProps): CSSObject => {
    if (props.isFocus) {
      return {
        position: "relative",
        "&:after": {
          content: '" "',
          position: "absolute",
          width: "80%",
          height: "3px",
          backgroundColor: "#ffaa3c",
          bottom: "-3px",
          left: "0",
          right: "0",
          margin: "0 auto",
          display: "block",
        },
      };
    }
    return {};
  }
);

const MainNavigationComponent = (): ReactElement => {
  const router = useRouter();
  const ctx = useContext(NavigationContext);

  const mainPath = router.pathname.replace(MAIN_PATH_REGEX, "");

  return (
    <MainNavigation>
      <MainNavigationMenuToggle
        onClick={() => {
          ctx.setToggleNavigation(!ctx.isToggleNavigation);
        }}
      >
        <Icon path={mdiMenu} size={1}></Icon>
      </MainNavigationMenuToggle>
      <MainNavigationMenuContainer>
        {menus.map((menu: Menu) => (
          <Link key={menu.link} href={menu.link}>
            <MainNavigationMenuItem isFocus={menu.link === mainPath}>
              <a>{menu.name}</a>
            </MainNavigationMenuItem>
          </Link>
        ))}
      </MainNavigationMenuContainer>
    </MainNavigation>
  );
};

export default MainNavigationComponent;
