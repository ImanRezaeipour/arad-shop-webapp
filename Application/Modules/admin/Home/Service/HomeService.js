var service = function (restService) {

    this.getUser = function (params) {
        return restService.get("Read", params, "Admin", true);
    } 

    this.getDashborad = function (params) {
        return restService.get("Read", params, "DashboardCount", true);
    } 

    this.getCities = function (params) {
        return restService.get("Read", params, "Cities", true);
    } 
};

service.$inject = ["RestService"];
angular.module('admin.HomeApp').service('admin.HomeService', service);