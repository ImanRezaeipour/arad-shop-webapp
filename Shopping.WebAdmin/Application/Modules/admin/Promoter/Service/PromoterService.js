var service = function (restService, http) {
  this.getById = function(params) {
    return restService.get("Read", params, "Promoter");
  };

  this.savePromoter= function (command) {
    return restService.post("Write", command, "Promoter");
  };

  this.editPromoter = function (command) {
    return restService.put("Write", command, "Promoter");
  };

  this.removePromoter = function (command) {
    return restService.delete("Write", command, "Promoter" , true);
  };
};

service.$inject = ["RestService", "$http"];
angular.module('admin.MarketerApp').service('admin.PromoterService', service);