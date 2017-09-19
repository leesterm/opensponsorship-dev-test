var app = angular.module('athletesApp',[]);

//app.controller('mainController',function ($scope) {
function mainController($scope, $https){
  $scope.formData = {};

  //Initial retrieve all athletes
  $http.get('/athletes')
    .success(function(data){
      $scope.athletes = data;
      console.log(data);
    })
    .error(function(err){
      console.log('Error:'+err);
    })

  //Creates athlete on form submission
  $scope.createAthlete = function(){
      $http.post('/athletes',$scope.formData)
        .success(function(data){

        })
        .error(function(err){

        })
  }
}
