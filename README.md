# AR HISTORY BOOK - SERVER
# Documentation

The APIs are deployed to https://arhistory.herokuapp.com/

## Account

- `POST /api/account/register`: register a new account. Body must contain 3 fields (username, password, type). Response will contain the information of the newly created user along with a USER TOKEN. This token must be passed along <b>with every request </b> as a header "Authorization" in the form "Bearer \<token>". <br>
<i>A body accepted:</i>

```
{
    "username" : "lxcuong",
    "password": "123456",
    "type": 1
}
```

- `POST /api/account/login`: login. Body must contain 2 fields (username, password). Response will contain user's information along with a token like above. <br>
<i>A body accepted:</i>

```
{
    "username" : "lxcuong",
    "password": "123456",
}
```

- `GET /api/account`: get current account's information. 


- `PUT /api/account/update`: update current user's information. Body is a dict that dictates which fields will be updated and what their new values will be, i.e. { "password": "12346", "type": 1 }. List of fields that can be updated: `password, type`.

## User

- `GET /api/user/`: get current user's information

- `POST /api/user/create`: create a new user's information. Phone must be exactly 10 characters long. Email must be valid<br>
<i>A body accepted:</i>

```
{
    "name":"Cuong", 
    "school":"ABC",
    "class":"17CNTN",
    "score":10,
    "rank":1,
    "email":"cuongle@gmail.com",
    "phone": "0332831844"
}
```

- `PUT /api/user/update`:  update current user's information. Body is a dict that dictates which fields will be updated and what their new values will be, i.e. { "name": "12346", "school": 1 }. List of fields that can be updated: `name, school, class, score,rank, email, phone`.

<i>A body accepted:</i>

```
{
    "name":"Cuong", 
    "school":"ABC",
    "class":"17CNTN",
    "score":10,
    "rank":1,
}
```
<hr>

### Another Table \

<br>

## Account Achievement Criterion

- `GET /api/account-achievement-criterion/:id`: get the row that have id =  :id

- `POST /api/account-achievement-criterion/`: create a new row

<i>A body accepted:</i>

```
{
    "accrit_id": "Achv000001",
    "count": 10
}
```

- `PUT /api/account-achievement-criterion/`: update a existed achievement row.

- `DELETE /api/account-achievement-criterion/:id`: delete a existed achievement row have ID is :id

## Achievement

- `GET /api/achievement/:id`: get achievement row of :id

- `POST /api/achievement/`: create a new achievement

<i>A body accepted:</i>

```
{
    "id": "Achv000008",
    "name": "LAN HAI",
    "description": "Hoan xxx 2 khu vuc"
}
```

- `PUT /api/achievement/`: update a existed achievement row.

- `DELETE /api/achievement/:id`: delete a existed achievement row have ID is :id

## Achievement Account

- `GET /api/achievement-account/:id`: get achievement row of :id

- `POST /api/achievement-account/`: create a new achievement

<i>A body accepted:</i>

```
{
    "achv_id": "Achv000008"
}
```

- `PUT /api/achievement-account/`: update a existed achievement row.

- `DELETE /api/achievement-account/:id`: delete a existed achievement row have ID is :id


## Achievement Criterion

- `GET /api/achievement-criterion/:id`: get achievement row of :id

- `POST /api/achievement-criterion/`: create a new achievement

<i>A body accepted:</i>

```

{
    "id": "Achv000008",
    "name":"asdasd",
    "description" : "asdasdasd"
}

```

- `PUT /api/achievement-criterion/`: update a existed achievement row.

- `DELETE /api/achievement-criterion/:id`: delete a existed achievement row have ID is :id


## Achievement Criterion Achievement

- `GET /api/achievement-criterion-achievement/:id1/:id2`: get the row that has accrit_id = :id1 and achv_id = id2

- `POST /api/achievement-criterion-achievement/`: create a new row

<i>A body accepted:</i>

```

{
    "id": "Achv000008",
    "name":"asdasd",
    "description" : "asdasdasd"
}

```

- `PUT /api/achievement-criterion-achievement/`: update a existed row.

- `DELETE /api/achievement-criterion-achievement/:id1/:id2`: delete the row that has accrit_id = :id1 and achv_id = id2
  


## Activity Data

- `GET /api/activity-data/:id`: get the row that has id = :id

- `POST /api/activity-data/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Act0000005",
    "type": 0,
    "header": "Ban Dau",
    "is_required": true,
    "max_score": 100,
    "sec_id": "Sec0000001"
}

```

- `PUT /api/activity-data/`: update a existed row.

- `DELETE /api/activity-data/:id`: delete the row that has id = :id

## Activity Progress

- `GET /api/activity-progress/:id`: get the row that has id = :id

- `POST /api/activity-progress/`: create a new row

<i>A body accepted:</i>

```

{
    "id": "aP00000015",
    "score": 0,
    "done": false,
    "sec_id": "Sec0000001"
}

```

- `PUT /api/activity-progress/`: update a existed row.

- `DELETE /api/activity-progress/:id`: delete the row that has id = :id

## Artifact

- `GET /api/artifact/:id`: get the row that has id = :id

- `POST /api/artifact/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Arti000003",
    "name": "Hoa sen",
    "description": "xxxxxx"
}

```

- `PUT /api/artifact/`: update a existed row.

- `DELETE /api/artifact/:id`: delete the row that has id = :id
  

## Chapter

- `GET /api/chapter/:id`: get the row that has id = :id

- `POST /api/chapter/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Ch00001",
    "name": "Hoa sen",
    "part_id": "P00001"
}
```

- `PUT /api/chapter/`: update a existed row.

- `DELETE /api/chapter/:id`: delete the row that has id = :id


## Collection

- `GET /api/collection/:id`: get the row that has id = :id

- `POST /api/collection/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Clt000002",
    "name": "Huys's  Collection",
    "description": "Bo suu tap cool ngau cua Huy",
    "style": "",
    "user_id": 0
}
```

- `PUT /api/collection/`: update a existed row.

- `DELETE /api/collection/:id`: delete the row that has id = :id

## Collection Artifact

- `GET /api/collection-artifact/:id`: get the row that has id = :id

- `POST /api/collection-artifact/`: create a new row

<i>A body accepted:</i>

```
{
    "clt_id": "Clt000002",
    "arti_id": "xxxxx"
}
```

- `PUT /api/collection-artifact/`: update a existed row.

- `DELETE /api/collection-artifact/:id`: delete the row that has id = :id

## Grade

- `GET /api/grade/:id`: get the row that has id = :id

- `POST /api/grade/`: create a new row

<i>A body accepted:</i>

```

{
    "id": "xxxxx",
    "name": "xxxx"
}

```

- `PUT /api/grade/`: update a existed row.

- `DELETE /api/grade/:id`: delete the row that has id = :id


## Lesson

- `GET /api/grade/:id`: get the row that has id = :id

- `POST /api/grade/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "xxxxx",
    "name": "xxxx",
    "chap_id":"aaaa"
}

```

- `PUT /api/grade/`: update a existed row.

- `DELETE /api/grade/:id`: delete the row that has id = :id

## Lesson

- `GET /api/grade/:id`: get the row that has id = :id

- `POST /api/grade/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "xxxx",
    "name": "xxx",
    "grade_id":"aaaa"
}

```

- `PUT /api/grade/`: update a existed row.

- `DELETE /api/grade/:id`: delete the row that has id = :id

## Section Data

- `GET /api/section-data/:id`: get the row that has id = :id

- `POST /api/section-data/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Sec0000005",
    "name": "Hoa Sen Ban Dau",
    "lesson_id": "Lsn000004"
}

```

- `PUT /api/section-data/`: update a existed row.

- `DELETE /api/section-data/:id`: delete the row that has id = :id

## Section Link

- `GET /api/section-link/:id`: get the row that has id = :id

- `POST /api/section-link/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Sec0000005",
    "name": "Hoa Sen Ban Dau",
    "lesson_id": "Lsn000004"
}

```

- `PUT /api/section-link/`: update a existed row.

- `DELETE /api/section-link/:id`: delete the row that has id = :id


## Section Progress

- `GET /api/section-progress/:id`: get the row that has id = :id

- `POST /api/section-progress/`: create a new row

<i>A body accepted:</i>

```

{
    "sec_id": "Sec0004",
    "status" : 2,
    "score": 2,
    "type" : 3
}

```

- `PUT /api/section-progress/`: update a existed row.

- `DELETE /api/section-progress/:id`: delete the row that has id = :id


## Section Status

- `GET /api/section-progress/:id`: get the row that has id = :id

- `POST /api/section-progress/`: create a new row

<i>A body accepted:</i>

```

{
    "sec_id": "Sec0004",
    "status" : 2,
    "score": 2,
    "type" : 3
}

```

- `PUT /api/section-progress/`: update a existed row.

- `DELETE /api/section-progress/:id`: delete the row that has id = :id