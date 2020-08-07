var controller = function (scope, state, service, toastr) {

    var self = this;


    scope.config = {
        itemsPerPage: 200,
        fillLastPage: false
    }
    scope.list = [];

   var getUsers = function() {
       service.getAllUser().then(function (response) {
               console.log(response);
               scope.list = response;
           },
           function (error) {

           });

    }

    getUsers();
    self.remove = function (item) {
        service.removeItem({ id: item.userId }).then(function (response) {
                toastr.success(response.message, "موفق");
                getUsers();
            },
            function(error) {
                toastr.error(error.message, "خطا");
            });

    }

   
};
controller.$inject = ["$scope", "$state", "admin.UserService", "toastr"];
angular.module('admin.UserApp').controller('admin.User.listController', controller)