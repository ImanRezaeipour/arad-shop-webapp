var service = function (restService) {

    this.getUser = function (params) {
        return restService.get("Read", params, "Admin", true);
    }


    this.getFileUploadUrl = function () {
        return restService.get("FileManager", null, "FileUploaderAddress", true);
    }

    this.getOperator = function (params) {
        return restService.get("Read", params, "Operator", true);
    } 

    
};

service.$inject = ["RestService"];
angular.module('LoadApp').service('LoadService', service);