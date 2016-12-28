// @flow
/* eslint no-console: ["off"] */
/* eslint no-unused-vars: ["off"] */
"use strict";

import when from "when";

// TODO : use a proper framework
export default {
    get: function (path: string, ...uglyHackToAvoidCallingWithTooManyArguments: Array<void>): Promise<any> {
        const deferred = when.defer();
        try {
            const xhr = getXMLHttpRequest();
            xhr.open("GET", path, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        deferred.resolve(xhr.response);
                    } else {
                        const errorMessage = extractErrorMessage(xhr.status, xhr.response);
                        deferred.reject(new Error(errorMessage));
                    }
                }
            };
            xhr.send();
        } catch (e) {
            deferred.reject(e);
        }
        return deferred.promise;
    }
};

function getXMLHttpRequest(): XMLHttpRequest {
    try {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else {
            return window.createRequest();
        }
    } catch (e) {
        throw new Error("Can't create XMLHttpRequest");
    }
}

function extractErrorMessage(statusCode, responseContent) {
    if (statusCode == 0) {
        return "Could not connect to the server!";
    } else if (statusCode == 500) {
        return "Internal Server Error";
    } else {
        return statusCode + ": " + responseContent;
    }
}
