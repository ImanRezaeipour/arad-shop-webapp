angular.module("app").factory("permissionFactory", function () {
  return {
    get: function (role) {
      var list = [];
      if (role === "Admin") {
        list = [
          {
            name: "تنظیمات",
            permission: 1,
            title: "applicationSetting"
          }, {
            name: "کاتالوگ",
            permission: 2,
            title: "catalog"
          }, {
            name: "شکایات",
            permission: 3,
            title: "complaint"
          }, {
            name: "مشتری ها",
            permission: 4,
            title: "customer"
          }, {
            name: "تخفیف ها",
            permission: 5,
            title: "discount"
          }, {
            name: "فاکتور ها",
            permission: 6,
            title: "factor"
          }, {
            name: "خانه",
            permission: 7,
            title: "home"
          }, {
            name: "بازاریاب",
            permission: 8,
            title: "marketer"
          }, {
            name: "پیام های عمومی",
            permission: 9,
            title: "message"
          }, {
            name: "سفارش ها",
            permission: 10,
            title: "order"
          }, {
            name: "ترویج کننده",
            permission: 11,
            title: "promoter"
          }, {
            name: "استان و شهر",
            permission: 12,
            title: "provinceCity"
          }, {
            name: "فروش ها",
            permission: 13,
            title: "sale"
          }, {
            name: "فروشگاه ها",
            permission: 14,
            title: "shop"
          }, {
            name: "اسلایدر",
            permission: 15,
            title: "slider"
          }, {
            name: "محصولات پیشنهادی",
            permission: 16,
            title: "suggestionProduct"
          }, {
            name: "user",
            permission: 17,
            title: "کاربران"
          }, {
            name: "verficationCode",
            permission: 18,
            title: "کد فعال سازی"
          }, {
            name: "financial",
            permission: 19,
            title: "گزارشات مالی"
          },
        ];
      }
      else if (role == "Support") {
        list = [
          {
            name: "کاتالوگ",
            permission: 2,
            title: "catalog"
          }, {
            name: "شکایات",
            permission: 3,
            title: "complaint"
          }, {
            name: "مشتری ها",
            permission: 4,
            title: "customer"
          }, {
            name: "تخفیف ها",
            permission: 5,
            title: "discount"
          }, {
            name: "فاکتور ها",
            permission: 6,
            title: "factor"
          }, {
            name: "خانه",
            permission: 7,
            title: "home"
          }, {
            name: "بازاریاب",
            permission: 8,
            title: "marketer"
          }, {
            name: "سفارش ها",
            permission: 10,
            title: "order"
          }, {
            name: "ترویج کننده",
            permission: 11,
            title: "promoter"
          }, {
            name: "استان و شهر",
            permission: 12,
            title: "provinceCity"
          }, {
            name: "فروشگاه ها",
            permission: 14,
            title: "shop"
          }, {
            name: "اسلایدر",
            permission: 15,
            title: "slider"
          }, {
            name: "محصولات پیشنهادی",
            permission: 16,
            title: "suggestionProduct"
          }, {
            name: "user",
            permission: 17,
            title: "کاربران"
          }, {
            name: "verficationCode",
            permission: 18,
            title: "کد فعال سازی"
          },
        ];
      }
      else if (role === "Financial") {
        list = [
          {
            name: "financial",
            permission: 19,
            title: "گزارشات مالی"
          }
        ];
      }
      return list;
    }
  };
});