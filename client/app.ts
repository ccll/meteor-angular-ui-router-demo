declare var ngMeteor;
declare var Meteor;
declare var ngRouter;
declare var Template;
declare var Session;
declare var Deps;
declare var Spark;

declare var console;
declare var alert;
declare var window;

// 设置全局helper
ngMeteor.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.console = console;
    $rootScope.alert = alert;

    $rootScope.Session = Session;

    window.$rootScope = $rootScope;
}]);

ngMeteor.config([
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

ngMeteor.controller('MainCtrl', ['$scope', '$collection', '$rootScope',
    function ($scope, $collection, $rootScope) {

        $collection('Foos', $scope);

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

ngMeteor.config(['$stateProvider', '$urlRouterProvider',
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


