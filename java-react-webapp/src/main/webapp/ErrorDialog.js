// @flow
"use strict";

import React from "react";
import {Modal, Button} from "react-bootstrap";

type ErrorDialogProps = {
    error: Error
};

type ErrorDialogState = {
    visible: boolean
};

export default class ErrorDialog extends React.Component {
    props: ErrorDialogProps;
    state: ErrorDialogState;

    constructor(props: ErrorDialogProps) {
        super(props);

        this.state = {
            visible: true
        };
    }

    hide() {
        this.setState({visible: false});
    }

    render() {
        return (
            <Modal show={this.state.visible} onHide={() => this.hide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.errorMessage()}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.hide()}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    errorMessage() {
        return this.props.error.message || this.props.error.toString();
    }
}
