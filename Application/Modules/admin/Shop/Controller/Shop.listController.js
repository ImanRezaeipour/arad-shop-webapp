var controller = function (scope, state, service, toastr) {

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
                    url: readApi + "Shop"
                }

            },
            sort: {
                field: "CreationTime",
                dir: "desc"
            },

            schema: {
                data: 'results',
                total: 'count',
                model: {
                    Id: "Id",
                    fields: {
                        Name: {},
                        UserId: {},
                        FirstName: {},
                        LastName: {},
                        IsActive: { type: "boolean" },
                        EmailAddress: {},
                        MarketerFullName: {},
                        DefaultDiscount: { type: 'number' },
                        ShopStatus: { type: 'string' },
                        MobileNumber: { type: 'string' },
                        DescriptionStatus: {},
                        Description: {},
                        NationalCode: {},

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
                field: "PersonNumber"
            }, {
                field: "CreationTime"
            }, {
                field: "Name"
            }, {
                field: "FirstName"
            }, {
                field: "LastName"
            }, {
                field: "MobileNumber"
            }, {
                field: "NationalCode"
            }, {
                field: "EmailAddress"
            }, {
                field: "MarketerFullName"
            }, {
                field: "ShopStatus"
                , values: [
                    { text: "در انتظار بررسی", value: 0 },
                    { text: "تایید شده", value: 1 },
                    { text: "رد شده", value: 2 }
                ]
            }, {
                field: "IsActive",
                filterable: {
                    messages: { isTrue: "فعال", isFalse: "غیر فعال" }
                }
            },
            { title: "" }
        ]
    };

    function cityFilter(element) {
        element.kendoDropDownList({
            dataSource: new kendo.data.DataSource({
                data: [
                    { title: "در انتظار بررسی", value: 0 },
                    { title: "تایید شده", value: 1 },
                    { title: "رد شده", value: 2 }
                ]
            }),
            dataTextField: "title",
            dataValueField: "value",
            optionLabel: "انتخاب"
        });
    }


    self.changeActiveDeactive = function (item) {
        var command = {
            id: item.id
        };
        if (!item.isActive) {
            service.deactiveShop(command).then(function (response) {
                toastr.success(response.message, "موفق");
            }, function (error) {
                toastr.success(response.message, "خطا");
            });
        } else {
            service.activeShop(command).then(function (response) {
                toastr.success(response.message, "موفق");
            }, function (error) {
                toastr.success(response.message, "خطا");
            });
        }
    };

};
controller.$inject = ["$scope", "$state", "admin.ShopService", "toastr"];
angular.module('admin.ShopApp').controller('admin.ShopListController', controller)