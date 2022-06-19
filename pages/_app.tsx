import React, { useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import GlobalStyle from "../components/global_style/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";

declare const window: any;

const App = ({
  Component,
  pageProps,
}: {
  Component: typeof React.Component;
  pageProps: Object;
}) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <MainLayout>
      <GlobalStyle />
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default App;
