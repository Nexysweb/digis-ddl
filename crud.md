# Create - Read - Update - Delete (CRUD)

## Understanding CRUD

Create - read - update - delete (CRUD) operations are ubiquitous and tedious. We offer here an alternative to ORM that allows you to connect your RDBMS to a REST API. Queries are inferred from a centralised data model.

Joins, input verification, permissions are now implicit all you need to do is to write what you want and you will receive everything neatly packaged in a JSON.

## Unified Data Fetching

`http://host/data`

This endpoint allows you to retrieve any data combination from the CRUD. It also does many requests in one endpoint (similar to GraphQL)

### Request

The request is of method post and must contain a payload with map of all the entities of interest, see example below.

### Response

The API returns an object with the same shape as the payload that contains the requested data

```
{
  "entity1": [],
  "entity2": [],
  "entity3": [],
  ...
  "entityN": []
}
```

### Query Example
* projections
* joins
* filters
  * equality
  * less than `$lt`
  * greater than  `$gt`
  * IN operator  `$in`
  * Reg expressions  `$regex`
* inverted joins  references 
* order by  `order`
* limit  take  and  `skip`

#### Example

```
{
  "imt": {
    "references": {
      "country": {
        "params": {
          "projection": {
            "short": false,
            "name": false
          }
        }
      }
    },
    "filters": {
      "description": {
        "$regex": "BEN*"
      }
    },
    "take": 2,
    "skip": 0
  },
  "marketing_plan": {
    "filters": {
      "year": {
        "$in": [2016, 2017]
      },
      "halfYear": 2,
      "revenueActual": {
        "$gt": 1000
      }
    },
    "projection": {
      "ownInvestment": false,
      "businessPartner": {},
      "statusId": false,
      "ownInvestmentActual": false,
      "revenue": false
    },
    "skip": 0,
    "order": {
      "by": "year",
      "desc": false
    },
    "params": {},
    "take": 2
  }
}
```
