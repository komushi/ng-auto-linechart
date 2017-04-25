var app = angular.module('ngAutoLinechartApp');


app.controller('iotchartController', ['$scope', '$mqtt', '$timeout', '$q', function($scope, $mqtt, $timeout, $q){

	// Connect
    $scope.start = function () {
    	$mqtt.connect($scope.awsMqtt.name, $scope.awsMqtt.endpoint, $scope.awsMqtt.region, $scope.awsMqtt.accessKeyId, $scope.awsMqtt.secretAccessKey)
            .then(null, null, messageReceived);
    };

    // Disconnect
    $scope.stop = function () {
        
        $scope.data[0].values = [];

        $mqtt.unsubscribe($scope.awsMqtt.name, $scope.awsMqtt.topic)
            .then(function (message) {
                console.log(JSON.stringify(message));
            })
            .catch(function (err) {
                console.error(err);
            });     
    };


    // notify callback function
    var messageReceived = function (payload) {
        var message = JSON.parse(payload.message.toString('utf-8'));
        // console.log(payload.topic, message);

        if (payload.topic == 'connack') {
            $mqtt.subscribe($scope.awsMqtt.name, $scope.awsMqtt.topic)
                .then(function (message) {
                    console.log(JSON.stringify(message));
                })
                .catch(function (err) {
                    console.error(err);
                });
        }

        var receivedOn;
        if (!message.sentOn) {
            receivedOn = new Date();
        } else {
            receivedOn = new Date(message.sentOn);
        }


        sendMessage()
            .then(function(sentOn) {

                var delayed = sentOn - receivedOn - 1000;

                console.log(JSON.stringify($scope.data[0].values));

                $scope.data[0].values.push({x: receivedOn, y: delayed});
                if ($scope.data[0].values.length > 20) {
                    $scope.data[0].values.shift();
                }
            });

    };

    // notify callback function
    var sendMessage = function () {

        var dfd = $q.defer();

        $timeout(function(){
            var sentOn = new Date();
            
            $mqtt.send($scope.awsMqtt.name, $scope.awsMqtt.topic, {sentOn: sentOn})
                .then(function() {
                    dfd.resolve(sentOn)
                });

        }, 1000);

        return dfd.promise;
    };

    var initialize = function () {
        $scope.awsMqtt = {}

        $scope.awsMqtt.region = 'ap-northeast-1';
        $scope.awsMqtt.endpoint = 'a2sdpyfw66qrvw.iot.ap-northeast-1.amazonaws.com';
        $scope.awsMqtt.accessKeyId = '';
        $scope.awsMqtt.secretAccessKey = '';
        $scope.awsMqtt.topic = 'iotbutton/001';
        $scope.awsMqtt.name = 'aws_iot_mqtt_test';

        $scope.data = [{ values: [], key: 'Delayed in milliseconds' }];

        $scope.options = {
            chart: {
                type: 'lineChart',
                height: 180,
                margin : {
                    top: 20,
                    right: 40,
                    bottom: 40,
                    left: 40
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                duration: 500,    
                xAxis: {
                    tickFormat: function(d){
                   		return d3.time.format('%M:%S')(new Date(d));
                    }
                },
                yAxis: {
                    tickFormat: function(d){
                       return d;
                    }
                }
            }
        };
    };

    initialize();



}]);

