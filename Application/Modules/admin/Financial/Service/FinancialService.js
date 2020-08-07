var service = function (restService) {


  this.getFactorById = function (params) {
    return restService.get("Read", params, "Factor", true);
  };

  this.getTotalFinancial = function (params) {
    return restService.get("Read", params, "FactorFinancialReport/Total", true);
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
angular.module('admin.FinancialApp').service('admin.FinancialService', service);