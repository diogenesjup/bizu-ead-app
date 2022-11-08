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
             
            this.urlDom = "http://127.0.0.1:8080/pefisa/app/www/";
            this.urlApi = "https://diogenesjunior.com.br/api/";
            this.urlCdn = "http://127.0.0.1:8080/pefisa/cdn/";

        }
        if(ambiente=="PRODUCAO"){

            this.urlDom = "https://bizu.com.br/plataforma/";
            this.urlApi = "https://bizu.com.br/plataforma/";
            this.urlCdn = "https://bizu.com.br/plataforma/";

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

        //this.views.viewPrincipal();
        //this.views.ativarMenuUm();

        //console.log("Direcionar o usuário para a Dashboard app.inicio()");
        location.href="dashboard.html";

    }

    login(idUsuario,emailUusario,dadosUsuario){
   
        this.sessao.logarUsuario(idUsuario,emailUusario,dadosUsuario);
   
    }

    
    procLogin(form){

        // EXIBIR O ALERTA DE CARREGANDO
        var toastID = document.getElementById('toast-carregando');
        toastID = new bootstrap.Toast(toastID);
        toastID.show();

        // ENVIAR OS DADOS
        this.models.procLogin(form);
        

    }
    
    

    logoff(){
       
        localStorage.clear();
        this.sessao.deslogarUusario();

    }

  

    procCadastro(form){
        
        // EXIBIR O ALERTA DE CARREGANDO
        var toastID = document.getElementById('toast-carregando');
        toastID = new bootstrap.Toast(toastID);
        toastID.show();

        this.models.procCadastro(form);
        //this.views.cadastroPasso2();
    }
    
    

    procResetSenha(form){

        // EXIBIR O ALERTA DE CARREGANDO
        var toastID = document.getElementById('toast-carregando');
        toastID = new bootstrap.Toast(toastID);
        toastID.show();

        this.models.procResetSenha(form);
    }

    enviarCobranca(nome,numero,idContato){

        // EXIBIR O ALERTA DE CARREGANDO
        var toastID = document.getElementById('toast-carregando');
        toastID = new bootstrap.Toast(toastID);
        toastID.show();

        console.log("CONTATO SELECIONADO");
        console.log(nome);
        console.log(numero);

        localStorage.setItem("nomeCobranca",nome);
        localStorage.setItem("numeroCobranca",numero);
        localStorage.setItem("idContato",idContato);

        // DIRECIONAR O USUÁRIO PARA A PÁGINA DE COBRANÇA
        location.href="enviar.html";

    }

    montarEnvioCobranca(){

        var idUsuario = localStorage.getItem("idUsuario");
        var dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

        var nome = localStorage.getItem("nomeCobranca");
        var numero = localStorage.getItem("numeroCobranca");
        var idContato = localStorage.getItem("idContato");


        // AVISAR QUE O USÁRIO AINDA NÃO TEM CHAVE PIX CADASTRADA
        if(dadosUsuario.chave_pix==null || dadosUsuario.chave_pix==""){
            document.getElementById('msgErroChavePix').click();
        }

        // MONTAR O HTML
        $("#enviandoPara").html(`
            ${nome}
            <small>${numero}</small>
        `);

        $("#removerEsseContato").attr("onclick","app.removerContato('"+idContato+"')");

        $("#contato").val(idContato);
        $("#id_usuario").val(idUsuario);

    }

    removerContato(idContato){

        // EXIBIR O ALERTA DE CARREGANDO
        var toastID = document.getElementById('toast-carregando');
        toastID = new bootstrap.Toast(toastID);
        toastID.show();
        
        this.models.removerContato(idContato);

    }

    enviarCobrancaPix(form){

        // EXIBIR O ALERTA DE CARREGANDO
        var toastID = document.getElementById('toast-carregando');
        toastID = new bootstrap.Toast(toastID);
        toastID.show();
        
        this.models.enviarCobrancaPix(form);
        
    }

    addContato(form){

        // EXIBIR O ALERTA DE CARREGANDO
        var toastID = document.getElementById('toast-carregando');
        toastID = new bootstrap.Toast(toastID);
        toastID.show();
        
        this.models.addContato(form);

    }

    salvarPix(form){

        // EXIBIR O ALERTA DE CARREGANDO
        var toastID = document.getElementById('toast-carregando');
        toastID = new bootstrap.Toast(toastID);
        toastID.show();
        
        this.models.salvarPix(form);

    }

    salvarMeusDados(form){

        // EXIBIR O ALERTA DE CARREGANDO
        var toastID = document.getElementById('toast-carregando');
        toastID = new bootstrap.Toast(toastID);
        toastID.show();
        
        this.models.salvarMeusDados(form);

    }


    curso(idCurso){

        this.views.curso();
        this.models.curso(idCurso);

    }

    certificados(){

        this.views.certificados();
        this.models.certificados();

    }

    // CORRIGIR O TESTE RESPONDIDO PELO USÁRIO
    avaliacao(){

            console.log("INICIANDO UMA AVALIAÇÃO");

            // FORÇAR VOLTAR AO TOPO
             window.scroll({top: 0, behavior: "smooth"});
        
            // FOREACH DOS RADIOS SELECIONADOS
            var radios = document.querySelectorAll('.survey__panel input[type=radio]:checked');
            radios.forEach(radio => {
                
                console.log(" ");
                console.log("RADIO SELECIONADO");
                console.log(radio.value);
                console.log($(radio).attr("data-questao"));
                console.log($(radio).attr("data-correta"));

                // CORRETA
                if($(radio).attr("data-correta")=="Correta"){

                    $(`.feedback-questionario-${$(radio).attr("data-questao")}`).html(`
                        <div class="alert alert-small rounded-s shadow-xl bg-green-dark" role="alert">
                            <span><i class="fa fa-check color-white"></i></span>
                            <strong class="color-white">Resposta correta!</strong>
                            <button type="button" class="close color-white opacity-60 font-16" data-bs-dismiss="alert" aria-label="Close">×</button>
                        </div>
                    `);

                }

                // INCORRETA
                if($(radio).attr("data-correta")=="Incorreta"){

                    $(`.feedback-questionario-${$(radio).attr("data-questao")}`).html(`
                            <div class="alert alert-small rounded-s shadow-xl bg-red-dark" role="alert">
                                <span><i class="fa fa-times color-white"></i></span>
                                <strong class="color-white">Resposta incorreta!</strong>
                                <button type="button" class="close color-white opacity-60 font-16" data-bs-dismiss="alert" aria-label="Close">×</button>
                            </div>
                    `);

                }


            }
        );

        $(".btns-navegacao-aula").html(`

                <p class="p-btn-reiniciar-teste">
                    <button 
                        type="button" 
                        onclick="app.models.testeAula(${localStorage.getItem("ultimoTeste")})" 
                        style="width:100%;" 
                        class="btn btn-default btn-lg btn-block">
                            Reiniciar Questionário
                    </button> 
                </p>

                <p class="p-btn-proxima-aula">
                    <button 
                        type="button" 
                        onclick="app.models.verConteudoAula(${ parseInt(localStorage.getItem("ultimaAula")) + 1})" 
                        style="width:100%;" 
                        class="btn btn-primary btn-lg btn-block">
                            Próxima Aula
                    </button> 
                </p>
        
        `);

    }


    corrigirTesteBancoDeQuestoes(idQuestao){

                var resposta = $(`.survey__panel_${idQuestao} input[type=radio]:checked`);

                if($(resposta).attr("data-correta")=="S"){

                            $(`.feedback-questionario-${idQuestao}`).html(`
                                    <div class="alert alert-small rounded-s shadow-xl bg-green-dark" role="alert">
                                        <span><i class="fa fa-check color-white"></i></span>
                                        <strong class="color-white">Resposta correta!</strong>
                                        <button type="button" class="close color-white opacity-60 font-16" data-bs-dismiss="alert" aria-label="Close">×</button>
                                    </div>
                            `);

                }else{

                            $(`.feedback-questionario-${idQuestao}`).html(`
                                    <div class="alert alert-small rounded-s shadow-xl bg-red-dark" role="alert">
                                        <span><i class="fa fa-times color-white"></i></span>
                                        <strong class="color-white">Resposta incorreta!</strong>
                                        <button type="button" class="close color-white opacity-60 font-16" data-bs-dismiss="alert" aria-label="Close">×</button>
                                    </div>
                            `);

                }

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
        localStorage.setItem("dadosUsuario",JSON.stringify(dadosUsuario));
    	localStorage.setItem("bdLogado","logado");
        localStorage.setItem("idUsuario",this.idUsuario);

        // REMOVER A CLASSE QUE IMPEDE QUE O RODAPÉ SEJA ADICIONADO AO CALCULO DA ALTURA
        //$("section#content").removeClass("nao-logado");
        
        // DIRECIONAR O USUÁRIO PARA O INÍCIO
    	app.inicio();
    }

    verificarLogado(){
      
	      if(localStorage.getItem("bdLogado")=="logado"){
	      	
            location.href="dashboard.html";
	      	
	      }else{
             
          }

    }

    deslogarUusario(){
    	this.logado = "nao-logado";
    	localStorage.setItem("bdLogado","nao-logado");
    	localStorage.clear();
        location.href="index.html?logoff=true";
    }

}