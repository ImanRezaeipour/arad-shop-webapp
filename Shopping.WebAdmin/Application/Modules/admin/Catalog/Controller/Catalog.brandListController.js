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
                    url: readApi + "Brand"
                }
            }, sort: {
                field: "Name",
                dir: "asc"
            }, schema: {
                data: 'results',
                total: 'count',
                model: {
                    id: "id",
                    fields: {
                        Name: {},
                        LatinName: {},
                        IsActive: { type: "boolean" },
                        CategoryRootId: {},
                        CategoryName: {}
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
            extra: false,
            operators: {
                string: {
                    startswith: "شروع با",
                    eq: "مشابه",
                    neq: "مخالف",
                }
            },
            messages: {
                and: "و",
                or: "یا",
                filter: "اعمال",
                clear: "پاک کردن",
                info: ""
            },

        },
        columns: [{
            field: "Name",
        }, {
            field: "LatinName",

        }, {
            field: "IsActive",
            filterable: {
                messages: { isTrue: "فعال", isFalse: "غیر فعال" }
            }
        },
        { title: "" }]
    };



    self.changeActiveDeactive = function (item) {
        
        var command = {
            id: item.id
        }
        if (!item.isActive) {

            service.deactiveBrand(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        } else {

            service.activeBrand(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        }
    }

    self.removeItem = function (obj) {
        
        var command = {
            id: obj.id
        };

        service.deleteBrand(command).then(function (response) {
            toastr.success(response.message, "موفق");
            $("#grid").data("kendoGrid").dataSource.read();
        },
            function (error) {
                toastr.success(response.message, "خطا");
            });

    };

};
controller.$inject = ["$scope", "$state", "admin.CatalogService", "toastr"];
angular.module('admin.CatalogApp').controller('admin.Catalog.BrandListController', controller)