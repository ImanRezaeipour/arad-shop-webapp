var controller = function (scope, rootScope, state, service, toastr) {

  var self = this;

  service.getSetting().then(function (response) {
    self.setting = response;
    //        self.setting.customerAppVersion = response.customerAppVersion);
    //        self.setting.shopAppVersion = parseInt(response.shopAppVersion);

    console.log(response);
  },
    function (error) {

    });

  self.save = function () {
    rootScope.loadingMain = true;
    service.updateSetting(self.setting).then(function (response) {
      toastr.success(response.message, "موفق");
      rootScope.loadingMain = false;
    },
      function (error) {
        toastr.error(error.message, "خطا");
        rootScope.loadingMain = false;
      });
  };

};
controller.$inject = ["$scope", "$rootScope", "$state", "admin.ApplicationSettingService", "toastr"];
angular.module('admin.SaleApp').controller('admin.ApplicationSettingController', controller)