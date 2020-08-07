var controller = function (scope, rootScope, stateParams, state, service, toastr, ngMap, filter) {
  var self = this;

  self.addDiscount = function () {
    console.log(self.discount);
    
    self.discount.fromTime = self.discount.fromDateTime.getHours() + ":" + self.discount.fromDateTime.getMinutes() + ":00";
    self.discount.toTime = self.discount.toDateTime.getHours() + ":" + self.discount.toDateTime.getMinutes() + ":00";
    self.discount.toDate = self.discount.fromDate;
    service.addDiscount(self.discount).then(function (response) {
      console.log(response);
      toastr.success(response.message, "موفق");
      state.go("dashboard.discount.list");
    },
      function (error) {
        
        toastr.error(error.message, "خطا");
        self.discount.fromTime = null;
        self.discount.toTime = null;
      });
  };



};
controller.$inject = ["$scope", "$rootScope", "$stateParams", "$state", "admin.DiscountService", "toastr", "NgMap", "$filter"];
angular.module('admin.OrderApp').controller('admin.Discount.AddController', controller);