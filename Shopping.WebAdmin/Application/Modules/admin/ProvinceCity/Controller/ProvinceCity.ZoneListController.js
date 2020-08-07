var controller = function (scope, state,stateParams,filter , service, toastr) {

    var self = this;

    var getData = function () {

        service.getCity({ id: stateParams.provinceId}).then(function (response) {
            console.log(response);
            self.provinceCity = response;
            self.city = filter("filter")(self.provinceCity.cities, { id: stateParams.cityId }, true)[0];
        });

    };

    getData();

    self.addZone = function (obj) {
        var command = {
            title: self.city.zone,
            cityId: self.city.id
        };

        service.addZone(command).then(function (response) {
            toastr.success(response.message, "موفق");
            getData();
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    };

 



    self.editZone = function (obj) {

        var command = {
            title: obj.editTitle,
            id: obj.id,
            cityId: self.city.id
        };

        service.editZone(command).then(function (response) {
            toastr.success(response.message, "موفق");
            getData();
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    };

    

    self.changeActiveDeactive = function (item) {
        var command = {
            id: item.id,
            cityId: self.city.id
        };
        if (!item.isActive) {

            service.deactiveZone(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        } else {

            service.activeZone(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });
        }
    };


};
controller.$inject = ["$scope", "$state", "$stateParams", "$filter","admin.ProvinceCityService", "toastr"];
angular.module('admin.ProvinceCityApp').controller('admin.ProvinceCity.ZoneListController', controller)