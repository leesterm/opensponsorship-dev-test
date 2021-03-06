var app = angular.module('athletesApp',[]);

app.controller('mainController',function($scope,$http) {
//function mainController($scope, $https){
  $scope.formData = {};

  //Initial retrieve all athletes
  $http({
    method:'GET',
    url:'/athletes'
  }).then(function(success){
    $scope.athletes = success.data;
    console.log(success);
  },function(error){
    console.log('Error:'+error);
  });

  //Creates athlete on form submission
  $scope.createAthlete = function(){
      $http({
        method:'POST',
        url:'/athletes',
        data: $scope.formData
      }).then(function(success){
        console.log("Success");
        $scope.formData = {};
        $scope.athletes = success.data;
      },
      function(error){
        console.log(error);
      });
  }

});
