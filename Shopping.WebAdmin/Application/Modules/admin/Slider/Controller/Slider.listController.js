var controller = function (scope, state, service, toastr, upload) {

  var self = this;
  self.fileManagerGetUri = fileManagerGetUri;

  var getSlider = function () {
    service.getSliderImage().then(function (response) {
      console.log(response);
      self.sliderList = response;
      
    },
      function (error) {
        console.log(response);
        
      });
  };



  getSlider();

  self.upload = function (files, type, index) {
    self.loadingUploader = true;
    
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.size > 20000000000) {
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
            self.loadingUploader = false;
            
            if (type == "mainImage") {

              service.saveImageToSlider({ imageName: data, sliderType: 0 }).then(function (response) {
                toastr.success(response.message, "موفق");
                getSlider();
              },
                function (error) {
                  toastr.error(error.message, "خطا");
                });

              getSlider();

            }

          });
        }
      }
    } else {
      self.loadingUploader = false;
    }
  };


  self.removeItem = function (item) {
    service.removeSlider({ sliderId: item.id }).then(function (response) {
      toastr.success(response.message, "موفق");
      getSlider();
    },
      function (error) {
        toastr.error(error.message, "خطا");
      });
  };

  self.saveSort = function () {
    var index = 0;
    var command = {
      sliders: []
    };

    angular.forEach(self.sliderList,
      function(item) {
        command.sliders.push({
          id: item.id,
          order: index
        });
        index = index + 1;
      });

    service.saveData(command).then(function (resposne) {
      toastr.success(resposne.message, "موفق");
      getSlider();
    },
      function (error) {
        toastr.error(error.message, "خطا");
      });

  };


  self.changeActiveDeactive = function (item) {
    
    var command = {
      id: item.id
    }
    if (!item.isActive) {
      service.deactiveSlider(command).then(function (response) {
        toastr.success(response.message, "موفق");
      },
        function (error) {
          toastr.success(response.message, "خطا");
        });

    } else {

      service.activeSlider(command).then(function (response) {

        toastr.success(response.message, "موفق");
      },
        function (error) {
          toastr.success(response.message, "خطا");
        });

    }
  }

};
controller.$inject = ["$scope", "$state", "admin.SliderService", "toastr", "Upload"];
angular.module('admin.sliderApp').controller('admin.Slider.listController', controller)