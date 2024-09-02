import React, { Component } from "react";
import Headers from "./Header";
import Menu from "./Menu";
import Content from "./Content";
import Footer from "./Footer";

export default class Form extends Component {
  render() {
    return (
      <div>
        <Headers />
        <div
          style={{
            display: "flex",
          }}
        >
          <Menu />
          <Content />
        </div>
        <Footer />
      </div>
    );
  }
}
