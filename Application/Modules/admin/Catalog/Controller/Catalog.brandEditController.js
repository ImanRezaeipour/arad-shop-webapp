var controller = function (scope, stateParams, state, service, toastr) {

    var self = this;

    var id = stateParams.id;

    service.getBrandById({ id: id }).then(function (response) {
        console.log(response);
        self.brand = response;
    }, function (error) {
        toastr.error(error.message, "خطا");
    });


    self.save = function () {
        service.editBrand(self.brand).then(function (response) {
            toastr.success(response.message, "موفق");
            state.go("dashboard.catalog.brandList");
        }, function (error) {
            toastr.error(error.message, "خطا");
        });
    };
};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.CatalogService", "toastr"];
angular.module('admin.CatalogApp').controller('admin.Catalog.brandEditController', controller)