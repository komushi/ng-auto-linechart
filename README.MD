# ng-auto-linechart
## Angular auto-refresh line chart

----

## 1. Download and install Dependencies
```bash
$ git clone https://github.com/komushi/ng-auto-linechart.git
$ cd ng-auto-linechart
$ bower install
```

## 2. Run the application
### 2-1. Option 1: Local test with [live-server](https://www.npmjs.com/package/live-server)
```
$ live-server
```

### 2-2. Option 2: Host the whole folder on an AWS S3 or any preferred environment

## 3. Demos
### 3-1. Auto Refresh with Dummy Data
This view demos auto-refresh line chart with dummy data.

![demo1](https://raw.githubusercontent.com/komushi/ng-auto-linechart/master/images/pic1.png)

Dependencies:
* [Angular-nvD3](http://krispo.github.io/angular-nvd3/)

### 3-2. Auto Refresh with AWS IoT Data
This view demos auto-refresh line chart with data received from AWS IoT MQTT endpoint.

![demo2](https://raw.githubusercontent.com/komushi/ng-auto-linechart/master/images/pic2.png)

Dependencies:
* [Angular-nvD3](http://krispo.github.io/angular-nvd3/)
* [ng-awsmqtt](https://github.com/komushi/ng-awsmqtt)

## TODO
* Cognito Identity Pool - Unauthorized connection to AWS IoT