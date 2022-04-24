import React, {Component} from 'react';
import BookService from "../services/BookService";
import CategoryService from "../services/CategoryService";
import AuthorService from "../services/AuthorService";
import bookService from "../services/BookService";

const dataFields = {
    bookName: '',
    bookAuthorId: '',
    bookCategory: '',
    bookAvailableCopies: 0,
}

class CreateBook extends Component {
    authors = [];
    categories = [];

    constructor(props) {
        super(props);
        this.state = {
            authors: [], loading: true,
        }
    }

    handleSubmit(event) {
        bookService.createBook(
            dataFields.bookName,
            dataFields.bookCategory,
            dataFields.bookAuthorId,
            dataFields.bookAvailableCopies
        )
        event.preventDefault();
    }

    render() {
        const {loading} = this.state;
        if (loading) {
            return <p>Loading</p>;
        }
        return (<div className={"container"}>
            <div className={"row"}>
                <form onSubmit={this.handleSubmit} className={"w-50 m-auto"}>
                    <div className={"form-group"}>
                        <label htmlFor={"name"}>Book Name</label>
                        <input type="text"
                               id={"name"}
                               className={"form-control"}
                               required
                               onChange={this.handleBookNameChange}
                        />
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor={"author"}>Select Author</label>
                        <select name="author" id="author" className={"form-control"}
                                onChange={this.handleBookAuthorChange}>
                            <option value=""></option>
                            {this.authors.map((author) => (<option key={author.id}
                                                                   value={author.id}>{author.firstName + " " + author.lastName}</option>))}
                        </select>
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor={"category"}>Book Category</label>
                        <select name="category" id="category" className={"form-control"}
                                onChange={this.handleBookCategoryChange}>
                            <option value=""></option>
                            {this.categories.map((category) => (
                                <option key={category} value={category}>{category}</option>))}
                        </select>
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor="availableCopies">Book Available Copies</label>
                        <input type="number"
                               className={"form-control"}
                               id={"availableCopies"}
                               value={this.bookAvailableCopies}
                               onChange={this.handleBookCopiesChange}
                               required
                        />
                    </div>
                    <button type={"submit"}>Submit</button>
                </form>
            </div>
        </div>);
    }

    componentDidMount() {
        CategoryService.getCategories().then((data) => {
            this.categories = data.data
            this.setState({
                loading: false, categories: this.categories
            })
        });

        AuthorService.getAuthors().then((data) => {
            this.authors = data.data
            this.setState({
                loading: false, authors: this.authors
            })
        });
    }

    handleBookNameChange(event) {
        dataFields.bookName = event.target.value
    }

    handleBookCopiesChange(event) {
        dataFields.bookAvailableCopies = parseInt(event.target.value)
    }

    handleBookAuthorChange(event) {
        dataFields.bookAuthorId = parseInt(event.target.value)
    }

    handleBookCategoryChange(event) {
        dataFields.bookCategory = event.target.value
    }
}

export default CreateBook;