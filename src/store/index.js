import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        books: []
    },
    getters: {
        books: (state) => state.books,
        featuredBooks: (state) => state.books.filter(b => b.featured === true)
    },
    actions: {
        async booksLoadFromJson({ commit }) {
            const response = await axios.get("/books.json");
            commit("STATE_SET_BOOKS", response.data);
        },
        bookAddReview({ commit }, { bookId, review }) {
            commit("STATE_SET_BOOK_REVIEW", { bookId, review });
        },
        bookAdd({ commit }, book) {
            commit("STATE_SET_BOOK", book);
        }
    },
    mutations: {
        STATE_SET_BOOKS(state, books) {
            state.books = books;
        },
        STATE_SET_BOOK_REVIEW(state, { bookId, review }) {
            let book = state.books.find(b => b.id == bookId);
            if(!book) return

            if(!book.reviews) {
                book.reviews = [];
            }

            book.reviews.push(review);
        },
        STATE_SET_BOOK(state, book) {
            const lastBook = state.books[state.books.length - 1];
            const newId = lastBook ? lastBook.id + 1 : 1;

            state.books.push({
                ...book,
                id: newId
            });
        }
    }
})