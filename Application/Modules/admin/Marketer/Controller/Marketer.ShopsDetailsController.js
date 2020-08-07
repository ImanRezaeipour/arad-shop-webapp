var controller = function ($scope, stateParams, state, service, toastr, upload, filter) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;
    
    service.getMarketerTotalSalesAmount({ marketerId: stateParams.id }).then(function (response) {
        console.log(response);
        self.cellAmount = response;
    },
        function (error) {
            console.log(error);
        });


    service.getMarketerById({ id: stateParams.id }).then(function (response) {
        console.log(response);
        self.marketer = response;
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
        if (self.selectType === 'day') {
            service.getDayMarketerChart({ marketerId: stateParams.id }).then(function (response) {
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
        else if (self.selectType === 'week') {

            service.getWeekMarketerChart({ marketerId: stateParams.id }).then(function (response) {
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

        else if (self.selectType === 'month') {
            service.getMonthMarketerChart({ marketerId: stateParams.id }).then(function (response) {
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

        } else if (self.selectType === 'year') {
            service.getYearMarketerChart({ marketerId: stateParams.id }).then(function (response) {
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
angular.module('admin.MarketerApp').controller('admin.Marketer.ShopsDetailsController', controller)