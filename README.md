# AR HISTORY BOOK - SERVER
# Documentation

The APIs are deployed to https://arhistory.herokuapp.com/

## Accounts

- `POST /api/account/register`: register a new account. Body must contain 4 fields (username, password, type). Phone must be exactly 10 characters long. Response will contain the information of the newly created user along with a USER TOKEN. This token must be passed along with every request as a header "Authorization" in the form "Bearer <token>".
\tExample:
```
{
    "username" : "lxcuong",
    "password": "123456",
    "type": 1
}
```

- `POST /api/account/login`: login. Body must contain 2 fields (username, password). Response will contain user's information along with a token like above.

- `GET /api/account`: get current user's information.

- `GET /api/account/:username`: get public information of user `username`, including `username, fullname`.

- `PATCH /api/account`: update current user's information. Body is a dict that dictates which fields will be updated and what their new values will be, i.e. { "bio": "Hello there", "citizen_id": "a.k.a. cmnd" }. List of fields that can be updated: `fullname, email, phone, bio, citizen_id`.
