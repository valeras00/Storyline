<template> 
  <main>
    <div class="bg-dark text-white">

      <div class="intro">
        <div class="intro-overlay"></div>
        <img src="/images/intro-background.png" alt="" class="intro-image" />
        <div class="container text-center mb-5 relative z-1">      
          <h1 class="intro-title mb-3">
            La tua libreria infinita, <br>
            dove ogni libro ha una voce
          </h1>
        </div>
      </div>

      <div class="section pt-0">
        <div class="container">
          <div class="text-center mb-4 mb-lg-5">
            <h2 class="mb-2">I titoli del momento</h2>
            <p class="text-secondary mb-0"><em>Le storie di cui tutti parlano</em></p>
          </div>
          <Carousel v-bind="carouselConfig">
            <Slide v-for="book in featuredBooks" :key="book.id">
              <router-link :to="{ name: 'book', params: { id: book.id } }" class="carousel-book">
                <div class="position-relative">
                  <div
                    :class="[
                      'badge',
                      'rounded-pill',
                      'bg-' + book.genre.toLowerCase().replace(/\s+/g, '-')
                    ]"
                    v-if="book.genre"
                  >
                    {{ book.genre }}
                  </div>
                  <div class="carousel-book-details">
                    <div class="carousel-book-readers">
                      <div class="d-flex align-items-center">
                        <svg class="me-1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p class="mb-0">{{ book.readers }}</p>
                      </div>
                    </div>
                    <div class="carousel-book-rating">
                      <svg
                        v-for="n in rating(book)"
                        :key="n"
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"/>
                      </svg>
                    </div>
                  </div>
                  <img :src="book.cover" class="img-fluid">
                </div>
                <p class="text-white h6 mt-2 mb-1">{{ book.name }}</p>
                <p class="carousel-book-author-year mb-0">Fantasy &bull; 2025</p>
              </router-link>
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
      </div>

      <div class="section bg-black">
        <div class="container">
          <div class="text-center mb-4 mb-lg-5">
            <h2 class="mb-2">Naviga per categoria</h2>
            <p class="text-secondary mb-0"><em>Ogni storia ha un colore: scegli il tuo</em></p>
          </div>
          <div class="categories-grid">
            <div v-for="genre in genres" :key="genre">
              <router-link 
                :to="{ name: 'booksList', query: { genre: genre } }"
                :class="['categories-grid-item', 'w-100', 'text-white', 'bg-hover-' + genre.toLowerCase().replace(/\s+/g, '-'), 'border-' + genre.toLowerCase().replace(/\s+/g, '-')]"
              >
                {{ genre }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="container">
          <div class="row align-items-center justify-content-between featurette">
            <div class="col-md-7 order-md-2 mb-4 mb-lg-0">
              <h2 class="mb-4">Il tuo mondo di libri, in un solo click</h2>
              <p class="mb-0">Storyline raccoglie migliaia di titoli, dai classici intramontabili alle ultime novità. Puoi valutarli, crearne una collezione personale e scoprire in tempo reale cosa sta leggendo la community. Perché ogni libro merita di essere raccontato.</p>
            </div>
            <div class="col-md-4 order-md-1">
              <img class="img-fluid" src="/images/home-storyline.png">
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </main>
</template>

<script>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

import { mapGetters } from 'vuex';
export default {
  name: "HomeView",
  components: {
      Carousel,
      Slide,
      Navigation
  },
  data() {
    return {
      carouselConfig: {
        itemsToShow: 2,
        itemsToScroll: 1,
        snapAlign: "start",
        gap: 16,
        wrapAround: true,
        breakpoints: {
          800: {
            itemsToShow: 3,
            gap: 24 
          },
          1200: {
            itemsToShow: 4,
            gap: 64 
          }
        }
      },
      genres: ['Fantasy', 'Narrativa', 'Storico', 'Horror', 'Giallo', 'Romanzo']
    }
  },
  computed: {
    ...mapGetters(["featuredBooks"])
  },
  methods: {
    rating(book) {
      return parseInt(book.rating, 10) || 0
    }
  }
};
</script>

<style>
.intro {
  position: relative;
  padding: 2.5rem 0;
  background-color: #000;
}

@media (min-width: 768px) {
  .intro {
    padding: 7.5rem 0;
  }
}

.intro img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.intro-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(0deg,#1f1f1f 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 1;
}

.intro > .container {
  position: relative;
  z-index: 2;
}

.intro-title {
  font-size: calc(1.5rem + 1.5vw) !important;
}

.intro-subtitle {
  font-size: calc(1rem + 0.25vw) !important;
  font-style: italic;
}

.carousel__slide {
  align-items: flex-start;
}

.carousel__icon {
  fill: #fff;
}

.carousel-book {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-decoration: none;
}

.carousel-book .badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
}

.carousel-book img {
  transition: all 0.3s ease-in-out;
}

.carousel-book-details {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1.5rem 0.5rem 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  opacity: 0;
  background: #000000;
  background: linear-gradient(0deg,rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0) 100%);
  transition: opacity 0.3s ease-in-out;
}

.carousel-book-readers {
  line-height: 1;
  color: #fff;
  font-size: 0.875rem;
}

.carousel-book-rating {
  display: flex;
}

.carousel-book-rating svg {
  fill: #ffcc00;
  width: 0.75rem;
  height: 0.75rem;
}

.carousel-book-author-year {
  color: #9c9c9c;
  font-size: 0.875rem;
}

.carousel-book:hover .badge {
  opacity: 1;
}

.carousel-book:hover img {
  opacity: 0.75;
}

.carousel-book:hover .carousel-book-details {
  opacity: 1;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem; 
}

@media (min-width: 576px) {
  .categories-grid {
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 992px) {
  .categories-grid {
    gap: 2rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

.categories-grid-item {
  width: 100%;
  max-width: 100%;
  padding: 0.75rem 2rem;
  text-align: center;
  font-size: 1.25rem;
  text-decoration: none;
  display: block;
  background: transparent;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  border: 2px solid transparent;
}
</style>