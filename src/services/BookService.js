import axios from "../repository/axios";

const BookService = {
    getBooks: () => {
        return axios.get("/books");
    },

    rentABook: (id) => {
        return axios.put(`/books/${id}/rent`);
    }
}

export default BookService;