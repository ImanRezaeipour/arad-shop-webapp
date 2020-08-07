var controller = function (scope, stateParams, state, service, toastr, upload, filter) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;


    service.getMarketerById({ id: stateParams.id }).then(function (response) {
        console.log(response);
        self.isLoad = true;
        self.user = response;
    },
        function (error) {
            console.log(error);
        });


    self.addSalary = function () {
        


        self.user.marketerId = stateParams.id;
        service.saveSalary(self.user).then(function (response) {
            toastr.success(response.message, "موفق");
            state.go("dashboard.marketer.list");
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }




};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.MarketerService", "toastr", "Upload", "$filter"];
angular.module('admin.MarketerApp').controller('admin.Marketer.AddSalaryController', controller)