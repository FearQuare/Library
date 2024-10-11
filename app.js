// element declarations
const addBookCard = document.querySelector(".add-book-card");
const addButton = document.querySelector("#add-book");
const modal = document.querySelector("#book-modal");
const closeModal = document.querySelector(".close");
const bookForm = document.querySelector("#book-form");

// variable declarations
const Status = {
    NOT_STARTED: 0,
    READING: 1,
    DROPPED: 2,
    READ: 3
};

// data storage declarations
const myLibrary = [];

// initial function to display the books that are already there
function listBooks(myLibrary) {
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", `book-card`);
        addBookCard.after(bookCard);
    }
}

// object declarations
function Book(name, author, genre, pageCount, status = Status.NOT_STARTED, currentPage = 0) {
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.status = status;
    currentPage = currentPage;

    // Public getters
    this.getName = function () {
        return this.name;
    };

    this.getAuthor = function () {
        return this.author;
    };

    this.getGenre = function () {
        return this.genre;
    };

    this.getPageCount = function () {
        return this.pageCount;
    };

    this.getStatus = function () {
        return this.status;
    };

    this.getCurrentPage = function () {
        return this.currentPage;
    };
}

listBooks(myLibrary);

// function declarations
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    const bookInfo = document.createElement("div");
    bookInfo.setAttribute("class", "book-info");

    const bookName = document.createElement("h2");
    bookName.textContent = book.getName();
    bookInfo.appendChild(bookName);

    const author = document.createElement("h3");
    author.textContent = book.getAuthor();
    bookInfo.appendChild(author);

    const genre = document.createElement("p");
    genre.textContent = book.getGenre();
    bookInfo.appendChild(genre);

    const pageCount = document.createElement("p");
    pageCount.textContent = book.getPageCount() + " pages";
    bookInfo.appendChild(pageCount);

    bookCard.appendChild(bookInfo);

    if (book.getStatus != 0) {
        const status = document.createElement("button");
        status.setAttribute("id", "status-button");
        status.textContent = "Not Started";
        bookCard.appendChild(status);
    }

    return bookCard;
}

function displayAddedBook(myLibrary) {
    const bookCard = createBookCard(myLibrary[myLibrary.length - 1]);
    bookCard.setAttribute("id", `book-${myLibrary.length}`);
    if (myLibrary.length === 1) {
        addBookCard.after(bookCard);
    } else {
        const lastBookCard = document.querySelector(`#book-${myLibrary.length - 1}`);
        lastBookCard.after(bookCard);
    }
}

addButton.addEventListener("click", () => {
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const author = document.querySelector("#author").value;
    const genre = document.querySelector("#genre").value;
    const pageCount = parseInt(document.querySelector("#pageCount").value);
    const status = parseInt(document.querySelector("#status").value);
    const currentPage = parseInt(document.querySelector("#currentPage").value);

    const newBook = new Book(name, author, genre, pageCount, status, currentPage);
    addBookToLibrary(newBook);

    bookForm.reset();

    modal.style.display = "none";

    displayAddedBook(myLibrary);
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});