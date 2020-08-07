var controller = function (scope, stateParams, state, service, toastr, ngMap) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;



    service.getOrderById({ id: stateParams.id }).then(function (response) {
        console.log(response);
        self.order = response;
       


        
    },
        function (error) {
            console.log(error);
        });


    ngMap.getMap().then(function (map) {
    });


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.OrderService", "toastr", "NgMap"];
angular.module('admin.OrderApp').controller('admin.Order.DetailsController', controller)