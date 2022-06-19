import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { ReactElement, useContext } from "react";
import NavigationContext from "../../store/navigation_context";

type MobileNavigationProps = {
  isShow: boolean;
};

const MobileNavigation = styled("div")<MobileNavigationProps>(
  {
    clear: "both",
    paddingTop: "20px",
    overflow: "hidden",
    "@media screen and (min-width: 991px)": {
      display: "none !important",
    },
  },
  (props: MobileNavigationProps): CSSObject => {
    let propsDependedAttributes: CSSObject = {
      maxHeight: "0px",
      transition: "all linear 0.5s",
    };
    if (props.isShow) {
      propsDependedAttributes = {
        ...propsDependedAttributes,
        maxHeight: "500px",
      };
    }
    return propsDependedAttributes;
  }
);

const MobileNavigationMenuContainer = styled("ul")<{}>({
  padding: "10px 20px",
  backgroundColor: "white",
  borderRadius: "3px",
  listStyle: "none",
});

const MobileNavigationMenuItem = styled("li")<{}>({
  borderBottom: "1px solid #eeeeef",
  "&:last-child": {
    borderBottom: "none",
  },
  "& a": {
    color: "#84878d",
    padding: "10px",
    display: "block",
    "&:hover": {
      color: "#ffaa3c",
    },
  },
});

const MobileNavigationComponent = (): ReactElement => {
  const ctx = useContext(NavigationContext);

  return (
    <MobileNavigation isShow={ctx.isToggleNavigation}>
      <MobileNavigationMenuContainer>
        <Link href="/">
          <MobileNavigationMenuItem>
            <a>Home</a>
          </MobileNavigationMenuItem>
        </Link>
        <Link href="/collections">
          <MobileNavigationMenuItem>
            <a>Collections</a>
          </MobileNavigationMenuItem>
        </Link>
      </MobileNavigationMenuContainer>
    </MobileNavigation>
  );
};

export default MobileNavigationComponent;
