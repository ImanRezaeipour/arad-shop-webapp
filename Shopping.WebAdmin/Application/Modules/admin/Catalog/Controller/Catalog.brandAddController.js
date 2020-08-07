var controller = function (scope, state, service, toastr) {
    var self = this;

    self.save = function () {
        service.addBrand(self.brand).then(function (response) {
            toastr.success(response.message, "موفق");
            state.go("dashboard.catalog.brandList");
        }, function (error) {
            toastr.error(error.message, "خطا");
        });
    };
};
controller.$inject = ["$scope", "$state", "admin.CatalogService", "toastr"];
angular.module('admin.CatalogApp').controller('admin.Catalog.brandAddController', controller)