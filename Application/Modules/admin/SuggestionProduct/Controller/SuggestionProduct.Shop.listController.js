var controller = function (scope, state, service, toastr) {

    var self = this;
    scope.fileManagerGetUri = fileManagerGetUri;

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
                    url: readApi + "ShopProductSuggestion"
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
                    id: "id",
                    fields: {
                        CreationTime: {},
                        Description: {},
                        ProductImage: {},
                        ProductSuggestionStatus: {
                            type: "string"
                        },
                        Title: {},
                        FullName: {},
                        ShopName: {},
                        ProductSuggestionGroup: {
                            BrandName: {},
                            CategoryId: {},
                            CategoryName: {},
                            CategoryRootId: {},
                            CategoryRootName: {},
                        }
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
            },

        },

        //creationTime: {},
        //description: {},
        //productImage: {},
        //productSuggestionStatus: {},
        //title: {},
        //productSuggestionGroup: {
        //    brandName: {},
        //    categoryId: {},
        //    categoryName: {},
        //    categoryRootId: {},
        //    categoryRootName: {},
        //}

        columns: [
            {
                field: "ProductImage",
                filterable: false
            }, {
                field: "Title"
            }, {
                field: "CreationTime",
                filterable: false
            }, {
                field: "ProductSuggestionGroup.categoryName"
            },{
                field: "shopName"
            },{
                field: "fullName"},
//            {
//                field: "ProductSuggestionGroup.CategoryRootName"
//            },
//            {
//                field: "ProductSuggestionGroup.CategoryName"
//            },
            {
                field: "ProductSuggestionStatus",
                 values: [
                     { text: "در انتظار بررسی", value: 0 },
                     { text: "تایید شده", value: 1 },
                     { text: "رد شده", value: 2 }

                ]
//                filterable: {
//                    ui: cityFilter
//                }
            }, {
                field: "Description"
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


    self.changeActiveDeactive = function (item, type) {
        
        var command = {
            id: item.id
        }
        if (type == 0) {

            service.acceptProduct(command).then(function (response) {

                toastr.success(response.message, "موفق");
                item.productSuggestionStatus = 2;
                item.deAcceptItem = null;
                item.acceptItem = null;
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        } else {

            service.deAcceptProduct(command).then(function (response) {
                item.productSuggestionStatus = 1;
                item.deAcceptItem = null;
                item.acceptItem = null;
                self.description = null;
                self.showDescription = false;
                toastr.success(response.message, "موفق");
            },
                function (error) {
                    toastr.success(response.message, "خطا");
                });

        }
    }


};
controller.$inject = ["$scope", "$state", "admin.SuggestionProductService", "toastr"];
angular.module('admin.suggestionProductApp').controller('admin.SuggestionProduct.Shop.listController', controller)