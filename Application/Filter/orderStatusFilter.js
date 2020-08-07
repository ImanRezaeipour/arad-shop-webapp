
angular.module('app').filter('orderStatusFilter', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 0:
        txt = "در انتظار تایید";
        break;
      case 1:
        txt = "دارای پیشنهاد";
        break;
      case 2:
        txt = "قبول";
        break;
      case 3:
        txt = "باز شده توسط خودم";
        break;
      case 4:
        txt = "باز شده توسط دیگران";
        break;
      case 5:
        txt = "کنسل";
        break;
      default:
    }
    return txt;
  };
});


angular.module('app').filter('orderType', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 0:
        txt = "سفارش برای فروشگاه";
        break;
      case 1:
        txt = "سفارش محدوده ای";
        break;



      default:
    }
    return txt;
  };
});
angular.module('app').filter('orderIsExpired', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case true:
        txt = "منقضی شده";
        break;
      case false:
        txt = "منقضی نشده";
        break;
      default:
    }
    return txt;
  };
});



angular.module('app').filter('factorStateFilter', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 0:
        txt = "در انتظار تایید";
        break;
      case 1:
        txt = "پرداخت شده";
            break;
      case 2:
          txt = "ناموفق";
          break;

      default:
    }
    return txt;
  };
});


angular.module('app').filter('shipmentStateFilter', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 0:
        txt = "در انتظار تایید";
        break;
      case 1:
        txt = "ارسال شده";
        break;
      case 2:
        txt = "تحویل";
        break;
      case 3:
        txt = "بازگشتی";
        break;
      default:
    }
    return txt;
  };
});

angular.module('app').filter('publicMessageTypeFilter', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 0:
        txt = "پیام برای فروشگاه";
        break;
      case 1:
        txt = "پیام برای مشتری";
        break;
      default:
    }
    return txt;
  };
});


angular.module('app').filter('shopAcceptorStatusFilter', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 0:
        txt = "در حال بررسی";
        break;
      case 1:
        txt = "تایید";
        break;
      case 2:
        txt = "رد";
        break;
      default:
    }
    return txt;
  };
});


angular.module('app').filter('shopMarketersHistoryTypeFilter', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 0:
        txt = "انتساب";
        break;
      case 1:
        txt = "منفصل";
        break;
      default:
    }
    return txt;
  };
});

angular.module('app').filter('PanelNotificationTypeFilter', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 1:
        txt = "فروشگاه جدید";
        break;
      default:
    }
    return txt;
  };
});

angular.module('app').filter('OrderSuggestionTypeFilter', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 0:
        txt = "دارای محصول";
        break;
      case 1:
        txt = "محصول جایگزین";
        break;
      case 2:
        txt = "بدون محصول جایگزین";
        break;
      default:
    }
    return txt;
  };
});

angular.module('app').filter('DiscountTypeFilter', function () {
  return function (item) {
    var txt = "";
    switch (item) {
      case 0:
        txt = "تخفیف درصدی";
        break;
      default:
    }
    return txt;
  };
});

app.filter('isEmpty', [function () {
  return function (object) {
    return angular.equals({}, object);
  }
}])

