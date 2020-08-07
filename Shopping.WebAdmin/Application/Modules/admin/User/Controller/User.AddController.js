var controller = function (scope, state, stateParams, service, toastr) {

  var self = this;

  self.roleList = [
    { id: 1, title: "ادمین", en: "Admin" },
    { id: 2, title: "پشتیبان", en: "Support" },
    { id: 3, title: "اپراتور", en: "Operator" },
    { id: 4, title: "مالی", en: "Financial" }
  ];

  self.addUser = function () {
    service.addUser(self.user).then(function (response) {
      if (response.success) {
        toastr.success(response.message, "موفق");
        state.go("dashboard.user.list");
      } else {
        toastr.error(response.message, "خطا");
      }
    });
  };

};
controller.$inject = ["$scope", "$state", "$stateParams", "admin.UserService", "toastr"];
angular.module('admin.UserApp').controller('admin.User.AddController', controller)