var controller = function (scope, stateParams, state, service, toastr, ngMap) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;



    service.getFactorById({ id: stateParams.id }).then(function (response) {
        console.log(response);
        self.factor = response;
        
    },
        function (error) {
            console.log(error);
        });


    ngMap.getMap().then(function (map) {
    });


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.FactorService", "toastr", "NgMap"];
angular.module('admin.FactorApp').controller('admin.Factor.DetailsController', controller)