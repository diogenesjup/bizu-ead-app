
function secToStr (num) {
  num = Math.floor(num);
  let tempo = "";
  let horas   = Math.floor(num / 3600);
  let minutos = Math.floor((num - (horas * 3600)) / 60);
  let segundos = num - (horas * 3600) - (minutos * 60);
  let horasText = "horas";
  let minutosText = "minutos";
  let segundosText = "segundos";

  if(horas === 1) horasText = "hora";
  if(minutos === 1) minutosText = "minuto";
  if(segundos === 1) segundosText = "minuto";

  if(horas === 0) {
    tempo = `${minutos} ${minutosText} e ${segundos} ${segundosText}`;
  }
  else if(minutos === 0) {
    tempo = `${segundos} ${segundosText}`;
  } else {
    tempo = `${horas} ${horasText} ${minutos} ${minutosText} e ${segundos} ${segundosText}`;
  }

  if(horas === 0 && minutos === 0 && segundos === 0) {
    tempo = "Áudio indisponível.";
  }
        
  return tempo;
}

/* STORIES */
var timestamp = function() {
           var timeIndex = 0;
           var shifts = [35, 60, 60 * 3, 60 * 60 * 2, 60 * 60 * 25, 60 * 60 * 24 * 4, 60 * 60 * 24 * 10];

           var now = new Date();
           var shift = shifts[timeIndex++] || 0;
           var date = new Date(now - shift * 1000);

           return date.getTime() / 1000;
};


var stories;

function initStories(){
  
  console.log("INIT STORIES...");

  //var dadosWordPress = JSON.parse(localStorage.getItem("dadosWordPress"));
  //var postagens = dadosWordPress.postagens;

      var currentSkin = 'Snapssenger';
      stories = new Zuck('storiesZ', {
        backNative: true,
        previousTap: true,
        skin: 'snapgram',
        autoFullScreen: true,
        avatars: false,
        paginationArrows: false,
        list: false,
        cubeEffect: true,
        time:false,
        localStorage: true,
        language: { // if you need to translate :)
          unmute: 'Toque para ligar o som',
          keyboardTip: 'Espaço para ver o próximo',
          visitLink: 'Visitar link',
          time: {
            ago:'atrás', 
            hour:'hora', 
            hours:'horas', 
            minute:'minuto', 
            minutes:'minutos', 
            fromnow: 'agora', 
            seconds:'segundo', 
            yesterday: 'ontem', 
            tomorrow: 'amanhã', 
            days:'dias'
          }
        },
        template: {
            // use these functions to render custom templates
            // see src/zuck.js for more details
            viewerItemBody (index, currentIndex, item) {

                //console.log("ITEM");
                //console.log(item);


                return  `

                    <div class="caixa-nova-imagem-storie" style="background:url('${item.src}') transparent no-repeat;background-size:cover;background-position:center center;">

                        <a href="javascript:void(0)" onclick="openUrl('${item.urlpostagem}')" title="ver postagem">
                          Ver postagem
                        </a>

                    </div>

                `;

            }
          },
        storiesDisabled: [
          Zuck.buildTimelineItem(
            "ramon", 
            "assets/images/imagem-gen-2.jpg",
            "Ramon",
            "https://www.diogenesjunior.com.br",
            timestamp(),
            [
              ["ramon-3", "photo", 3, "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png", "assets/images/imagem-gen-2.jpg", 'https://www.diogenesjunior.com.br', 'Acessar', false, timestamp()]
            ]
          ),
          Zuck.buildTimelineItem(
            "gorillaz",
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/2.jpg",
            "Gorillaz",
            "",
            timestamp(),
            [
              ["gorillaz-1", "video", 0, "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/4.mp4", "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/4.jpg", '', false, false, timestamp()],
              ["gorillaz-2", "photo", 3, "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/5.jpg", "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/5.jpg", '', false, false, timestamp()],
            ]
          ),
          Zuck.buildTimelineItem(
            "ladygaga",
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/3.jpg",
            "Lady Gaga",
            "",
            timestamp(),
            [
              ["ladygaga-1", "photo", 5, "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg", "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg", '', false, false, timestamp()],
              ["ladygaga-2", "photo", 3, "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/7.jpg", "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/7.jpg", 'http://ladygaga.com', false, false, timestamp()],
            ]
          ),
          Zuck.buildTimelineItem(
            "starboy",
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/4.jpg",
            "The Weeknd",
            "",
            timestamp(),
            [
              ["starboy-1", "photo", 5, "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg", "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg", '', false, false, timestamp()]
            ]
          ),
          Zuck.buildTimelineItem(
            "riversquomo",
            "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/users/5.jpg",
            "Rivers Cuomo",
            "",
            timestamp(),
            [
              ["riverscuomo", "photo", 10, "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg", "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg", '', false, false, timestamp()]
            ]
          )
        ]
      });


  //console.log("ESSAS SÃO AS POSTAGENS:");
  //console.log(postagens);

  // ADICIONAR AS POSTAGENS AO OBJETO
  //for(var i = 0;i<postagens.length;i++){
  //}  

      var newStorie;

      // STORIE
      newStorie = {
        id: 1,               // story id
        photo: "assets/images/imagem-gen-2.jpg",            // story photo (or user photo)
        name: "Exemplo Título da postagem ou perfil",             // story name (or user name)
        link: "https://www.dominio.com.br",    // story link (useless on story generated by script)
        lastUpdated: "",      // last updated date in unix time format
        seen: false,          // set true if user has opened
        items: [              // array of items
          // story item example
          {
            id: 1,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
          {
            id: 2,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
        ],
      }

      stories.update(newStorie);


      // STORIE
      newStorie = {
        id: 3,               // story id
        photo: "assets/images/imagem-gen-2.jpg",            // story photo (or user photo)
        name: "Título da postagem ou perfil",             // story name (or user name)
        link: "https://www.dominio.com.br",    // story link (useless on story generated by script)
        lastUpdated: "",      // last updated date in unix time format
        seen: false,          // set true if user has opened
        items: [              // array of items
          // story item example
          {
            id: 4,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-1.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
          {
            id: 5,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
        ],
      }

      stories.update(newStorie);



      // STORIE
      newStorie = {
        id: 6,               // story id
        photo: "assets/images/imagem-gen-2.jpg",            // story photo (or user photo)
        name: "Título da postagem ou perfil",             // story name (or user name)
        link: "https://www.dominio.com.br",    // story link (useless on story generated by script)
        lastUpdated: "",      // last updated date in unix time format
        seen: false,          // set true if user has opened
        items: [              // array of items
          // story item example
          {
            id: 7,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
          {
            id: 8,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
        ],
      }

      stories.update(newStorie);



      // STORIE
      newStorie = {
        id: 10,               // story id
        photo: "assets/images/imagem-gen-2.jpg",            // story photo (or user photo)
        name: "Título da postagem ou perfil",             // story name (or user name)
        link: "https://www.dominio.com.br",    // story link (useless on story generated by script)
        lastUpdated: "",      // last updated date in unix time format
        seen: false,          // set true if user has opened
        items: [              // array of items
          // story item example
          {
            id: 11,       // item id
            type: "video",     // photo or video
            length: 10,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
          {
            id: 12,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
        ],
      }

      stories.update(newStorie);



      // STORIE
      newStorie = {
        id: 20,               // story id
        photo: "assets/images/imagem-gen-2.jpg",            // story photo (or user photo)
        name: "Título da postagem ou perfil",             // story name (or user name)
        link: "https://www.dominio.com.br",    // story link (useless on story generated by script)
        lastUpdated: "",      // last updated date in unix time format
        seen: false,          // set true if user has opened
        items: [              // array of items
          // story item example
          {
            id: 21,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
          {
            id: 22,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
        ],
      }

      stories.update(newStorie);



      // STORIE
      newStorie = {
        id: 30,               // story id
        photo: "assets/images/imagem-gen-2.jpg",            // story photo (or user photo)
        name: "Título da postagem ou perfil",             // story name (or user name)
        link: "https://www.dominio.com.br",    // story link (useless on story generated by script)
        lastUpdated: "",      // last updated date in unix time format
        seen: false,          // set true if user has opened
        items: [              // array of items
          // story item example
          {
            id: 31,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-1.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
          {
            id: 32,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
        ],
      }

      stories.update(newStorie);




      // STORIE
      newStorie = {
        id: 40,               // story id
        photo: "assets/images/imagem-gen-2.jpg",            // story photo (or user photo)
        name: "Ex Título da postagem ou perfil",             // story name (or user name)
        link: "https://www.dominio.com.br",    // story link (useless on story generated by script)
        lastUpdated: "",      // last updated date in unix time format
        seen: false,          // set true if user has opened
        items: [              // array of items
          // story item example
          {
            id: 41,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
          {
            id: 42,       // item id
            type: "photo",     // photo or video
            length: 5,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
            src: "assets/images/imagem-gen-2.jpg",      // photo or video src
            preview: "assets/images/imagem-gen-2.jpg",  // optional - item thumbnail to show in the story carousel instead of the story defined image
            link: "https://www.dominio.com.br",     // a link to click on story
            linkText: "Acessar a postagem ou perfil", // link text
            time: "",     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
            seen: false,   // set true if current user was read,
            urlPostagem: "https://www.dominio.com.br", //  custom-value
          },
        ],
      }

      stories.update(newStorie);

  

}