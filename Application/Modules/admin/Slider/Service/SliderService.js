var service = function (restService) {


  this.getSliderImage = function(params) {
    return restService.get("Read", params, "Slider", true);
  };

  this.getSliderImageDiscount = function (params) {
    return restService.get("Read", params, "AddSliderToDiscount", true);
  };

  this.saveImageToSlider = function(params) {
    return restService.post("Write", params, "Slider");
  };

  this.deactiveSlider = function(params) {
    return restService.patch("Write", params, "Slider/DeActive");
  };

  this.activeSlider = function(params) {
    return restService.patch("Write", params, "Slider/Active");
  };

  this.removeSlider = function(params) {
    return restService.delete("Write", params, "Slider");
  };

  this.saveDiscountSlider = function(params) {
    return restService.put("Write", params, "AddSliderToDiscount");
  };

  this.saveData = function (params) {
    return restService.put("Write", params, "Slider/sort");
  };


};

service.$inject = ["RestService"];
angular.module('admin.sliderApp').service('admin.SliderService', service);