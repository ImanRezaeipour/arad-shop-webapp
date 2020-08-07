var controller = function (scope, rootScope, stateParams, state, service, toastr, ngMap, filter) {
    var self = this;

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
                    url: readApi + "DiscountPercentShopSell?percentDiscountId=" + stateParams.id
                }
            },
            schema: {
                data: 'results',
                total: 'count',
                model: {
                    fields: {
                        Shop: {
                            FirstName: { type: "string" },
                            LastName: { type: "string" },
                            Name: { type: "string" },
                            MobileNumber: { type: "string" }
                        },
                        Debit: { type: "string" }
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
                field: "Shop.FirstName"
            },
            {
                field: "Shop.LastName"
            },
            {
                field: "Shop.Name"
            },
            {
                field: "Shop.MobileNumber"
            },
            {
                field: "Debit"
            }
        ]
    };

};
controller.$inject = ["$scope", "$rootScope", "$stateParams", "$state", "admin.DiscountService", "toastr", "NgMap", "$filter"];
angular.module('admin.OrderApp').controller('admin.Discount.ShopDebitReportController', controller);