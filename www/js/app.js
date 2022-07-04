var pscLat = 0;
var pscLon = 0;

var app = new App(1, "PET DARLING", 
					 "1.0.0", 
					 "HIBRIDO",
					 "HOMOLOGACAO",
					 "F9803B518FD8E8E0CD0E7E51F164B7463BDFBC5337DB8603A7B78FFAD76FDFA8",
					 "8IY7ENRP2B0KJ4E0HJPPF8JUM3FSA2S60SOFD05LMLXOIJZQZ5X4ZOBULE0PPJV33OZX4JM45MEXRJLL8DX9Q41M7O42K0PQAXMM2MV5SB1Q7XGUSXZFOWQBD40PKCVF",
                     "MTM3MzFlY2QyYmRlYjU2OTVjNDAwYzE0NDQwOTY4ZWM=",
                     "ZmRhYjFjMTk4ZDY0MzI4YmYxODRjZmZlNjg2NGFhOTM="
					 );

// INICIALIZAR O APP
//app.initApp();



/**
*  ------------------------------------------------------------------------------------------------
*
*
*   MODULO DA CAMERA (TIRAR FOTO)
*
*
*  ------------------------------------------------------------------------------------------------
*/
var totFotosAppend = 0;
var saidaFotos = "";
var appCamera = {

  startCameraAbove: function(){
  	removerBackground();
  	$(".take-a-picture").css("bottom","0px");
    CameraPreview.startCamera({x: 0, y: 0, width: window.screen.width, height: window.screen.height, toBack: false, previewDrag: true, tapPhoto: true});
  },
  
  // CAMERA POR TRÁS DO HTML
  startCameraBelow: function(){
  	removerBackground();
  	$(".take-a-picture").css("bottom","0px");
    CameraPreview.startCamera({x: 0, y: 0, width: window.screen.width, height:window.screen.height, camera: "back", tapPhoto: true, previewDrag: false, toBack: true});
  },

  startCameraBelowCalibragem:function(){
   removerBackground();
    CameraPreview.startCamera({x: 0, y: 0, width: window.screen.width, height:window.screen.height, camera: "back", tapPhoto: true, previewDrag: false, toBack: true});
  },

  stopCamera: function(){
  	CameraPreview.stopCamera();
    restaurarBackground();
  },

  stopCamera2: function(){
  	CameraPreview.stopCamera();
    restaurarBackground();
  },

  takePicture: function(){
  	CameraPreview.takePicture({width:640, height:640, quality: 50},function(imgData){

      //document.getElementById('originalPicture').src = 'data:image/jpeg;base64,' + imgData;

      saidaFotos = localStorage.getItem("appendPictures");

      if(saidaFotos===null){ saidaFotos = ""; }
      
      var foto = 'data:image/jpeg;base64,'+imgData;

      localStorage.setItem("provaRealFoto",foto);

      $(".card").html("");

              $(".card").append(`

                           <div class="caixa-preview-imagem-carregada" data-id="${0}" data-url="${foto}" id="caixaPreviewImagemCarregada${0}">
                              <div style="margin-left:auto;margin-right:auto;position:relative;display:block;width:100px;height:100px;border-radius:8px;background:url('${foto}') #f2f2f2 no-repeat;background-size:cover;background-position:center center;">
                                  &nbsp;
                              </div>
                              <p>
                                <a href="javascript:void(0)" onclick="app.views.removerImagemGaleriaImagens(${0})" title="Remover essa imagem" style="font-size:13px;color:#ff0000;">
                                  <i class="fa fa-times"></i> remover
                                </a>
                              </p>
                           </div>

              `); 

         $("#imagemOculta").val(foto);
         $("#tipoImagem").val("binaria");

         restaurarBackground();

         if(localStorage.getItem("calibragem")==null){

              localStorage.setItem("calibragem","sim");
              app.inicio();
              aviso("Obrigado!","Seu dispositivo está pronto e configurado para utilizar o aplicativo <b>Frutag</b> <img style='width:120px;height:auto;margin-top:5px;display:block;' src='assets/images/ferpall.png' alt='Ferpall Logo'>");

         }
    
    });
  },

  switchCamera: function(){
    CameraPreview.switchCamera();
  },

  show: function(){
  	
    CameraPreview.show();
  },

  hide: function(){
  	
    CameraPreview.hide();
  },

  changeColorEffect: function(){
    var effect = document.getElementById('selectColorEffect').value;
    CameraPreview.setColorEffect(effect);
  },

  changeFlashMode: function(){
    var mode = document.getElementById('selectFlashMode').value;
    CameraPreview.setFlashMode(mode);
  },

  changeZoom: function(){
    var zoom = document.getElementById('zoomSlider').value;
    document.getElementById('zoomValue').innerHTML = zoom;
    CameraPreview.setZoom(zoom);
  },

  changePreviewSize: function(){
    window.smallPreview = !window.smallPreview;
    if(window.smallPreview){
      CameraPreview.setPreviewSize({width: 100, height: 100});
    }else{
      CameraPreview.setPreviewSize({width: window.screen.width, height: window.screen.height});
    }
  },

  showSupportedPictureSizes: function(){
    CameraPreview.getSupportedPictureSizes(function(dimensions){
      dimensions.forEach(function(dimension) {
        console.log(dimension.width + 'x' + dimension.height);
      });
    });
  },

  init: function(){
    document.getElementById('startCameraAboveButton').addEventListener('click', this.startCameraAbove, false);
    document.getElementById('startCameraBelowButton').addEventListener('click', this.startCameraBelow, false);

    document.getElementById('stopCameraButton').addEventListener('click', this.stopCamera, false);
    document.getElementById('switchCameraButton').addEventListener('click', this.switchCamera, false);
    document.getElementById('showButton').addEventListener('click', this.show, false);
    document.getElementById('hideButton').addEventListener('click', this.hide, false);
    document.getElementById('takePictureButton').addEventListener('click', this.takePicture, false);
    document.getElementById('selectColorEffect').addEventListener('change', this.changeColorEffect, false);
    document.getElementById('selectFlashMode').addEventListener('change', this.changeFlashMode, false);

    if(navigator.userAgent.match(/Android/i)  == "Android"){
      document.getElementById('zoomSlider').addEventListener('change', this.changeZoom, false);
    }else{
      document.getElementById('androidOnly').style.display = 'none';
    }

    window.smallPreview = false;
    document.getElementById('changePreviewSize').addEventListener('click', this.changePreviewSize, false);

    document.getElementById('showSupportedPictureSizes').addEventListener('click', this.showSupportedPictureSizes, false);

    // legacy - not sure if this was supposed to fix anything
    //window.addEventListener('orientationchange', this.onStopCamera, false);
  }
};

// INICIALIZAR A CAMERA
document.addEventListener('deviceready', function(){	
  
  appCamera.init();
  
}, false);