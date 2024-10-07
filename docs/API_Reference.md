# API Reference
The ATRS's API is based on an HTTPS/REST API for general operations.

**Base URL**

`https://<SERVER_URL>/api`

> [!NOTE]
> The ATRS uses the JWT stored in the client cookie. If you want to use the ATRS API, access the Authentication API.
>
> For more information, see [**Authentication API Reference**](./Authentication_API_Reference.md).


## table of contents
- [API Reference](#api-reference)
  - [table of contents](#table-of-contents)
  - [Types](#types)
    - [User](#user)
    - [Organization](#organization)
    - [Status](#status)
    - [Permission](#permission)
  - [API](#api)
    - [GET / (root)](#get--root)
      - [Response](#response)
    - [GET /activity](#get-activity)
      - [Response](#response-1)
    - [POST /activity](#post-activity)
      - [Request Body](#request-body)
      - [Response](#response-2)
    - [GET /activity/status](#get-activitystatus)
      - [Response](#response-3)
    - [GET /organization/:organization\_id/users](#get-organizationorganization_idusers)
      - [Response](#response-4)
    - [GET /organization/:organization\_id/status](#get-organizationorganization_idstatus)
      - [Response](#response-5)


## Types

### User
- **user_id** (number)
- **login_id** (string)
- **name** (string)
- **password** (string)
- **organization** ([Organization](#organization))

### Organization
- **organization_id** (string)
- **name** (string)

### Status
```ts
enum StatusEnum {
  ACTIVE = "active",
  LEAVE = "leave",
  NOT_ATTEND = "not_attend",
}
```

### Permission
```ts
enum PermissionEnum {
  ADMIN = "admin",
  MODERATOR = "moderator",
  TEACHER = "teacher",
  USER = "user",
  UNREGISTERED = "unregistered",
}
```


## API
### GET / (root)
This is used for debugging.

#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | text | `API root` |


### GET /activity
This API returns your activity summary data.

#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | json | json response |
| **400 Bad Request** | text | `User not found` | The requested user was not found in the database.

json response
| JSON Key | Type | description |
| --- | --- | --- |
| attendTime | Time \| null | Your attendance time today.
| leaveTime | Time \| null | Your leaving time today.
| activityTime | string† \| null | Your active time today.
| weeklyTime | string† \| null | Your weekly active time.
| totalTime | string† \| null | Your total active time.

† This value format is "00h 00min".


### POST /activity
This API logs activity. If your status is active, this API records leave time. If your status is "leave" or "not_attend", this API records attendance time.

#### Request Body
| JSON Key | Type | required | description |
| --- | --- | --- | --- |
| userId | string |  | Specify the UserId of the user to be recorded. This is only available if the Permission is ADMIN or MODERATOR.


#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | [Status](#status) |  | Returns the user's new status.
| **400 Bad Request** | text | `User not found` | The requested user was not found in the database.
| **403 Forbidden** | text | `Permission denied` | Returns if the UserId is specified and there are insufficient permissions.


### GET /activity/status
This API returns your now status.

#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | [Status](#status) |  |
| **400 Bad Request** | text | `User not found` | The requested user was not found in the database.


### GET /organization/:organization_id/users
This API returns users belonging to your organization. Only users with the Admin role can use this API.

#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | array | [json response] |
| **403 Forbidden** | text | `Permission denied` | You do not have Admin role.
| **404 Not Found** | text | `Organization not found` | The organization referenced by organizationId was not found. Or, the user belonging to the organization could not be found.

json response
| JSON Key | Type | description |
| --- | --- | --- |
| user_id | number |
| login_id | string | Value to use when logging in.
| name | string | The user name.
| permission | [Permission](#permission) | The user permission.
| status | [Status](#status) \| null | The user status.
| activity | object \| null | The user's latest activity info.
| &emsp;attendTime | Time | The user's latest attend time.
| &emsp;leaveTime | Time \| null | The user's latest leave time.
| &emsp;activityTime | string† \| null | The user's latest active time.
| &emsp;isAutoLeave | bool \| null | Whether the user was AutoLeave in the most recent activity record.

† This value format is "00h 00min".

### GET /organization/:organization_id/status
This API returns users belonging to your organization with each status.

#### Response
| Status Code | Response Type | value | Description |
| --- | --- | --- | --- |
| **200 OK** | array | [json response] |
| **404 Not Found** | text | `Organization not found` | The organization referenced by organizationId was not found. Or, the user belonging to the organization could not be found.

json response
| JSON Key | Type | description |
| --- | --- | --- |
| login_id | string | Value to use when logging in.
| name | string | User name.
| status | [Status](#status) | User status.