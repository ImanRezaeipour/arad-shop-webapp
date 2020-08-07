var controller = function (scope, stateParams, state, service, toastr, ngMap) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;
    self.messageTypes = [
        { id: 0, title: "پیام برای فروشگاه"},
        { id: 1, title: "پیام برای مشتری"}
    ];

//    public string Title { get; set; }
//    public string Body { get; set; }
//    public PublicMessageType PublicMessageType { get; set; }


    self.saveMessage = function () {

        service.saveMessage(self.message).then(function (response) {
                toastr.success(response.message, "موفق");
                state.go("dashboard.message.list");
            },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }
   


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.MessageService", "toastr", "NgMap"];
angular.module('admin.MessageApp').controller('admin.Message.AddController', controller)