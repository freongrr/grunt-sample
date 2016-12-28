// @flow
/* eslint no-console: ["off"] */
"use strict";

import type {User} from "./Types";
import React from "react";
import {PageHeader} from "react-bootstrap";
import UserGrid from "./UserGrid";
import AJAX from "./AJAX";

type AppState = {
    users: Array<User>
};

export default class App extends React.Component {
    state: AppState;

    constructor(props: {}) {
        super(props);

        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        // Fetch more users from the server
        AJAX.get("/users").then((json) => {
            const users = eval(json);
            this.setState({users: users});
        }).catch((e) => {
            // TODO : show an error popup
            console.error(e);
        });
    }

    render() {
        return (
            <div>
                <PageHeader>Template App{" "}
                    <small>Java + React</small>
                </PageHeader>
                <UserGrid users={this.state.users}/>
            </div>
        );
    }
}
