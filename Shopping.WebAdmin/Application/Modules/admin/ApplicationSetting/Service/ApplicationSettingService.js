var service = function (restService) {
    

    this.updateSetting = function (command) {

        return restService.post("Write", command, "ApplicationSetting");
    }


    this.getSetting = function () {

        return restService.get("Read", null, "ApplicationSetting" , true);
    }


};

service.$inject = ["RestService"];
angular.module('admin.SaleApp').service('admin.ApplicationSettingService', service);