var controller = function (scope, rootScope, state, service, localStorageService, hasPermissionFactory) {

  var self = this;
  self.dashboardShow = false;
  debugger;
  if (hasPermissionFactory.hasPermission(7)) {
    debugger;
    service.getCities().then(function (response) {
      console.log(response);
      self.provinces = response;
      self.province = response[0];
      self.city = self.province.cities[1].id;
      if (rootScope.isAdmin == true) {
        self.getDashborad();
      }
    },
      function (error) { });


    scope.config = {
      itemsPerPage: 5,
      fillLastPage: true
    };


    self.getDashborad = function() {

      if (self.city != null) {
        service.getDashborad({ cityId: self.city }).then(function(response) {
            console.log(response);
            self.dashboard = response;
          },
          function(error) {

          });
      }

    };
    self.dashboardShow = true;
  }


};
controller.$inject = ["$scope", "$rootScope", "$state", "admin.HomeService", "localStorageService", "hasPermissionFactory"];
angular.module('admin.HomeApp').controller('admin.HomeController', controller);