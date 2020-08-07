var controller = function (scope, rootScope, state, service, restService, localStorageService, filter) {
    
    var self = this;

    service.getFileUploadUrl().then(function (response) {
        console.log(response);
        
        fileManagerGetUri = response;
        var statego = localStorageService.get("state");
        if (statego == null || statego.toState.name === "login.login") {
            state.go("dashboard.home.home");
        } else {
            state.go(statego.toState.name, statego.toParams);
        }
    },
        function (error) {
            console.log(error);
        });






}

controller.$inject = ["$scope", "$rootScope", "$state", "LoadService", "RestService", "localStorageService", "$filter"];
angular.module('LoadApp').controller('LoadController', controller);