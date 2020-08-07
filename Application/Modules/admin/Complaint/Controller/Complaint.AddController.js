var controller = function (scope, stateParams, state, service, toastr, ngMap) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;
    self.messageTypes = [
        { id: 0, title: "پیام برای فروشگاه" },
        { id: 1, title: "پیام برای مشتری" }
    ];

    service.getShopById({ shopId: stateParams.id }).then(function (response) {
            console.log(response);
            self.info = response;
            self.center = [35.736629, 51.388235];
            self.pin = [35.857680, 51.390996];
            
        },
        function (error) {
            console.log(error);
        });

    //    public string Title { get; set; }
    //    public string Body { get; set; }
    //    public PublicMessageType PublicMessageType { get; set; }

    self.saveComplaint = function () {
        self.complaint.shopId = stateParams.id;
        service.saveComplaint(self.complaint).then(function (response) {
            toastr.success(response.message, "موفق");
            state.go("dashboard.complaint.list");
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }



};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.ComplaintService", "toastr", "NgMap"];
angular.module('admin.ComplaintApp').controller('admin.Complaint.AddController', controller)