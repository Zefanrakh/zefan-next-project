import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";
import { mdiCheck } from "@mdi/js";
import Icon from "@mdi/react";
import { ReactElement } from "react";

type CardActionWrapperProps = {
  isChecked: boolean;
};

const CardActionWrapper = styled("div")<CardActionWrapperProps>(
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    userSelect: "none",
    position: "absolute",
    top: "10px",
    right: "25px",
    cursor: "pointer",
  },
  (props: CardActionWrapperProps): CSSObject => {
    return {
      "& svg": {
        opacity: props.isChecked ? "100%" : "0%",
        transition: "all .3s ease",
      },
    };
  }
);

type CardActionMainButtonProps = {
  isChecked: boolean;
};

const CardActionMainButton = styled("div")<CardActionMainButtonProps>(
  {
    position: "relative",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    zIndex: 2,
  },
  (props: CardActionMainButtonProps): CSSObject => {
    return {
      backgroundColor: props.isChecked
        ? "rgba(255, 255, 255, 0.75)"
        : "rgba(180, 180, 180, 0.5)",
    };
  }
);

const CardActionMainButtonComponent = styled("div")<{}>({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px",
  height: "100%",
  width: "100%",
  borderRadius: "50%",
});

type propsType = {
  isChecked: boolean;
  onCheck: Function;
};

const CardCheck = (props: propsType): ReactElement => {
  return (
    <CardActionWrapper isChecked={props.isChecked}>
      <CardActionMainButton
        isChecked={props.isChecked}
        onClick={(event) => {
          event.stopPropagation();
          props.onCheck();
        }}
      >
        <CardActionMainButtonComponent>
          <Icon
            path={mdiCheck}
            style={{
              color: props.isChecked ? "#0059ff" : "white",
            }}
          ></Icon>
        </CardActionMainButtonComponent>
      </CardActionMainButton>
    </CardActionWrapper>
  );
};

export default CardCheck;
