"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ItemMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1}, { unique: true });
    await super.createIndex({ awid: 1, name: 1});
  }

  async createItem(uuObject) {
    return await super.insertOne(uuObject);
  }

  async getItemById(awid, id) {
    return await super.findOne({ id, awid });
  }

  async updateItemById(item) {
    let filter = { id: item.id, awid: item.awid };

    return await super.findOneAndUpdate(filter, item, "NONE")
  }

  async deleteItemById(awid, id) {
    return await super.deleteOne({ id, awid });
  }

  async listItems(awid, sortBy, order, pageInfo) {

    const filter = { awid };
    
    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };
  
    return await super.find(filter, pageInfo, sort);
  }


}

module.exports = ItemMongo;
