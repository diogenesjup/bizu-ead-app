function enviarCobrancaPix(form){

    // SERIALIZAR O FORMULARIO PARA ENVIAR PARA O SERVIDOR
    var data = $(form).serializeArray();

    var contato = $("#form1").val();
    var whatsapp = $("#form1ac").val();
    var valor = $("#form2").val();
    var chave = $("#form22").val();

     // INICIO CHAMADA AJAX
     var request = $.ajax({

      method: "POST",
      url: "https://diogenesjunior.com.br/api/enviarmsg",
      data:{contato:contato,whatsapp:whatsapp,valor:valor,chavepix:chave},
  
  })
  request.done(function (dados) {        

     
      console.log("%c RETORNO DO ENVIO","background:#ff0000;color:#fff;");
      console.log(dados);

     
      $("#menu-success-2").fadeIn();
      $("#menu-success-2").css("opacity","1");

      // ATUALIZAR A PAGINA DEPOIS DE 5 SEGUNDOS
      setTimeout(function(){
        location.reload();
      } , 5000);

  });
  request.fail(function (dados) {

       console.log("API NÃO DISPONÍVEL (procLogin)");
       console.log(dados);
       aviso("Oops! Algo deu errado","Nossos servidores estão passando por dificuldades técnicas, tente novamente em alguns minutos");

  });
  // FINAL CHAMADA AJAX


}

function fecharAvisoModal(){

      $("#menu-success-2").fadeOut();
      $("#menu-success-2").css("opacity","0");

}


// MAPA

// VARIAVEIS GLOBAIS DO MAPA
var input;
var map;
var directionsDisplay; // Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer


// SETAR AS COORDANADAS PADRÃO CASO NÃO AS TENHAMOS
var pscLat = "-23.5667005";
var pscLon = "-46.6531514";


// INICIALIZAR GEOLOCATION
function initGeolocation(){

      if( navigator.geolocation )
       {
          // Call getCurrentPosition with success and failure callbacks
          navigator.geolocation.getCurrentPosition( success, fail );
       }
       else
       {
          aviso("Sem GPS","Não conseguimos acessar o seu GPS. Mas não se preocupe, você poderá utilizar o aplicativo mesmo assim.");
       }
       function success(position)
            {
                var cordenadas = "";
                cordenadas = position.coords.longitude;
                cordenadas = cordenadas+", ";
                cordenadas = cordenadas + position.coords.latitude;
                // SETAR AS NOVAS COORDENADAS
                pscLat = position.coords.latitude;
                pscLon = position.coords.longitude;

                console.log("LAT NEW: "+pscLat);
                console.log("LON NEW: "+pscLon);

                // SALVAR NA MEMORIA A POSIÇÃO ATUAL DO USUARIO
                if(pscLat!="" && pscLon!=""){
                  localStorage.setItem("latitude",pscLat);
                  localStorage.setItem("longitude",pscLon);
                }

                // SE TIVERMOS A LOCALIZAÇÃO ATUAL, A GENTE COMEÇA A EXIBIR O MAPA A PARTIR DESSE PONTO
                if(pscLat!="" && pscLon!=""){

                    console.log("Coordenadas foram obtidas sem maiores problemas.");
                    carregarMapa();

                }else{

                   aviso("Problemas com o GPS","Conseguimos obter os dados do seu GPS, mas os mesmos não estão no formato esperado. Mas não se preocupe, você poderá utilizar o aplicativo mesmo assim.");
                   carregarMapa();
                }


            }
          function fail()
            {
               aviso("Sem GPS","Não conseguimos acessar o seu GPS, por causa de um problema de permissões no disposítivo. Mas não se preocupe, você poderá utilizar o aplicativo mesmo assim.");
               carregarMapa();
            }


}



function initMapa(){

   console.log("INICIANDO FUNÇÃO PARA GERAR O MAPA GOOGLEMAPS");
   console.log("%c NESSA FUNÇÃO VAMOS INICIAR O AUTOCOMPLETE","background:#ff0000;color:#fff;");
   
   // AUTO COMPLETO DO ENDEREÇO
   input = document.getElementById('destino');
   var autoComplete = new google.maps.places.Autocomplete(input);

   var directionsService = new google.maps.DirectionsService();
   google.maps.event.addDomListener(window, 'load', autoComplete);

  localStorage.setItem("latitude",pscLat);
  localStorage.setItem("longitude",pscLon);

  initGeolocation();


}


function carregarMapa(){

         directionsDisplay = new google.maps.DirectionsRenderer(); // Instanciando...

          pscLat = localStorage.getItem("latitude");
          pscLon = localStorage.getItem("longitude");

           var latlng = new google.maps.LatLng(pscLat, pscLon);

           var options = {
              zoom: 15,
              center: latlng,
              scrollwheel: false,
              disableDefaultUI: true,
              draggable: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: [
              {
                "featureType": "administrative.neighborhood",
                "elementType": "labels",
                "stylers": [{
                  "visibility": "off"
                }]
              }, {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [{
                  "visibility": "off"
                }]
              }, {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [{
                  "visibility": "off"
                }]
              },
                  {
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#f5f5f5"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.icon",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#616161"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#f5f5f5"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#bdbdbd"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#eeeeee"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#757575"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#e5e5e5"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#9e9e9e"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#ffffff"
                      }
                    ]
                  },
                  {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#757575"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#dadada"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#616161"
                      }
                    ]
                  },
                  {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#9e9e9e"
                      }
                    ]
                  },
                  {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#e5e5e5"
                      }
                    ]
                  },
                  {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#eeeeee"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#c9c9c9"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#9e9e9e"
                      }
                    ]
                  }
                ]
           };


           map = new google.maps.Map(document.getElementById("mapa"), options);
           directionsDisplay.setMap(map); // Relacionamos o directionsDisplay com o mapa desejado
               
               // #### NÃO VAMOS PRECISAR DE MARCADOR AQUI
               /*
               var image = {
                 url: 'images/gps.svg',
                  size: new google.maps.Size(40, 60),
                  origin: new google.maps.Point(0,0),
                  anchor: new google.maps.Point(40, 24)
                };

                var marker = new google.maps.Marker({
                    icon: image,
                    position: latlng,
                    map: map,
                });

                google.maps.event.addListener(marker,'click',function(){
                    aviso('O que significa esse ícone?','Segundo o seu GPS, essa é a sua localização atual');
                });
                */



}


        // APÓS O CLICK EM UM LOCAL, VAMOS APAGAR O MAPA, E FAZER APARECER A SELEÇÃO DO TIPO DE TREINO
        $("#destino").change(function(){

               // FAZER APARECER NA TELA A DIV PARA SALVAR O DESTINO
               console.log("DESTINO ESCOLHIDO");

               //var destinoEscolhido = $("#destino").val();

               //$("#mapa").fadeOut("250");
               //console.log("DESTINO ESCOLHIDO: "+destinoEscolhido);
               //localStorage.setItem("destinoViagemPrimario",destinoEscolhido);

               // ALIMENTAR SELEÇÃO
               //$("#enderecoDaSelecao").html('<li><a href="javascript:void(0)" title="Sugestão de endereço"><img src="images/sugestao.svg" alt="Sugestão de endereço"> '+destinoEscolhido+'</a></li>');


        });


        $("body .pac-container").click(function(){
          
          console.log("CLICOU NO PAC");

        });

        // CORREÇÃO PARA SELEÇÃO DO DESTINO ONMOBILE
        $(document).on({
            'DOMNodeInserted': function() {

                $('.pac-item, .pac-item span', this).addClass('no-fastclick');
                //$(".tepping-flex").fadeOut("250");
                //$(".caixa-sugestoes-treinos").fadeOut();
                console.log("PAC GOOGLE: ");

                $( ".pac-item, .pac-item" ).each(function( index ) {
                  if($(this).html()!=""){
                     $("#enderecoDaSelecao").append('<li><a href="javascript:void(0)" title="Sugestão de endereço" onclick="salvarEnderecoFinalmente(this)"><img src="assets/images/sugestao.svg" alt="Sugestão de endereço">'+$(this).html()+'</a></li>');
                  }
                });
                
                //var text = $('.pac-item, .pac-item').html();
                
                
                // TESTES FUNÇÕES DE ALIMENTAÇÃO DO PAC AUTO COMPLET DO GOOGLE
                //var destinoEscolhido = $("#destino").val();
                //console.log("DESTINO ESCOLHIDO: "+destinoEscolhido);
                //localStorage.setItem("destinoViagemPrimario",destinoEscolhido);

                // ALIMENTAR SELEÇÃO
                //$("#enderecoDaSelecao").html('<li><a href="javascript:void(0)" title="Sugestão de endereço"><img src="images/sugestao.svg" alt="Sugestão de endereço"> '+destinoEscolhido+'</a></li>');



            }
        }, '.pac-container');



















            // COMO FAZER A CHAMADA NO FORMULÁRIO onSubmit="return ajaxSubmit(this);"
            var ajaxSubmit = function(form) {
                // fetch where we want to submit the form to
                var url = $(form).attr('action');
                var flag = 9;

                var data = $(form).serializeArray();

                // setup the ajax request
                $.ajax({
                    url: url,
                    data: data,
                    dataType: 'json',
                    type:'POST'
                });

                swal("Obrigado!", 'Sua mensagem foi enviada com sucesso', "success");

                return false;
            }


          // FOR"CAR VOLTAR AO TOPO
          function voltarAoTopo(){
            
            var objDiv = document.getElementById("content");
            objDiv.scrollTop = 0;

          }



          function removerBackground(){

                $("body").css("background","transparent");
                $("section#content").css("background","transparent");
                $("section#content").css("opacity","0");

           }
           
           function restaurarBackground(){

                $("body").css("background","#F8F8F8");
                $("section#content").css("background","#F8F8F8");
                $("section#content").css("opacity","1");

                $(".take-a-picture").css("bottom","-1000%");

           }

            

          // SE O USUÁRIO FIZER UM GESTURE PARA A PARTE INFERIOR DA PÁGINA
          // VAMOS FECHAR A LAYER DO CARRO, CASO ELA ESTEJA ABERTA

          $("#swipeAviso").swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {

              if(direction=="down"){

                $(".modal-avisos .aviso").css("bottom","-300%");
                $(".modal-avisos").fadeOut(500);

              }

            }
          });
          
          $("#swipemeConfirmacao").swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {

              if(direction=="down"){

                $(".modal-confirmacao .confirmacao").css("bottom","-300%");
                $(".modal-confirmacao").fadeOut(500);

              }

            }
          });

          $("#swipeAcoes").swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {

              if(direction=="down"){

                $(".modal-acoes .aviso").css("bottom","-300%");
                $(".modal-acoes").fadeOut(500);

              }

            }
          });
          



            /* FUNÇÃO GERAL PARA EXIBIR OS AVISOS DO PÁGINA */
            function aviso(titulo,mensagem){

              console.log("%c COMEÇANDO FUNÇÃO PARA EXIBIR AVISO","background:#ff0000;color:#fff;");
              $(".modal-avisos").fadeIn(100);

              $(".modal-avisos .aviso").css("bottom","0");


              // ALIMENTAR O HTML
              $(".modal-avisos .aviso h3").html(titulo);
              $(".modal-avisos .aviso p").html(mensagem+'<p style="padding-top:12px;padding-left:0px;"><button type="button" onclick="fecharAviso();" class="btn btn-primary">Ok</button></p>');
              
              //setTimeout("fecharAviso()",12000);


            }
            function fecharAviso(){
              
              $(".modal-avisos .aviso").css("bottom","-300%");
              $(".modal-avisos").fadeOut(500);

            }

            /* FUNÇÃO GERAL PARA EXIBIR CONFIRMAÇÕES DE AÇÕES */
            function confirmacao(titulo,mensagem,funcaoConfirmacao,textoConfirmacao){

              console.log("%c COMEÇANDO FUNÇÃO PARA EXIBIR AVISO","background:#ff0000;color:#fff;");
              $(".modal-confirmacao").fadeIn(100);

              $(".modal-confirmacao .confirmacao").css("bottom","0");

              // ALIMENTAR O HTML
              $(".confirmacao h3").html(titulo);
              $(".confirmacao p").html(mensagem);

              $(".confirmacao #acaoConfirmacao").attr("onclick",funcaoConfirmacao+"; fecharConfirmacao();");
              if(textoConfirmacao!=""){
                $(".confirmacao #acaoConfirmacao").html(textoConfirmacao);
              }
              

            }
            function fecharConfirmacao(){

                 $(".modal-confirmacao .confirmacao").css("bottom","-300%");
                 $(".modal-confirmacao").fadeOut(500);

            }

            // FUNÇÃO PARA FECHAR MODAL DE AÇÕES SOBRE POSTAGEM
            function fecharAcoes(){
              
              $(".modal-acoes .aviso").css("bottom","-300%");
              $(".modal-acoes").fadeOut(500);

            }


// RETORNAR A DATA ATUAL
function queDiaEHoje(){
   
  var currentdate = new Date(); 
  var datetime = "Hoje é: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " | "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();

  return datetime;

}




// FORMULARIO FLUTUANTE onclick="ativarFormularioFlutuante('','')"
function ativarFormularioFlutuante(campoParaPreenchimento,labelPreenchimento){

   $(".input-flutuante-acessibilidade").fadeIn(500);
   //$(".barra-navegacao").hide(0);

   $("#fieldInputFlutuante").val($(campoParaPreenchimento).val());

   localStorage.setItem("campoParaPreenchimento",campoParaPreenchimento);

   $("#fieldInputFlutuante").focus();
   $('.input-flutuante-acessibilidade label').html(labelPreenchimento);

}

function validarFormularioFlutuante(event){

    event.preventDefault();

    var fieldInputFlutuante = $("#fieldInputFlutuante").val();
    
    $(".input-flutuante-acessibilidade").fadeOut(500);
    //$(".barra-navegacao").show(0);

    $(localStorage.getItem("campoParaPreenchimento")).val(fieldInputFlutuante);

}

// GARANTIR O FECHAMENTO DO CAMPO QUANDO A TELA VOLTAR AO NORMAL
$(document).ready(function() {
  var _originalSize = $(window).width() + $(window).height()
  $(window).resize(function() {
    if ($(window).width() + $(window).height() == _originalSize) {
      console.log("keyboard active "+_originalSize);
      $(".input-flutuante-acessibilidade").fadeOut(500);
      //$(".barra-navegacao").show(0);
    }
  });
});


/* FUNÇÃO PARA COMPARTILHAMENTO EXTERNO */
function compartilhar(){
  

                  // this is the complete list of currently supported params you can pass to the plugin (all optional)
                  var options = {
                    message: 'Rede Social Agroh', // not supported on some apps (Facebook, Instagram)
                    subject: 'A rede social do Agronegócio', // fi. for email
                    //files: ['', ''], // an array of filenames either locally or remotely
                    url: 'https://www.agroh.com.br',
                    chooserTitle: 'Agroh', // Android only, you can override the default share sheet title
                    //appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
                    //iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
                  };

                  var onSuccess = function(result) {
                    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                    console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
                  };

                  var onError = function(msg) {
                    console.log("Sharing failed with message: " + msg);
                  };

                  window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);


}


   

     // CODIGOS PARA UPLOAD DE ARQUIVOS LOCAIS
     function uploadLocal(){

         console.log("ENTRAMOS!");
         //var files = $(this)[0].files;

         $(".retorno-upload").css("padding-bottom","24px");

         $(".retorno-upload").html(`<img src="assets/images/loading.gif" style="width:32px;height:auto;"> Estamos enviando suas imagens, aguarde.`);
         
         /* Efetua o Upload 
         $('.fileForm').ajaxForm({
          dataType:  'json',
          success:   processJson 
         }).submit();
         */

     }
     function processJson(dados) { 

            // 'data' is the json object returned from the server 
            console.log("%c RETORNO SOBRE O ENVIO DAS IMAGENS (UPLOAD):","background:#ff0000;color:#fff;");
            console.log(dados); 
            
            if(dados.erros===null){
            
              console.log("NENHUM ERRO!");
              $(".retorno-upload").html(`<i class="fa fa-check"></i> Imagem enviada com sucesso!`);

              // LIMPAR A SESSAO
              $(".card").html("");

              $(".card").append(`

                           <div class="caixa-preview-imagem-carregada" data-id="${0}" data-url="${dados.dados[0].url}" id="caixaPreviewImagemCarregada${0}">
                              <div style="margin-left:auto;margin-right:auto;position:relative;display:block;width:100px;height:100px;border-radius:8px;background:url('${app.urlCdn}${dados.dados[0].url}') #f2f2f2 no-repeat;background-size:cover;background-position:center center;">
                                  &nbsp;
                              </div>
                              <p>
                                <a href="javascript:void(0)" onclick="app.views.removerImagemGaleriaImagens(${0})" title="Remover essa imagem" style="font-size:13px;color:#ff0000;">
                                  <i class="fa fa-times"></i> remover
                              </a>
                              </p>
                           </div>

              `);  

              $("#imagemOculta").val(dados.dados[0].url);
              $("#tipoImagem").val("batch");


            }else{
              
              $(".retorno-upload").html('<div class="alert alert-danger">'+dados.erros+'</div>');              

            }

            $('.fileForm').resetForm();

        }
      // CODIGOS PARA UPLOAD DE ARQUIVOS LOCAIS















