var controller = function (scope, state, stateParams, service, toastr) {
    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;
    self.filter = { fromDate: "", toDate: "" };
    self.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];

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
            allPages: true
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
                    url: readApi + "SellingShop",
                    data: function () {
                        return {
                            month: self.month,
                            marketerId: stateParams.id,
                        };
                    }
                }

            },
            //            sort: {
            //                field: "creationTime",
            //                dir: "asc"
            //            },

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
                field: "firstName",
                title: "نام "
            }, {
                field: "lastName",
                title: "نام خانوادگی"
            }, {
                field: "defaultDiscount",
                title: "تخفیف فروشگاه "
            }, {
                field: "shopStatus",
                title: "وضعیت فروشگاه"
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
    self.detachedShop = function (obj) {
        
        var command = {
            marketerId: stateParams.id,
            shopID: obj.id
        };

        service.detached(command).then(function (response) {
            toastr.success(response.message, "موفق");
            self.setFilter();
        },
            function (error) {
                toastr.success(error.message, "خطا");
            });
    };


};
controller.$inject = ["$scope", "$state", "$stateParams", "admin.MarketerService", "toastr"];
angular.module('admin.MarketerApp').controller('admin.Marketer.MarketerDetachedShopList', controller)