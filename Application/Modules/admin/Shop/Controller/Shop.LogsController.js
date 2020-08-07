var controller = function (scope, stateParams, state, service, toastr) {
     
    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;

    service.getShopById({ shopId: stateParams.id }).then(function (response) {
            console.log(response);
            self.shop = response;
            
        },
        function (error) {
            console.log(error);
        });

    service.getLogs({ shopId: stateParams.id }).then(function (response) {
        console.log(response);
        self.logs = response.shopStatusLogs;
        
    },
        function (error) {
            console.log(error);
        });

//    var command = {
//        shopId: stateParams.id
//    };
//    service.getMarketerList(command).then(function (resposne) {
//        console.log(resposne);
//        self.list = resposne;
//    },
//        function (error) {
//
//        });


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.ShopService", "toastr"];
angular.module('admin.ShopApp').controller('admin.Shop.LogsController', controller)