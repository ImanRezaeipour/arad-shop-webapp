var service = function (restService) {

    this.getCustomer = function (params) {
        return restService.get("Read", params, "Customer", true);
    };

    this.getCustomerAddress = function (params) {
        return restService.get("Read", params, "Customer/Address", true);
    };

    this.getCustomerOrder = function (params) {
        return restService.get("Read", params, "CustomerOrder", true);
    };

    this.updateCustomer = function (command) {
        return restService.put("Write", command, "Customer");
    };
    this.activeCustomer = function (command) {
        return restService.put("Write", command, "ActiveCustomer");
    };

    this.deactiveCustomer = function (command) {
        return restService.put("Write", command, "DeActiveCustomer");
    };

    this.activeCustomerAuth = function (command) {
        return restService.put("AuthController", command, "User/Active");
    };

    this.deactiveCustomerAuth = function (command) {
        return restService.put("AuthController", command, "User/DeActive");
    };

  this.provinceCity = function (params) {
    return restService.get("Read", params, "Cities", true);
  };
};

service.$inject = ["RestService"];
angular.module('admin.CustomerApp').service('admin.CustomerService', service);