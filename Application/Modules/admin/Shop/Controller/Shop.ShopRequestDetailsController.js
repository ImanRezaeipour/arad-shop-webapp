var controller = function (scope, state, stateParams, service, toastr) {

    var self = this;


    service.getRequest({id : stateParams.id}).then(function (response) {
            console.log(response);
            self.user = response;
         

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


    self.changeActiveDeactive = function (item, type) {

        



            var command = {
                id: stateParams.id
            }
            if (type == 0) {

                service.acceptRequestShop(command).then(function (response) {

                    toastr.success(response.message, "موفق");
                    item.shopAcceptorStatus = 1;
                    item.deAcceptItem = null;
                    item.acceptItem = null;
                },
                    function (error) {
                        toastr.success(response.message, "خطا");
                    });

            } else {
       
                service.deAcceptRequestShop(command).then(function (response) {
                    item.shopAcceptorStatus = 2;
                    item.deAcceptItem = null;
                    item.acceptItem = null;
                  
                    self.description = null;
                    self.showDescription = false;
                    toastr.success(response.message, "موفق");

                },
                    function (error) {
                        toastr.success(response.message, "خطا");
                    });

            }
        }

    


};
controller.$inject = ["$scope", "$state", "$stateParams","admin.ShopService", "toastr"];
angular.module('admin.ShopApp').controller('admin.Shop.ShopRequestDetailsController', controller)