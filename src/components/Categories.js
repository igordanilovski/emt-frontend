import React, {Component} from 'react';
import CategoryService from "../services/CategoryService";

class Categories extends Component {
    categories = [];

    constructor() {
        super();
        this.state = {
            categories: [],
            loading: true,
        }
    }

    render() {
        const {loading} = this.state;
        if (loading) {
            return <p>Loading</p>;
        }
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th>Category Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.categories.map((category) => (
                            <tr>
                                <td key={category}>{category}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {
        CategoryService.getCategories().then((data) => {
            this.categories = data.data
            console.log(this.categories);
            this.setState({
                loading: false,
                categories: this.categories
            })
        });
    }
}

export default Categories;
