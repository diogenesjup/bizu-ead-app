class Models{
    

    // TESTAR A DISPONIBILIDADE DA API
    testeApi(){
                
             console.log("TESTE API DESATIVADO");   

    }
    


    // PROC LOGIN
    procLogin(form){

            var dadosForm = $(form).serialize();

            // CONFIGURAÇÕES AJAX VANILLA
            let xhr = new XMLHttpRequest();
            
            xhr.open('POST', app.urlApi+'wp-json/bizuapi/v2/custom-auth/',true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            var params = "token="+app.token+
                        "&"+dadosForm;
            
            // INICIO AJAX VANILLA
            xhr.onreadystatechange = () => {

            if(xhr.readyState == 4) {

                if(xhr.status == 200) {

                    console.log("OPERAÇÃO REALIZADA COM SUCESSO, RETORNO DOS DADOS");
                    console.log(JSON.parse(xhr.responseText));

                    var dados = JSON.parse(xhr.responseText);

                    if(dados.match==false){

                        document.getElementById('msgErroLoginSenha').click();

                    }else{
                        
                        // LOGIN OK
                        app.login(dados.dados.the_user_id,dados.dados.login,dados.dados);

                    }
                    
                    
                }else{
                
                    console.log("SEM SUCESSO procLogin()");
                    console.log(JSON.parse(xhr.responseText));
                    document.getElementById('msgErroLoginSenha').click();

                }

            }
        }; // FINAL AJAX VANILLA

        /* EXECUTA */
        xhr.send(params);
            
    }

   


    // PROC CADASTRO
    procCadastro(form){

                var dadosForm = $(form).serialize();

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', app.urlApi+'auth/cadastro/',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&"+dadosForm;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                        console.log(JSON.parse(xhr.responseText));

                        var dados = JSON.parse(xhr.responseText);

                        if(dados.sucesso==403){

                            document.getElementById('msgCadastro').click();

                        }else{
                            
                            // LOGIN OK
                            //app.login(dados.dados[0].id,dados.dados[0].email,dados.dados[0]);

                            // CADASTRO OK
                            localStorage.setItem("cadastroOk",2);

                            location.href="index.html";
                            

                        }
                        
                    }else{
                    
                        console.log("SEM SUCESSO procCadastro()");
                        console.log(JSON.parse(xhr.responseText));
                        document.getElementById('msgErroLoginSenha').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);
  
  
    }


    



    // RESET DE SENHA  
    procResetSenha(form){

                var dadosForm = $(form).serialize();

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', app.urlApi+'auth/reset-senha/',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&"+dadosForm;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                        console.log(JSON.parse(xhr.responseText));

                        var dados = JSON.parse(xhr.responseText);

                        if(dados.sucesso==403){

                            document.getElementById('msgErroLoginSenha').click();

                        }else{
                            
                            document.getElementById('msgSucessoReset').click();
                        }
                        
                    }else{
                    
                        console.log("SEM SUCESSO procResetSenha()");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('msgErroLoginSenha').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);

    }



    getContatos(){

        console.log("INICIANDO FUNÇÃO PARA CARREGAR OS CONTATOS DO USÁRIO");

        var idUsuario = localStorage.getItem("idUsuario");

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                        
                xhr.open('POST', app.urlApi+'pefisa/meus-numeros/',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&id_usuario="+idUsuario;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                        console.log(JSON.parse(xhr.responseText));

                        var contatos = JSON.parse(xhr.responseText);

                        // FEED DE PESQUISA
                        jQuery("#listaContatosPesquisa").html(`

                               ${contatos.dados.map((n) => {

                                    return `
                                    
                                        <a href="" onclick="app.enviarCobranca('${n.nome}','${n.numero}','${n.id}')" class="d-flex mb-3" data-filter-item data-filter-name="todos ${n.nome}" style="padding-top:26px">
                            
                                            <div class="resumo-letra-contato">
                                                ${n.nome[0]}
                                            </div>
                                            <div>
                                                <h5 class="font-16 font-600">${n.nome}</h5>
                                                <p class="line-height-s mt-1 opacity-70">${n.numero}</p>
                                            </div>
                                            <div class="align-self-center ps-3">
                                                <i class="fa fa-angle-right opacity-20"></i>
                                            </div>
                                        </a>
                                    
                                    `;

                               }).join('')}
                        
                        `);

                        // LISTAGEM GERAL
                        jQuery("#listaContatosListagem").html(`

                               ${contatos.dados.map((n) => {

                                    $(".carregando-contatos").hide();
                                    $(".carregando-contatos-vazio").hide();

                                    return `
                                    
                                        <a href="" onclick="app.enviarCobranca('${n.nome}','${n.numero}','${n.id}')" class="d-flex mb-3">
                                            <div>
                                                <div class="resumo-letra-contato">
                                                    ${n.nome[0]}
                                                </div>
                                            </div>
                                            <div>
                                                <h5 class="font-16 font-600">${n.nome}</h5>
                                                <p class="line-height-s mt-1 opacity-70">${n.numero}</p>
                                            </div>
                                            <div class="align-self-center ps-3">
                                                <i class="fa fa-angle-right opacity-20"></i>
                                            </div>
                                        </a>
                                    
                                    `;

                               }).join('')}
                        
                        `);

                        if(contatos.dados.length==0){

                            $(".carregando-contatos").hide();
                            $(".carregando-contatos-vazio").show();
                        }

                        
                    }else{
                    
                        console.log("SEM SUCESSO getContatos()");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('erroGeral').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);



    }

    enviarCobrancaPix(form){

                var dadosForm = $(form).serialize();

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', app.urlApi+'enviarmsg',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&"+dadosForm;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('sucessoEnvioMsg').click();                      
                        
                    }else{
                    
                        console.log("SEM SUCESSO enviarCobrancaPix()");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('msgErroLoginSenha').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);


    }

    addContato(form){

                var dadosForm = $(form).serialize();
                var idUsuario = localStorage.getItem("idUsuario");

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', app.urlApi+'pefisa/add-numero/',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&id_usuario="+idUsuario+"&"+dadosForm;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO, RETORNO DOS DADOS DO CONTATO ADICIONADO");
                        console.log(JSON.parse(xhr.responseText));

                        var dados = JSON.parse(xhr.responseText);

                        // SALVAR DADOS NA SESSÃO
                        localStorage.setItem("nomeCobranca",dados.dados[0].nome);
                        localStorage.setItem("numeroCobranca",dados.dados[0].numero);
                        localStorage.setItem("idContato",dados.dados[0].id);

                        document.getElementById('sucessoEnvioMsg').click();                      
                        
                    }else{
                    
                        console.log("SEM SUCESSO addContato()");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('msgErroLoginSenha').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);

    }

    getMeuPix(){

        var idUsuario    = localStorage.getItem("idUsuario");
        var dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

        var chave_pix     = dadosUsuario.chave_pix;
        var chave_pix_info = dadosUsuario.info_chave_pix;

        $("#chave_pix").val(chave_pix);
        $("#info_chave_pix").val(chave_pix_info);

    }

    getMeusDados(){

        var idUsuario    = localStorage.getItem("idUsuario");
        var dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

        var nome     = dadosUsuario.nome;
        var email    = dadosUsuario.email;
        var celular  = dadosUsuario.celular;
        var senha    = dadosUsuario.senha;

        $("#nome").val(nome);
        $("#celular").val(celular);
        $("#form1a").val(email);
        $("#form1ab").val(senha);

    }

    salvarPix(form){

                var dadosForm = $(form).serialize();
                var idUsuario = localStorage.getItem("idUsuario");

                var dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

                var chave_pix      = $("#chave_pix").val();
                var chave_pix_info = $("#info_chave_pix").val();

                dadosUsuario.chave_pix      = chave_pix;
                dadosUsuario.info_chave_pix = chave_pix_info;

                // ATUALIZAR AS INFORMAÇÕES DO USUÁRIO NA MEMORIA
                localStorage.setItem("dadosUsuario",JSON.stringify(dadosUsuario));

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', app.urlApi+'pefisa/salvar-pix/',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&id_usuario="+idUsuario+"&"+dadosForm;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('sucessoEnvioMsg').click();                      
                        
                    }else{
                    
                        console.log("SEM SUCESSO salvarPix()");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('msgErroLoginSenha').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);

    }

    salvarMeusDados(form){

                var dadosForm = $(form).serialize();
                var idUsuario = localStorage.getItem("idUsuario");

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', app.urlApi+'pefisa/editar-meus-dados/',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&id_usuario="+idUsuario+"&"+dadosForm;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                        console.log(JSON.parse(xhr.responseText));

                        var dados = JSON.parse(xhr.responseText);

                        // SALVAR DADOS NA SESSÃO
                        localStorage.setItem("dadosUsuario",JSON.stringify(dados.dados[0]));

                        document.getElementById('sucessoEnvioMsg').click();                      
                        
                    }else{
                    
                        console.log("SEM SUCESSO salvarMeusDados()");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('msgErroLoginSenha').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);

    }

    removerContato(idContato){

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', app.urlApi+'pefisa/remover-numero/',true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                var params = "token="+app.token+
                            "&id_numero="+idContato;
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO");
                        console.log(JSON.parse(xhr.responseText));

                        location.href="dashboard.html";                     
                        
                    }else{
                    
                        console.log("SEM SUCESSO removerContato()");
                        console.log(JSON.parse(xhr.responseText));

                        document.getElementById('msgErroLoginSenha').click();

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send(params);

    }

}