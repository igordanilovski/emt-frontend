import axios from "../repository/axios";

const BookService = {
    getBooks: () => {
        return axios.get("/books");
    },

    rentABook: (id) => {
        return axios.put(`/books/${id}/rent`);
    },

    deleteABook: (id) => {
        return axios.delete(`/books/${id}`);
    },

    createBook: (name, category, authorId, availableCopies) => {
        return axios.post("/books/", {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    },

}

export default BookService;