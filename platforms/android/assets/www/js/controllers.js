angular.module('app.controllers', []) //module name app.controllers
  
.controller('homeCtrl', function($scope) { //controller name homectrl

})
      
.controller('mapCtrl', ["$scope","$state",function($scope,$state) {
	$scope.onClick = function(){
			$state.go("list");
	}
}])
   
.controller('listCtrl', ["$scope","$state",function($scope,$state) {
	$scope.onClick = function(){
			$state.go("tabsController.map");
	}
}])
   
.controller('reservationCtrl', function($scope) {

})
   
.controller('profileCtrl', function($scope) {

})
   
.controller('pageCtrl', function($scope) {

})
 
 .controller('SettingCtrl',function($scope){

 });