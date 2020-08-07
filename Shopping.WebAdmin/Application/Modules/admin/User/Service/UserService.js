var service = function (restService) {

    this.getAllUser = function (params) {
        debugger 
        return restService.get("AuthController", params, "UserPanel" , true);
    }

    this.getUserById = function (params) {

        return restService.get("AuthController", params, "RestePasswordUser" , true);
    }

    this.addUser = function (command) {

        return restService.post("AuthController", command, "UserPanel");
    }

    this.editUser = function (command) {
        return restService.put("AuthController", command, "UserPanel");
    }

    this.resetPassword = function (command) {
        return restService.put("AuthController", command, "RestePasswordUser");
    }

    this.removeItem = function (command) {

        return restService.delete("AuthController", command, "UserPanel" ,true);
    }

};

service.$inject = ["RestService"];
angular.module('admin.UserApp').service('admin.UserService', service);