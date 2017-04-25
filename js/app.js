var app =  angular.module('ngAutoLinechartApp', [
	'ngRoute',
	'nvd3',
	'ng-awsmqtt'
]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	// $locationProvider.html5Mode(true);
	// $locationProvider.hashPrefix('');


	$routeProvider.
		when("/", {redirectTo: '/chart'}).
		when("/chart", {templateUrl: "views/chart.html", controller: "chartController"}).
		when("/iotchart", {templateUrl: "views/iotchart.html", controller: "iotchartController"});

}]);
