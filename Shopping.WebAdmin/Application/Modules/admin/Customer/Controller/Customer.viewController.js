var controller = function (scope, state, stateParams, service, toastr, ngMap, $timeout) {

    var self = this;

    service.getCustomer({ id: stateParams.id }).then(function (response) {
        console.log(response);
        self.customer = response;

            ngMap.getMap().then(function (evtMap) {
            self.map = evtMap;

            self.center = [self.customer.defultCustomerAddress.position.latitude, self.customer.defultCustomerAddress.position.longitude];
                $timeout(function () {
                    self.pin = [self.customer.defultCustomerAddress.position.latitude, self.customer.defultCustomerAddress.position.longitude];

                }, 1000);
        });

    },
        function (error) {
            console.log(error);

        });



};
controller.$inject = ["$scope", "$state", "$stateParams", "admin.CustomerService", "toastr", "NgMap", "$timeout"];
angular.module('admin.CustomerApp').controller('admin.CustomerViewController', controller)