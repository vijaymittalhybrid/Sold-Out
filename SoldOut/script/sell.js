(function(global){
    var SellproductModel,
        app = global.app = global.app || {};
    
    SellproductModel = kendo.data.ObservableObject.extend({
        
        show:function(){
          
            /*Jquery validation method*/
            
            $.validator.addMethod("adTitle",
                function(value, element, params) {
                    var typedWords = jQuery.trim(value).split(' ').length;
                    if(typedWords  >= 4) {
                    return true;
                    }
                }
            );
            
            $.validator.addMethod("descriptionLength",
                function(value, element, params) {
                    var typedWords = jQuery.trim(value).split(' ').length;
                    if(typedWords  >= 8) {
                    return true;
                    }
                }
            );
            
            /*sell first form validation*/
            
            $('#sellform_F').validate({
                rules:{
                    adTitle:{
                        required:true,
                        adTitle:true
                    },
                    adDescription:{
                        required:true,
                        descriptionLength:true
                    }
                },
                messages:{
                    adTitle:{
                        required:"Please Enter Ad Title.",
                        adTitle:"Please enter Ad title atleast 4 words."
                     },
                     adDescription:{
                        required:"Please Enter Ad Description.",
                        descriptionLength:"Please enter Ad Description atleast 8 words."
                     }
                },
                submitHandler:function(form){
                    return false;
                }
            });
        },
        
        sellFormFirst:function(){
            
            var statusF = $('#sellform_F').valid();
            
            if(statusF === false)
            {
                return false;
            }
        },
        
        setValue:function(val){
            this.set("hideVal",val);
        },
    });
    
    app.sellService = {
        viewModel:new SellproductModel()
    };
})(window);