<template>
  <nav class="navbar navbar-expand-lg bg-black" data-bs-theme="dark">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand me-lg-5">
        <img class="logo" src="/images/logo.png" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto d-flex gap-3 mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'booksList' }" class="nav-link" active-class="active">Libri</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'bookCreate' }" class="nav-link" active-class="active">Crea</router-link>
          </li>
        </ul>
        <form class="d-flex search" role="search" @submit.prevent="searchBooks">
          <input class="form-control bg-black text-white me-2" type="search" placeholder="Cerca" aria-label="Cerca" v-model="search" />
          <button class="btn btn-outline-light" type="submit">Cerca</button>
        </form>
      </div>
    </div>
  </nav>

</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        search: ""
      }
    },
    methods: {
      searchBooks() {
        const targetRoute = {
          name: "booksList",
          query: this.search.trim() ? { keyword: this.search } : {}
        }
        if (this.$route.name === "booksList") {
          this.$router.replace(targetRoute);
        } else {
          this.$router.push(targetRoute);
        }
        this.search = "";
      }
    }
  }
</script>

<style scoped>
.logo {
  height: 2rem;
}

.search input {
  background-color: #1f1f1f !important;
  border: 1px solid #1f1f1f !important;
}
</style>