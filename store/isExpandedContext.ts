import React from "react";

const ExpandedContext = React.createContext({
  isExpanded: true,
  setExpandState: (state: boolean): void => {},
});

export default ExpandedContext;
