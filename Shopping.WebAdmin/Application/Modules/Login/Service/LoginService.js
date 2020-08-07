var service = function (restService ,$http) {
  
    this.login = function (command) {

        return $http({
            url: authApiUri + "token",
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: command
        });

    }

    this.getUserInfo = function (params) {

      return restService.get("AuthController", params, "User", true);
    }


    this.getPersonInfo = function (params) {
        return restService.get("Read", params, "Person", true);
    }
    this.postForPerson = function (params) {

        return restService.post("Write", params, "PersonInit", true);

    }
};

service.$inject = ["RestService","$http"];
angular.module('LoginApp').service('LoginService', service);