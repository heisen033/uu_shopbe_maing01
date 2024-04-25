"use strict";

const ShopbeMainUseCaseError = require("./shopbe-main-use-case-error.js");
const ITEM_ERROR_PREFIX = `${ShopbeMainUseCaseError.ERROR_PREFIX}item/`;

const Create = {
  UC_CODE: `${ITEM_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends ShopbeMainUseCaseError {
    constructor () {
      super(...arguments);
      this.code = `${Create.UC_CODE}InvalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Get = {
  UC_CODE: `${ITEM_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends ShopbeMainUseCaseError {
    constructor () {
      super(...arguments);
      this.code = `${Get.UC_CODE}InvalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ItemDoesNotExist: class extends ShopbeMainUseCaseError {
    constructor () {
      super(...arguments);
      this.code = `${Get.UC_CODE}ItemDoesNotExist`;
      this.message = "Item does not exist.";
    }
  }
};

const Update = {
  UC_CODE: `${ITEM_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends ShopbeMainUseCaseError {
    constructor () {
      super(...arguments);
      this.code = `${Update.UC_CODE}InvalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ItemDoesNotExist: class extends ShopbeMainUseCaseError {
    constructor () {
      super(...arguments);
      this.code = `${Update.UC_CODE}ItemDoesNotExist`;
      this.message = "Item does not exist.";
    }
  }
};

const Delete = {
  UC_CODE: `${ITEM_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends ShopbeMainUseCaseError {
    constructor () {
      super(...arguments);
      this.code = `${Delete.UC_CODE}InvalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ItemDoesNotExist: class extends ShopbeMainUseCaseError {
    constructor () {
      super(...arguments);
      this.code = `${Delete.UC_CODE}ItemDoesNotExist`;
      this.message = "Item does not exist.";
    }
  }
};

const List = {
  UC_CODE: `${ITEM_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends ShopbeMainUseCaseError {
    constructor () {
      super(...arguments);
      this.code = `${List.UC_CODE}InvalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Delete,
  Update,
  Get,
  Create
};
