var controller = function (scope, stateParams, state, service, toastr, upload, filter) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;

    service.getShopById({ shopId: stateParams.id }).then(function (response) {
        console.log(response);
        self.shop = response;
    },
        function (error) {
            console.log(error);
        });


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
                    url: readApi + "Marketer"
                }

            },
            sort: {
                field: "CreationTime",
                dir: "asc"
            },

            schema: {
                data: 'results',
                total: 'count',
                model: {
                    Id: "Id",
                    fields: {
                        Id: {},
                        CreationTime: { type: 'date' },
                        Image: {},
                        FirstName: {},
                        LastName: {},
                        MaxMarketerAllowed: { type: 'number' },
                        SubsetShopCount: { type: 'number' },
                        IsActive: { type: "boolean" },
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
                field: "Id"
            }, {
                field: "CreationTime"
            },
            {
                field: ""
            }, {
                field: "FirstName"
            }, {
                field: "LastName"
            }, {
                field: "MaxMarketerAllowed"
            }, {
                field: "SubsetShopCount"
            }, {
                field: "IsActive",
                filterable: {
                    messages: { isTrue: "فعال", isFalse: "غیر فعال" }
                }
            }, {
                field: "",
            }

        ]
    };
    self.selectMarketer = function (obj) {
        var command =
        {
            shopId: stateParams.id,
            newMarketerId: obj.id
        };
        service.changeMarketer(command).then(function (response) {
            toastr.success(response.message, "موفق");
            state.go("dashboard.marketer.list");
        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    };


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.MarketerService", "toastr", "Upload", "$filter"];
angular.module('admin.MarketerApp').controller('admin.Marketer.ShopsChangeMarketerController', controller)