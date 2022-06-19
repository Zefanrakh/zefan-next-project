import styled from "@emotion/styled";
import Icon from "@mdi/react";
import { CSSObject } from "@emotion/react";
import { ReactElement, useContext } from "react";
import { mdiDotsHorizontal, mdiPencil, mdiTrashCan } from "@mdi/js";
import CardActionContext from "../../store/card_action_context";

export enum Actions {
  REMOVE = "REMOVE",
  EDIT = "EDIT",
}

type actionIconsType = {
  [action in Actions]: string;
};

const actionIcons: actionIconsType = {
  REMOVE: mdiTrashCan,
  EDIT: mdiPencil,
};

type CardActionWrapperProps = {
  isToggleChildren: boolean;
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
    if (props.isToggleChildren) {
      return {
        height: "100%",
        "div:nth-of-type(2)": {
          transform: "translateY(40px)",
          opacity: "100%",
        },
        "div:nth-of-type(3)": {
          transform: "translateY(80px)",
          opacity: "100%",
        },
        "div:nth-of-type(4)": {
          transform: "translateY(120px)",
          opacity: "100%",
        },
      };
    }
    return {};
  }
);

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
  zIndex: 1,
});

type propsType = {
  id: any;
  actions: Actions[];
};

const CardActions = (props: propsType): ReactElement => {
  const { id, actions } = props;
  const ctx = useContext(CardActionContext);

  const handleOnClik = (action: Actions) => {
    ctx.triggerAction({
      id,
      type: action,
    });
  };

  return (
    <CardActionWrapper
      isToggleChildren={ctx.toggledCard === id}
      onClick={(event) => {
        event.stopPropagation();
        ctx.toggleCardActionMenu(id);
      }}
    >
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
      {actions.map((action) => (
        <CardActionSubButton
          key={action}
          onClick={handleOnClik.bind(this, action)}
        >
          <Icon
            path={actionIcons[action]}
            size={0.8}
            style={{
              color: "white",
            }}
          ></Icon>
        </CardActionSubButton>
      ))}
    </CardActionWrapper>
  );
};

export default CardActions;
