var controller = function (scope, stateParams, state, service, toastr, upload, filter) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;

    self.genders = [
        { id: 0, title: "مرد" },
        { id: 1, title: "زن" },
    ];


    service.getCities().then(function (response) {
        console.log(response);
        self.provinces = response;
        self.province = response[0];
        self.city = self.province.cities[1].id;

    },
        function (error) { });


  self.user = {
    barcodeId: guid(),
    documents: [],
    documentsImages: [],
    marketerReagent: {}
  };


    self.addMarketer = function () {
      debugger;


        if (self.user.marketerAddress.mobileNumber == self.user.marketerReagent.reagentMobileNumber) {
            toastr.error("شماره همراه فروشگاه و معرف یکی است", "خطا");
            return false;
        }

        self.user.marketerAddress.cityId = self.user.marketerAddress.city.id;
        self.user.marketerAddress.cityName = self.user.marketerAddress.city.cityName;

        angular.forEach(self.user.documentsImages,
            function(item) {
                self.user.documents.push(item.url);
            });
        service.saveMarketer(self.user).then(function (response) {
            toastr.success(response.message, "موفق");
                state.go("dashboard.marketer.list");
            },
            function (error) {
                toastr.error(error.message, "خطا");
            });
    }

    self.itemRemoveImage = function (obj) {
        var item = filter("filter")(self.user.documentsImages, obj, true)[0];
        self.user.documentsImages.splice(self.user.documentsImages.indexOf(item), 1);
    }

    self.upload = function (files, type, index) {
        
        scope.errorFiles = null;
        self.loadingUploader = true;
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
                        
                        self.loadingUploader = false;
                        if (type == "profileImage") {
                            self.user.image = data;
                            self.user.imageUrl = fileManagerGetUri + "/" + data;
                            // self.category.categoryImage.topPageCatImageurl = "http://localhost:50460/ImageUploads" + "/" + data;
                            self.fileUploaded = true;
                        }
                        else if (type == "userImage") {

                            self.user.documentsImages[index] = {
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
controller.$inject = ["$scope", "$stateParams", "$state", "admin.MarketerService", "toastr", "Upload", "$filter"];
angular.module('admin.MarketerApp').controller('admin.Marketer.AddController', controller)