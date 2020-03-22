require.config({
    baseUrl: 'js',
    paths: {
        lib: './lib',
        data: './data',
        view: './view',
        extension: './extension'
    }
});

require([
    'lib/lodash.min',
    'lib/jquery.min',
    'lib/angular/angular.min',
    'lib/angular/angular-route.min',
    'lib/bootstrap/bootstrap.min',
    'lib/bootstrap3-typeahead'
], function() {
    require([
        'lib/angular/ui-bootstrap-tpls',
        'lib/angular/bootstrap-tagsinput',
        'lib/angular/bootstrap-tagsinput-angular',
        'lib/angular/ng-grid',
        'lib/angular/angular-file-upload',
        'lib/angular/styling',
        'extension/lodash.underscore'
    ], function() {
        require([
            'data/bookmark-loader',
            'view/all-views'
        ], function(loader, views) {
            loader.init({
                success: views.init,
                failure: views.init
            });
        });
    });
});

// python -m http.server
