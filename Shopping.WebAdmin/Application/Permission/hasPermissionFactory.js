angular.module("app").factory("hasPermissionFactory", ["permissionFactory", "localStorageService","$filter" , function (permissionFactory, localStorageService , filter) {
  return {
    hasPermission: function (permissionId) {
      debugger;
      var profile = localStorageService.get("userProfileInfo");
      var role = profile.roles[0];
      var list = permissionFactory.get(role);
      var permission = filter("filter")(list, { permission: permissionId }, true)[0];
      if (angular.isUndefinedOrNull(permission)) {
        return false;
      }
      return true;
    }
  };
}]);