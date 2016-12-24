// @flow
'use strict';

import React from "react";
import {Alert} from "react-bootstrap";

type Props = {
    name: string
};

export default class Hello extends React.Component {
    props : Props;

    constructor(props : Props) {
        super(props);
    }

    render() {
        return (
            <Alert bsStyle="danger" className="hello">
                Hello, {this.props.name}!
            </Alert>
        );
    }
}
