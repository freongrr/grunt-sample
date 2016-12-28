// @flow
/* eslint no-console: ["off"] */
"use strict";

import type {User} from "./Types";
import React from "react";
import {PageHeader, Button, Glyphicon} from "react-bootstrap";
import UserGrid from "./UserGrid";
import ErrorDialog from "./ErrorDialog";
import AJAX from "./AJAX";

type AppState = {
    users: Array<User>,
    error: ?Error
};

export default class App extends React.Component {
    state: AppState;

    constructor(props: {}) {
        super(props);

        this.state = {
            users: [],
            error: undefined
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        // Fetch users from the server
        AJAX.get("/users").then((json) => {
            const users = eval(json);
            this.setState({error: null, users: users});
        }).catch((e) => {
            this.setState({error: new Error("Could not load users: " + e.message)});
        });
    }

    render() {
        return (
            <div>
                <PageHeader>Template App{" "}
                    <small>Java + React</small>
                </PageHeader>
                <UserGrid users={this.state.users}/>
                <Button bsStyle="primary" onClick={() => this.refresh()}><Glyphicon glyph="refresh"/> Refresh</Button>
                {this.state.error ? <ErrorDialog error={this.state.error}/> : null}
            </div>
        );
    }
}
