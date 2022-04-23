import axios from "../repository/axios";

const CategoryService = {
    getCategories: () => {
        return axios.get("/categories");
    }
}

export default CategoryService;