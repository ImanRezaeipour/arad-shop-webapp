var controller = function (scope, stateParams, state, service, toastr, ngMap) {
    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;

    service.getSyggestions({ orderId: stateParams.id }).then(function (response) {
        console.log(response);
        self.orderSuggestion = response;
    },
        function (error) {
            console.log(error);
        });
};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.OrderService", "toastr", "NgMap"];
angular.module('admin.OrderApp').controller('admin.Order.SuggestionController', controller)