import * as actions from './actions'
import * as add from './add'
import * as renameTag from './rename-tag'
import * as showTags from './show-tags'
import * as search from './search'

define(function (require, exports, module) {
    function registerController(app, name, controller) {
        app.controller(name, ['$scope', '$location', controller]);
    }

    function configViewRouting(app) {
        app.config(['$compileProvider', function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
            // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        }
        ]);
        app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/add', {templateUrl: 'js/view/add.html', controller: 'AddCtrl'})
                .when('/search', {templateUrl: 'js/view/search.html', controller: 'SearchCtrl'})
                .when('/rename-tag', {templateUrl: 'js/view/rename-tag.html', controller: 'RenameTagCtrl'})
                .when('/show-tags', {templateUrl: 'js/view/show-tags.html', controller: 'ShowTagsCtrl'})
                .when('/actions', {templateUrl: 'js/view/actions.html', controller: 'ActionsCtrl'})
                .otherwise({redirectTo: '/add'});
        }]);
    }

    exports.init = function () {
        angular.element(document).ready(function () {
            var bookmarkApp = angular.module('bookmark', ['ngRoute', 'ui.bootstrap', 'bootstrap-tagsinput', 'ngGrid', 'angularFileUpload', 'styling']);

            configViewRouting(bookmarkApp);
            registerController(bookmarkApp, actions.name, actions.controller);
            registerController(bookmarkApp, add.name, add.controller);
            registerController(bookmarkApp, renameTag.name, renameTag.controller);
            registerController(bookmarkApp, showTags.name, showTags.controller);
            registerController(bookmarkApp, search.name, search.controller);

            angular.bootstrap(document, ['bookmark']);
        });
    };

});
