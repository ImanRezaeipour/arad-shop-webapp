

var service = function (restService) {
    

    this.updateSetting = function (command) {

        return restService.post("Write", command, "ApplicationSetting");
    }


    this.checkTheCode = function (params) {

        return restService.get("AuthController", params, "User/VerficationCode" , true);
    }


};

service.$inject = ["RestService"];
angular.module('admin.VerficationCodeApp').service('admin.VerficationCodeService', service);