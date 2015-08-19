angular.module('app', [
  'ui.router'
])

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {
          url: "/",
          template: ''
        })

        .state("task2", {
          url: "/2",
          templateUrl: 'task2.html',
          controller: function($rootScope){
            var vm = this;
            vm.answer = '';

            vm.tishi = function(){
              var obj = {
                title: '提示',
                type: 'info',
                text: '加密方式:-.-.  .-  .  ...  .-  .-.  -....'
              };
              swal(obj);
            };

            vm.tijiao = function(str){
              str = str.toLowerCase();
              if(str === 'orangejuice'){
                sweetAlert('密码正确', '你太棒了~继续加油吧，还有最后一关啦', 'success');
                $rootScope.$state.go('task3');
              } else{
                sweetAlert('出错了', '这个密码是错的，试试别的吧', 'error');
              }
            };
          },
          controllerAs: 'vm'
        })
        .state("task3", {
          url: "/3-final",
          templateUrl: 'task3.html',
          controller: function(){
            var vm = this;

            vm.tijiao = function(str){
              alert(str);
            };
          },
          controllerAs: 'vm'
        })
        ///////////
        // About //
        ///////////

        .state('about', {
          url: '/about',

          // Showing off how you could return a promise from templateProvider
          templateProvider: ['$timeout',
            function (        $timeout) {
              return $timeout(function () {
                return '<p class="lead">UI-Router Resources</p><ul>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                       '</ul>';
              }, 100);
            }]
        });
    }
  ]
);
