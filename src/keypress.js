/*global angular:true, browser:true*/

(function () {
  'use strict';

angular.module('mousetrap',[]).
factory('mousetrapHelper', ['$parse', function keypress($parse){

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return function(mode, scope, elm, attrs) {
    var params;
    params = scope.$eval(attrs['mousetrap'+capitaliseFirstLetter(mode)] || '{}');

    for (var binding in params) {
      if(params.bindGlobal) {
        if(!angular.isFunction(Mousetrap.bindGlobal)) {
          throw new Error('[angular-mousetrap] Could not find Mousetrap Global Bind plugin, is it included?');
        }

        for (var globalBinding in params.bindGlobal) {
          (function(binding, params) {
            Mousetrap.bindGlobal(binding, function(e, combo){ return scope.$apply(params[binding](e, combo)); }, mode);
          })(globalBinding, params.bindGlobal);
        }
      }
      else {
        (function(binding, params) {
          Mousetrap.bind(binding, function(e, combo){ return scope.$apply(params[binding](e, combo)); }, mode);
        })(binding, params);
      }
    }
  };
}]);

angular.module('mousetrap').directive('mousetrapKeydown', ['mousetrapHelper', function(mousetrapHelper){
  return {
    link: function (scope, elm, attrs) {
      mousetrapHelper('keydown', scope, elm, attrs);
    }
  };
}]);

angular.module('mousetrap').directive('mousetrapKeypress', ['mousetrapHelper', function(mousetrapHelper){
  return {
    link: function (scope, elm, attrs) {
      mousetrapHelper('keypress', scope, elm, attrs);
    }
  };
}]);

angular.module('mousetrap').directive('mousetrapKeyup', ['mousetrapHelper', function(mousetrapHelper){
  return {
    link: function (scope, elm, attrs) {
      mousetrapHelper('keyup', scope, elm, attrs);
    }
  };
}]);

}());
