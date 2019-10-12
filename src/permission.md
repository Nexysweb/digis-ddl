/*# permissions

when a user logs in we create a permission map model (merging all the permissions he/she has with the data model leading to a unique data model)

with every query, merge the data query and the permission model.

there are three types of permissions
- read
- write
- filter (only for attributes)

write automatically grants read permission

read permissions affect the `projection field`

```
const permissionModelAll = {
  'EntityName': {
    'attr1': {'type': 'write'},
    'attr2': {type: 'filter', var: 'userId'}
  }
}

const permissionModel = permissionModelAll['EntityName'];

const queryProjection = {
  'attr1': true,
  'attr3': true
}

const query = {
  'EntityName': {
    projection: queryProjection
  }
}*/

const mergeEntityEntProjectionWithPermissionModel = (queryProjection, permissionModel) => {
  Object.keys(queryProjection).map(k => {

    if (!permissionModel[k]) {
      delete(queryProjection[k]);
    }
  });
}

const mergeQueryWithPermissions = (query, permissionModelAll) => {
  Object.keys(query).map(entity => {
    const { projection } = query[entity];

    const permissionModel = permissionModelAll[entity];

    mergeEntityEntProjectionWithPermissionModel(projection, permissionModel);
  })
}
```
