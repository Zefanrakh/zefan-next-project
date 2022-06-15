import { NextPage } from "next";
import React, { ReactElement } from "react";

type propsType = {
  list: string;
};

const Collections: NextPage<propsType> = (props: propsType): ReactElement => {
  return (
    <h1 className="is-size-1 field has-addons">
      Hello Collections Page{props.list}
    </h1>
  );
};

export default Collections;
