import React, {Component} from 'react';
import BookService from "../services/BookService";

class Books extends Component {
    books = [];

    constructor() {
        super();
        this.state = {
            books: [],
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
                            <th>Book Name</th>
                            <th>Category</th>
                            <th>Author Name</th>
                            <th>Available Copies</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.books.map((book) => (
                            <tr>
                                <td key={book.id}>{book.name}</td>
                                <td key={book.category}>{book.category}</td>
                                <td key={book.author.id}>{book.author.firstName}</td>
                                <td key={book.availableCopies}>{book.availableCopies}</td>
                                <td>
                                    <button>Edit</button>
                                    <button onClick={() => this.deleteABook(book.id)}>Delete</button>
                                    <button onClick={() => this.rentABook(book.id)}>Rent</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {
        BookService.getBooks().then((data) => {
            this.books = data.data
            this.setState({
                loading: false,
                books: this.books
            })
        });
    }

    rentABook(id) {
        this.setState({
            loading: true,
        })
        BookService.rentABook(id).then(
            BookService.getBooks().then((data) => {
                this.books = data.data
                this.setState({
                    loading: false,
                })
            })
        )
        this.componentDidMount();
    }

    deleteABook(id) {
        this.setState({
            loading: true,
        })
        BookService.deleteABook(id).then(
            BookService.getBooks().then((data) => {
                this.books = data.data
                this.setState({
                    loading: false,
                })
            })
        )
        this.componentDidMount();
    }

}

export default Books;