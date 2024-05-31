import express from 'express';
import axios from 'axios';
import { getBooks, addBook, getBookById, updateBook, deleteBook } from './db.js';

const router = express.Router();

function formatDate(date) {
    if (!date) return '';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}

function parseDate(dateStr) {
    return dateStr ? new Date(dateStr) : null;
}


router.get('/', async (req, res) => {
    const books = await getBooks();
    books.forEach(book => {
        book.date_read = formatDate(book.date_read);
    });
    res.render('index', { books });
});

router.post('/add', async (req, res) => {
    const { title, author, rating, date_read, review, cover_url } = req.body;
    const dateRead = date_read ? date_read : null; // Handle empty date input
    await addBook(title, author, rating, dateRead, review, cover_url);
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const book = await getBookById(req.params.id);
    book.date_read = parseDate(book.date_read);
    res.render('edit-book', { book });
});
router.post('/edit/:id', async (req, res) => {
    const { title, author, rating, date_read, review, cover_url } = req.body;
    const dateRead = date_read ? date_read : null; // Handle empty date input
    await updateBook(req.params.id, title, author, rating, dateRead, review, cover_url);
    res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
    await deleteBook(req.params.id);
    res.redirect('/');
});

router.get('/book/:id', async (req, res) => {
    const book = await getBookById(req.params.id);
    book.date_read = formatDate(book.date_read);
    res.render('book', { book });
});

export default router;
