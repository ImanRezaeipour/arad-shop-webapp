var controller = function (scope, service, toastr) {
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
                    url: readApi + "Customer"
                }
            },
            sort: {
                field: "CreationTime",
                dir: "desc"
            },
            schema: {
                data: "results",
                total: "count",
                model: {
                    Id: "Id",
                    fields: {
                        CreationTime: { type: "string" },
                        FirstName: { type: "string" },
                        LastName: { type: "string" },
                        EmailAddress: { type: "string" },
                        IsActive: { type: "boolean" },
                        MobileNumber: { type: "string" }
                    }
                }
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            editable: "inline"

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
        serverFiltering: true,
        filterable: {
            extra: false,
            operators: {
                string: {
                    startswith: "شروع با",
                    eq: "مشابه",
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
                field: "CreationTime"
            },
            {
                field: "FirstName"
            },
            {
                field: "LastName"
            },
            {
                field: "MobileNumber"
            },
            {
                field: "EmailAddress"
            },
            {
                field: "IsActive",
                filterable: {
                    messages: { isTrue: "فعال", isFalse: "غیر فعال" }
                }
            },
            {
                title: ""
            }]
    };

    self.changeActiveDeactive = function (item) {
        var command = {
            id: item.id
        };
        if (!item.isActive) {
            service.deactiveCustomer(command).then(function (response) {
                toastr.success(response.message, "موفق");
            }, function (error) {
                toastr.success(response.message, "خطا");
            });
        } else {
            service.activeCustomer(command).then(function (response) {
                toastr.success(response.message, "موفق");
            }, function (error) {
                toastr.success(response.message, "خطا");
            });
        }
    };

};
controller.$inject = ["$scope", "admin.CustomerService", "toastr"];
angular.module('admin.CustomerApp').controller('admin.CustomerListController', controller)