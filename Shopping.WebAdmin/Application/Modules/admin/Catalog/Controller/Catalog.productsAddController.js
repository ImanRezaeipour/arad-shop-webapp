var controller = function (scope, state, service, toastr, $q, upload, filter) {

    var self = this;
    
    self.product = {
        productImages: []
    }
    self.images = [];

    //    var createBlob = function (file) {
    //
    //        var deferred = $q.defer();
    //        var reader = new FileReader();
    //        reader.onload = function () {
    //            deferred.resolve(reader.result);
    //        };
    //        reader.readAsDataURL(file);
    //        return deferred.promise;
    //    }

    //    service.getBrands().then(function (response) {
    //        self.brands = response;
    //    },
    //        function (error) {
    //            toastr.success(error.message, "خطا");
    //        });


    service.getBrands().then(function (response) {
        self.brands = response;
        console.log("brands",response);
    }, function (error) {
        toastr.success(error.message, "خطا");
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
                            self.product.mainImage = data;
                            self.product.mainImageurl = fileManagerGetUri + "/" + data;
                            // self.category.categoryImage.topPageCatImageurl = "http://localhost:50460/ImageUploads" + "/" + data;
                            self.fileUploaded = true;

                            self.product.productImages[0] = {
                                url: data,
                                imageUrl: fileManagerGetUri + "/" + data,
                                order: 0
                            };
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

    self.save = function () {
        
        self.product.productImages = filter("filter")(self.product.productImages, { url: "" }, false);

        //self.product.productImages
        self.product.categoryId = self.selectedCategory.id;
        service.addProduct(self.product).then(function (response) {

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

    service.getCategories().then(function (response) {
        scope.data = response;
    }, function (error) {
    });
};
controller.$inject = ["$scope", "$state", "admin.CatalogService", "toastr", "$q", "Upload", "$filter"];
angular.module('admin.CatalogApp').controller('admin.Catalog.productsAddController', controller)