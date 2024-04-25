/* eslint-disable */

const itemCreateTypes = shape({
    name: string(255).isRequired()
}).isRequired()

const itemGetTypes = shape({
    id: id().isRequired()
}).isRequired()

const itemUpdateTypes = shape({
    id: id().isRequired(),
    name: string(255).isRequired()
}).isRequired()

const itemDeleteTypes = shape({
    id: id().isRequired()
}).isRequired()

const itemListTypes = shape({
    sortBy: oneOf(["name"]), // probably add something else later
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
  });