"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/shopping-list-error.js");

const WARNINGS = {
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`
    },
  },
  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`
    },
  },
  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`
    },
  },
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`
    },
  }
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class ShoppingListAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shoppingList");
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("shoppingListListTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    let list;
    if (dtoIn.uuIdentity) {
      list = await this.dao.listShoppingListsByAuthor(awid, dtoIn.uuIdentity, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } else {
      list = await this.dao.listShoppingLists(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }

    const dtoOut = {
      ...list,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("shoppingListDeleteTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    const shoppingList = await this.dao.getShoppingListById(awid, dtoIn.id);

    if (!shoppingList) {
      throw new Errors.Delete.ShoppingListDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id })
    }
    
    await this.dao.deleteShoppingListById(awid, dtoIn.id)

    return { uuAppErrorMap };
  }

  async update(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("shoppingListUpdateTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    const shoppingListOriginal = await this.dao.getShoppingListById(awid, dtoIn.id);

    if (!shoppingListOriginal) {
      throw new Errors.Update.ShoppingListDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id })
    }

    if (dtoIn.name) {
      shoppingListOriginal.name = dtoIn.name
    }

    if (dtoIn.itemList?.length > 0) {
      shoppingListOriginal.itemList = dtoIn.itemList
    }

    if (dtoIn.memberIdList?.length > 0) {
      shoppingListOriginal.memberIdList = dtoIn.memberIdList
    }

    const updatedShoppingList = await this.dao.updateShoppingListById(shoppingListOriginal)

    return { ...updatedShoppingList, uuAppErrorMap }
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("shoppingListGetTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );


    const shoppingList = await this.dao.getShoppingListById(awid, dtoIn.id);

    if (!shoppingList) {
      throw new Errors.Get.ShoppingListDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id })
    }
    

    return { ...shoppingList, uuAppErrorMap };
  }

  async create(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("shoppingListCreateTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    if (dtoIn.itemList?.length > 0) {
      // TODO: check if items exist
    }

    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();

    const uuObject = {
      ...dtoIn,
      awid,
      uuIdentity,
      uuIdentityName
    }

    const shoppingList = await this.dao.createShoppingList(uuObject)

    return { ...shoppingList, uuAppErrorMap };
  }
}

module.exports = new ShoppingListAbl();
