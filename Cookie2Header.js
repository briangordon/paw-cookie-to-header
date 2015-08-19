var Cookie2Header = function () {
    // A class with Object.prototype.toString overridden seems to be the only way to get Paw to display an error message cleanly.
    function Exception(message) {
        this.toString = function () { return message; }
    }

    this.evaluate = function (context) {
        var lastExchange = this.loginRequest.getLastExchange();
        if (lastExchange === undefined) {
            throw new Exception("'" + this.loginRequest.name + "' must be executed first.");
        }

        var cookieString = this.loginRequest.getLastExchange().getResponseHeaderByName("Set-Cookie");
        if (cookieString === undefined) {
            throw new Exception("'" + this.loginRequest.name + "' had no cookies.");
        }

        var cookieRegex = new RegExp("(\\w+)\\=\"?([^;\\s]+)\"?", "g");
        var match;
        while (match = cookieRegex.exec(cookieString)) {
            if (match[1] === this.crsfCookieName) {
                return match[2];
            }
        }

        throw new Exception("No cookie named '" + this.crsfCookieName + "' found in '" + this.loginRequest.name + "'.");
    }

    this.text = this.evaluate;
}

Cookie2Header.identifier = "name.brian-gordon.PawExtensions.Cookie2Header";
Cookie2Header.title = "Cookie2Header";
Cookie2Header.inputs = [
    DynamicValueInput("loginRequest", "\"login\" request that returns the CSRF cookie:", "Request"),
    DynamicValueInput("crsfCookieName", "Name of the CSRF cookie:", "String"),
];

registerDynamicValueClass(Cookie2Header);