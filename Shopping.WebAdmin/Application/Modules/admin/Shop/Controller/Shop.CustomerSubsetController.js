var controller = function (scope, stateParams, state, service, toastr, ngMap) {

  var self = this;
  scope.config = {
    itemsPerPage: 5,
    fillLastPage: false
  }
  self.settlementHisory = [];
  service.getShopById({ shopId: stateParams.id }).then(function (response) {
    console.log(response);
    self.shop = response;
  },
    function (error) {
      console.log(error);
    });

  var getSettlmentHistory = function () {

    service.getSettlementHisory({ shopId: stateParams.id }).then(function (response) {
      
      self.settlementHisory = response;
    },
      function (error) {
        toastr.error(error.message, "خطا");
      });

    service.shopCustomerSubsetReport({ shopId: stateParams.id }).then(function (response) {
      console.log(response);
      self.shopCustomerSubsetReport = response;

    },
      function (error) {
        console.log(error);
      });

  };


  getSettlmentHistory();

};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.ShopService", "toastr", "NgMap"];
angular.module('admin.ShopApp').controller('admin.Shop.CustomerSubsetController', controller);