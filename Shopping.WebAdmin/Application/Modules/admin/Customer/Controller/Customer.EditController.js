var controller = function (scope, state, filter, stateParams, service, toastr, ngMap, $timeout) {

  var self = this;

  var getData = function () {
    service.provinceCity().then(function (response) {
      console.log(response);
      self.provinceCity = response;
      var filterItem = filter("filter")(self.user.customerAddresses, { isDefault: true }, true)[0];
      if (filterItem == null) {
        self.user.customerAddresses[0].isDefault = true;
      };
      angular.forEach(self.user.customerAddresses, function (item) {

        item.province =
          filter('filter')(self.provinceCity, { id: item.provinceId }, true)[0];

        item.city =
          filter('filter')(item.province.cities, { id: item.cityId }, true)[0];

        
        
      });
    });
  };

  self.selectAddress = function(item) {
    angular.forEach(self.user.customerAddresses,
      function(dataItem) {
        dataItem.isDefault = false;
      });
    item.isDefault = true;
  };

  self.selectLocation = function (item) {
    
    console.log(self.map.getCenter());
    item.position.latitude = angular.copy(self.selectAddress.pos[0]);
    item.position.longitude = angular.copy(self.selectAddress.pos[1]);
    item.edit = false;
    self.selectAddress = null;
  };

  self.dragEnd = function () {
    
    if (self.selectAddress !== null && self.selectAddress !== undefined )  {
      var k = self.selectAddress;

      ngMap.getMap({ id: self.selectAddress.id }).then(function (map) {
        self.map = map;
        self.selectAddress["pos"] = [self.map.getCenter().lat(), self.map.getCenter().lng()];  
      });

   
    }
  };

  service.getCustomer({ id: stateParams.id }).then(function (response) {
    console.log(response);
    self.user = response;
    getData();
  },
    function (error) {
      console.log(error);

    });

  self.editCustomer = function () {
    
    self.user.customerId = self.user.id;
    angular.forEach(self.user.customerAddresses,
      function(item) {
        item.provinceId = item.province.id;
        item.cityId = item.city.id;
      });
    service.updateCustomer(self.user).then(function (response) {
      
      if (response.success != false) {
        toastr.success(response.message, "موفق");
        state.go("dashboard.customer.list");
      } else {
        toastr.error(response.message, "خطا");
      }
      
    },
      function (error) {
        toastr.error(error.message, "خطا");
      });

  };


};
controller.$inject = ["$scope", "$state", "$filter", "$stateParams", "admin.CustomerService", "toastr", "NgMap", "$timeout"];
angular.module('admin.CustomerApp').controller('admin.CustomerEditController', controller)