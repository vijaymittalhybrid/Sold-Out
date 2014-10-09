(function(global){
    var dashbordModel,
        app = global.app = global.app || {};
    
    dashbordModel = kendo.data.ObservableObject.extend({
        show:function(){
            
            apps.pane.loader.show();
            setTimeout(function() {
                apps.pane.loader.hide(); //hide loading animation
            }, 2000);
        },
        
        exit:function(){
            navigator.notification.confirm("Do you really want to exit?",function(confirmed){
                
                if (confirmed === true || confirmed === 1) {
                	apps.navigate("#home");
                }
            },"Notification","Yes,No");
        },
        
        home:function(){
            apps.navigate('#dashbord');
        }
    });
    
    
    app.dashbordService = {
      viewModel : new dashbordModel()
    };
})(window);