var controller = function (scope, rootScope, stateParams, state, service, toastr, ngMap, filter) {
    var self = this;

    service.getPercentDiscountSumReport({ percentDiscountId: stateParams.id }).then(function (response) {
        console.log(response);
        
        self.report = response;
    }, function (error) {
        toastr.error(error.message, "خطا");
    });

};
controller.$inject = ["$scope", "$rootScope", "$stateParams", "$state", "admin.DiscountService", "toastr", "NgMap", "$filter"];
angular.module('admin.OrderApp').controller('admin.Discount.ReportController', controller);