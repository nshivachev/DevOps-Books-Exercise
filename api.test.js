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
})