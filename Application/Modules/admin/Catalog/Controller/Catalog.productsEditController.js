var controller = function (scope, state, stateParams, service, toastr, $q, upload, filter) {

    var self = this;
    self.selectedCategory = {};
    
    self.product = {
        productImages: []
    }
    self.images = [];

    var gerBrandByCat = function (id) {
        
        self.brands = [];
        service.getBrandsByCategoryRootId({ categoryRootId: id }).then(function (response) {
            self.brands = response;
        },
            function (error) {
                toastr.success(error.message, "خطا");
            });
    }





    self.save = function () {
        

        self.product.productDiscount = self.product.discount;

        self.product.categoryId = self.selectedCategory.id;
        service.editProduct(self.product).then(function (response) {

            toastr.success(response.message, "موفق");
            state.go("dashboard.catalog.productsList");

        },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }

    scope.remove = function (scope) {
        scope.remove();
    };

    self.toggle = function (item) {
        
        item.toggle();
    };

    scope.moveLastToTheBeginning = function () {
        var a = scope.data.pop();
        scope.data.splice(0, 0, a);
    };

    scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
        });
    };

    scope.collapseAll = function () {
        
        scope.$broadcast('angular-ui-tree:collapse-all');
    };

    scope.expandAll = function () {
        
        scope.$broadcast('angular-ui-tree:expand-all');
    };


    service.getProductById({ id: stateParams.id }).then(function (response) {
        
        console.log(response);
        self.product = response;
        self.product.brandId = response.brand.id;
        self.selectedCategory.id = response.categoryId;
        self.selectedCategory.name = response.categoryName;
        self.product.mainImageurl = fileManagerGetUri + "/" + response.mainImage;



        service.getCategories().then(function (responseCat) {
            
            scope.data = responseCat;

            service.getBrands().then(function (response) {
                self.brands = response;
                console.log("brands", response);
            }, function (error) {
                toastr.success(error.message, "خطا");
            });
        }, function (error) {

        });


        angular.forEach(self.product.productImages,
            function (item) {
                item.imageUrl = fileManagerGetUri + "/" + item.url;
            });

    },
        function (error) {
            console.log(error);

        });





    self.upload = function (files, type, index) {
        
        scope.errorFiles = null;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (file.size > 2000000) {

                    self.fileUploaded = false;
                    scope.errorFiles = "SDasdasdf";
                    self.uploadProggress = 0;
                    return false;
                } else {
                    upload.upload({
                        url: fileManagerUri + "UploadFile",
                        file: file,
                        method: 'POST',
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        self.uploadProggress = progressPercentage;
                    }).success(function (data) {
                        
                        if (type == "mainImage") {
                            self.mainImage = angular.copy(self.product.mainImage);

                            self.product.mainImage = data;
                            self.product.mainImageurl = fileManagerGetUri + "/" + data;
                            // self.category.categoryImage.topPageCatImageurl = "http://localhost:50460/ImageUploads" + "/" + data;
                            self.fileUploaded = true;

                            var temp =
                                filter("filter")(self.product.productImages, { url: self.mainImage }, true)[0];
                            if (temp == null) {

                                self.product.productImages[self.product.productImages.length] = {
                                    url: data,
                                    imageUrl: fileManagerGetUri + "/" + data,
                                    order: self.product.productImages.length
                                };


                            } else {
                                self.order = angular.copy(temp.order);
                                temp.url = data;
                                temp.imageUrl = fileManagerGetUri + "/" + data;
                            }

                        }
                        else if (type == "secendryImage") {

                            self.product.productImages[index] = {
                                url: data,
                                imageUrl: fileManagerGetUri + "/" + data,
                                order: index
                            };



                            //self.product.mainImage = data;
                            //self.product.mainImageurl = fileManagerGetUri + "/" + data;
                            // self.category.categoryImage.topPageCatImageurl = "http://localhost:50460/ImageUploads" + "/" + data;
                            //                            self.fileUploaded = true;
                        }
                    });
                }
            }
        } else {
            self.loadingUploader = false;
        }
    };


};
controller.$inject = ["$scope", "$state", "$stateParams", "admin.CatalogService", "toastr", "$q", "Upload", "$filter"];
angular.module('admin.CatalogApp').controller('admin.Catalog.productsEditController', controller)