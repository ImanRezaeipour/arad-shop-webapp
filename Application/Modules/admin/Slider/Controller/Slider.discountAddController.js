
var controller = function (scope, stateParams, state, service, toastr, upload) {

  var self = this;
  self.fileManagerGetUri = fileManagerGetUri;



  if (stateParams.id !== "") {
    self.imageData = stateParams.imgId;
    self.imageUrl = self.fileManagerGetUri + "/" + stateParams.imgId;
  }

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
          url: readApi + "Discount"
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
          Id: "Id",
          fields: {
            Id: { type: "string" },
            CreationTime: { type: "string" },
            Description: { type: "string" },
            UserInfo: {
              FirstName: { type: "string" },
              LastName: { type: "string" },
              UserId: { type: "string" }
            },
            FromDate: { type: "string" },
            ToDate: { type: "string" },
            Title: { type: "string" },
            DiscountType: { type: "number" }
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
      extra: true,
      operators: {
        string: {
          startswith: "شروع با",
          eq: "مشابه",
          neq: "مخالف"
        },
        number: {
          eq: "مساوی",
          neq: "مخالف",
          gte: "بزرگتر مساوی",
          gt: "بزرگتر از",
          lte: "کوچکتر مساوی",
          lt: "کوچکتر از"
        }
      },
      messages: {
        and: "و",
        or: "یا",
        filter: "اعمال",
        clear: "پاک کردن",
        info: ""
      }
    },
    columns: [
      {
        field: "CreationTime"
      },
      {
        field: "Title"
      },
      {
        field: "FromDate"
      },
      {
        field: "ToDate"
      }
      ,
      {
        field: "DiscountType",
        filterable: {
          ui: cityFilter
        }
      },
      {
        field: "UserInfo.FirstName"
      },
      {
        field: "UserInfo.LastName"
      },
      {
        field: "Description"
      }
    ]
  };

  function cityFilter(element) {
    element.kendoDropDownList({
      dataSource: new kendo.data.DataSource({
        data: [
          { title: "تخفیف درصدی", value: 0 },
        ]
      }),
      dataTextField: "title",
      dataValueField: "value",
      optionLabel: "انتخاب"
    });
  }



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
            
            self.imageData = angular.copy(data);
            self.imageUrl = self.fileManagerGetUri + "/" + data;
          });
        }
      }
    } else {
      self.loadingUploader = false;
    }
  };


  self.addSlider = function () {
    var command = {
      imageName: self.imageData,
      sliderType: 1,
      discountId: self.selecetdId
    };
    service.saveDiscountSlider(command).then(function (response) {
        console.log(response);
        toastr.success(response.message, "موفق");
        state.go("dashboard.slider.discountList");
    },
      function (error) {
        toastr.error(error.message, "خطا");
      });


  };


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.SliderService", "toastr", "Upload"];
angular.module('admin.sliderApp').controller('admin.Slider.DiscountAddController', controller)