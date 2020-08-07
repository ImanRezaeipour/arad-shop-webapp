var controller = function (scope, stateParams, state, service, toastr, $q , upload) {

    var self = this;
    
    self.category = {
        categoryImage: {}
    }
    self.id = null;

    if (stateParams.id != "") {
        self.id = stateParams.id;
        service.getCategoryById({ id: self.id }).then(function (response) {
            
            console.log(response);

            self.category = response;
            self.category.categoryImage.topPageCatImageurl = fileManagerGetUri + "/" + response.categoryImage.topPageCatImage;
            self.category.categoryImage.mainCatImageurl = fileManagerGetUri + "/" + response.categoryImage.mainCatImage;
            self.category.categoryImage.fullMainCatImageurl = fileManagerGetUri + "/" + response.categoryImage.fullMainCatImage;
        },
            function (error) {
                console.log(error);
            });
    }

    var createBlob = function (file) {
        var deferred = $q.defer();
        var reader = new FileReader();
        reader.onload = function () {
            deferred.resolve(reader.result);
        };
        reader.readAsDataURL(file);
        return deferred.promise;
    }

    self.save = function () {
        
        if (self.category.isRoot == true) {
            service.editCategory(self.category).then(function(response) {
                    toastr.success(response.message, "موفق");
                    state.go("dashboard.catalog.categoriesList");
                },
                function(error) {
                    toastr.error(error.message, "خطا");
                });
        } else {
            service.editCategoryChild(self.category).then(function (response) {
                    toastr.success(response.message, "موفق");
                    state.go("dashboard.catalog.categoriesList");
                },
                function (error) {
                    toastr.error(error.message, "خطا");
                });
        }

        
    }

    self.upload = function (files, type) {
        debugger
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (file.size > 2000000000) {
                    self.uploadError = "حجم تصویر انتخاب شده نباید بیشتر از 1 مگابایت باشد.";
                    self.fileUploaded = false;

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
                        
                        if (type == "topPageCatImage") {
                            self.category.categoryImage.topPageCatImage = data;
                            self.category.categoryImage.topPageCatImageurl = fileManagerGetUri + "/" + data;
                            // self.category.categoryImage.topPageCatImageurl = "http://localhost:50460/ImageUploads" + "/" + data;
                            self.fileUploaded = true;
                        }
                        else if (type == "mainCatImage") {
                            self.category.categoryImage.mainCatImage = data;
                            self.category.categoryImage.mainCatImageurl = fileManagerGetUri + "/" + data;
                            // self.category.categoryImage.topPageCatImageurl = "http://localhost:50460/ImageUploads" + "/" + data;
                            self.fileUploaded = true;
                        }
                        else if (type == "fullMainCatImage") {
                            self.category.categoryImage.fullMainCatImage = data;
                            self.category.categoryImage.fullMainCatImageurl = fileManagerGetUri + "/" + data;
                            // self.category.categoryImage.topPageCatImageurl = "http://localhost:50460/ImageUploads" + "/" + data;
                            self.fileUploaded = true;
                        }

                    });
                }
            }
        } else {
            self.loadingUploader = false;
       
        }
    };




};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.CatalogService", "toastr", "$q" , "Upload"];
angular.module('admin.CatalogApp').controller('admin.Catalog.categoriesEditController', controller)