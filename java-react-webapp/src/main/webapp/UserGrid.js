// @flow
/* eslint no-console: ["off"] */
"use strict";

import type {User} from "./Types";
import React from "react";
import {Table} from "react-bootstrap";

type UserGridProps = {
    users: Array<User>
};

export default class UserGrid extends React.Component {
    props: UserGridProps;

    constructor(props: UserGridProps) {
        super(props);
    }

    render() {
        console.debug("Render table with " + this.props.users.length + " users");
        return (
            <Table hover responsive>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
                </thead>
                <tbody>
                {this.props.users.map(u => <UserGridRow key={u.id} user={u}/>)}
                </tbody>
            </Table>
        );
    }
}

type UserGridRowProps = {
    user: User
};

class UserGridRow extends React.Component {
    props: UserGridRowProps;

    constructor(props: UserGridRowProps) {
        super(props);
    }

    render() {
        return <tr>
            <td>{this.props.user.id}</td>
            <td>{this.props.user.firstName}</td>
            <td>{this.props.user.lastName}</td>
        </tr>;
    }
}
