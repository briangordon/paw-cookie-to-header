# paw-cookie-to-header

## Summary
This extension makes it easier to work in [Paw](https://luckymarmot.com/paw) with APIs that have been secured from [cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks using the "cookie to header" pattern used by Django and AngularJS. 

Here's how the pattern works. When you successfully authenticate through a login form, the server sends back a cookie containing a nonce. Now when the client needs to make requests to the server, Angular can automatically provide that nonce in an HTTP header to prove to the server that it's not a cross-site request.

## Installation
Place `Cookie2Header.js` in `~/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/name.brian-gordon.PawExtensions.Cookie2Header/`

## Using
First, create a "login" request which hits your login URL with a valid username and password, and run the request to store the cookies from the response:

![Create a login request](https://raw.githubusercontent.com/briangordon/paw-angular-csrf/screenshots/screenshot-0.png)

Next, create a request for the CRSF-protected API. On the Headers tab, input the correct header name. In the header value box, right click and select the Cookie2Header dynamic value from the Extensions submenu:

![Select the Cookie2Header dynamic value](https://raw.githubusercontent.com/briangordon/paw-angular-csrf/screenshots/screenshot-2.png)

Finally, select your login Request and enter the name of the cookie which contains the CSRF nonce:

![Fill out the form](https://raw.githubusercontent.com/briangordon/paw-angular-csrf/screenshots/screenshot-1.png)

Your nonce should appear in the box. It will now be included in the header of requests to the protected API. If your nonce expires, re-run the login request to automatically refresh the nonce. 