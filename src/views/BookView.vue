<template>
  <div class="bg-dark text-white py-4">

    <div class="container mb-4">
      <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li class="breadcrumb-item"><router-link :to="{ name: 'booksList' }">Libri</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">{{ book.name }}</li>
        </ol>
      </nav>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-auto mb-4 mb-lg-0">
          <div class="sticky-top book-image">
            <img :src="book.cover" class="img-fluid book-image">
          </div>
        </div>
        <div class="col-12 col-lg px-lg-5 mb-4 mb-lg-0">
          <h1 class="mb-4">{{ book.name }}</h1>
          <div class="row align-items-center mb-4">
            <div class="col-auto">
              <p class="fw-bold mb-0">{{ book.author }}</p>
            </div>
            <div class="col-auto">
              <span :class="['badge', 'rounded-pill', 'bg-' + book.genre.toLowerCase().replace(/\s+/g, '-')]">{{ book.genre }}</span>
            </div>
            <div class="col-auto d-flex align-items-center">
              <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="mb-0">{{ book.readers }} lettori</p>
            </div>
          </div>
          <div class="mb-4">
            {{ book.summary }}
          </div>
          <table class="table table-dark mb-5">
            <tbody>
              <tr>
                <td>Editore</td>
                <td>{{ book.publisher }}</td>
              </tr>
              <tr>
                <td>Anno</td>
                <td>{{ book.year }}</td>
              </tr>
            </tbody>
          </table>

          <h2 class="mb-4">Recensioni</h2>
          <div v-if="book.reviews" class="reviews-grid mb-4">
            <BookReview v-for="(review, index) in book.reviews" :key="index" :review="review"></BookReview>
          </div>
          <div v-else>
            <p class="text-secondary mb-5">Non ci sono recensioni</p>
          </div>

          <h4 class="mb-4">Scrivi una recensione</h4>

          <div class="alert alert-info" role="alert" v-if="reviewCreated">
            Recensione aggiunta con successo!
          </div>

          <form action="" @submit.prevent="addReview">
            <div class="mb-3">
              <label for="review_author" class="form-label">Nome</label>
              <input v-model="review.author" type="text" class="form-control" id="review_author" placeholder="Nome">
              <p v-if="review.errors.name" class="text-danger">Campo obbligatorio</p>
            </div>
            <div class="mb-3">
              <label for="review_text" class="form-label">Recensione</label>
              <textarea v-model="review.text" id="review_text" class="form-control" rows="4" placeholder="Scrivi la tua recensione...."></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Valutazione</label>  
              <div class="review-rating">
                <svg 
                  v-for="n in 5" 
                  :key="n" 
                  :class="{'selected': n <= Math.max(review.rating, review.ratingHover)}"
                  @click="setReviewRating(n)"
                  @mouseover="setReviewRatingHover(n)"
                  @mouseleave="resetReviewRatingHover"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"/>
                </svg>
              </div>
              <p v-if="review.errors.rating" class="text-danger">Campo obbligatorio</p>
            </div>
            <button class="btn btn-primary">Aggiungi recensione</button>
          </form>
        </div>
        <div class="col-12 col-lg-3">

          <div class="sticky-top">
            <div class="bg-black p-4 book-rating-share">
              <h5 class="mb-3">Valutazione media</h5>
              <div class="d-flex align-items-center mb-4" v-if="book.rating">
                <div class="book-rating">
                  <svg 
                    v-for="n in 5" 
                    :key="n" 
                    :class="{'selected': n <= book.rating}"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"/>
                  </svg>
                </div>
                <p class="h4 mb-0 ms-2">{{ book.rating ? book.rating.toFixed(1) : '' }}</p>
              </div>
              <div v-else class="mb-4">
                <p class="mb-0">Nessuna valutazione</p>
              </div>
              <h5 class="mb-3">Condividi</h5>
              <div class="d-flex flex-wrap book-share">
                <a href="#"><i class="bi bi-facebook"></i></a>
                <a href="#"><i class="bi bi-twitter"></i></a>
                <a href="#"><i class="bi bi-linkedin"></i></a>
                <a href="#"><i class="bi bi-envelope"></i></a>
              </div>
            </div>

            <div class="mt-4">
              <a href="#" class="text-decoration-none btn-link"><i class="bi bi-exclamation-circle me-2"></i> Segnala</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookReview from '@/components/BookReview.vue';

import { mapGetters } from 'vuex';
export default {
  name: "BookView",
  components: {
    BookReview
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      review: {
        author: "",
        text: "",
        rating: 0,
        ratingHover: 0,
        errors: {
          name: false,
          rating: false
        }
      },
      reviewCreated: false
    }
  },
  computed: {
    ...mapGetters(["books"]),
    book() {
      return this.books.find(b => b.id == this.id)
    }
  },
  methods: {
    setReviewRating(value) {
      this.review.rating = value;
    },
    setReviewRatingHover(value) {
      this.review.ratingHover = value;
    },
    resetReviewRatingHover() {
      this.review.ratingHover = 0;
    },
    addReview() {
      this.resetReviewErrors();

      let errors = false;
      if(!this.review.author) {
        this.review.errors.name = true;
        errors = true;
      }
      if(!this.review.rating) {
        this.review.errors.rating = true;
        errors = true;
      }
      if(errors) return

      const review = {
        author: this.review.author,
        text: this.review.text,
        rating: this.review.rating
      }
      this.$store.dispatch("bookAddReview", { bookId: this.id, review: review});

      this.reviewCreated = true;

      this.review.author = "";
      this.review.text = "";
      this.review.rating = 0;
      this.review.ratingHover = 0;
      
      this.resetReviewErrors();
    },
    resetReviewErrors() {
      this.review.errors.name = false;
      this.review.errors.rating = false;
    }
  }
};
</script>

<style scoped>
.book-image {
  top: 2rem;
}

.book-image img {
  max-width: 15rem;
}

.book-rating-share {
  top: 2rem;
}

.book-rating {
  display: flex;
}

.book-rating svg {
  fill: #4f4f4f;
  width: 1.5rem;
  height: 1.5rem;
}

.book-rating .selected {
  fill: #ffcc00;
}

.book-share {
  display: flex;
  gap: 1rem;
}

.book-share a {
  color: #fff;
  text-decoration: underline;
}

.reviews-grid {
  display: grid;
  gap: 1rem;
}

.review-rating {
  display: flex;
}

.review-rating svg {
  fill: #4f4f4f;
  width: 1.5rem;
  height: 1.5rem;
}

.review-rating svg:hover {
  cursor: pointer;
  fill: #ffcc00;
}

.review-rating .selected {
  fill: #ffcc00;
}
</style>