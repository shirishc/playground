'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory',
        function($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu=false;
        $scope.message = "Loading ...";

        // Not using the promise object ehre and so no need for the "then" function
        $scope.dishes = menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu=true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " +
                                response.statusText;
            }
        );

        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', function($scope) {

        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        $scope.showDish = false;
        $scope.message = "Loading ...";

        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                        .$promise.then(
                            function(response) {
                                $scope.dish = response;
                                $scope.showMenu = true;
                            },
                            function(response) {
                                $scope.message = "Error: " + response.status + " " +
                                                response.statusText;
                            }
                        );
    }])

    .controller('DishCommentController', ['$scope', 'menuFactory',
                                        function($scope, menuFactory) {

        $scope.comment = {rating:5, comment:"", author:"", date:""};
        $scope.ratings = [1, 2, 3, 4, 5];

        $scope.submitComment = function () {

            $scope.comment.date = new Date().toISOString();
            console.log($scope.comment);
            console.log($scope.ratings);

            $scope.dish.comments.push($scope.comment);

            menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);

            $scope.commentForm.$setPristine();

            $scope.comment = {rating:5, comment:"", author:"", date:""};
        };
    }])

    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory',
                function($scope, $stateParams, menuFactory, corporateFactory) {

        $scope.showDish = true;
        $scope.message = "Loading ...";

        $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response) {
                                $scope.dish = response;
                                $scope.showMenu = true;
                            },
                            function(response) {
                                $scope.message = "Error: " + response.status + " " +
                                                response.statusText;
                            }
                        );

        $scope.promotion = menuFactory.getPromotion(0);
        $scope.execChef = corporateFactory.getExecChef();
    }])
    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory',
                function($scope, $stateParams, corporateFactory) {

        $scope.leaders = corporateFactory.getLeaders();
    }])
    .controller('FooTablePlayController', ['$scope', function($scope) {

        var report_data = [{
                report_date: '26/08/2016'
            },
            {
                report_date: '31/08/2016'
            }
        ];

        var geog_list = [{ index: 0, value: "Global" },
                        { index: 1, value: "Emerging Markets" },
                        { index: 100, value: "EAFE Markets" }];

        var asset_class_list = [{ index: 0, value: "Equities" },
                        { index: 1, value: "Fixed Income" },
                        { index: 10, value: "Alternatives" },
                        { index: 100, value: "Cash" }];

        $scope.reportDateList = report_data;
        $scope.geogList = geog_list;
        $scope.assetClassList = asset_class_list;

        var headerList = ["ID", "First Name", "Last Name", "Job Title", "DOB", "Status"];

        $scope.headers = headerList;
        $scope.showAsset =false;

        $scope.toggleAsset = function() {
            $scope.showAsset = !$scope.showAsset;
        };

    }])
    .controller('jVectorMapPlayController', ['$scope',function($scope) {
        var data = {
            "US": "#FF0000",
            "SA": "#00FF00",
            "DE": "#FF0000",
            "FR": "#0000FF",
            "CN": "#FF0000",
            "AU": "#00FF00",
            "BR": "#00FF00",
            "IN": "#0000FF",
            "GB": "#00FF00"
        };

        $scope.map_data = data;

        $scope.changeColour = function() {
            // $scope.map_data = {
            //     "US": "#00FF00",
            //     "SA": "#00FF00",
            //     "DE": "#FF0000",
            //     "FR": "#0000FF",
            //     "CN": "#FF0000",
            //     "AU": "#00FF00",
            //     "BR": "#00FF00",
            //     "IN": "#FF00FF",
            //     "GB": "#00FF00"
            // };

            // $scope.map_data = {
            //     "US": "#00FF00",
            //     "SA": "#00FF00",
            //     "DE": "#FF0000",
            // };

            $scope.map_data["US"] = "#00FF00";
        };

        $scope.onMapClick = function(e, regionCode) {
            // console.log("onMapClick called in controller - code - " + strCode);
            console.log(regionCode);
            console.log(e);
        };

    }])
;
