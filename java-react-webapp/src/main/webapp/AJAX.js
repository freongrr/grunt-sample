// @flow
/* eslint no-console: ["off"] */
/* eslint no-unused-vars: ["off"] */
"use strict";

import when from "when";

// TODO : use a proper framework
export default {
    get: function (path: string, ...uglyHackToAvoidCallingWithTooManyArguments: Array<void>) {
        const deferred = when.defer();
        try {
            const xhr = getXMLHttpRequest();
            xhr.open("GET", path, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        deferred.resolve(xhr.response);
                    } else if (xhr.status == 0) {
                        deferred.reject(new Error("Could not connect to the server!"));
                    } else {
                        deferred.reject(new Error(xhr.status + ": " + xhr.response));
                    }
                }
            };
            xhr.send();
        } catch (e) {
            deferred.reject(new Error("Could not fetch failed builds: " + e));
        }
        return deferred.promise;
    }
};

function getXMLHttpRequest(): XMLHttpRequest {
    if (typeof XMLHttpRequest != "undefined") {
        try {
            return new XMLHttpRequest();
        } catch (e) {
            console.warn("Failed to initialize XMLHttpRequest", e);
        }
    }
    // fallback
    return window.createRequest();
}
