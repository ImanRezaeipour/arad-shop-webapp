var service = function (restService ,http) {

  
    this.getShopById = function (params) {
        return restService.get("Read", params, "Shop", true);
    }

    this.getMarketerById = function (params) {
        return restService.get("Read", params, "Marketer", true);
    }


    this.getCities = function (params) {
        return restService.get("Read", params, "Cities", true);
    }


    this.getShopByCityId = function(params) {
        return restService.get("Read", params, "CityShops", true);
    };

    this.getDayChart = function(params) {
        return restService.get("Read", params, "ShopFactorDailyChart", true);
    };

    this.getWeekChart = function (params) {
        return restService.get("Read", params, "ShopFactorWeeklyChart", true);
    };

    this.getMonthChart = function (params) {
        return restService.get("Read", params, "ShopFactorMonthlyChart", true);
    };

    this.getYearChart = function (params) {
        return restService.get("Read", params, "ShopFactorYearlyChart", true);
    };

    this.getDayMarketerChart = function(params) {
        return restService.get("Read", params, "MarketerShopFactorDailyChart", true);
    };

    this.getWeekMarketerChart = function (params) {
        return restService.get("Read", params, "MarketerShopFactorWeeklyChart", true);
    };

    this.getMarketerTotalSalesAmount = function (params) {
        return restService.get("Read", params, "MarketerTotalSalesAmount", true);
    };

    this.getMonthMarketerChart = function (params) {
        return restService.get("Read", params, "MarketerShopFactorMonthlyChart", true);
    };

    this.getYearMarketerChart = function (params) {
        return restService.get("Read", params, "MarketerShopFactorYearlyChart", true);
    };


    this.getProvinceCity = function(params) {

        return http({
            method: 'GET',
            url: '/Application/Services/provinceCity.json'
        });


    };


    this.activeMarketer = function(command) {

        return restService.put("Write", command, "Marketer/Active");
    };

    this.addCommentToMerchants = function(command) {

        return restService.post("Write", command, "Marketer/Comment");
    };

    this.deactiveMerketer = function(command) {

        return restService.put("Write", command, "Marketer/DeActive");
    };

    this.acceptShop = function(command) {

        return restService.put("Write", command, "AcceptShop");
    };


    this.saveMarketer = function(command) {
        return restService.post("Write", command, "Marketer");
    };
    this.editMarketer = function(command) {
        return restService.put("Write", command, "Marketer");
    };

    this.saveSalary = function(command) {
        return restService.post("Write", command, "MarketerSalaryPayment");
    };

    this.changeMarketer = function (command) {
        return restService.put("Write", command, "MarketerShopsChange");
    };

    this.detached = function (command) {
        return restService.put("Write", command, "MarketerShopsDetached");
    };



    this.deAcceptShop = function(command) {

        return restService.put("Write", command, "RejectShop");
    };

    this.activeShopAuth = function(command) {
        return restService.put("AuthController", command, "User/Active");
    };


    this.deactiveShopAuth = function(command) {
        return restService.put("AuthController", command, "User/DeActive");
    };

    this.getCities = function(params) {
        return restService.get("Read", params, "Cities", true);
    };

};

service.$inject = ["RestService", "$http"];
angular.module('admin.MarketerApp').service('admin.MarketerService', service);