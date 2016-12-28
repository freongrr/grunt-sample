// @flow
"use strict";

import React from "react";
import {Modal} from "react-bootstrap";

type ErrorDialogProps = {
    error: Error
};

export default class ErrorDialog extends React.Component {
    props: ErrorDialogProps;

    constructor(props: ErrorDialogProps) {
        super(props);
    }

    render() {
        return (
            <Modal show={true}>
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.errorMessage()}
                </Modal.Body>
            </Modal>
        );
    }

    errorMessage() {
        return this.props.error.message || this.props.error.toString();
    }
}
