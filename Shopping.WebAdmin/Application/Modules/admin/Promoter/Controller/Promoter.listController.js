var controller = function (scope, state, service, toastr) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;

    scope.mainGridOptions = {
        dataSource: {
            type: "odata",
            transport: {
                read: {
                    dataType: "json",
                    headers: {
                        "accept": "application/json; odata=verbose",
                        "Authorization": authHeader
                    },
                    url: readApi + "Promoter"
                }

            },
            sort: {
                field: "LastName",
                dir: "asc"
            },

            schema: {
                data: 'results',
                total: 'count',
                model: {
                    Id: "Id",
                    fields: {
                        Id: {},
                        Code: {},
                        FirstName: {},
                        LastName: {},
                        NationalCode: {},
                        MobileNumber: {},
                        CustomerSubsetCount: {}
                    }
                }
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true
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
                    neq: "مخالف"
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
                    neq: "مخالف"

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
                field: "Code"
            }, {
                field: "FirstName"
            }, {
                field: "LastName"
            }, {
                field: "NationalCode"
            }, {
                field: "MobileNumber"
            }, {
                field: "CustomerSubsetCount"
            }, {
                field: "CustomerSubsetHavePaidFactorCount"
            }, {
                field: ""
            }
        ]
    };


    self.removePromoter = function (dataItem) {

        service.removePromoter({ id: dataItem.id }).then(function (response) {
            toastr.success(response.message, "موفق");
            $("#grid").data("kendoGrid").dataSource.read();
        },
            function (error) {
                toastr.success(response.message, "خطا");
            });

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
    };


};
controller.$inject = ["$scope", "$state", "admin.PromoterService", "toastr"];
angular.module('admin.MarketerApp').controller('admin.Promoter.listController', controller)