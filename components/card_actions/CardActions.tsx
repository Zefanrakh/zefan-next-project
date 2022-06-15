import styled from "@emotion/styled";
import Icon from "@mdi/react";
import { ReactElement } from "react";
import { mdiDotsHorizontal } from "@mdi/js";

const CardActionWrapper = styled("div")<{}>({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  userSelect: "none",
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
  "&:hover": {
    height: "100%",
    "div:nth-child(2)": {
      transform: "translateY(40px)",
      opacity: "100%",
    },
    "div:nth-child(3)": {
      transform: "translateY(80px)",
      opacity: "100%",
    },
    "div:nth-child(4)": {
      transform: "translateY(120px)",
      opacity: "100%",
    },
  },
});

const CardActionMainButton = styled("div")<{}>({
  position: "relative",
  height: "40px",
  width: "40px",
  backgroundColor: "rgba(180, 180, 180, 0.5)",
  borderRadius: "50%",
  zIndex: 2,
});

const CardActionMainButtonComponent = styled("div")<{}>({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  borderRadius: "50%",
});

const CardActionSubButton = styled("div")<{}>({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: "10px",
  height: "35px",
  width: "35px",
  transition: "all .3s ease",
  backgroundColor: "rgba(150, 150, 150, 1)",
  borderRadius: "50%",
  opacity: "0%",
  "&:hover": {
    cursor: "pointer",
  },
});

type propsType = {};

const CardActions = (props: propsType): ReactElement => {
  return (
    <CardActionWrapper>
      <CardActionMainButton>
        <CardActionMainButtonComponent>
          <Icon
            path={mdiDotsHorizontal}
            style={{
              color: "white",
              fontSize: "28px",
            }}
          ></Icon>
        </CardActionMainButtonComponent>
      </CardActionMainButton>
      <CardActionSubButton>
        <Icon
          path={mdiDotsHorizontal}
          style={{
            color: "white",
            fontSize: "10px",
          }}
        ></Icon>
      </CardActionSubButton>
      <CardActionSubButton>
        <Icon
          path={mdiDotsHorizontal}
          style={{
            color: "white",
            fontSize: "10px",
          }}
        ></Icon>
      </CardActionSubButton>
    </CardActionWrapper>
  );
};

export default CardActions;
