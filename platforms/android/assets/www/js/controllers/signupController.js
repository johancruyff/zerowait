angular.module('app.controllers')
.controller("signupCtrl", ["$scope","AuthenticateService","$state","$ionicPopup","$ionicLoading",function($scope,AuthenticateService,$state,$ionicPopup,$ionicLoading){

	$scope.signupFormData = {};
	$scope.signupFormData.fname = '';
	$scope.signupFormData.lname = '';
	$scope.signupFormData.email = '';
	$scope.signupFormData.phone = '';
	$scope.signupFormData.password = '';

	$scope.doSignup = function(){

		console.log("signupController doSignup function is called.");
		var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if($scope.signupFormData.fname.trim() == ''){
			$ionicPopup.alert({
				title : "Error",
				template : "please enter First Name."
			});
		}else if($scope.signupFormData.lname.trim() == ''){
			$ionicPopup.alert({
				title : "Error",
				template : "please enter Last Name."
			});
		}else if($scope.signupFormData.email.trim() == ''){
			$ionicPopup.alert({
				title : "Error",
				template : "please enter Email."
			});
		}else if(!emailPattern.test($scope.signupFormData.email.trim())){
			$ionicPopup.alert({
				title : "Error",
				template : "please enter valid Email."
			});
		}else if($scope.signupFormData.phone.trim() == ''){
			$ionicPopup.alert({
				title : "Error",
				template : "please enter Phone number."
			});
		}else if($scope.signupFormData.phone.trim().length > 15 || $scope.signupFormData.phone.trim().length < 10){
			$ionicPopup.alert({
				title : "Error",
				template : "please enter valid Phone number."
			});
		}else if($scope.signupFormData.password.password == ''){
			$ionicPopup.alert({
				title : "Error",
				template : "please enter password."
			});
		}else if($scope.signupFormData.password.length < 6 || $scope.signupFormData.password.length > 11){
			$ionicPopup.alert({
				title : "Error",
				template : "Password must have 6 - 11 specifics."
			});
		}else{
			$ionicLoading.show({
				content : "<i class=\"ion-loading-c\"></i>",
				animation: 'fade-in',
				showBackdrop : true,
				maxWidth:80
			});

			var data  = {
				fname : $scope.signupFormData.fname.trim(),
				lname : $scope.signupFormData.lname.trim(),
				email : $scope.signupFormData.email.trim(),
				phone : $scope.signupFormData.phone.trim(),
				password : $scope.signupFormData.password
			};

			AuthenticateService.signup(data).then(function(ret){

				console.log("AuthenticateService signup is success return data = " + JSON.stringify(ret));
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

				console.log("AuthenticateService signup is success");
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
