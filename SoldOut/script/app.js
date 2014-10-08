(function(global){
    var app = global.app = global.app || {};
    
    apps = new kendo.mobile.Application(document.body,
                                        {
                                           layout:'my-layout',
                                            skin:'flat'
                                        }
    );
})(window);