var controller = function (scope, state, stateParams, service, toastr) {

    var self = this;

    self.roleList = [
        { id: 1, title: "ادمین" , en : "Admin" },
        { id: 2, title: "پشتیبان", en: "Support" }

    ];


    service.getUserById({ userId: stateParams.id }).then(function (response) {
            console.log(response);
            self.userInfo = response;
        },
        function (error) {

        });

    self.addUser = function () {
        
        var command = {
            oldPassword: self.user.oldPassword,
            newPassword: self.user.newPassword,
            userId: stateParams.id
        }
        service.resetPassword(command).then(function (response) {
            
            if (response.success == false) {
                toastr.error(response.message, "خطا");
            } else {
                toastr.success(response.message, "موفق");
                state.go("dashboard.user.list");
            }
          
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }

};
controller.$inject = ["$scope", "$state", "$stateParams", "admin.UserService", "toastr"];
angular.module('admin.UserApp').controller('admin.User.ResetPasswordController', controller)