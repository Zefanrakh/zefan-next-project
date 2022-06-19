import React from "react";
import { Actions } from "../components/card_actions/CardActions";

export type ActionType = {
  type: Actions;
  id: any;
};

const cardActionContext = React.createContext({
  toggledCard: null as number | null,
  toggleCardActionMenu: (id: any): void => {},
  triggerAction: (params: ActionType): void => {},
});

export default cardActionContext;
