var controller = function (scope, stateParams, state, service, toastr, ngMap) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;

    self.accept = false;
    self.deAccept = false;
    self.needToCorrect = false;


  service.getShopById({ shopId: stateParams.id }).then(function (response) {
      
        console.log(response);
        self.shop = response;
        self.center = [self.shop.shopAddress.position.latitude, self.shop.shopAddress.position.longitude];
        self.pin = [self.shop.shopAddress.position.latitude, self.shop.shopAddress.position.longitude];
        


        service.getMarketer({ id: self.shop.marketerId }).then(function (response) {
            console.log(response);
            self.marketerInfo = response;
        },
            function (error) {
                console.log(error);
            });

    },
        function (error) {
            console.log(error);
        });


    ngMap.getMap().then(function (map) {
    });


    self.acceptFun = function () {
        
        service.acceptShop({ id: self.shop.id, descriptionStatus: self.acceptDescription }).then(function (response) {
            toastr.success(response.message, "موفق");
            
            state.go("dashboard.shop.list");
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }

    self.deAcceptFun = function () {
        
        service.deAcceptShop({ id: self.shop.id, descriptionStatus: self.deAcceptDescription }).then(function (response) {
            toastr.success(response.message, "موفق");
            
            state.go("dashboard.shop.list");
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }


    self.needToCorrectFun = function () {
        
        service.needToCorrect({ id: self.shop.id, descriptionStatus: self.needToCorrectDescription }).then(function (response) {
            toastr.success(response.message, "موفق");
            
            state.go("dashboard.shop.list");
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }

};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.ShopService", "toastr", "NgMap"];
angular.module('admin.ShopApp').controller('admin.Shop.DetailsController', controller)