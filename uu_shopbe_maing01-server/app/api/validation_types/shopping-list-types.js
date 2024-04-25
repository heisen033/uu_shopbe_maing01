/* eslint-disable */

const shoppingListCreateTypes = shape({
    name: string(255).isRequired(),
    itemList: array(
        shape({
            id: id().isRequired(), 
            completed: boolean().isRequired()
        })),
    memberIdList: array(uuIdentity().isRequired())
}).isRequired()

const shoppingListGetTypes = shape({
    id: id().isRequired(),
})

const shoppingListUpdateTypes = shape({
    id: id().isRequired(),
    name: string(255),
    itemList: array(
        shape({
            id: id().isRequired(), 
            completed: boolean().isRequired()
        })),
    memberIdList: array(uuIdentity().isRequired())
}).isRequired()

const shoppingListDeleteTypes = shape({
    id: id().isRequired(),
})

const shoppingListListTypes = shape({
    sortBy: oneOf(["name"]), // probably add something else later
    order: oneOf(["asc", "desc"]),
    uuIdentity: uuIdentity(), // ? lists shoppingLists of a specified author
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
  });