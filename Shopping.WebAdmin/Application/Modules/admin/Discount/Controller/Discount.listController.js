var controller = function (scope, state, service, toastr) {

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
            Title: { type: "string" }
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

  


  self.changeActiveDeactive = function (item) {
    
    var command = {
      id: item.id
    };
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
  };


};
controller.$inject = ["$scope", "$state", "admin.DiscountService", "toastr"];
angular.module('admin.OrderApp').controller('admin.Discount.listController', controller)