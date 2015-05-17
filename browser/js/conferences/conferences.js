app.config(function ($stateProvider) {

    $stateProvider.state('conferences', {
        url: '/conferences',
        templateUrl: 'js/conferences/conferences.html',
        controller: 'ConferencesCtrl'


        // // The following data.authenticate is read by an event listener
        // // that controls access to this state. Refer to app.js.
        // data: {
        //     authenticate: true
        // }
    });

    $stateProvider.state('conferences-admin', {
        url: 'conferences/:id/admin',
        templateUrl: 'js/conferences/admin/admin.html',
        controller: 'ConferencesCtrl'
    });
});
