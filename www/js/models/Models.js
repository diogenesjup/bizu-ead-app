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
                                                
                                                <div class="curso-comprado" onclick="app.curso('${n[1].id}')">
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


    getInfosBancoQuestoes(){

        console.log("INICIANDO FUNÇÃO PARA CARREGAR O CONTEUDO");

                var idUsuario = localStorage.getItem("idUsuario");
                var dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

                $(".carregando-cursos").hide();

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

                        console.log(" ");
                        console.log("TOTAL DO BANCO DE QUESTÕES");
                        console.log(dados.banco_de_questoes.length);

                        console.log(" ");
                        console.log("TOTAL DE DISCIPLINAS");
                        console.log(dados.disciplinas.length);
                        $(".filtros").append(`

                            <div class="form-group">
                                <label>Disciplina</label>
                                <select class="form-control" name="disciplinas">
                                    <option value="">Selecione uma opção</option>
                                    ${dados.disciplinas.map((n) => {

                                        return `

                                            <option value="${n.titulo}">${n.titulo}</option>
                                            
                                        `;

                                    }).join('')}
                                </select>
                            </div>
                        
                        `);


                        console.log(" ");
                        console.log("TOTAL DE AREAS DE ATUAÇÃO");
                        console.log(dados.areas_de_atuacao.length);
                        $(".filtros").append(`

                            <div class="form-group">
                                <label>Área de atuação</label>
                                <select class="form-control" name="areas_de_atuacao">
                                    <option value="">Selecione uma opção</option>
                                    ${dados.areas_de_atuacao.map((n) => {

                                        return `

                                            <option value="${n.titulo}">${n.titulo}</option>
                                            
                                        `;

                                    }).join('')}
                                </select>
                            </div>
                        
                        `);

                        console.log(" ");
                        console.log("TOTAL DE INSTIUIÇÕES");
                        console.log(dados.insticuicao.length);
                        $(".filtros").append(`

                            <div class="form-group">
                                <label>Instituição</label>
                                <select class="form-control" name="insticuicao">
                                    <option value="">Selecione uma opção</option>
                                    ${dados.insticuicao.map((n) => {

                                        return `

                                            <option value="${n.titulo}">${n.titulo}</option>
                                            
                                        `;

                                    }).join('')}
                                </select>
                            </div>
                        
                        `);

                        console.log(" ");
                        console.log("TOTAL DE BANCA");
                        console.log(dados.banca.length);
                        $(".filtros").append(`

                            <div class="form-group">
                                <label>Banca</label>
                                <select class="form-control" name="banca">
                                    <option value="">Selecione uma opção</option>
                                    ${dados.banca.map((n) => {

                                        return `

                                            <option value="${n.titulo}">${n.titulo}</option>
                                            
                                        `;

                                    }).join('')}
                                </select>
                            </div>
                        
                        `);

                        $(".filtros").append(`
                                    
                                    <p style="margin-top:20px;"> 

                                        <button type="button" class="btn btn-primary btn-block" style="width:100%;position:relative;display:block;" onclick="app.models.filtrarQuestoes()">Filtrar</button>
                                    
                                    </p>
                                    
                        `);

                        var contadorAlt = 0;

                        $("#listaCursosListagem").html(`
                                    
                                ${dados.banco_de_questoes.map((n) => {

                                    return `

                                        <section class="survey__panel survey__panel_${n.id}" aria-hidden="false" data-index="${n.id}" data-peso="" questao="${n.id}" data-panel="">
                                            <h2 class="survey__panel__question">
                                                <span class="visuallyhidden"></span>${n.titulo_pergunta}
                                            </h2>
                                            <p>${n.texto_pergunta}</p>
                                            <div class="survey__panel__period">

                                                ${n.alternativas.map((m) => {

                                                    contadorAlt++;

                                                    return `
                                                        
                                                        <div class="form-group">
                                                            <input data-questao="${n.id}" data-correta="${m.correta}" id="questao${n.id}Alt${contadorAlt}" type="radio" name="questao${n.id}" value="${m.texto_alternativa}" />
                                                            <label for="questao${n.id}Alt${contadorAlt}">
                                                                ${m.texto_alternativa}
                                                            </label>
                                                        </div>

                                                    `;

                                                }).join('')}
                                                
                                            </div>
                                            <p>
                                                <button onclick="app.corrigirTesteBancoDeQuestoes(${n.id})" class="btn btn-primary btn-block" style="position:relative;display:block;width:100%;">
                                                    Corrigir
                                                </button>  
                                            </p>
                                            <p class="feedback-message feedback-questionario-${n.id}"></p>
                                        </section>
                                        
                                    `;

                                }).join('')}
                                    
                        
                        `);

                        

                    }else{
                    
                        console.log("SEM SUCESSO getInfosBancoQuestoes()");
                        document.getElementById('erroGeral').click();

                        console.log(JSON.parse(xhr.responseText));

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send();

    }


    filtrarQuestoes(){

        console.log("INICIANDO FUNÇÃO PARA CARREGAR O CONTEUDO");

        $("#listaCursosListagem").html(`
        
                <div class="carregando-cursos text-center">
                    <i class="fa fa-sync fa-spin me-3"></i> filtrando questões...
                </div>

        `);

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

                        $(".carregando-cursos").hide();

                        var contadorAlt = 0;

                        $("#listaCursosListagem").html(`
                                    
                                ${dados.banco_de_questoes.map((n) => {

                                    return `

                                        <section class="survey__panel survey__panel_${n.id}" aria-hidden="false" data-index="${n.id}" data-peso="" questao="${n.id}" data-panel="">
                                            <h2 class="survey__panel__question">
                                                <span class="visuallyhidden"></span>${n.titulo_pergunta}
                                            </h2>
                                            <p>${n.texto_pergunta}</p>
                                            <div class="survey__panel__period">

                                                ${n.alternativas.map((m) => {

                                                    contadorAlt++;

                                                    return `
                                                        
                                                        <div class="form-group">
                                                            <input data-questao="${n.id}" data-correta="${m.correta}" id="questao${n.id}Alt${contadorAlt}" type="radio" name="questao${n.id}" value="${m.texto_alternativa}" />
                                                            <label for="questao${n.id}Alt${contadorAlt}">
                                                                ${m.texto_alternativa}
                                                            </label>
                                                        </div>

                                                    `;

                                                }).join('')}
                                                
                                            </div>
                                            <p>
                                                <button onclick="app.corrigirTesteBancoDeQuestoes(${n.id})" class="btn btn-primary btn-block" style="position:relative;display:block;width:100%;">
                                                    Corrigir
                                                </button>  
                                            </p>
                                            <p class="feedback-message feedback-questionario-${n.id}"></p>
                                        </section>
                                        
                                    `;

                                }).join('')}
                                    
                        
                        `);

                    }else{
                    
                        console.log("SEM SUCESSO filtrarQuestoes()");
                        document.getElementById('erroGeral').click();

                        console.log(JSON.parse(xhr.responseText));

                    }

                }
            }; // FINAL AJAX VANILLA

            /* EXECUTA */
            xhr.send();

    }


    curso(idCurso){

        var login = localStorage.getItem("loginDB");
        var senha = localStorage.getItem("senhaDB");

        var params = "token="+app.token+
                        "&login="+login+"&senha="+senha+"&curso="+idCurso;

        console.log(params);

                        // CONFIGURAÇÕES AJAX VANILLA
                        let xhr = new XMLHttpRequest();
                                        
                        xhr.open('POST', app.urlApi+`wp-json/bizuapi/v2/curso/`,true);
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        
                        // INICIO AJAX VANILLA
                        xhr.onreadystatechange = () => {

                        if(xhr.readyState == 4) {

                            if(xhr.status == 200) {

                                console.log("OPERAÇÃO REALIZADA COM SUCESSO, RETORNO DOS DADOS:");

                                console.log(JSON.parse(xhr.responseText));

                                var dados = JSON.parse(xhr.responseText);

                                localStorage.setItem("dadosCurso", JSON.stringify(dados));
                                localStorage.setItem("ultimoCurso",idCurso);

                                $(".carregando-cursos").hide();

                                console.log("QUANTIDADE DE CONTEÚDOS DO CURSO");
                                console.log(dados.curso[0].conteudo_do_curso.length);

                                var contadorAula = -1;
                               
                                $("#conteudoPrincipalPagina").html(`
                                
                                        <div class=" mx-0">
                                            <div class="content titulo-e-resumo-curso">
                                                <h1><a href="#" onclick="location.reload();"><i class="fa fa-angle-left"></i></a> ${dados.curso[0].titulo}</h1>
                                                <p>${dados.curso[0].resumo_do_curso}</p>
                                                <img src="${dados.curso[0].imagem_capa}" style="width:100%;height:auto;" />
                                            </div>
                                        </div>

                                        <div class="conteudo-curso-aulas"> 

                                                ${dados.curso[0].conteudo_do_curso.map((n) => {

                                                    contadorAula++;

                                                    localStorage.setItem("maxNumAula",contadorAula);
                
                                                    return `
                                                        <div class="conteudo-curso-aula">
                                                            <div class="row">
                                                                <div class="col-2 play-aula">
                                                                    <a href="" onclick="app.models.verConteudoAula(${contadorAula})">
                                                                        <img src="images/3669296_circle_filled_play_ic_icon.svg" />
                                                                    </a>
                                                                </div>
                                                                <div class="col-10 conteudo-aula" onclick="app.models.verConteudoAula(${contadorAula})">
                                                                     <h3>${n.nome_da_aula}</h3>
                                                                     <p>${n.resumo_da_aula}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    `;

                                                    

                                                }).join('')}
                                        
                                        </div>
                                
                                `);

                            }else{
                            
                                console.log("SEM SUCESSO curso()");
                                document.getElementById('erroGeral').click();

                                console.log(JSON.parse(xhr.responseText));

                            }

                        }
                    }; // FINAL AJAX VANILLA

                    /* EXECUTA */
                    xhr.send(params);

    }

    verConteudoAula(idAula){

        var idCurso = localStorage.getItem("ultimoCurso");
        var dados   = JSON.parse(localStorage.getItem("dadosCurso"));

        localStorage.setItem("ultimaAula",idAula);

        var controle = 0;
        var aula;

        // FORÇAR VOLTAR AO TOPO
        window.scroll({top: 0, behavior: "smooth"})

        // CAPTURAR CONTEUDO DA AULA
        for(let i = 0;i<dados.curso[0].conteudo_do_curso.length;i++){

            // MATCH AULA
            if(i==idAula){

                aula = dados.curso[0].conteudo_do_curso[i];

                console.log("CONTEUDO DA AULA");
                console.log(aula);

                break;

            }

        }

        // ANALISAR IMAGEM DA AULA
        var imgAula = "";
        if(aula.imagem_explanacao_aula!="" && aula.imagem_explanacao_aula!=false && aula.imagem_explanacao_aula!=null){
            imgAula = `<img src="${aula.imagem_explanacao_aula}" style="width:100%;height:auto;" />`;
        }

        // ANALISAR VIDEO DA AULA
        var videoAula = "";
        if(aula.video_da_aula!="" && aula.video_da_aula!=false && aula.video_da_aula!=null){
            videoAula = aula.video_da_aula;
        }

        var btnNextAula = "";

        if(idAula<localStorage.getItem("maxNumAula")){

            btnNextAula = `<a href="" onclick="app.models.verConteudoAula(${idAula+1})" class="btn btn-primary btn-block">Próxima Aula</a>`;

        }else{
                
            btnNextAula = `<p>&nbsp;</p><a href="" onclick="app.curso(${idCurso})" class="btn btn-primary btn-block">Voltar ao início do curso</a>`;
    
        }

        if(aula.arquivos_da_aula==false){
            aula.arquivos_da_aula = [];
        }

        var btnTesteAula = "";

        if(aula.teste_da_aula!=false && aula.teste_da_aula!=null){

            btnTesteAula = `<a href="#" onclick="app.models.testeAula(${aula.teste_da_aula})" class="btn btn-default btn-block">Iniciar Questionário da Aula</a>`;

        }

        // EXIBIR O CONTEÚDO DA AULA
        $("#conteudoPrincipalPagina").html(`
                                
                    <div class=" mx-0">
                        <div class="content titulo-e-resumo-curso">
                            <h1><a href="#" onclick="app.curso(${idCurso});"><i class="fa fa-angle-left"></i></a> 
                                ${aula.nome_da_aula}
                                <small>${dados.curso[0].titulo}:</small>
                            </h1>
                            <p>${aula.resumo_da_aula}</p>
                        </div>
                        
                        <div class="content conteudo-aula-single">
                            <p>${imgAula}</p>
                            ${videoAula}
                            ${aula.conteudo_da_aula}

                            <div class="arquivos-para-download">

                                    ${aula.arquivos_da_aula.map((n) => {

                                        return `
                                            
                                            <div class="arquivo-da-aula" onclick="openArquivo('${n.link}')">
                                                <p>
                                                  <i class="fa fa-download"></i> Baixar arquivo: ${n.nome_do_arquivo}
                                                </p>
                                            </div>

                                        `;

                                    }).join('')}

                            </div>
                            
                            <div class="btns-teste">
                                ${btnTesteAula}
                            </div>
                            <div class="btns-navegacao-aula">
                                ${btnNextAula}
                            </div>

                        </div>

                    </div>

        `);


    }


    testeAula(idTeste){

        var idCurso = localStorage.getItem("ultimoCurso");
        var dados   = JSON.parse(localStorage.getItem("dadosCurso"));

        var idAula = localStorage.getItem("ultimaAula",idAula);



        var controle = 0;
        var aula;

        // FORÇAR VOLTAR AO TOPO
        window.scroll({top: 0, behavior: "smooth"})

        // CAPTURAR CONTEUDO DA AULA
        for(let i = 0;i<dados.curso[0].conteudo_do_curso.length;i++){

            // MATCH AULA
            if(i==idAula){

                aula = dados.curso[0].conteudo_do_curso[i];

                console.log("CONTEUDO DA AULA");
                console.log(aula);

                break;

            }

        }

        var teste;

        // OBTER DADOS DO TESTE
        for(let i = 0;i<dados.testes.length;i++){

            if(dados.testes[i].id_teste == idTeste){
                
                console.log("CONTEUDO DO TESTE SELECIONADO");
                console.log(dados.testes[i]);

                teste = dados.testes[i];
                localStorage.setItem("ultimoTeste",idTeste);
                break;
            
            }

        }

         var contador = 0;
         var contadorAlt = 0;

         // EXIBIR O CONTEÚDO DA AULA
         $("#conteudoPrincipalPagina").html(`
                                
                <div class=" mx-0">
                    <div class="content titulo-e-resumo-curso">
                        <h1><a href="#" onclick="app.models.verConteudoAula(${idAula})"><i class="fa fa-angle-left"></i></a> 
                            Questionário ${aula.nome_da_aula}
                            <small>${dados.curso[0].titulo}:</small>
                        </h1>
                        <p>${aula.resumo_da_aula}</p>
                    </div>

                    <section class="pesquisa">

                        <div class="content conteudo-teste">


                                        ${teste.questoes_do_teste.map((n) => {

                                            contador++;

                                            return `
                                                
                                                    <!-- PERGUNTA ${contador} -->
                                                    <section class="survey__panel" aria-hidden="false" data-index="${contador}" data-peso="${n.peso_da_pergunta}" questao="${contador}" data-panel="">
                                                        <h2 class="survey__panel__question">
                                                            <span class="visuallyhidden">Questão ${contador} de ${teste.questoes_do_teste.length} </span>${n.titulo_da_pergunta}
                                                        </h2>
                                                        <p>${n.texto_apoio_da_pergunta}</p>
                                                        <div class="survey__panel__period">

                                                            ${n.alternativas.map((m) => {

                                                                contadorAlt++;

                                                                return `
                                                                    
                                                                    <div class="form-group">
                                                                        <input data-questao="${contador}" data-correta="${m.correta_ou_incorreta}" id="questao${contador}Alt${contadorAlt}" type="radio" name="questao${contador}" value="${m.texto_da_alternativa}" />
                                                                        <label for="questao${contador}Alt${contadorAlt}">
                                                                            ${m.texto_da_alternativa}
                                                                        </label>
                                                                    </div>
                    
                                                                `;
                    
                                                            }).join('')}
                                                            
                                                        </div>
                                                        <p class="feedback-message feedback-questionario-${contador}"></p>
                                                    </section>
                                                    <!-- PERGUNTA ${contador} -->

                                            `;

                                        }).join('')}

                                        <p>&nbsp;</p>

                                        <div class="btns-navegacao-aula">
                                            <button 
                                                type="button" 
                                                onclick="app.avaliacao()" 
                                                style="width:100%;" 
                                                class="btn btn-primary btn-lg btn-block">
                                                    Corrigir questionário
                                            </button>    
                                        </div>

                            

                        </div>

                    </section>
                    
                </div>


                
        `);




    }



    certificados(){

        var email_usuario = localStorage.getItem("loginDB");
        var id_usuario    = localStorage.getItem("idUsuario");

        var params = "token="+app.token+
                        "&user_id="+id_usuario+"&user_email="+email_usuario;

        console.log(params);

                        // CONFIGURAÇÕES AJAX VANILLA
                        let xhr = new XMLHttpRequest();
                                        
                        xhr.open('POST', app.urlApi+`wp-json/bizuapi/v2/certificados/`,true);
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        
                        // INICIO AJAX VANILLA
                        xhr.onreadystatechange = () => {

                        if(xhr.readyState == 4) {

                            if(xhr.status == 200) {

                                console.log("OPERAÇÃO REALIZADA COM SUCESSO, RETORNO DOS DADOS:");

                                console.log(JSON.parse(xhr.responseText));

                                var dados = JSON.parse(xhr.responseText);

                                $(".carregando-cursos").hide();

                                console.log("QUANTIDADE DE CONTEÚDOS DO CURSO");
                                console.log(dados.certificados.length);

                                if(dados.certificados.length == 0){

                                    $("#conteudoPrincipalPagina").html(`
                                        <p style="text-align:center;">Você ainda não tem nenhum certificado disponível</p>
                                    `);

                                }else{

                                    $("#conteudoPrincipalPagina").html(`

                                            <h1>Certificados disponíveis</h1>
                                            <p>&nbsp;</p>

                                            ${dados.certificados.map((n) => {
                                                
                                                return `
                                                    <div class="conteudo-curso-aula">
                                                        <div class="row">
                                                            <div class="col-12" onclick="app.models.verConteudoAula(${contadorAula})">
                                                                <h3>${n.titulo}</h3>
                                                                <p>
                                                                    <a class="btn btn-primary" style="display:block;" onclick="openCategoria('${n.url}')" href="" title="${n.certificados_liberado}">
                                                                         ${n.certificados_liberado}
                                                                    </a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                `;
                                               
                                            }).join('')}
                                    
                                    
                                    `);

                                }

                                var contadorAula = -1;
                               
                                $("#conteudoPrincipalPagina").html(`
                                
                                        <div class=" mx-0">
                                            <div class="content titulo-e-resumo-curso">
                                                <h1><a href="#" onclick="location.reload();"><i class="fa fa-angle-left"></i></a> ${dados.curso[0].titulo}</h1>
                                                <p>${dados.curso[0].resumo_do_curso}</p>
                                                <img src="${dados.curso[0].imagem_capa}" style="width:100%;height:auto;" />
                                            </div>
                                        </div>

                                        <div class="conteudo-curso-aulas"> 

                                                ${dados.curso[0].conteudo_do_curso.map((n) => {

                                                    contadorAula++;

                                                    localStorage.setItem("maxNumAula",contadorAula);
                
                                                    return `
                                                        <div class="conteudo-curso-aula">
                                                            <div class="row">
                                                                <div class="col-2 play-aula">
                                                                    <a href="" onclick="app.models.verConteudoAula(${contadorAula})">
                                                                        <img src="images/3669296_circle_filled_play_ic_icon.svg" />
                                                                    </a>
                                                                </div>
                                                                <div class="col-10 conteudo-aula" onclick="app.models.verConteudoAula(${contadorAula})">
                                                                     <h3>${n.nome_da_aula}</h3>
                                                                     <p>${n.resumo_da_aula}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    `;

                                                    

                                                }).join('')}
                                        
                                        </div>
                                
                                `);

                            }else{
                            
                                console.log("SEM SUCESSO curso()");
                                document.getElementById('erroGeral').click();

                                console.log(JSON.parse(xhr.responseText));

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