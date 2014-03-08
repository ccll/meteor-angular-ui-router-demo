declare var Angularite;
declare var Meteor;
declare var ngRouter;
declare var Template;
declare var Session;
declare var Deps;
declare var Spark;

declare var console;
declare var alert;
declare var window;

var app = Angularite.module('demoApp', ['ui.router']);

// 设置全局helper
app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.console = console;
    $rootScope.alert = alert;

    $rootScope.Session = Session;

    window.$rootScope = $rootScope;
}]);

app.config([
    '$provide', function ($provide) {
        return $provide.decorator('$rootScope', [
            '$delegate', function ($delegate) {
                $delegate.safeApply = function (fn) {
                    var phase = $delegate.$$phase;
                    if (phase === "$apply" || phase === "$digest") {
                        if (fn && typeof fn === 'function') {
                            fn();
                        }
                    } else {
                        $delegate.$apply(fn);
                    }
                };
                return $delegate;
            }
        ]);
    }
]);

app.controller('MainCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {

        Deps.autorun(function() {
            $scope.safeApply(function () {
                $scope.title = Session.get('my-title');
            });
        });

        $rootScope.title2 = "another title";

        $scope.items = [
            {text: 'Hello, world.'},
            {text: 'Have fun.'},
        ];
    }
]);

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                template: Template.home
            })
            .state('state1', {
                url: "/state1",
                template: Template['state1']
            })
            .state('state1.list', {
                url: "/list",
                template: Template['state1.list1']
            })
            .state('state2', {
                url: "/state2",
                template: Template.state2
            });
    }
]);


