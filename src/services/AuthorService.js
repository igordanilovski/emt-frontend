import axios from "../repository/axios";

const AuthorService = {
    getAuthors: () => {
        return axios.get("/authors");
    },
}

export default AuthorService;