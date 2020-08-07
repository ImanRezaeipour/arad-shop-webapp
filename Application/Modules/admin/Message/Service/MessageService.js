var service = function (restService) {

  
    this.getOrderById = function (params) {
        return restService.get("Read", params, "Order", true);
    } 
    this.saveMessage = function (params) {
        return restService.post("Write", params, "PublicMessage", true);
    }

    this.savePrivateMessage = function (params) {
        return restService.post("Write", params, "PrivateMessage", true);
    } 

    this.getCustomer = function (params) {
        return restService.get("Read", params, "Customer", true);
    }
    this.getShopById = function (params) {
        return restService.get("Read", params, "Shop", true);
    }
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
angular.module('admin.MessageApp').service('admin.MessageService', service);