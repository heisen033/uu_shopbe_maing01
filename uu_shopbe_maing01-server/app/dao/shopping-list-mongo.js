"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShoppingListMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1}, { unique: true });
    await super.createIndex({ awid: 1, name: 1});
    await super.createIndex({ awid: 1, uuIdentity: 1});
        // TODO: add awid, name Index
  }

  async createShoppingList(uuObject) {
    return await super.insertOne(uuObject);
  }

  async getShoppingListById(awid, id) {
    
    return await super.findOne({ id, awid });
  }

  async updateShoppingListById(shoppingListObject) {

    let filter = { id: shoppingListObject.id, awid: shoppingListObject.awid };

    return await super.findOneAndUpdate(filter, shoppingListObject, "NONE");
  }

  async deleteShoppingListById(awid, id) {

    return await super.deleteOne({ awid, id });
  }

  async listShoppingListsByAuthor(awid, uuIdentity, sortBy, order, pageInfo) {

    const filter = {
      awid,
      uuIdentity
    };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };
  
    return await super.find(filter, pageInfo, sort);
  }

  async listShoppingLists(awid, sortBy, order, pageInfo) {

    const filter = { awid };
    
    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };
  
    return await super.find(filter, pageInfo, sort);
  }

}

module.exports = ShoppingListMongo;
