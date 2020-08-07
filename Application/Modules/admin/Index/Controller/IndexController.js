var controller = function (scope, rootScope, filter, service, state, localStorageService, $window, clientHub, toastr) {
  
  var self = this;
  rootScope.loadingMain = false;
  rootScope.showItems = true;
  var id = localStorageService.get("userInfo").userId;

  service.getUserInfo({ id: id }).then(function (response) {
    localStorageService.set("userProfileInfo", response);
    console.log(response);
    rootScope.isAdmin = false;
    angular.forEach(response.roles,
      function (item) {

        if (item === "Operator") {
          state.go("dashboard.shop.map");
          rootScope.showItems = false;
        }
        else {
          rootScope.states = state.get();
          self.signalRConnect();
          rootScope.isAdmin = true;
          service.getAllNotiofication().then(function (response) {
            
            console.log(response);
            rootScope.notification = response;
          },
            function (error) {

            });
        }
      });

  },
    function (error) {
      self.errorLogin = true;
      self.loading = false;
    });

  self.logOut = function () {
    localStorage.clear();
    state.go("login.login");
  };

  rootScope.currentState = state.current.ncyBreadcrumb;

  rootScope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {
      rootScope.currentState = toState.ncyBreadcrumb;
    }
  );

  console.log(rootScope.currentState);
  rootScope.doTheBack = function () {
    window.history.back();
  };




  self.signalRConnect = function () {
    
    //signalRUrl = reponse + "/signalr";
    $.getScript(signalRUrl + "hubs",
      function () {
        
        clientHub.onInit(signalRUrl);
        //hubManager.onInit(signalRUrl);

        //hubManager.start(signalRUrl)
        //    .then(function (connectionId) {

        //        self.hubRun();
        //        // clientHub.connect();
        //    });
      });
  };


  rootScope.hubRun = function () {
    clientHub.shopCreationNotificationFounded(notification);
  };

  function notification(obj) {
    
    console.log(obj);

    var command = {
      additionalData: obj.AdditionalData,
      body: obj.Body,
      creationTime: obj.CreationTime,
      id: obj.Id,
      type: obj.Type,
      title: obj.Title
    };

    rootScope.notification.push(command);
    toastr.success(command.title + "،" + command.body, "فروشگاه");
  }


  rootScope.clickItem = function (obj) {
    
    service.visited({ id: obj.id }).then(function (response) {
      var item = filter("filter")(rootScope.notification, { id: obj.id }, true)[0];
      rootScope.notification.splice(rootScope.notification.indexOf(item), 1);
    },
      function (error) {

      });
  };

};
controller.$inject = ["$scope", "$rootScope", "$filter", "admin.indexService", "$state", "localStorageService", "$window", "ClientHub", "toastr"];
angular.module('admin.IndexApp').controller('admin.indexController', controller);