var controller = function (scope, stateParams,filter , state, service, toastr, ngMap, upload) {

  var self = this;
  self.fileManagerGetUri = fileManagerGetUri;

  var getData = function () {
    service.provinceCity().then(function (response) {
      console.log(response);
      self.provinceCity = response;

      self.shop.shopAddress.province =
        filter('filter')(self.provinceCity, { id: self.shop.shopAddress.provinceId }, true)[0];
      self.shop.shopAddress.city =
        filter('filter')(self.shop.shopAddress.province.cities, { id: self.shop.shopAddress.cityId }, true)[0];

    });
  };



  ngMap.getMap().then(function (map) {
    self.map = map;
  });

  self.selectLocation = function () {
    
    console.log(self.map.getCenter());


    self.shop.shopAddress.position.latitude = self.pos[0];
    self.shop.shopAddress.position.longitude = self.pos[1];
    self.edit = false;

  }

  self.dragEnd = function () {
    self.pos = [self.map.getCenter().lat(), self.map.getCenter().lng()];
  };


  service.getShopById({ shopId: stateParams.id }).then(function (response) {
    console.log(response);
    self.shop = response;
    //    self.shop.bankAccount.iban = self.shop.bankAccount.iban;
    self.shop.imageDocuments.faceImageUrl = fileManagerGetUri + "/" + response.imageDocuments.faceImage;
    self.shop.imageDocuments.nationalCardImageUrl = fileManagerGetUri + "/" + response.imageDocuments.nationalCardImage;
    self.center = [self.shop.shopAddress.position.latitude, self.shop.shopAddress.position.longitude];
    self.pin = [self.shop.shopAddress.position.latitude, self.shop.shopAddress.position.longitude];
    self.tempPin = angular.copy(self.pin);
    self.centerTemp = angular.copy(self.center);
    
    getData();
  },
    function (error) {
      console.log(error);
    });

  self.editShop = function () {
    
    self.shop.shopId = self.shop.id;
    self.shop.shopAddress.provinceId = self.shop.shopAddress.province.id;
    self.shop.shopAddress.cityId = self.shop.shopAddress.city.id;
    service.editShop(self.shop).then(function (response) {
      
      if (response.success == false) {
        toastr.error(response.message, "خطا");
      } else {
        toastr.success(response.message, "موفق");
        state.go("dashboard.shop.list");

      }

    },
      function (error) {
        
        toastr.error(error.message, "خطا");
      });
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
            
            if (type === "faceImage") {
              self.shop.imageDocuments.faceImage = data;
              self.shop.imageDocuments.faceImageUrl = fileManagerGetUri + "/" + data;
              // self.category.categoryImage.topPageCatImageurl = "http://localhost:50460/ImageUploads" + "/" + data;
              self.fileUploaded = true;
            }
            else if (type === "nationalCardImage") {
              self.shop.imageDocuments.nationalCardImage = data;
              self.shop.imageDocuments.nationalCardImageUrl = fileManagerGetUri + "/" + data;
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
controller.$inject = ["$scope", "$stateParams", "$filter" , "$state", "admin.ShopService", "toastr", "NgMap", "Upload"];
angular.module('admin.ShopApp').controller('admin.Shop.EditController', controller)