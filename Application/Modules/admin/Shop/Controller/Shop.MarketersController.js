var controller = function (scope, stateParams, state, service, toastr) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;

    self.accept = false;
    self.deAccept = false;


    service.getShopById({ shopId: stateParams.id }).then(function (response) {
        console.log(response);
        self.shop = response;
        
    },
        function (error) {
            console.log(error);
        });

    var command = {
        shopId: stateParams.id
    };
    service.getMarketerList(command).then(function (resposne) {
        console.log(resposne);
        self.list = resposne;
    },
        function (error) {

        });


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.ShopService", "toastr"];
angular.module('admin.ShopApp').controller('admin.Shop.MarketersController', controller)