/* eslint-env mocha */
import React from "react";
import {shallow} from "enzyme";
import {expect} from "chai";
import Hello from "../../main/webapp/Hello.js";

// Uncomment this if your component uses console.debug(...)
// console.debug = function(args) {};

describe("Hello", () => {
    it("contains the correct text", () => {
        const wrapper = shallow(<Hello name="bob"/>);
        // console.info("HTML: " + wrapper.html());
        expect(wrapper.dive().text()).to.equal("Hello, bob!");
    }),
    it("is the correct element", () => {
        const wrapper = shallow(<Hello name="bob"/>);
        expect(wrapper.is("Alert")).to.equal(true);
    }),
    it("has the correct class", () => {
        const wrapper = shallow(<Hello name="bob"/>);
        expect(wrapper.hasClass("hello")).to.equal(true);
    });
});
