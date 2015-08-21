angular.module('app', [
  'ui.router'
])

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

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
      $urlRouterProvider
        .otherwise('/');

      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {
          url: "/",
          template: '<div class="jumbotron animated fadeInRight">'+
          '<h1>Congratulation~<i class="fa fa-smile-o"></i></h1>'+
          '<p class="lead">太棒了，你已经通过了第一关耶，去迎接接下来的挑战吧！</p>'+
          '<p><a class="btn btn-lg btn-primary" ui-sref="task2" role="button">点我继续~</a></p>'+
          '</div>'
        })

        .state("finished", {
          url: "/finished",
          templateUrl: 'finished.html'
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
          controller: function($rootScope){
            var vm = this;
            vm.answer = '';

            vm.tishi = function(){
              var obj = {
                title: '提示',
                type: 'info',
                text: '密钥：你的手机号码~ 加密方式：一次性密码本'
              };
              swal(obj);
            };

            vm.tijiao = function(str){
              str = str.toLowerCase();
              if(str === '359545139' || str === '00359545139'){
                var obj = {
                  title: '密码正确',
                  type: 'success',
                  text: '通关啦~~~'
                };
                swal(obj, function(){
                  showSomeThing();

                  $rootScope.$state.go('finished');
                });
                // sweetAlert('密码正确', '通关啦~~~', 'success', function(){
                //   alert(123);
                // });
              } else{
                sweetAlert('出错了', '这个密码是错的，试试别的吧', 'error');
              }
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

function showSomeThing(){
  alert('恭喜通关~');
  alert('这是为你私人定制的解密游戏');
  alert('虽然不像样，但很特别对吧');
  alert('特立独行的礼物得送给独一无二的人');
  alert('Have fun~');
}
