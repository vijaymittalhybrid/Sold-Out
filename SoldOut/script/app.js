(function(global){
    var app = global.app = global.app || {};
    
    apps = new kendo.mobile.Application(document.body,
                                        {
                                            skin:'flat',
                                            initial:'home',
                                            transition:''
                                        }
    );
})(window);