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

let id = parseInt(window.location.href.split("/").pop());

class EditBook extends Component {
    authors = [];
    categories = [];


    constructor(props) {
        super(props);
        this.state = {
            authors: [], loading: true,
        }
        BookService.getBookById(id).then((data) => {
            document.getElementById("name").value = data.data.name;
            document.getElementById("availableCopies").value = data.data.availableCopies;
            dataFields.bookName = data.data.name;
            dataFields.bookAuthorId = data.data.author.id;
            dataFields.bookCategory = data.data.category;
            dataFields.bookAvailableCopies = data.data.availableCopies;
        });
    }

    handleSubmit(event) {
        bookService.editBook(
            id,
            dataFields.bookName,
            dataFields.bookCategory,
            dataFields.bookAuthorId,
            dataFields.bookAvailableCopies
        ).then(() => {
            alert("Successfully edited!");
        })
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
                            <option value="" selected disabled>Select...</option>
                            {this.authors.map((author) => (<option key={author.id}
                                                                   value={author.id}>{author.firstName + " " + author.lastName}</option>))}
                        </select>
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor={"category"}>Book Category</label>
                        <select name="category" id="category" className={"form-control"}
                                onChange={this.handleBookCategoryChange}>
                            <option value="" selected disabled>Select...</option>
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
            this.categories.forEach(category => {
                console.log(category);
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

export default EditBook;