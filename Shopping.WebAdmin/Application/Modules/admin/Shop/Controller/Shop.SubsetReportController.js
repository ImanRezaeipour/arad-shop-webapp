var controller = function (scope, state, service, toastr) {

    var self = this;


  self.fileManagerGetUri = fileManagerGetUri;
  self.filter = { fromDate: "", toDate: "" };
 
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
          url: readApi + "ShopsCustomerSubsetReport",
          data: function () {
            return {
              fromDate: self.filter.fromDate,
              toDate: self.filter.toDate,
            };
          }
        }

      },
      sort: {
        field: "CustomerSubsetsHavePaidFactorCount",
        dir: "desc"
      },

      schema: {
        data: 'results',
        total: 'count',
        model: {
          fields: {
            PersonNumber: { type: 'number'},
            Name: { type: 'string' },
            FirstName: { type: 'string' },
            LastName: { type: 'string' },
            MobileNumber: { type: 'string' },
            MarketerFullName: { type: 'string' },
            CustomerSubsetsCount: { type: 'number' },
            CustomerSubsetsHavePaidFactorCount: { type: 'number' },
            CustomerSubsetsNotSettlementCount: { type: 'number' },
            CustomerSubsetsSettlementCount: { type: 'number' }
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
          neq: "مخالف",

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
        field: "personNumber",
        title: "کد فروشگاه",
      },
      {
        field: "name",
        title: "نام فروشگاه",
      }, {
        field: "firstName",
        title: "نام"
      }, {
        field: "lastName",
        title: "نام خانوادگی"
      }, {
        field: "mobileNumber",
        title: "شماره تلفن"
      }, {
        field: "marketerFullName",
        title: "نام بازاریاب"
      }, {
        field: "customerSubsetsCount",
        title: "تعداد کل جذب"
      }, {
        field: "customerSubsetsHavePaidFactorCount",
        title: "تعداد کل منجر به خرید"
      }, {
        field: "customerSubsetsSettlementCount",
        title: "تعداد تسویه شده"
      },{
        field: "customerSubsetsNotSettlementCount",
        title: "تعداد تسویه نشده"
      }
    ]
  };
  //    };
  //    getData();

  self.setFilter = function () {
    //        scope.mainGridOptions.data('kendoGrid').refresh();
    // scope.mainGridOptions.dataSource.transport.read();
    $("#grid").data("kendoGrid").dataSource.read();

  };


};
controller.$inject = ["$scope", "$state", "admin.ShopService", "toastr"];
angular.module('admin.ShopApp').controller('admin.SubsetReportController', controller)