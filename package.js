Package.describe({
    summary: "Live demo of angular-ui-router"
});

Package.on_use(function (api) {
    api.use('standard-app-packages', ['client', 'server']);
    api.use('typescript-compiler', ['client', 'server']);
    api.use('session', 'client');
    api.use('templating', 'client');
    api.use('handlebars', 'client');
    api.use('deps', 'client');
    api.use('angularite', 'client');
    api.use('angular-ui-router', 'client');

    api.add_files('client/partials/home.html', 'client');
    api.add_files('client/partials/state1.html', 'client');
    api.add_files('client/partials/state2.html', 'client');
    api.add_files('client/partials/list1.html', 'client');
    api.add_files('client/index.html', 'client');
    api.add_files('client/app.ts', 'client');
});
