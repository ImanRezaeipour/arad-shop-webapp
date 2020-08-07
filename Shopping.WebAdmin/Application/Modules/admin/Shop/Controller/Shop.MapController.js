var controller = function (scope, state, service, toastr,ngMap) {

    var self = this;

  ngMap.getMap().then(function (map) {

    });

    service.getCities().then(function (response) {
        console.log(response);
            self.province = response;
        },
        function(error) {

        });
//
//    service.getProvinceCity().then(function (response) {
//        
//        console.log(response);
//
//        self.provinceCity = response.data;
//
//    });

  self.getShops = function() {
    service.getShopByCityId({ cityId: self.seach.city }).then(function(response) {
        console.log(response);
        self.shops = response;
      },
      function(error) {

      });
  };


};
controller.$inject = ["$scope", "$state", "admin.ShopService", "toastr", "NgMap"];
angular.module('admin.ShopApp').controller('admin.Shop.MapController', controller)