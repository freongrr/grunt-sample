/* eslint-env mocha */
/* eslint no-undef: ["off"] */
import {expect} from "chai";
import AJAX from "../../main/webapp/AJAX";

describe("AJAX", () => {
    describe("#get()", () => {

        it("returns a promise that returns the response", (done) => {
            mockXMLHttpRequest("GET", "http://foo.com", 200, "RESPONSE");

            const promise = AJAX.get("http://foo.com");
            promise.then((result) => {
                if (result === "RESPONSE") {
                    done();
                } else {
                    done(new Error("Unexpected result: " + result));
                }
            }).catch((e) => {
                done(e);
            });
        });

        it("returns a promise that throws an error", (done) => {
            mockXMLHttpRequest("GET", "http://bar.com", 500, "Boom");

            const promise = AJAX.get("http://bar.com");
            promise.then((result) => {
                done(new Error("Unexpected result: " + result));
            }).catch((e) => {
                if (e.message.indexOf("Internal Server Error") >= 0) {
                    done();
                } else {
                    done(new Error("Unexpected error: " + e));
                }
            });
        });
    });

    afterEach(() => {
        global.XMLHttpRequest = undefined;
    });
});

function mockXMLHttpRequest(expectedMethod, expectedUrl, responseStatus, responseContent) {
    global.XMLHttpRequest = class {

        open(method, url) {
            this.hasCalledOpen = true;
            expect(method).to.equal(expectedMethod);
            expect(url).to.equal(expectedUrl);
        }

        send() {
            expect(this.hasCalledOpen).to.equal(true);
            this.status = responseStatus;
            this.response = responseContent;
            this.readyState = 2;
            this.onreadystatechange();
            this.readyState = 4;
            this.onreadystatechange();
        }
    };
}
