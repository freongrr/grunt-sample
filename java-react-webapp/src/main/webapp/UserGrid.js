// @flow
/* eslint no-console: ["off"] */
"use strict";

import React from "react";
import update from "react-addons-update";
import {Table} from "react-bootstrap";

type User = {
    id: string,
    firstName: string,
    lastName: string
};

type State = {
    users: Array<User>
};

export default class UserGrid extends React.Component {
    state: State;

    constructor(props: {}) {
        super(props);

        this.state = {users: []};
    }

    addUser(user: User) {
        this.setState(update(this.state, {
            users: {$push: [user]}
        }));
    }

    setUsers(users: User[]) {
        this.setState({users: users});
    }

    render() {
        console.debug("Render table with " + this.state.users.length + " users");
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
                </thead>
                <tbody>
                {this.state.users.map(u => <UserGridRow key={u.id} user={u}/>)}
                </tbody>
            </Table>
        );
    }
}

type RowProps = {
    user: User
};

class UserGridRow extends React.Component {
    props: RowProps;

    constructor(props: RowProps) {
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
