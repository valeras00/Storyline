<script setup></script>

<template>
  <div class="d-flex flex-column h-100 bg-dark">
    <Header />

    <router-view />

    <div class="mt-auto">
      <Footer />
    </div>
  </div>
  
</template>

<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>

<style>
html, body {
  height: 100%;
}

#app {
  height: 100%;
}

.breadcrumb-item a {
  text-decoration: none;
}

.carousel__next,
.carousel__prev {
  width: 2.5rem !important;
  height: 2.5rem !important;
  background-color: rgba(0, 0, 0, 1) !important;
  border-radius: 100% !important;
  transition: all 0.3s ease-in-out !important;
}

.carousel__prev {
  inset-inline-start: 0.5rem !important;
}

.carousel__next {
  inset-inline-end: 0.5rem !important;
}

@media (min-width: 1300px) {
  .carousel__prev {
    inset-inline-start: -4.5rem !important;
  }

  .carousel__next {
    inset-inline-end: -4.5rem !important;
  }
}

.carousel__next:hover,
.carousel__prev:hover {
  background-color: rgba(0, 0, 0, 1) !important;
}

.carousel__icon {
  width: 1.75rem !important;
  height: 1.75rem !important;
}

.section {
  padding: 2.5rem 0;
}

@media (min-width: 768px) {
  .section {
    padding: 4rem 0;
  }
}

:root {
  --color-fantasy: #8e7cc3;
  --color-storico: #c2b280;
  --color-giallo: #d4b943;
  --color-romanzo: #7d9a6d;
  --color-horror: #a94442;
  --color-narrativa: #5fa8d3;
}

.bg-fantasy { background-color: var(--color-fantasy) !important; }
.bg-storico { background-color: var(--color-storico) !important; }
.bg-giallo { background-color: var(--color-giallo) !important; }
.bg-romanzo { background-color: var(--color-romanzo) !important; }
.bg-horror { background-color: var(--color-horror) !important; }
.bg-narrativa { background-color: var(--color-narrativa) !important; }

.bg-hover-fantasy:hover { background-color: var(--color-fantasy) !important; }
.bg-hover-storico:hover { background-color: var(--color-storico) !important; }
.bg-hover-giallo:hover { background-color: var(--color-giallo) !important; }
.bg-hover-romanzo:hover { background-color: var(--color-romanzo) !important; }
.bg-hover-horror:hover { background-color: var(--color-horror) !important; }
.bg-hover-narrativa:hover { background-color: var(--color-narrativa) !important; }

.border-fantasy { border-color: var(--color-fantasy) !important; }
.border-storico { border-color: var(--color-storico) !important; }
.border-giallo { border-color: var(--color-giallo) !important; }
.border-romanzo { border-color: var(--color-romanzo) !important; }
.border-horror { border-color: var(--color-horror) !important; }
.border-narrativa { border-color: var(--color-narrativa) !important; }
</style>
