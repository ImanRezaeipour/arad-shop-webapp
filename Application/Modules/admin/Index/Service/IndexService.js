var service = function (restService) {

    this.getUserInfo = function (params) {

        return restService.get("AuthController", params, "User", true);
    }


    this.getAmbulanceRequest = function (command) {

        return restService.get("Read", command, "WaitingAmbulanceRequest", true);
    };

    this.getAllNotiofication = function () {

        return restService.get("Read", null, "PanelNotification", true);
    };
    this.getAdminAmbulanceRequest = function (command) {

        return restService.get("Read", command, "WaitingAdminAmbulanceRequest", true);
    }

    this.visited = function (command) {
        return restService.put("Write", command, "PanelNotification/Visited");
    }

    this.getFileUploadUrl = function () {
        return restService.get("FileManager", null, "FileUploaderAddress", true);
    }



};

service.$inject = ["RestService"];
angular.module('admin.HomeApp').service('admin.indexService', service);