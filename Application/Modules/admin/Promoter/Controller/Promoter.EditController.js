var controller = function (scope, stateParams, state, service, toastr, upload, filter) {
  var self = this;
  self.fileManagerGetUri = fileManagerGetUri;

  service.getById({ id: stateParams.id }).then(function(response) {

    self.user = response;

  });

  self.editPromoter = function () {
    
    self.user.id = stateParams.id;
    service.editPromoter(self.user).then(function (response) {
      toastr.success(response.message, "موفق");
      state.go("dashboard.promoter.list");
    },
      function (error) {
        toastr.error(error.message, "خطا");
      });
  };
};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.PromoterService", "toastr", "Upload", "$filter"];
angular.module('admin.PromoterApp').controller('admin.Promoter.EditController', controller);