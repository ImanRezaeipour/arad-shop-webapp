var controller = function (scope, stateParams, state, service, toastr, upload, filter) {
  var self = this;
  self.fileManagerGetUri = fileManagerGetUri;
  self.addMarketer = function () {
    
    service.savePromoter(self.user).then(function (response) {
      toastr.success(response.message, "موفق");
      state.go("dashboard.promoter.list");
    },
      function (error) {
        toastr.error(error.message, "خطا");
      });
  };
};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.PromoterService", "toastr", "Upload", "$filter"];
angular.module('admin.PromoterApp').controller('admin.Promoter.AddController', controller);