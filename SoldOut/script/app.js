(function(global){
    var app = global.app = global.app || {};
    
    apps = new kendo.mobile.Application(document.body,
                                        {
                                           layout:'sold_out_layout',
                                            skin:'flat',
                                            initial:'home',
                                            transition:''
                                        }
    );
})(window);