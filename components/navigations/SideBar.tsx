/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactElement, useContext, useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiClipboardCheck,
  mdiFileChart,
  mdiStore,
} from "@mdi/js";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import ExpandedContext from "../../store/isExpandedContext";

type Menu = {
  title: string;
  key: string;
  url: string;
  icon: string;
  iconActive: string;
  permissions: string[];
};

const menus: any = [
  {
    name: "Animes",
    icon: mdiClipboardCheck,
    link: "/",
    sub_menu: null,
  },
  // {
  //   name: "Report",
  //   icon: mdiFileChart,
  //   link: "#",
  //   visible_for: ["CUSTOMER", "VENDOR", "SUPPLIER"],
  //   sub_menu: [
  //     {
  //       name: "Performance",
  //       link: "/performance",
  //       visible_for: ["CUSTOMER", "VENDOR", "SUPPLIER"],
  //     },
  //     {
  //       name: "Visit",
  //       link: "/visit",
  //       visible_for: ["CUSTOMER", "VENDOR", "SUPPLIER"],
  //     },
  //   ],
  // },
  {
    name: "Collections",
    icon: mdiStore,
    link: "/collections",
    sub_menu: null,
  },
];

type MenuButtonItemProps = {
  isExpanded: boolean;
  isActive: boolean;
  transition: number;
};

const MenuButtonItem: any = styled("a")<MenuButtonItemProps>(
  {
    fontStyle: "normal",
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
    "&:hover": {
      color: "#1977d2",
    },
  },
  (props: MenuButtonItemProps): CSSObject => {
    {
      let propsDependedAttributes: CSSObject = {
        transition: `padding ${props.transition}s, padding-left ${props.transition}s`,
      };
      if (props.isActive) {
        propsDependedAttributes = {
          ...propsDependedAttributes,
          backgroundColor: "#003DA6",
          borderRadius: "10px",
          color: "white !important",
          fontWeight: "bold",
          padding: props.isExpanded ? "1rem" : "0.8rem",
        };
      } else {
        propsDependedAttributes = {
          ...propsDependedAttributes,
          paddingLeft: props.isExpanded ? "0rem" : "0.8rem",
        };
      }
      return propsDependedAttributes;
    }
  }
);

type ExpandableItemProps = {
  isExpanded: boolean;
  transition: number;
};

const MenuItem: any = styled("li")<ExpandableItemProps>(
  {},
  (props: ExpandableItemProps) => {
    return {
      padding: props.isExpanded ? "0.75rem 30px" : "0.75rem 10px",
      transition: `padding ${props.transition}s`,
    };
  }
);

const MainLogoTitle = styled("h1")<ExpandableItemProps>(
  {
    fontSize: "1.25rem",
    fontWeight: "bolder",
    marginLeft: "0.25rem",
    whiteSpace: "nowrap",
    lineHeight: "24px",
  },
  (props: ExpandableItemProps) => {
    return {
      opacity: props.isExpanded ? 1 : 0,
      transition: `${props.transition}s ease-in-out`,
    };
  }
);

const MenuItemContainer: any = styled.div`
  white-space: nowrap;
`;

type SubMenuButtonItemProps = {
  isActive: boolean;
};

const SubMenuButtonItem: any = styled("a")<SubMenuButtonItemProps>(
  {},
  (props: SubMenuButtonItemProps) => {
    let propsDependedAttributes: CSSObject = {
      color: "black",
      "&:hover": {
        color: "#1977d2",
      },
    };
    if (props.isActive) {
      propsDependedAttributes = {
        ...propsDependedAttributes,
        color: "#00d1b2",
        "&:hover": {
          color: "#009e86",
        },
        "&:focus": {
          color: "#009e86",
        },
      };
    }
    return propsDependedAttributes;
  }
);

type propsType = {
  maxSidebarWidth: number;
  transition: number;
  toggleSidebar: Function;
};

const SideBar = (props: propsType): ReactElement => {
  const router = useRouter();
  const expandedCtx = useContext(ExpandedContext);
  const [activeMenu, setActiveMenu] = useState("Assignment");
  const [activeMenuLevel2, setActiveMenuLevel2] = useState("");

  useEffect(() => {
    //  const path = this.$route.path;
    const path = router.pathname;
    menus.forEach((menu: any) => {
      if (path === menu.link) {
        setActiveMenu(menu.name);
      } else if (menu.sub_menu) {
        const temp = menu.sub_menu.find((menu_2: any) => {
          return menu_2.link === path;
        });
        if (temp) {
          setActiveMenuLevel2(temp.name);
          setActiveMenu(menu.name);
        }
      }
    });
  });

  const renderMenu = (): ReactElement => {
    return (
      <div>
        <ul>
          {menus.map((menu: any) => {
            return renderMenuItem(
              menu.name,
              menu.link,
              menu.icon,
              menu.sub_menu
            );
          })}
        </ul>
      </div>
    );
  };

  const renderMenuItem = (
    name: string,
    link: string,
    icon: string,
    sub_menu?: []
  ): ReactElement => {
    return (
      <MenuItem
        key={name}
        isExpanded={expandedCtx.isExpanded}
        transition={props.transition}
      >
        <Link href={sub_menu ? "#" : link}>
          <MenuButtonItem
            isActive={activeMenu === name}
            isExpanded={expandedCtx.isExpanded}
            transition={props.transition}
            onClick={(): void => sub_menu && selectMenu(name)}
          >
            <MenuItemContainer>
              <Icon
                path={icon}
                size="15px"
                style={{
                  transform: expandedCtx.isExpanded
                    ? "scale(1) translate(0,0)"
                    : "scale(2) translate(0.25rem, 0)",
                  transition: `ease-in-out all ${props.transition}s`,
                }}
              />
              <span
                css={{
                  opacity: expandedCtx.isExpanded ? 1 : 0,
                  transition: `ease-in-out opacity ${props.transition}s`,
                  marginLeft: "0.5rem",
                }}
              >
                {name}
              </span>
            </MenuItemContainer>
            {sub_menu && (
              <Icon
                path={activeMenu === name ? mdiChevronUp : mdiChevronDown}
                size="20px"
              />
            )}
          </MenuButtonItem>
        </Link>
        {sub_menu && !expandedCtx.isExpanded && activeMenu === name ? (
          <div
            css={{
              position: "fixed",
              height: "fit-content",
              width: "fit-content",
              marginBottom: "0.5rem",
              transform: "translate(80px, -80px)",
              backgroundColor: "white",
              borderRadius: "0.25rem",
              boxShadow:
                "0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)",
              color: "#4a4a4a",
              maxWidth: "100%",
              padding: "1rem",
            }}
          >
            {renderSubMenu(name, sub_menu)}
          </div>
        ) : sub_menu && expandedCtx.isExpanded ? (
          renderSubMenu(name, sub_menu)
        ) : (
          ""
        )}
      </MenuItem>
    );
  };

  const renderSubMenu = (name: string, sub_menu: []): ReactElement => {
    return (
      <ul
        css={{
          overflow: "hidden",
          transition: `ease-in-out ${props.transition}s max-height`,
          maxHeight: activeMenu === name ? `${props.maxSidebarWidth}px` : "0px",
          paddingLeft: expandedCtx.isExpanded ? "3rem" : undefined,
        }}
      >
        {sub_menu.map((menu: any) => {
          return renderSubMenuItem(menu.name, menu.link);
        })}
      </ul>
    );
  };

  const renderSubMenuItem = (name: string, link: string): ReactElement => {
    return (
      <li
        key={name}
        css={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      >
        <Link href={link}>
          <SubMenuButtonItem isActive={activeMenuLevel2 === name}>
            {name}
          </SubMenuButtonItem>
        </Link>
      </li>
    );
  };
  const selectMenu = (menuTitle: string): void => {
    if (menuTitle === activeMenu) {
      setActiveMenu("");
    } else {
      setActiveMenu(menuTitle);
    }
  };

  const goToLink = (link: string): void => {
    router.push(link);
  };

  const toggleSideNavExpander = (): void => {
    props.toggleSidebar(!expandedCtx.isExpanded);
  };

  const renderLogo = (): ReactElement => {
    return (
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      >
        <div
          css={{
            display: "flex",
            width: "75%",
          }}
        >
          <img
            width={56}
            height={56}
            src="/icons/dashboard/sidebar-menu/manuva-logo.svg"
            alt="main logo"
          />
          <MainLogoTitle
            isExpanded={expandedCtx.isExpanded}
            transition={props.transition}
          >
            SALES DASHBOARD
          </MainLogoTitle>
        </div>
      </div>
    );
  };

  return (
    <aside
      css={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: `${props.maxSidebarWidth}px`,
        height: "100%",
        padding: expandedCtx.isExpanded ? "1rem" : "0rem",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
        overflowX: "hidden",
        overflowY: "auto",
        transition: `ease-in-out ${props.transition}s all`,
        maxWidth: expandedCtx.isExpanded
          ? `${props.maxSidebarWidth}px`
          : "80px",
        background: "white",
      }}
    >
      {renderLogo()}
      <div
        css={{
          paddingBottom: "5rem",
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span
            css={{
              cursor: "pointer",
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
            onClick={(): void => toggleSideNavExpander()}
          >
            Icon
          </span>
        </div>
        <hr
          css={{
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        />
        {renderMenu()}
      </div>
    </aside>
  );
};

export default SideBar;
