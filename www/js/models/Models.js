class Models{
    

    // TESTAR A DISPONIBILIDADE DA API
    testeApi(){
                
             console.log("TESTE API DESATIVADO");   

    }
    


    // PROC LOGIN
    procLogin(form){

            var dadosForm = $(form).serialize();

            var login = document.getElementById("form1a").value;
            var senha = document.getElementById("form1ab").value;

            localStorage.setItem("loginDB",login);
            localStorage.setItem("senhaDB",senha);

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
                        app.login(dados.the_user_id,dados.login,dados);

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


    // RECUPERAR AS INFOS DO USUARIO
    getInfos(){

                console.log("INICIANDO FUNÇÃO PARA CARREGAR O CONTEUDO");

                var idUsuario = localStorage.getItem("idUsuario");
                var dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

                // CONFIGURAÇÕES AJAX VANILLA
                let xhr = new XMLHttpRequest();
                        
                xhr.open('GET', app.urlApi+`wp-json/bizuapi/v2/infos/?id_usuario=${idUsuario}&email_usuario=${dadosUsuario.login}`,true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                
                // INICIO AJAX VANILLA
                xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {

                        console.log("OPERAÇÃO REALIZADA COM SUCESSO, RETORNO DOS DADOS:");

                        console.log(JSON.parse(xhr.responseText));

                        var dados = JSON.parse(xhr.responseText);


                        // ALIMENTAR MEUS CURSOS
                        var meusCursos = Object.entries(dados.cursos_usuario);

                        if(meusCursos.length>0){

                            console.log("TOTAL DE CURSOS CONTRATADOS: ");
                            console.log(meusCursos.length);

                            $(".carregando-cursos").hide();

                            // ALIMENTAR AS CATEGORIAS DE OUTROS CURSOS
                            jQuery("#listaCursosListagem").html(`
                                        ${meusCursos.map((n) => {

                                            return `
                                                
                                                <div class="curso-comprado" onclick="openCategoria('${n[1].url_em_curso}')">
                                                    <div class="curso-comprado-capa" style="background:url('${n[1].imagem}') #f2f2f2 no-repeat;background-size:cover;background-position:center center;">
                                                        &nbsp;
                                                    </div>
                                                    <h3>${n[1].titulo}</h3>
                                                    <p>${n[1].resumo}</p>
                                                </div>

                                            `;

                                        }).join('')}
                            `);

                            

                        }else{

                            $(".carregando-cursos").hide();
                            $(".carregando-contatos-vazio").fadeIn(500);

                        }


                        // CONVERTER O OBJETO EM ARRAY,
                        // EM TEORIA ISSO NÃO SERIA NECESSÁRIO, MAS O WORDPRESS ESTÁ RETORNANDO EM UM FORMADO INCOMUM
                        var categorias = Object.entries(dados.categorias_cursos);
                        //var categorias = Object.keys(dados.categorias_cursos).map((key) => [Number(key), dados.categorias_cursos[key]]);

                        console.log("CATEGORIAS");
                        console.log(categorias);

                        console.log("TOTAL DE CATEGORIAS: ");
                        console.log(categorias.length);

                        
                        // ALIMENTAR AS CATEGORIAS DE OUTROS CURSOS
                        jQuery("#listaCategoriasListagem").html(`
                                ${categorias.map((n) => {

                                    $(".carregando-cursos-outros").hide();

                                    return `
                                          <div class="categoria-cursos">
                                             <a href="#" onclick="openCategoria('${n[1].url}')" title="${n[1].nome}">
                                                 <h2>${n[1].nome}</h2>
                                             </a>
                                          </div>
                                    `;
                                }).join('')}
                       `);
                       






                    }else{
                    
                        console.log("SEM SUCESSO getInfos()");
                        document.getElementById('erroGeral').click();

                        console.log(JSON.parse(xhr.responseText));

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send();

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