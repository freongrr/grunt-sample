/* eslint-env mocha */
/* eslint no-console: ["off"] */
import React from "react";
import {shallow} from "enzyme";
import {expect} from "chai";
import App from "../../main/webapp/App";

// The Console class in NodeJS does not have a console.debug(...) method
console.debug = function () {
};

describe("App", () => {

    it("has a title", () => {
        const wrapper = shallow(<App />);
        // console.info("HTML: " + wrapper.html());
        // console.info("Wrapper:\n--------\n" + wrapper.debug() + "\n--------");
        expect(wrapper.find("PageHeader")).to.have.length(1);
    });

    it("has a grid of users", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find("UserGrid")).to.have.length(1);
    });
});
