/* eslint-env mocha */
/* eslint no-console: ["off"] */
import React from "react";
import {shallow} from "enzyme";
import {expect} from "chai";
import UserGrid from "../../main/webapp/UserGrid";

// The Console class in NodeJS does not have a console.debug(...) method
console.debug = function () {
};

describe("UserGrid", () => {

    it("renders an empty table by default", () => {
        const wrapper = shallow(<UserGrid users={[]}/>);

        expect(wrapper.find("thead").find("tr")).have.length(1);
        expect(wrapper.find("UserGridRow")).have.length(0);
    });

    it("renders a row for each user", () => {
        const users = [
            {id: "123", firstName: "bob", lastName: "test"},
            {id: "456", firstName: "foo", lastName: "bar"}
        ];

        const wrapper = shallow(<UserGrid users={users}/>);

        expect(wrapper.find("thead").find("tr")).have.length(1);
        expect(wrapper.find("UserGridRow")).have.length(2);
    });

    it("the row renders the id, first name and last name", () => {
        const user = {id: "123", firstName: "bob", lastName: "test"};
        const wrapper = shallow(<UserGrid users={[user]}/>);

        const rowWrapper = wrapper.find("UserGridRow");
        expect(rowWrapper.key()).to.equal("123");

        const cells = rowWrapper.render().find("td");
        expect(textOf(cells.get(0))).to.equal("123");
        expect(textOf(cells.get(1))).to.equal("bob");
        expect(textOf(cells.get(2))).to.equal("test");
    });
});

function textOf(nodeWrapper) {
    // HACK - enzyme is able to render the content of the component to a DOM tree using cheerio
    // but not all method return user-friendly wrappers (e.g. get(index) does not)
    return nodeWrapper.children[0].data;
}
