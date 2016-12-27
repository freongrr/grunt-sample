// @flow
/* eslint no-console: ["off"] */
"use strict";

import React from "react";
import {PageHeader} from "react-bootstrap";
import UserGrid from "./UserGrid";
import AJAX from "./AJAX";

export default class App extends React.Component {
    grid: UserGrid;

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        this.grid.addUser({id: "0", firstName: "Dummy", lastName: "User"});

        // Fetch more users from the server
        AJAX.get("/users").then((json) => {
            const users = eval(json);
            users.forEach(u => this.grid.addUser(u));
        }).catch((e) => {
            // TODO : show an error popup
            console.error(e);
        });
    }

    render() {
        return (
            <div>
                <PageHeader>Template App&nbsp;
                    <small>Java + React</small>
                </PageHeader>
                <UserGrid ref={(grid) => this.grid = grid}/>
            </div>
        );
    }
}
