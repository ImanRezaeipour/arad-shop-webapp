var controller = function (scope, rootScope, stateParams, state, service, toastr, ngMap, filter) {

    var self = this;
    self.filter = {
        brand: {

        },
        category: {},
        subCategory: {}
    };
    scope.isCollapsed = false;
    scope.fileManagerGetUri = fileManagerGetUri;

    service.getDiscountById({ percentDiscountId: stateParams.id }).then(function (response) {
        console.log(response);
        self.discount = response;
    },
        function (error) {
            console.log(error);
        });

    var getDisProduct = function () {
        service.getDiscountProduct({ percentDiscountId: stateParams.id }).then(function (response) {
            console.log(response);
            self.discountProducts = response;
            rootScope.loadingMain = false;
        },
            function (error) {
                console.log(error);
            });
    };
    getDisProduct();


    self.removeProduct = function (item) {
        
        rootScope.loadingMain = true;
        service.removeProduct({ percentDiscountId: stateParams.id, productId: item.product.id }).then(function (response) {
            toastr.success("عملیات با موفقیت صورت پذیرفت", "موفق");
            getDisProduct();
            rootScope.loadingMain = true;
        },
            function (error) {
                rootScope.loadingMain = false;
                toastr.error(error.message, "خطا");
            });
    };

    self.selectProduct = function (item) {
        
        rootScope.loadingMain = true;
        var command = {
            percentDiscount: stateParams.id,
            productId: item.id
        };
        service.addDiscountProduct(command).then(function (response) {
            
            getDisProduct();
            toastr.success("افزودن با موفقیت صورت پذیرفت", "موفق");
            rootScope.loadingMain = true;
        },
            function (error) {
                rootScope.loadingMain = false;

            });
        //    self.discountProducts.push(item);
    };

    ///////////////////////////////////////////////////////////////////////////////////

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
            pageSize: 5,
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
        {
            title: ""

        }
        ]
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
    };

    self.filterNull = function () {
        self.filter = {
            brand: {
            },
            category: {},
            subCategory: {}
        };
        $("#grid").data("kendoGrid").dataSource.read();
    };

};
controller.$inject = ["$scope", "$rootScope", "$stateParams", "$state", "admin.DiscountService", "toastr", "NgMap", "$filter"];
angular.module('admin.OrderApp').controller('admin.Discount.DetailsController', controller)