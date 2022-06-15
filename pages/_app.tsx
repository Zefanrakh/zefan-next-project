import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import GlobalStyle from "../style_utilities/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";

declare const window: any;

const App = ({
  Component,
  pageProps,
}: {
  Component: typeof React.Component;
  pageProps: Object;
}) => {
  return (
    <MainLayout>
      <GlobalStyle />
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default App;
