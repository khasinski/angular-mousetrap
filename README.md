# Angular Mousetrap directives 

This is a very crude and probably buggy clone of Angular UI Keypress with [Mousetrap](http://craig.is/killing/mice) under the hood.

## Usage

JavaScript:
```javascript
angular.module('myApp', ['mousetrap']);
...
// Note - it should support any kind of binding that mousetrap supports
$scope.test = {
  'a': function() { console.log('"a" key was pressed'); },
  'b': function() { console.log('"b" key was pressed'); }
}
```
HTML:
```html
<span mousetrap-keypress="test">Press 'a' or 'b'</span>
```

### Global bindings

Global bindings require [Global Binding plugin](https://github.com/ccampbell/mousetrap/tree/master/plugins/global-bind).

Example usage of global bindings:

```javascript
$scope.myKeybindings = {
  bindGlobal: {
    'ctrl+s': $scope.saveAction,
    'command+s': $scope.saveAction
  }
  'ctrl+b': $scope.backAction
};
```

### Requirements

* AngularJS v1.0.2+
* Mousetrap v1.4.4+
