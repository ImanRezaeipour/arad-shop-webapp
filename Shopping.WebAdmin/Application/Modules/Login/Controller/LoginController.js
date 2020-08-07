var controller = function ($scope, $rootScope, $location, state, toastr, service, localStorageService, restService, $timeout) {
  var self = this;
  self.loading = false;
  self.logIn = {};

  function newGuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  self.login = function () {
    //toastr.info('کاربر گرامی به پنل مدیریت  خوش آمدید', 'خوش آمدید');
    //state.go("dashboard.home.home");

    var command = "grant_type=password&username=" +
      self.login.userName +
      "&password=" +
      self.login.password + "&client_id=ngAuthApp" +
      "&device_id=" + newGuid();

    self.loading = true;

    service.login(command).then(function (result) {
      



      self.errorLogin = false;
      toastr.info('کاربر گرامی به پنل مدیریت  خوش آمدید', 'خوش آمدید');


      var httpHeadersAuth = {
        'Content-Type': "application/json"
      };
      var httpHeadersRead = {
        'Content-Type': "application/json"
      };
      var httpHeadersWrite = {
        'Content-Type': "application/json"
      };


      localStorageService.set("token", result.data.access_token);

      localStorageService.set("userInfo", result.data);

      var token = localStorageService.get("token");

      if (token != null) {

        httpHeadersAuth["Authorization"] = "Bearer " + result.data.access_token;
        httpHeadersWrite["Authorization"] = "Bearer " + result.data.access_token;
        httpHeadersRead["Authorization"] = "Bearer " + result.data.access_token;

      }
      restService.setBaseUrl("Auth", authApiUri, httpHeadersAuth);
      restService.setBaseUrl("Write", writeApi, httpHeadersWrite);
      restService.setBaseUrl("Read", readApi, httpHeadersRead);
      restService.setBaseUrl("AuthController", authApiControllerUri, httpHeadersAuth);
      authHeader = "Bearer " + result.data.access_token;


      service.getUserInfo({ id: result.data.userId }).then(function (response) {
        localStorageService.set("userProfileInfo", response);
        $timeout(function () {
          //state.go('login.login');

          //$location.url('/home')
          state.go("dashboard.home.home");
        });
      },
        function (error) {
          self.errorLogin = true;
          self.loading = false;
        });




    },
      function (error) {
        self.loading = false
        self.errorLogin = true
      });





  };
};
controller.$inject = ["$scope", "$rootScope", "$location", "$state", "toastr", "LoginService", "localStorageService", "RestService", "$timeout"];
angular.module('LoginApp').controller('LoginController', controller);