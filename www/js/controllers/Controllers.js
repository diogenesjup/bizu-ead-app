class App {
//window.history.pushState(e, '"' + e+ '"', paginaSessao+'#' + e);
    constructor(appId, appName, appVersion, appOs, ambiente, token, tokenSms, apiLogin, apiSenha) {

        this.appId = appId;
        this.appName = appName;
        this.appVersion = appVersion;        
        this.appOs = appOs;

        this.views = new Views();
        this.sessao = new Sessao();
        this.models = new Models();
        this.helpers = new Helpers();

        if(ambiente=="HOMOLOGACAO"){
             
            this.urlDom = "http://127.0.0.1:8080/agroh/app/www/";
            this.urlApi = "http://127.0.0.1:8080/agroh/api";
            this.urlCdn = "http://127.0.0.1:8080/agroh/cdn";

        }
        if(ambiente=="PRODUCAO"){

            this.urlDom = "";
            this.urlApi = "";
            this.urlCdn = "";

        }

        this.token = token;
        this.tokenSms = tokenSms;

        this.apiLogin = apiLogin;
        this.apiSenha = apiSenha;

        this.omniToken = "";
        
    }
    
    getVersion() {

        return this.appVersion;
    }

    getOs(){

        return this.appOs;
    }
    
    initApp(elemento){

        this.views.viewPrincipal();

        // VERIFICAR SE A API ESTÁ OK
        this.models.testeApi();

        // VERIFICAR SE O USUÁRIO ESTÄ LOGADO
        this.sessao.verificarLogado();

    }

    inicio(){

        this.views.viewPrincipal();
        this.views.ativarMenuUm();

    }

    login(idUsuario,emailUusario,dadosUsuario){
   
        this.sessao.logarUsuario(idUsuario,emailUusario,dadosUsuario);
   
    }

    verificarCodigoSms(){

        this.views.viewCodigoSms();

    }

    procVerificarSms(){
        
       this.models.verificarCodigoSms(); 

    }
    
    procLoginSms(){

        this.models.procLoginSms();
   
    }

    procLogin(){

        this.models.procLogin();
   
    }
    
    procLogoff(){

        confirmacao("Tem certeza que deseja sair?","Você será desconectado...","app.logoff();","Sim, sair");
        
    }

    logoff(){
       
        localStorage.clear();
        app.viewLogin();

    }

    cadastro(){
        this.views.viewCadastro();
        this.views.desativarTodosMenus();
    }

    procCadastro(){
        //this.models.procCadastro();
        this.views.cadastroPasso2();
    }
    
    procCadastroPasso2(){

        this.views.cadastroPasso3();

    }

    applyFilter(seletor){
        
        this.views.applyFilter(seletor);

    }

    procCadastro3(){

        this.views.cadastroPasso4();

    }

    procCadastro4(){
        
        this.views.cadastroPasso5();
    }

    procCadastro5(){
        
        app.inicio();
    }


    esqueciMinhaSenha(){
        this.views.viewEsqueciMinhaSenha();
        this.views.desativarTodosMenus();
    }

    procResetSenha(){
        this.models.procResetSenha();
    }

    viewLoginEmailSenha(){
        this.views.viewLoginEmailSenha();
    }

    detalhePostagem(){
        this.views.detalhePostagem();
    }

    empresa(){
        this.views.empresa();
    }

    grupos(){
        this.views.grupos();
    }

    view2(){
        this.views.view2();
        this.views.ativarMenuDois();
    }

    view3(){
        this.views.view3();
        this.views.ativarMenuTres();
    }

    viewLogin(){
        this.views.viewLogin();
        this.views.desativarTodosMenus();

        $("section#content").addClass("nao-logado");
        
    }

    viewUploadFoto(){
        this.views.viewUploadFoto();
        this.views.desativarTodosMenus();
    }


    /* ABRIR OU FECHAR O MENU LOJA */
    fabrirFecharMenuLoja(){

              if($(".menu-adicional-loja").hasClass("aberto")){
                 
                 $(".menu-adicional-loja").removeClass("aberto");
                
              }else{

                $(".menu-adicional-loja").addClass("aberto");
                
              }

    
    if(localStorage.getItem("bdLogado")=="logado"){
    }


  }

    tipoPessoa(tipoPessoa){

        console.log("TIPO PESSOA: "+tipoPessoa);
   
        if(tipoPessoa=="fisica"){

            $("#caixaDados label").html(`CPF`);
            $("#cpf").val("");
            $("#cpf").inputmask("999.999.999-99");

        }
        if(tipoPessoa=="juridica"){

            $("#caixaDados label").html(`CNPJ`);
            $("#cpf").val("");
            $("#cpf").inputmask("99.999.999/9999-99");

        }

    }
    

    iniciarCalibragem(){

          if( navigator.geolocation ){
              // Call getCurrentPosition with success and failure callbacks
              navigator.geolocation.getCurrentPosition( success, fail );
           }else{
              aviso("Sem GPS","Não conseguimos acessar o seu GPS. Para um correto uso do aplicativo, o seu disposítivo precisa ter esse recurso. Talvez seja necessário reeinstalar o aplicativo para tentar novamente.");
              app.logoff();      
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

                    aviso("GPS identificado e pronto!","Tudo certo com a sua localização, agora vamos testar a sua camêra");
                    appCamera.startCameraBelow();
                    aviso("Como calibrar a câmera:","Quando sua câmera for inicializada, tire qualquer foto para testarmos a resolução da mesma.");

                }else{

                   aviso("Sem GPS","Não conseguimos acessar o seu GPS. Para um correto uso do aplicativo, o seu disposítivo precisa ter esse recurso. Talvez seja necessário reeinstalar o aplicativo para tentar novamente.");
                   app.logoff();
                }


            }
          function fail(){

               aviso("Sem GPS","Não conseguimos acessar o seu GPS. Para um correto uso do aplicativo, o seu disposítivo precisa ter esse recurso. Talvez seja necessário reeinstalar o aplicativo para tentar novamente.");
               app.logoff();
            
            }  

    }


    salvarEContinuarDepois(){

        app.inicio();
        aviso("Checklist salvo!","As informações já respondidas foram salvas, e você poderá continuar depois.");  

    }


    increaseFont(){
       
       if(localStorage.getItem("fontLabel")==null){

            $("label").css("font-size","18px");
            localStorage.setItem("fontLabel","18");

       }else{

            var fontSize = localStorage.getItem("fontLabel");  

            fontSize++;  

            if(fontSize>=24){
                $("label").css("font-size","14px");
                fontSize = 14;
            }else{
                $("label").css("font-size",fontSize+"px");
            }

            localStorage.setItem("fontLabel",fontSize);

       }

    }


tarefas(){
   
   this.views.tarefas();

}


relatorios(){

    this.views.relatorios();

}


acoesPostagem(){
    
    this.views.acoesPostagem();

}

/* DENUNCIAR UMA POSTAGEM */
denunciarPostagem(){
    
    confirmacao("Tem certeza que deseja denúnciar essa postagem?","Nossa equipe fará uma análise sobre o conteúdo e vamos tomar medidas a respeito","fecharConfirmacao()","Denúnciar");

}


/* MEU PERFIL */
meuPerfil(){

    this.views.meuPerfil();

}

}


class Sessao{
    
	constructor(){
	      
	     this.logado = "nao-logado";
	     this.bdLogado = localStorage.getItem("bdLogado");
	     this.idUsuario = localStorage.getItem("idUsuario");
	     this.emailUsuario = localStorage.getItem("emailUsuario");
	     this.dadosUsuario = localStorage.getItem("dadosUsuario");

	}
    
    logarUsuario(idUsuario,emailUusario,dadosUsuario){
    	this.logado = "logado";
    	this.idUsuario = idUsuario;
    	this.dadosUsuario = dadosUsuario;
    	localStorage.setItem("bdLogado","logado");
        localStorage.setItem("idUsuario",this.idUsuario);

        // REMOVER A CLASSE QUE IMPEDE QUE O RODAPÉ SEJA ADICIONADO AO CALCULO DA ALTURA
        $("section#content").removeClass("nao-logado");
        
        // DIRECIONAR O USUÁRIO PARA O INÍCIO
    	app.inicio();
    }

    verificarLogado(){
      
	      if(this.bdLogado!="logado"){
	      	app.viewLogin();
	      	
	      }

    }

    deslogarUusario(){
    	this.logado = "nao-logado";
    	localStorage.setItem("bdLogado","nao-logado");
    	localStorage.clear();
    }

}