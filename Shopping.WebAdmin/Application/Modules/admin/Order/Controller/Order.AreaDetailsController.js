var controller = function (scope, stateParams, state, service, toastr, ngMap) {

    var self = this;
    self.fileManagerGetUri = fileManagerGetUri;


  service.getOrderById({ id: stateParams.id }).then(function (response) {
      console.log(response);
      self.order = response;
    },
    function (error) {
      console.log(error);
    });

 
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
          url: readApi + "AreaOrder",
          data: function () {
            return {
              privateOrderId: stateParams.id,
            };
          }
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
            CreationTime: {},
            expireTime: {},
            Shop: {
              Id: {},
              FirstName: {},
              LastName: {},
              MobileNumber: {},
              Name: {}
            }
          }
        }
      },
      pageSize: 5,
      serverPaging: true,
      serverSorting: true,
      serverFiltering: true
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
        },
      },
      messages: {
        and: "و",
        or: "یا",
        filter: "اعمال",
        clear: "پاک کردن",
        info: ""
      }
    },

//    Id: { type: "number" },
//    CreationTime: {},
//    expireTime: {},
//    Shop: {
//      Id: {},
//      FirstName: {},
//      LastName: {},
//      MobileNumber: {},
//      Name: {}
//    }

    columns: [
      {
        field: "Id"
      },
      {
        field: "CreationTime"
      },
      {
        field: "ExpireTime"
      },
      {
        field: "Shop.Name",
      },
      {
        field: "Shop.FirstName"
      },
      {
        field: "Shop.LastName"
      },
      {
        field: "Shop.MobileNumber"
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

        ]
      }),
      dataTextField: "title",
      dataValueField: "value",
      optionLabel: "انتخاب"
    });
  }

    ngMap.getMap().then(function (map) {
    });


};
controller.$inject = ["$scope", "$stateParams", "$state", "admin.OrderService", "toastr", "NgMap"];
angular.module('admin.OrderApp').controller('admin.Order.AreaDetailsController', controller)