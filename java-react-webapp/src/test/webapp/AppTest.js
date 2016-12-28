/* eslint-env mocha */
/* eslint no-console: ["off"] */
import React from "react";
import {shallow} from "enzyme";
import {expect} from "chai";
import App from "../../main/webapp/App";

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

    it("shows an error dialog when the call to the server fails", (done) => {
        const wrapper = shallow(<App />);

        expect(wrapper.find("ErrorDialog")).to.have.length(0);

        // I know this will fail because there's not XMLHttpRequest object...
        wrapper.instance().refresh();

        setTimeout(() => {
            expect(wrapper.find("ErrorDialog")).to.have.length(1);
            expect(wrapper.find("ErrorDialog").prop("error").message).to.include("Could not load users");
            done();
        }, 100);
    });
});
