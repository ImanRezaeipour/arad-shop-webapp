var service = function (restService) {


  this.getOrderById = function (params) {
    return restService.get("Read", params, "Order", true);
  };
  this.areaOrderById = function (params) {
    return restService.get("Read", params, "AreaOrder", true);
  };
  this.getSyggestions = function (params) {
    return restService.get("Read", params, "AcceptedOrderSuggestion", true);
  };
  //
  //
  //    this.activeShop = function (command) {
  //
  //        return restService.put("Write", command, "ActiveShop");
  //    }
  //
  //    this.deactiveShop = function (command) {
  //
  //        return restService.put("Write", command, "DeActiveShop");
  //    }
  //
  //    this.acceptShop = function(command) {
  //
  //        return restService.put("Write", command, "AcceptShop");
  //    }
  //
  //
  //    this.deAcceptShop = function (command) {
  //
  //        return restService.put("Write", command, "RejectShop");
  //    }

};

service.$inject = ["RestService"];
angular.module('admin.OrderApp').service('admin.OrderService', service);