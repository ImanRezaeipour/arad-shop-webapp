var service = function (restService, http) {


  this.getShopById = function (params) {
    return restService.get("Read", params, "Shop", true);
  };
  this.editShop = function (command) {
    return restService.put("Write", command, "Shop");
  };

  this.getMarketer = function (params) {
    return restService.get("Read", params, "Marketer", true);
  };

  this.getRequest = function (params) {
    return restService.get("Read", params, "ShopAcceptor", true);
  };

  this.getExcelFile = function (params) {
    return restService.get("Read", params, "ShopAcceptorExport", true);
  };

  this.getMarketerList = function (params) {
    return restService.get("Read", params, "ShopMarketersHistory", true);
  };


  this.getCities = function (params) {
    return restService.get("Read", params, "Cities", true);
  };
  this.getShopByCityId = function (params) {
    return restService.get("Read", params, "CityShops", true);
  };


  this.getLogs = function (params) {
    return restService.get("Read", params, "ShopLog", true);
  };


  this.getProvinceCity = function (params) {

    return http({
      method: 'GET',
      url: '/Application/Services/provinceCity.json'
    });


  };


  this.activeShop = function (command) {

    return restService.put("Write", command, "ActiveShop");
  };


  this.saveShop = function (command) {

    return restService.post("Write", command, "ShopAcceptor");
  };

  this.deactiveShop = function (command) {

    return restService.put("Write", command, "DeActiveShop");
  };

  this.acceptShop = function (command) {

    return restService.put("Write", command, "AcceptShop");
  };


  this.deAcceptShop = function (command) {

    return restService.put("Write", command, "RejectShop");
  };

  this.needToCorrect = function (command) {

    return restService.put("Write", command, "NeedToModifyShop");
  };


  this.acceptRequestShop = function (command) {

    return restService.put("Write", command, "ShopAcceptor/Accept");
  };


  this.deAcceptRequestShop = function (command) {

    return restService.put("Write", command, "ShopAcceptor/Reject");
  };


  this.activeShopAuth = function (command) {
    return restService.put("AuthController", command, "User/Active");
  };

  this.deactiveShopAuth = function (command) {
    return restService.put("AuthController", command, "User/DeActive");
  };


  this.provinceCity = function (params) {
    return restService.get("Read", params, "Cities", true);
  };

  this.shopCustomerSubsetReport = function (params) {
    return restService.get("Read", params, "ShopCustomerSubsetReport", true);
  };

  this.getSettlementHisory  = function (params) {
    return restService.get("Read", params, "ShopCustomerSubsetSettlement", true);
  };
};

service.$inject = ["RestService", "$http"];
angular.module('admin.ShopApp').service('admin.ShopService', service);