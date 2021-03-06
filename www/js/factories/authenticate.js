angular.module("authenticate",[]) //define Authenticate module for user
.factory("AuthenticateService",["$q","apiSvc", function($q,apiSvc){
	var ret = {
		login : function(username , password){ //login function
			var deferred = $q.defer();
			console.log("login authenticateService function is called.");

			var data = { password : password };

			var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if(emailPattern.test(username)){
            	data.email = username;
            }else{
            	data.phone = username;
            }
            //call post function of api module for api call.
			apiSvc.post(urls.login,data).then(function(data){

				console.log("login authenticate function is success.");
				deferred.resolve(data);

			},function(err){

				console.log("login authenticate function is failed.");
				deferred.reject(err);
			});

			return deferred.promise;
		},

		signup : function(data){ //signup function

			var deferred = $q.defer();

			 //call post function of api module for api call.
			apiSvc.post(urls.signup , data).then(function(data){

				console.log("signup function is success");
				deferred.resolve(data);

			},function(err){

				console.log("signup function is failed.");
				deferred.reject(err);
				
			});

			return deferred.promise;
		}
	};

	return ret;
}]);