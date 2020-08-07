var controller = function (scope, state, service, toastr) {

    var self = this;

   

    self.check = function() {
        service.checkTheCode({ mobileNumber: self.mobileNumber }).then(function (response) {
            
                console.log(response);
                //    toastr.success(response.message, "موفق");
                self.code = response;

            },
            function(error) {
                toastr.error(error.message, "خطا");
            });
    };

};
controller.$inject = ["$scope", "$state", "admin.VerficationCodeService", "toastr"];
angular.module('admin.VerficationCodeApp').controller('admin.VerficationCodeController', controller)