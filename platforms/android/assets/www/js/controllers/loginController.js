angular.module('app.controllers')
.controller("loginCtrl", ["$scope","AuthenticateService","$state","$ionicPopup","$ionicLoading",function($scope,AuthenticateService,$state,$ionicPopup,$ionicLoading){

	$scope.loginFormData = {};
	$scope.loginFormData.username = '';
	$scope.loginFormData.password = '';

	$scope.doLogin = function(){

		if($scope.loginFormData.username.trim() == ''){
			$ionicPopup.alert({
				title : "Error",
				template : "please enter Email/Phone."
			});
		}else if($scope.loginFormData.password == ''){
			$ionicPopup.alert({
				title : "Error",
				template : "please enter Password."
			});
		}else{

			$ionicLoading.show({
				content : "<i class=\"ion-loading-c\"></i>",
				animation: 'fade-in',
				showBackdrop : true,
				maxWidth:80
			});
			console.log("doLogin function is called.");
			AuthenticateService.login($scope.loginFormData.username , $scope.loginFormData.password)
			.then(function(ret){
				$ionicLoading.hide();
				console.log("user login is success : return data = " + JSON.stringify(ret));
				if(ret.err){
					$ionicPopup.alert({
						title : "Login Error",
						template : ret.err[0].msg
				    });
				}else{
					$state.go("tabsController.map");
				}			
			},function(err){
				$ionicLoading.hide();
				console.log(err);
				$ionicPopup.alert({
					title : "Network Error",
					template : "please check network connection."
				});
			});

		}	
	}

}]);

