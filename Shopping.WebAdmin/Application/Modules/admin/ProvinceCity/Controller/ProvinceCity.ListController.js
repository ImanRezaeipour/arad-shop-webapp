var controller = function (scope, state, service, toastr) {

    var self = this;

    var getData = function () {
        service.provinceCity().then(function (response) {
            console.log(response);
            self.provinceCity = response;
        });
    };
    getData();

    self.addCity = function (obj) {
        var command = {
            cityName: obj.newCity,
            provinceId: obj.id,
            code: obj.newCityCode,
        };

        service.addCity(command).then(function (response) {
            toastr.success(response.message, "موفق");
            getData();
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    };

   self.addProvince = function (obj) {
        var command = {
            name: self.province.name,
            code : self.province.code
        };

        service.addProvince(command).then(function (response) {
            toastr.success(response.message, "موفق");
                self.province.name = null;
            getData();
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    };



    self.editCity = function (obj) {

        var command = {

            cityName: obj.editName,
            code: obj.editCode,
            id: obj.id
        };

        service.editCity(command).then(function (response) {
            toastr.success(response.message, "موفق");
            getData();
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    };

    self.editProvince = function (obj) {

        var command = {
            name: obj.editName,
            id: obj.id,
           code: obj.editCode
        };

        service.editProvince(command).then(function (response) {
            toastr.success(response.message, "موفق");
            getData();
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    };

    self.changeActiveDeactive = function (item) {
        var command = {
            id: item.id
        };
        if (!item.isActive) {

            service.deactiveCity(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        } else {

            service.activeCity(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });
        }
    };


};
controller.$inject = ["$scope", "$state", "admin.ProvinceCityService", "toastr"];
angular.module('admin.ProvinceCityApp').controller('admin.ProvinceCity.ListController', controller)