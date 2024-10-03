# Authentication API Reference
The ATRS uses the JWT stored in the client cookie. If you want to use the ATRS API, access the Authentication API.

> [!IMPORTANT]
> Access Authentication API does not use the API base URL.
>
> **Access Authentication API Base URL**
>
> `https://<SERVER_URL>/auth`

## table of contents
- [Authentication API Reference](#authentication-api-reference)
  - [table of contents](#table-of-contents)
  - [API](#api)
    - [POST /login](#post-login)
      - [Request Body](#request-body)
      - [Response](#response)
    - [POST /logout](#post-logout)
      - [Response](#response-1)
    - [GET /verify](#get-verify)
      - [Response](#response-2)
    - [POST /signup](#post-signup)
      - [Request](#request)
      - [Response](#response-3)


## API

### POST /login
Log in the endpoint. The endpoint stores the JWT in the client cookie.

#### Request Body
| JSON Key | Type | required | description |
| --- | --- | --- | --- |
| loginId | string | * | Value to use when logging in.
| password | string | * | Password.

#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | text | `Login successful` | Login successful. The fact that this was returned means that the JWT is stored in the client cookie.
| **400 Bad Request** | text | `Invalid request` | This means that there are not enough values for the request.
| **401 Unauthorized** | text | `Invalid user or password` | This means that the user or password value in the request is invalid.
| **401 Unauthorized** | text | `User is not registered` | This means that the user you requested is not registered.


### POST /logout
Log out the endpoint. The endpoint deletes the JWT in the client cookie.

#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | text | `Logout successful` | Log out successful. The fact that this was returned means that the JWT is deleted in the client cookie.


### GET /verify
Verify the endpoint. The endpoint authentication that your JWT stores in the client cookie.
The processing performed by this API precedes all APIs.

#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | json | **json response** | Response`s isAuthenticated is always True.
| **401 Unauthorized** | json | **json response** | Response`s isAuthenticated is always False.


json response
| JSON Key | Type | description |
| --- | --- | --- |
| isAuthenticated | bool | Whether the user has been authenticated.
| userInfo | [User](./API_Reference.md/#user) | Authenticated user information.


### POST /signup
Register the endpoint. The endpoint creates a new user.

#### Request
| JSON Key | Type | required | description |
| --- | --- | --- | --- |
| loginId | string | * | Value to use when logging in.
| name | string | * | Your name.
| password | string | † | Password.
| organizationId | string | * | Organization Id.

† If you have the Admin role, this value is not required.

#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | text | `User created` | User has been created.
| **400 Bad Request** | text | `Invalid request` | This means that there are not enough values for the request.
| **400 Bad Request** | text | `User already exists` | The user referenced by userId in the request already exists.
| **400 Bad Request** | text | `Organization not found` | The organization referenced by organizationId could not be found.
