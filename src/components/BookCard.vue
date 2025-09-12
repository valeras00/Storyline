<template>
    <router-link :to="{ name: 'book', params: { id: book.id } }" class="book-card">
      <div class="position-relative book-card-image">
        <div :class="['badge', 'rounded-pill', 'bg-' + book.genre.toLowerCase().replace(/\s+/g, '-')]" v-if="book.genre">{{ book.genre }}</div>
        <div class="book-card-details">
          <div class="book-card-readers">
            <div class="d-flex align-items-center">
              <svg class="me-1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="mb-0">{{ book.readers }}</p>
            </div>
          </div>
          <div class="book-card-rating">
            <svg 
              v-for="n in rating" 
              :key="n"
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"/>
            </svg>
          </div>
        </div>
        <img :src="book.cover" alt="{{ book.name }}" class="img-fluid">
      </div>
      <p class="text-white h6 mt-2 mb-1">{{ book.name }}</p>
      <p class="book-card-author-year mb-0">{{ book.author }} &bull; {{ book.year }}</p>
    </router-link>
</template>

<script>
  export default {
    name: "BookCard",
    props: {
      book: {
        type: Object,
        required: true
      }
    },
    computed: {
      rating() {
        // Forziamo il rating a intero per evitare problemi con valori non numerici
        // Se non è un numero ritorniamo 0
        return parseInt(this.book.rating, 10) || 0
      }
    }
  }
</script>

<style scoped>
.book-card {
  text-decoration: none;
}

.book-card-image {
  overflow: hidden;
}

.book-card-image img {
  transition: all 0.3s ease-in-out;
}

.book-card-image .badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
}

.book-card-details {
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

.book-card-readers {
  line-height: 1;
  color: #fff;
  font-size: 0.875rem;
}

.book-card-rating {
  display: flex;
}

.book-card-rating svg {
  fill: #ffcc00;
  width: 0.75rem;
  height: 0.75rem;
}

.book-card-author-year {
  color: #9c9c9c;
  font-size: 0.875rem;
}

.book-card:hover .book-card-image img {
  opacity: 0.75;
  scale: 1.05;
}

.book-card:hover .badge {
  opacity: 1;
}

.book-card:hover .book-card-details {
  opacity: 1;
}
</style>