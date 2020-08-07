var controller = function (scope, state, stateParams, service, toastr) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;
    self.filter = { fromDate: "", toDate: "" };
    service.getMarketerById({ id: stateParams.id }).then(function (response) {
        console.log(response);
        self.isLoad = true;
        self.user = response;
    },
        function (error) {
            console.log(error);
        });
    //    var getData = function () {
    

    scope.mainGridOptions = {
        toolbar: ["excel"],
        excel: {
            fileName: "factor",
            filterable: true,
            allPages:true
        },
        dataSource: {
            type: "odata",
            transport: {
                read: {
                    dataType: "json",
                    headers: {
                        "accept": "application/json; odata=verbose",
                        "Authorization": authHeader
                    },
                    url: readApi + "MarketerShops",
                    data: function () {
                        return {
                            id: stateParams.id,
                            fromDate: self.filter.fromDate,
                            toDate: self.filter.toDate,
                        };
                    }
                }

            },
            sort: {
                field: "creationTime",
                dir: "asc"
            },

            schema: {
                data: 'results',
                total: 'count',
                model: {
                    Id: "Id",
                    fields: {
                        id: {},
                        creationTime: { type: 'string' },
                        personNumber: {},
                        name: {},
                        orderCount: {},
                        orderSugesstionCount: { type: 'number' },
                        factorCount: { type: 'number' },
                        factorSum: { type: 'number' },
                        pastDateCount: { type: 'number' }
                    }
                }
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,

        },
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: [10, 25, 50, 100, 200],
            buttonCount: 5,
            messages: {
                display: "{0}-{1} از {2} آیتم",
                empty: "",
                itemsPerPage: "تعداد آیتم"
            }
        },

        filterable: {
            extra: true,
            operators: {
                string: {
                    startswith: "شروع با",
                    eq: "مشابه",
                    neq: "مخالف",

                },
                number: {
                    eq: "مساوی",
                    neq: "مخالف",
                    gte: "بزرگتر مساوی",
                    gt: "بزرگتر از",
                    lte: "کوچکتر مساوی",
                    lt: "کوچکتر از"
                },

                enums: {
                    eq: "مساوی",
                    neq: "مخالف",

                }
            },
            messages: {
                and: "و",
                or: "یا",
                filter: "اعمال",
                clear: "پاک کردن",
                info: ""
            }
        },
        columns: [
            {
                field: "creationTime",
                title: "تاریخ ایجاد ",
            },
            {
                field: "personNumber",
                title: "شناسه",
            }, {
                field: "name",
                title: "نام فروشگاه",
            }, {
                field: "orderCount",
                title: "تعداد سفارش"
            }, {
                field: "orderSugesstionCount",
              title: "تعداد پیشنهاد سفارش "
            }, {
                field: "factorCount",
                title: "تعداد فاکتور"
            }, {
                field: "factorSum",
                title: "جمع فاکتور"
            }, {
                field: "pastDateCount",
                title: "تعداد روز گذشته"
            }, {
                field: ""
            }
        ]
    };
    //    };
    //    getData();

    self.setFilter = function () {
        //        scope.mainGridOptions.data('kendoGrid').refresh();
        // scope.mainGridOptions.dataSource.transport.read();
        $("#grid").data("kendoGrid").dataSource.read();

    };


    self.changeActiveDeactive = function (item) {
        
        var command = {
            id: item.id
        };

        if (!item.isActive) {
            service.deactiveMerketer(command).then(function (response) {
                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        } else {
            service.activeMarketer(command).then(function (response) {
                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        }
    }


};
controller.$inject = ["$scope", "$state", "$stateParams", "admin.MarketerService", "toastr"];
angular.module('admin.MarketerApp').controller('admin.Marketer.MarketerShopListController', controller)