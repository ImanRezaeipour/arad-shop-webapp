var controller = function (scope, state, service, toastr) {
    
    var self = this;
    scope.fileManagerGetUri = fileManagerGetUri;
    self.filter = {
        brand: {

        },
        category: {},
        subCategory: {}
    };

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
                    url: readApi + "Product",
                    data: function () {
                        
                        return {
                            brandId: self.filter.brand.id,
                            categoryRootId: self.filter.category.id,
                            subCategoryId: self.filter.subCategory.id,
                        };
                    }
                }

            }, sort: {
                field: "Name",
                dir: "asc"
            },
            schema: {
                data: 'results',
                total: 'count',
                model: {
                    id: "id",
                    fields: {
                        MainImage: {},
                        Name: {},
                        IsActive: { type: "boolean" },
                        Price: {},
                        Brand: {
                            Name: {

                            }
                        }, CategoryName: {}
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
            buttonCount: 5,
            pageSize: 10,
            pageSizes: [10, 25, 50, 100, 200],
            messages: {
                display: "{0}-{1} از {2} آیتم",
                empty: "همه",
                itemsPerPage: "تعداد آیتم",

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
            field: "MainImage",
            filterable: false
        }, {
            field: "Name"
        }, {
            field: "Price"

        }, {
            field: "Brand.Name"

        }, {
            field: "CategoryName"
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

            service.deactiveProduct(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        } else {

            service.activeProduct(command).then(function (response) {

                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        }
    };

    self.removeItem = function (obj) {
        
        var command = {
            id: obj.id
        };


        service.deleteProduct(command).then(function (response) {

            toastr.success(response.message, "موفق");
            $("#grid").data("kendoGrid").dataSource.read();
        },
            function (error) {
                toastr.success(response.message, "خطا");
            });

    };

    service.getBrands().then(function (response) {
        
        console.log(response);
        self.barnds = response;
    },
        function (error) {

        });

    service.getCategories().then(function (response) {
        
        console.log(response);
        self.categories = response;
    },
        function (error) {

        });

    self.filterClick = function () {
        $("#grid").data("kendoGrid").dataSource.read();
    }

    self.filterNull = function () {
        self.filter = {
            brand: {

            },
            category: {},
            subCategory: {}
        };
        $("#grid").data("kendoGrid").dataSource.read();
    }
    //Guid ? brandId, Guid ? categoryRootId, Guid ? subCategoryId
};
controller.$inject = ["$scope", "$state", "admin.CatalogService", "toastr"];
angular.module('admin.CatalogApp').controller('admin.CatalogProductsListController', controller)