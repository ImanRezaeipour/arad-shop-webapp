var service = function (restService) {


    this.getDiscountById = function (params) {
        return restService.get("Read", params, "PercentDiscount", true);
    };
    this.getPercentDiscountSumReport = function (params) {
        return restService.get("Read", params, "PercentDiscountSumReport", false);
    };
    this.getPercentDiscountShopSells = function (params) {
        return restService.get("Read", params, "DiscountPercentShopSell", false);
    };

    this.getDiscountProduct = function (params) {
        return restService.get("Read", params, "ProductPercentDiscount", true);
    };

    this.getBrands = function () {

        return restService.get("Read", null, "Brand");
    };

    this.getCategories = function () {

        return restService.get("Read", null, "CategoryBase");
    };

    this.getRootCategories = function () {
        return restService.get("Read", null, "CategoryRoot", true);
    };

    this.addDiscountProduct = function (command) {
        return restService.post("Write", command, "ProductPercentDiscount");
    };

    this.addDiscount = function (command) {
        return restService.post("Write", command, "PercentDiscount");
    };

    this.removeProduct = function (command) {
        return restService.delete("Write", command, "ProductPercentDiscount", true);
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
angular.module('admin.OrderApp').service('admin.DiscountService', service);