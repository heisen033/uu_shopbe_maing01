"use strict";
const ShopbeMainAbl = require("../../abl/shopbe-main-abl.js");

class ShopbeMainController {
  init(ucEnv) {
    return ShopbeMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ShopbeMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ShopbeMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ShopbeMainController();
