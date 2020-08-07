var controller = function (scope, stateParams, state, service, toastr, ngMap) {

    var self = this;
    self.id = stateParams.id;
    self.fileManagerGetUri = fileManagerGetUri;
    self.messageTypes = [
        { id: 0, title: "پیام برای فروشگاه" },
        { id: 1, title: "پیام برای مشتری" }
    ];

    self.type = stateParams.type;
    if (stateParams.type == 2) {

        service.getShopById({ shopId: stateParams.id }).then(function (response) {
            console.log(response);
            self.info = response;
            self.center = [35.736629, 51.388235];
            self.pin = [35.857680, 51.390996];
            
        },
            function (error) {
                console.log(error);
            });

    }
    else if (stateParams.type == 1) {
        service.getCustomer({ id: stateParams.id }).then(function (response) {
            console.log(response);
            self.info = response;
        },
            function (error) {
                console.log(error);

            });
    }


    self.saveMessage = function () {
         self.message.personId = stateParams.id
        service.savePrivateMessage(self.message).then(function (response) {
            toastr.success(response.message, "موفق");
            state.go("dashboard.message.privateList" , {id : self.id , type : self.type});
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }



};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.MessageService", "toastr", "NgMap"];
angular.module('admin.MessageApp').controller('admin.Message.PrivateAddController', controller)