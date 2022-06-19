import React from "react";

const navigationContext = React.createContext({
  isExpanded: true,
  isToggleNavigation: false,
  setExpandState: (state: boolean): void => {},
  setToggleNavigation: (state: boolean): void => {},
});

export default navigationContext;
