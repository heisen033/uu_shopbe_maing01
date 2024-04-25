"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/item-error.js");

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
  },
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class ItemAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("item");
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("itemListTypes", dtoIn);
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

    const list = await this.dao.listItems(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);

    return { ...list, uuAppErrorMap}
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("itemDeleteTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    const item = await this.dao.getItemById(awid, dtoIn.id);

    if (!item) {
      throw new Errors.Delete.ItemDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id })
    };

    await this.dao.deleteItemById(awid, dtoIn.id);

    return { uuAppErrorMap };
  }

  async update(awid, dtoIn) {

    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("itemUpdateTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    const itemOriginal = await this.dao.getItemById(awid, dtoIn.id)
    
    if (!itemOriginal) {
      throw new Errors.Update.ItemDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id })
    }

    if (dtoIn.name) {
      itemOriginal.name = dtoIn.name
    }

    const updatedItem = await this.dao.updateItemById(itemOriginal)

    return { ...updatedItem, uuAppErrorMap }
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("itemGetTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );


    const item = await this.dao.getItemById(awid, dtoIn.id);

    if (!item) {
      throw new Errors.Get.ItemDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id })
    }

    return { ...item, uuAppErrorMap };
  }

  async create(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("itemCreateTypes", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    const uuObject = {
      ...dtoIn,
      awid
    };

    const item = await this.dao.createItem(uuObject);

    return { ...item, uuAppErrorMap };

  }

}

module.exports = new ItemAbl();
