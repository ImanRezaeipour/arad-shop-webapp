var controller = function (scope, state, stateParams, service, toastr) {

  var self = this;


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
          url: readApi + "ShopOrder?shopId=" + stateParams.id
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
            Id: { type: "number" },
            MobileNumber: { type: "number" },
            CreationTime: {},
            Description: {},
            OrderStatus: { type: "int" },
            Customer: {
              Id: {},
              FirstName: {},
              LastName: {},
              EmailAddress: {},
              IsActive: { type: "bolean" },
              UserId: {}
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
      extra: true,
      operators: {
        string: {
          startswith: "شروع با",
          eq: "مشابه",
          neq: "مخالف",

        },
        number: {
          eq: "مساوی",
          neq: "مخالف",
          gte: "بزرگتر مساوی",
          gt: "بزرگتر از",
          lte: "کوچکتر مساوی",
          lt: "کوچکتر از"
        },
      },
      messages: {
        and: "و",
        or: "یا",
        filter: "اعمال",
        clear: "پاک کردن",
        info: ""
      },

    },


    columns: [
      {
        field: "Id"
      },
      {
        field: "CreationTime"
      }, {
        field: "OrderStatus",
        filterable: {
          ui: cityFilter
        }
      }, {
        field: "Customer.FirstName"
      }, {
        field: "Customer.LastName"
      }, {
        field: "Customer.MobileNumber"
      }, {
        field: "Customer.EmailAddress"
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
          { title: "در انتظار تایید", value: 0 },
          { title: "دارای پیشنهاد", value: 1 },
          { title: "قبول", value: 2 },
          { title: "رد", value: 3 }


          //                    [Description("معلق")]
          //                Pending,
          //                [Description("دارای پیشنهاد")]
          //                HasSuggestion,
          //                [Description("قبول")]
          //                Accept,
          //                [Description("رد")]
          //                Reject

        ]
      }),
      dataTextField: "title",
      dataValueField: "value",
      optionLabel: "انتخاب"
    });
  }


  self.changeActiveDeactive = function (item) {
    
    var command = {
      id: item.id
    }
    if (!item.isActive) {

      service.deactiveShop(command).then(function (response) {

        toastr.success(response.message, "موفق");
      },
        function (error) {
          toastr.success(response.message, "خطا");
        });

    } else {

      service.activeShop(command).then(function (response) {

        toastr.success(response.message, "موفق");
      },
        function (error) {
          toastr.success(response.message, "خطا");
        });

    }
  }


};
controller.$inject = ["$scope", "$state", "$stateParams", "admin.ShopService", "toastr"];
angular.module('admin.ShopApp').controller('admin.Shop.OrderListController', controller)