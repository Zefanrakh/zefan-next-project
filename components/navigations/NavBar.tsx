/** @jsxImportSource @emotion/react */
import { ReactElement } from "react";

type propsType = {
  sidebarWidth: number;
  transition: number;
};

const NavBar = (props: propsType): ReactElement => {
  const onClickLogout = (): void => {
    // this.$auth.logout();
  };

  //   const renderAccount = (): ReactElement => {
  //     // const name: any = this.$auth.user ? this.$auth.user.full_name : "Admin";
  //     const name = "Admin";

  //     return (
  //       <Dropdown isHoverable>
  //         <DropdownTrigger>
  //           <div
  //             css={{
  //               display: "flex",
  //               alignItems: "center",
  //               cursor: "pointer",
  //             }}
  //             role="button"
  //           >
  //             <span
  //               css={{
  //                 width: "32px",
  //                 height: "32px",
  //                 borderRadius: "50%",
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //                 backgroundColor: "#1977d2",
  //                 color: "white",
  //                 textTransform: "uppercase",
  //               }}
  //             >
  //               {name.charAt(0)}
  //             </span>
  //             <p
  //               css={{
  //                 marginLeft: "2rem",
  //                 marginRight: "2rem",
  //                 fontWeight: "600",
  //               }}
  //             >
  //               {name}
  //             </p>
  //             <Icon className="fa fa-angle-down"></Icon>
  //           </div>
  //         </DropdownTrigger>
  //         <DropdownMenu>
  //           <DropdownContent>
  //             <DropdownItem onClick={(): void => onClickLogout()}>
  //               <p>Logout</p>
  //             </DropdownItem>
  //           </DropdownContent>
  //         </DropdownMenu>
  //       </Dropdown>
  //     );
  //   };

  return (
    <nav
      css={{
        position: "fixed",
        top: 0,
        left: props.sidebarWidth + "px",
        right: 0,
        zIndex: 11,
        minHeight: "67px",
        backgroundColor: "#F6F7FB",
        display: "flex",
        alignItems: "center",
        transition: `ease-in-out left ${props.transition}s`,
      }}
    >
      <div css={{ flex: 1 }}>
        <h1
          css={{
            marginLeft: "1rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {""}
        </h1>
      </div>
      <div
        css={{
          padding: "2rem 3rem !important",
        }}
      >
        <p>{new Date().toDateString()}</p>
      </div>
      <div
        css={{
          height: "100%",
          borderLeft: "2px solid #D9DEE2",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "2rem 3rem !important",
        }}
      >
        {/* {renderAccount()} */}
      </div>
    </nav>
  );
};

export default NavBar;
