(function(global){
    var app = global.app = global.app || {};
    
    apps = new kendo.mobile.Application(document.body,
                                        {
                                            skin:'flat',
                                           // initial:'sell_F',
                                            transition:'fade'
                                        }
    );
    
    document.addEventListener("deviceready",function(){
         window.cameraApp = new cameraApp();
         window.cameraApp.run();
    },false);
    
    /*****************************************************Camera Event****************************************************************/
   
    function id(element) {
    	return document.getElementById(element);
	}
    
    function cameraApp(){}
    
    cameraApp.prototype={
        _pictureSource: null,
        _destinationType: null,
        
        run: function(){
            var that=this;

    	    that._pictureSource = navigator.camera.PictureSourceType;
    	    that._destinationType = navigator.camera.DestinationType;
            
    	    id("capturePhotoButton").addEventListener("click", function(e){
                if(e['target']['innerText'])
                {
                    var imgCount = $('#imageVal').val();
                    if(imgCount<3)
                    {
                        that._capturePhoto.apply(that,arguments);
                    }
                    else
                    {
                        
                        navigator.notification.alert("You can save only 2 times Image.",function(){},"Notification","OK");
                    }
                }
            });
            
            id("getPhotoFromAlbumButton").addEventListener("click", function(e){
                if(e['target']['innerText'])
                {
                    var imgCount = $('#imageVal').val();
                    if(imgCount<3)
                    {
                        that._getPhotoFromAlbum.apply(that,arguments);
                    }
                    else
                    {
                        navigator.notification.alert("You can save only 2 times Image.",function(){},"Notification","OK");
                    }
                }
       	 });
        },
        
        _capturePhoto: function() {
            var that = this;
            
            // Take picture using device camera and retrieve image as base64-encoded string.
            navigator.camera.getPicture(function(){
                that._onPhotoDataSuccess.apply(that,arguments);
            },function(){
                that._onFail.apply(that,arguments);
            },{
                quality: 50,
                destinationType: that._destinationType.DATA_URL
            });
        },
        
        _getPhotoFromAlbum: function() {
            var that= this;
           
            // On Android devices, pictureSource.PHOTOLIBRARY and
            // pictureSource.SAVEDPHOTOALBUM display the same photo album.
            that._getPhoto(that._pictureSource.SAVEDPHOTOALBUM)
    	},
        
        _getPhoto: function(source) {
            var that = this;
            // Retrieve image file location from specified source.
            navigator.camera.getPicture(function(){
                that._onPhotoURISuccess.apply(that,arguments);
            }, function(){
                cameraApp._onFail.apply(that,arguments);
            }, {
                quality: 50,
                destinationType: that._destinationType.FILE_URI,
                sourceType: source
            });
   	 },
        
        _onPhotoURISuccess: function(imageURI) {
            var index = $('#imageVal').val();
            if(index === 'undefined' || index === '' || index === '0' || index === 0)
            {
                index=0;
                
            }
            var ind;
            if(index<3)
            {
                ind = ++index;
                console.log('index value '+ind);
                var smallImage = document.getElementById('smallImage'+ind);
                var picture = document.getElementById('picture'+ind);
                smallImage.style.display = 'block';
                picture.style.display = 'block';
                smallImage.src = imageURI;
                if(ind === 3)
                {
                    $('#cameraBtn').hide();
                }
                app.sellService.viewModel.setValue(ind);
            }
            else
            {
                 navigator.notification.alert("You can save only 2 times Image.",function(){},"Notification","OK");
            }
   	 },
        
        _onPhotoDataSuccess: function(imageData) {
            var index = $('#imageVal').val();
            if(index === 'undefined' || index === '' || index === '0' || index === 0)
            {
                index=0;
            }
            var ind;
            if(index<3)
            {
                ind = ++index;
                 console.log('index value '+ind);
                var smallImage = document.getElementById('smallImage'+ind);
                var picture = document.getElementById('picture'+ind);
                smallImage.style.display = 'block';
                picture.style.display = 'block';
                // Show the captured photo.
                smallImage.src = "data:image/jpeg;base64," + imageData;
                if(ind === 3)
                {
                    $('#cameraBtn').hide();
                }
                app.sellService.viewModel.setValue(ind);
            }
            else
            {
               navigator.notification.alert("You can save only 2 times Image.",function(){},"Notification","OK");
            }
        },
        
        _onFail: function(message) {
            navigator.notification.alert(message);
        },
	}
})(window);