var controller = function (scope, state, service, toastr) {

  var self = this;
  self.fileManagerGetUri = fileManagerGetUri;
  self.filter = { fromDate: "", toDate: "" };
  self.total = null;
  //    var getData = function () {
  

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
          url: readApi + "FactorFinancialReport",
          data: function () {
            return {
              fromDate: self.filter.fromDate,
              toDate: self.filter.toDate,
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
            CreationTime: { type: 'string' },
            CustomerFirstName: { type: 'string' },
            CustomerLastName: { type: 'string' },
            ShopName: { type: 'string' },
            DiscountPrice: { type: 'number' },
            SystemDiscountPrice: { type: 'number' },
            RealDiscountPrice: { type: 'number' },
            ShopIban: { type: 'number' }
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
        enums: {
          eq: "مساوی",
          neq: "مخالف"
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
        field: "creationTime",
        title: "تاریخ ایجاد",
      }, {
        field: "customerFirstName",
        title: "نام مشتری",
      }, {
        field: "customerLastName",
        title: "نام خانوادگی مشتری"
      }, {
        field: "shopName",
        title: "نام فروشگاه"
      }, {
        field: "discountPrice",
        title: "مبلغ نا خالص"
      }, {
        field: "systemDiscountPrice",
        title: "مبلغ خالص واریز بانک"
      }, {
        field: "realDiscountPrice",
        title: "مبلغ تخفیف"
      }, {
        field: "shopIban",
        title: "شماره شبا"
      },
      {
        title: ""
      },
    ]
  };

  self.getTotalFinancial = function () {
    debugger;
    service.getTotalFinancial(self.filter).then(function (response) {
      console.log(response);
      self.total = response;
    },
      function (error) {
        console.log(error);
      });
  };
  self.getTotalFinancial();
  self.setFilter = function () {
    $("#grid").data("kendoGrid").dataSource.read();
    self.getTotalFinancial();
  };


};
controller.$inject = ["$scope", "$state", "admin.FinancialService", "toastr"];
angular.module('admin.FactorApp').controller('admin.Financial.ListController', controller)