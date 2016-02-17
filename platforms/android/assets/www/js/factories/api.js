angular.module("api",[])
.factory("apiSvc", [ "$http" , "$q" , function($http, $q){
	var ret = {
		post : function(uri, data){
			console.log("backend api is called.");
			var deferred = $q.defer();

			$http({
				url : uri,
				method: "POST",
				data : data
			}).success(function(data){

				console.log("api call is success");
				deferred.resolve(data);

			}).error(function(err){

				console.log("api call is failed.");
				deferred.reject(err);

			});

			return deferred.promise;
		}
	};

	return ret;
}]);