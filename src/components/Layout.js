import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="mt">
      <div className="sticky">
        <Header />
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
