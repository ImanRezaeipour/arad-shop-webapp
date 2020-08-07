var controller = function ($scope, stateParams, state, service, toastr, upload, filter) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;



    service.getShopById({ shopId: stateParams.id }).then(function (response) {
        console.log(response);
        self.shop = response;
    },
        function (error) {
            console.log(error);
        });


    self.chart = function () {
        $scope.labels = [];
        $scope.total = "تعداد";
        $scope.totalData = [];
        $scope.sum = [];
        $scope.sumData = [];
        if (self.selectType == 'day') {

            service.getDayChart({ shopId: stateParams.id }).then(function (response) {
                console.log(response);

                angular.forEach(response,
                    function (item) {
                        
                        $scope.labels.push(item.label + ":00 ");
                        $scope.totalData.push(item.totalCount);
                        $scope.sumData.push(item.totalSum);
                    });

            },
                function (error) {
                    console.log(error);
                });
        }
        else if (self.selectType == 'week') {

            service.getWeekChart({ shopId: stateParams.id }).then(function (response) {
                console.log(response);

                angular.forEach(response,
                    function (item) {
                        
                        $scope.labels.push(item.label);
                        $scope.totalData.push(item.totalCount);
                        $scope.sumData.push(item.totalSum);
                    });

            },
                function (error) {
                    console.log(error);
                });

        }
        else if (self.selectType == 'month') {
            service.getMonthChart({ shopId: stateParams.id }).then(function (response) {
                console.log(response);
                angular.forEach(response,
                    function (item) {
                        
                        $scope.labels.push(item.label);
                        $scope.totalData.push(item.totalCount);
                        $scope.sumData.push(item.totalSum);
                    });

            },
                function (error) {
                    console.log(error);
                });

        }    else if (self.selectType == 'year') {
            service.getYearChart({ shopId: stateParams.id }).then(function (response) {
                console.log(response);
                angular.forEach(response,
                    function (item) {
                        
                        $scope.labels.push(item.label);
                        $scope.totalData.push(item.totalCount);
                        $scope.sumData.push(item.totalSum);
                    });

            },
                function (error) {
                    console.log(error);
                });

        }
    };

    self.selectType = 'day';
    self.chart();
    //    $scope.onClick = function (points, evt) {
    //        console.log(points, evt);
    //    };


    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        fontFamily: "IRANSans",
                        beginAtZero: true
                    }

                }
            ],
            xAxes: [
                {
                
                    ticks: {
                        fontFamily: "IRANSans",
                    }

                }
            ]
        }
    };


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.MarketerService", "toastr", "Upload", "$filter"];
angular.module('admin.MarketerApp').controller('admin.Marketer.ShopDetailsController', controller)