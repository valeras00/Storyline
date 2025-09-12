<template>
	<div class="bg-dark text-white py-4">

		<div class="container mb-4">
			<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><router-link :to="{ name: 'home' }">Home</router-link></li>
					<li class="breadcrumb-item"><router-link :to="{ name: 'booksList' }">Libri</router-link></li>
					<li class="breadcrumb-item active" aria-current="page">Aggiungi un libro</li>
				</ol>
			</nav>
		</div>

		<div class="container">
			<h1 class="mb-4">Aggiungi un libro</h1>

			<div class="alert alert-info" role="alert" v-if="bookCreated">
				Libro aggiunto con successo!
			</div>

			<div class="row">
				<div class="col-12 col-md-auto mb-4 mb-lg-0 order-md-2">
					<div class="book-image">
						<img src="https://via.assets.so/book.jpg?w=860&h=1280" class="img-fluid">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</div>	
				</div>        
				<div class="col-12 col-md order-md-1">
					<form action="" @submit.prevent="addBook" class="pe-lg-5">
						<div class="row">
							<div class="col-12 col-lg-7">
								<div class="mb-3">
									<label for="book_name" class="form-label">Nome <span class="text-danger">*</span></label>
									<input v-model="book.name" type="text" class="form-control" id="book_name" placeholder="Nome">
									<p v-if="book.errors.name" class="text-danger pt-1">Campo obbligatorio</p>
								</div>
							</div>
							<div class="col-12 col-md-6 col-lg-5">
								<div class="mb-3">
									<label for="book_publisher" class="form-label">Editore <span class="text-danger">*</span></label>
									<input v-model="book.publisher" type="text" class="form-control" id="book_publisher" placeholder="Editore">
									<p v-if="book.errors.publisher" class="text-danger">Campo obbligatorio</p>
								</div>
							</div>
							<div class="col-12 col-md-6 col-lg-5">
								<div class="mb-3">
									<label for="book_author" class="form-label">Autore <span class="text-danger">*</span></label>
									<input v-model="book.author" type="text" class="form-control" id="book_author" placeholder="Autore">
									<p v-if="book.errors.author" class="text-danger pt-1">Campo obbligatorio</p>
								</div>
							</div>
							<div class="col-12 col-md-6 col-lg-4">
								<div class="mb-3">
									<label for="book_genre" class="form-label">Genere <span class="text-danger">*</span></label>
									<select v-model="book.genre" class="form-control" id="book_genre">
										<option value="">Seleziona un genere</option>
										<option value="Narrativa">Narrativa</option>
										<option value="Avventura">Avventura</option>
										<option value="Fantasy">Fantasy</option>
										<option value="Mistery">Mistery</option>
										<option value="Romanzo">Romanzo</option>
										<option value="Gotico">Gotico</option>
										<option value="Scientifico">Scientifico</option>
									</select>
									<p v-if="book.errors.genre" class="text-danger">Campo obbligatorio</p>
								</div>
							</div>
							<div class="col-12 col-md-6 col-lg-3">
								<div class="mb-3">
									<label for="book_year" class="form-label">Anno <span class="text-danger">*</span></label>
									<input v-model="book.year" type="text" class="form-control" id="book_year" placeholder="Anno">
									<p v-if="book.errors.year.required" class="text-danger">Campo obbligatorio</p>
									<p v-if="book.errors.year.number" class="text-danger">Deve essere un numero</p>
								</div>
							</div>
						</div>
						<div class="mb-4">
							<label for="book_summary" class="form-label">Sommario <span class="text-danger">*</span></label>
							<textarea v-model="book.summary" class="form-control" id="book_summary" placeholder="Sommario" rows="4"></textarea>
							<p v-if="book.errors.summary" class="text-danger">Campo obbligatorio</p>
						</div>
						<button class="btn btn-primary btn-lg">Aggiungi libro</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "BookCreateView",
	data() {
		return {
			book: {
				name: null,
				author: null,
				genre: '',
				year: null,
				summary: null,
				publisher: null,
				errors: {
					name: false,
					author: false,
					genre: false,
					year: {
						required: false,
						number: false
					},
					summary: false,
					publisher: false
				}
			},
			bookCreated: false
		}
	},
	methods: {
		addBook() {
			this.resetBookErrors();

			let errors = false;
			if(!this.book.name) {
				this.book.errors.name = true;
				errors = true;
			}
			if(!this.book.author) {
				this.book.errors.author = true;
				errors = true;
			}
			if(!this.book.genre) {
				this.book.errors.genre = true;
				errors = true;
			}
			if(!this.book.year) {
				this.book.errors.year.required = true;
				errors = true;
			}
			if(isNaN(this.book.year)) {
				this.book.errors.year.number = true;
				errors = true;
			}
			if(!this.book.summary) {
				this.book.errors.summary = true;
				errors = true;
			}
			if(!this.book.publisher) {
				this.book.errors.publisher = true;
				errors = true;
			}
			if(errors) return

			const book = {
				name: this.book.name,
				author: this.book.author,
				genre: this.book.genre,
				year: this.book.year,
				summary: this.book.summary,
				publisher: this.book.publisher,
				cover: "https://via.assets.so/book.jpg?w=860&h=1280"
			}
			this.$store.dispatch("bookAdd", book);

			this.bookCreated = true;

			this.book.name = "";
			this.book.author = "";
			this.book.genre = "";
			this.book.year = "";
			this.book.summary = "";
			this.book.publisher = "";

			this.resetBookErrors();
		},
		resetBookErrors() {
			this.book.errors.name = false;
			this.book.errors.author = false;
			this.book.errors.genre = false;
			this.book.errors.year.required = false;
			this.book.errors.year.number = false;
			this.book.errors.summary = false;
			this.book.errors.publisher = false;
		}
	}
};
</script>

<style scoped>
.book-image {
	max-width: 16rem;
	position: relative;
}

.book-image img {
	max-width: 16rem;
	opacity: 0.5;
	transition: opacity 0.2s ease-in-out;
}

.book-image svg {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 3rem;
	height: 3rem;
	stroke: #fff;
}

.book-image:hover {
	cursor: pointer;
}

.book-image:hover img {
	opacity: 0.2;
}
</style>