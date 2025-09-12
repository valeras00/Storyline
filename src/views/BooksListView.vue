<template>
  <div class="bg-dark text-white py-4">

    <div class="container mb-4">
			<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><router-link :to="{ name: 'home' }">Home</router-link></li>
					<li class="breadcrumb-item active">Libri</li>
				</ol>
			</nav>
		</div>

    <div class="container mb-4">
      <h1>I libri</h1>
    </div>

    <div class="container mb-4">
      <div class="row align-items-center filters">
        <div class="col-lg-auto filters-item">
          <p class="mb-0">Genere</p>
          <select class="form-control form-control-sm filters-item-genre" v-model="filters.genre">
            <option value="">Tutti i generi</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Narrativa">Narrativa</option>
            <option value="Storico">Storico</option>
            <option value="Horror">Horror</option>
            <option value="Giallo">Giallo</option>
            <option value="Romanzo classico">Romanzo</option>
          </select>
        </div>
        <div class="col-lg-auto filters-item">
          <p class="mb-0">Anno</p>
          <input type="number" class="form-control form-control-sm filters-item-year" v-model="filters.yearFrom" placeholder="Da" />
          <input type="number" class="form-control form-control-sm filters-item-year" v-model="filters.yearTo" placeholder="A" />
        </div>
        <div class="col-lg-auto filters-item">
          <p class="mb-0">Parola chiave</p>
          <input type="text" class="form-control form-control-sm filters-item-keyword" v-model="filters.keyword" placeholder="Parola chiave" />
        </div>
        <div class="col-lg-auto">
          <button class="btn btn-sm btn-outline-light" @click="clearFilters" v-if="hasActiveFilters">Pulisci filtri</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="books-grid" v-if="filteredBooks.length > 0">
        <BookCard v-for="book in filteredBooks" :key="book.id" :book="book" />
      </div>
      <div v-else class="pt-4">
        <p class="mb-0">Nessun libro trovato con i filtri selezionati.</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';

import { mapGetters } from 'vuex';
export default {
  name: "BooksListView",
  components: {
    BookCard
  },
  data() {
    return {
      filters: {
        genre: this.$route.query.genre || "",
        yearFrom: this.$route.query.yearFrom ? Number(this.$route.query.yearFrom) : null,
        yearTo: this.$route.query.yearTo ? Number(this.$route.query.yearTo) : null,
        keyword: this.$route.query.keyword || ""
      }
    }
  },
  computed: {
    ...mapGetters(["books"]),
    filteredBooks() {
      const { genre, yearFrom, yearTo, keyword } = this.filters;
      return this.books.filter(book => {
        return (
          (genre ? book.genre === genre : true) &&
          (yearFrom ? book.year >= yearFrom : true) &&
          (yearTo ? book.year <= yearTo : true) &&
          (keyword ? book.name.toLowerCase().includes(keyword.toLowerCase()) : true)
        );
      });
    },
    hasActiveFilters() {
      const { genre, yearFrom, yearTo, keyword } = this.filters;
      return genre || yearFrom || yearTo || keyword;
    }
  },
  methods: {
    clearFilters() {
      this.filters = {
        genre: "",
        yearFrom: null,
        yearTo: null,
        keyword: ""
      };
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery) {
        this.filters = {
          genre: newQuery.genre || "",
          yearFrom: newQuery.yearFrom ? Number(newQuery.yearFrom) : null,
          yearTo: newQuery.yearTo ? Number(newQuery.yearTo) : null,
          keyword: newQuery.keyword || ""
        }
      },
      immediate: true
    },
    filters: {
      handler(newFilters) {
        this.$router.replace({
          name: "booksList",
          query: Object.fromEntries(
            Object.entries(newFilters).filter(([_, v]) => v)
          )
        })
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.filters-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.filters-item:last-child {
  margin-bottom: 0;
}

@media (min-width: 992px) {
  .filters-item {
    margin-bottom: 0;
  }
}

.filters-item p {
  margin-right: auto;
}

@media (min-width: 992px) {
  .filters-item p {
    margin-right: 0;
  }
}

@media (min-width: 992px) {
  .filters-item-year {
    width: 5rem;
  }
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}

@media (min-width: 576px) {
  .books-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 992px) {
  .books-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .books-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
</style>