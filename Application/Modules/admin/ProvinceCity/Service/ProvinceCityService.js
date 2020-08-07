var service = function (restService) {


    this.provinceCity = function (params) {
        return restService.get("Read", params, "Cities", true);
    };

    this.getCity = function (params) {
        return restService.get("Read", params, "Cities", true);
    };


    this.addCity = function (command) {
        return restService.post("Write", command, "Cities");
    };

    this.addProvince = function (command) {
        return restService.post("Write", command, "Province");
    };

    this.addZone = function (command) {
        return restService.post("Write", command, "Zone");
    };

    this.editCity = function (command) {

        return restService.put("Write", command, "Cities/Update");
    };

    this.editProvince = function (command) {
        return restService.put("Write", command, "Province/Update");
    };

    this.editZone = function (command) {
        return restService.put("Write", command, "Zone/Update");
    };

    this.activeCity = function (command) {
        return restService.put("Write", command, "Cities/Active");
    };


    this.deactiveCity = function (command) {
        return restService.put("Write", command, "Cities/DeActive");
    };

    this.activeZone = function (command) {
        return restService.put("Write", command, "Zone/Active");
    };


    this.deactiveZone = function (command) {
        return restService.put("Write", command, "Zone/DeActive");
    };

};

service.$inject = ["RestService"];
angular.module('admin.ProvinceCityApp').service('admin.ProvinceCityService', service);