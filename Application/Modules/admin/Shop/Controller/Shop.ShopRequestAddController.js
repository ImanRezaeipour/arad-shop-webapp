var controller = function (scope, state, service, toastr) {

    var self = this;


    service.getCities().then(function (response) {
            console.log(response);
            self.provinces = response;
            self.province = response[0];
            self.city = self.province.cities[1].id;

        },
        function (error) { });



    self.addShop = function () {
        
      

        service.saveShop(self.user).then(function (response) {
                toastr.success(response.message, "موفق");
            state.go("dashboard.shop.request");
            },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }

};
controller.$inject = ["$scope", "$state", "admin.ShopService", "toastr"];
angular.module('admin.ShopApp').controller('admin.Shop.ShopRequestAddController', controller)