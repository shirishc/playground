'use strict';

angular.module('confusionApp', ['ui.router', 'ui.footable', 'ngResource', 
                'localytics.directives'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })

            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html',
                        controller  : 'AboutController'
                    }
                }
            })

            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'
                    }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            })
            // route for the jVectorMap Play page
            .state('app.mapplay', {
                url: 'mapplay',
                views: {
                    'content@': {
                        templateUrl : 'views/jVectorMapPlay.html',
                        controller  : 'jVectorMapPlayController'
                   }
                }
            })
            // route for the FooTable Play page
            .state('app.footableplay', {
                url: 'footableplay',
                views: {
                    'content@': {
                        templateUrl : 'views/FooTablePlay.html',
                        controller  : 'FooTablePlayController'
                    }
                }
            })
            ;

        $urlRouterProvider.otherwise('/');
    })
;
