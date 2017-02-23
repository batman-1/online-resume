requirejs.config({
    baseUrl: './src/js',
    paths: {
        'jquery': 'lib/jquery.min'
    },
    shim: {

    }
});
requirejs(['app/index'])