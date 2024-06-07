const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Books', () => {
    it('should be able to create new book', (done) => {
        const book = {id: "1", title: "My Title", author: "Pesho Ivanov"};
        chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            const body = res.body;
            expect(res.statusCode, "Status code").to.be.equal(201);
            expect(body.id, "BookID Property").to.be.equal(book.id);
            expect(body.title, "BookTitle Property").to.be.equal(book.title);
            expect(body.author, "BookAuthor Property").to.be.equal(book.author);
            console.log("response: ", res.body);
            done();
        })
    })

    it('should GET all books', (done) => {
        chai.request(server)
        .get('/books')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res).to.have.status(200);
            expect(res.body, "BookID Property").to.be.a('array');
            console.log(res.body);
            done();
        })
    })

    it('should GET a single book', (done) => {
        const bookId = '1';
        chai.request(server)
        .get(`/books/${bookId}`)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('author');
            done();
        })        
    })

    it('should PUT an existing book', (done) => {
        const bookId = '1';
        const updatedBook = {id: bookId, title: "Updated Test Book", author: "Updated Test Author"};
        chai.request(server)
        .put(`/books/${bookId}`)
        .send(updatedBook)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.title).to.equal('Updated Test Book');
            expect(res.body.author).to.equal('Updated Test Author');
            done();
        })
    })

    it('should DELETE an existing book', (done) => {
        const bookId = '1';
        chai.request(server)
        .delete(`/books/${bookId}`)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res).to.have.status(204);
            done();
        })
    })

    it('should return 404 when trying to GET, PUT or DELETE a non-existing books', (done) => {
        chai.request(server)
        .get('/books/9999')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res).to.have.status(404);
        });

        chai.request(server)
        .put('/books/9999')
        .send({id: "9999", title: "Non-existing Book", author: "Non-existing Author"})
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res).to.have.status(404);
        });

        chai.request(server)
        .delete('/books/9999')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res).to.have.status(404);
            done();
        });
    })
})