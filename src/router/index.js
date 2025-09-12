import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BooksListView from "../views/BooksListView.vue";
import BookView from "../views/BookView.vue";
import BookCreateView from "../views/BookCreateView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/books",
    name: "booksList",
    component: BooksListView
  },
  {
    path: "/books/:id",
    name: "book",
    component: BookView,
    props: route => ({ id: Number(route.params.id )}) // Forziamo a Number
  },
  {
    path: "/books/create",
    name: "bookCreate",
    component: BookCreateView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
