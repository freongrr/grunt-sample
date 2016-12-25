/* eslint-env mocha */
/* eslint no-console: ["off"] */
import React from "react";
import {shallow} from "enzyme";
import {expect} from "chai";
import App from "../../main/webapp/App.js";

// Uncomment this if your component uses console.debug(...)
// console.debug = function(args) {};

describe("App", () => {
    it("must be tested", () => {
        const wrapper = shallow(<App />);
        console.info("HTML: " + wrapper.html());
        // TODO : test for real
        expect(wrapper.text()).not.to.equal("TODO");
    });
});
