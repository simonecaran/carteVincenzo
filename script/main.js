// Cattura le dimensioni del dispositivo
var larghezza = document.documentElement.clientWidth
var altezza =document.documentElement.clientHeight
// Modifico le dimensioni del dispitivo per mantenere un rapporto di 2.16
function calcolaDimensioni(altezza) {
    const rapportoDesiderato = 2.16;
    const larghezza = altezza / rapportoDesiderato;
    return { altezza, larghezza };
  }
  
let risultato = calcolaDimensioni(altezza,larghezza)
altezza = risultato.altezza
larghezza = risultato.larghezza
  

// Seleziona l'immagine
var container = document.getElementsByClassName("container")[0]
let immagine = document.createElement("img")
let immagine2= document.createElement("img")
let body = document.getElementsByTagName("body")[0]

immagine.style.width = larghezza + "px"
immagine.style.height = altezza + "px"
immagine2.style.width = larghezza + "px"
immagine2.style.height = altezza + "px"

// Cattura dell'id della carta da uri
const url = window.location.href;
const regex = /(?:[?&])nome=([^&#]+)/;
const match = url.match(regex);
const idCarta = match ? match[1] : null;
let idCartaTitolo = idCarta.charAt(0).toUpperCase() + idCarta.slice(1)
cambiaTitolo(idCartaTitolo);


// Cambio dinamico delle immagini
fetch('/script/jsonCarte.json')
  .then(response => response.json())
  .then(jsonData => {
    let carta = jsonData.carte.find(c=> c.id == idCarta)
    console.log(carta);
    if(carta){
        body.classList.add(carta.categoria);
        if(carta && carta.IMG.length === 2) {
            // Creazione degli elementi del swiper
            var swiperContainer = document.createElement('div');
            swiperContainer.classList.add('swiper', 'mySwiper');
            swiperContainer.style.width = larghezza + "px"
            swiperContainer.style.height = altezza + "px"
            var swiperWrapper = document.createElement('div');
            swiperWrapper.classList.add('swiper-wrapper');
    
            var swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            var swiperSlide2 = document.createElement('div');
            swiperSlide2.classList.add('swiper-slide');

            immagine.src = carta.IMG[0]
            immagine2.src = carta.IMG[1]
            swiperSlide.appendChild(immagine);
            swiperSlide2.appendChild(immagine2);
    
            swiperWrapper.appendChild(swiperSlide);
            swiperWrapper.appendChild(swiperSlide2);
            swiperContainer.appendChild(swiperWrapper);

    
            // Aggiunta del swiper al container desiderato
            container.appendChild(swiperContainer);
    
            // Inizializzazione del swiper
            var swiper = new Swiper(".mySwiper", {
              effect: "flip",
              loop: true
            });
            immagine.addEventListener("click",changeImage)
            immagine2.addEventListener("click",changeImage)
          } else {
            immagine.src = carta.IMG
            container.appendChild(immagine);
          }
    }
    else{
        console.log("Carta non trovata")
    }

  })
  .catch(error => {
    console.error('Si è verificato un errore:', error);
  });

  function cambiaTitolo(nuovoTitolo) {
    document.title = nuovoTitolo;
  }

  function changeImage() {
    var swiper = document.querySelector('.mySwiper').swiper;
    var currentSlideIndex = swiper.activeIndex; // Ottiene l'indice dell'immagine attualmente visualizzata

    // Calcola l'indice dell'immagine successiva
    var nextSlideIndex = currentSlideIndex + 1;

    // Se l'immagine attuale è l'ultima, passa alla prima immagine
    if (nextSlideIndex >= swiper.slides.length) {
      nextSlideIndex = 0;
    }

    // Cambia l'immagine visualizzata in base all'indice calcolato
    swiper.slideTo(nextSlideIndex); // Cambia l'immagine al click successivo
  }
  
