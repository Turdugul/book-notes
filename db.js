import pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'booknotes',
  password: 'datka19sql',
  port: 5432,
});

export async function getBooks() {
    const result = await pool.query('SELECT * FROM books ORDER BY date_read DESC');
    return result.rows;
}

export async function addBook(title, author, rating, date_read, review, cover_url) {
    await pool.query(
        'INSERT INTO books (title, author, rating, date_read, review, cover_url) VALUES ($1, $2, $3, $4, $5, $6)',
        [title, author, rating, date_read, review, cover_url]
    );
}

export async function getBookById(id) {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
}

export async function updateBook(id, title, author, rating, date_read, review, cover_url) {
    await pool.query(
        'UPDATE books SET title = $1, author = $2, rating = $3, date_read = $4, review = $5, cover_url = $6 WHERE id = $7',
        [title, author, rating, date_read, review, cover_url, id]
    );
}

export async function deleteBook(id) {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
}


 