// Book Class: Represent a Book
class Book{
    constructor(title, author, year){
       this.title = title;
       this.author = author;
       this.year = year; 
    }
}

// UI Class:Handle UI Tasks
class UI{
    static displayBooks(){
        const StoreBooks =[
            {
                title: 'Book One',
                author: 'Faruk Ahmad',
                year: '2021'
            },
            {
                title: 'Book Two',
                author: 'Faruk Ahmad',
                year: '2022'
            }
        ];
        const books = StoreBooks;
        books.forEach((book) =>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML =`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Vanish in just second
        setTimeout(() => document.querySelector('.alert').remove(), 2000)
    }

    static clearFields(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#year').value ='';

    }

}

// Store Class: Handles Storage

// Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a Book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value ;
    const author = document.querySelector('#author').value ;
    const year = document.querySelector('#year').value ;

    // Validate

    if(title === ''|| author === ''|| year ===''){
        UI.showAlert('Please fill in all fields', 'success');
    }else{

        // Instatiate book
        const book = new Book(title, author, year);
        // Add Book to UI
        UI.addBookToList(book);

        // UI Success Message
        UI.showAlert('Book Added', 'success');

        // Clear Fields
        UI.clearFields();

        // console.log(book);
    }

});

// Event Remove a Book
document.querySelector('#book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);

    // Removed Success Message
    UI.showAlert('Book Removed', 'danger');
});