const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario.model');
const app = require('../index');
chai.should();
chai.use(chaiHttp);

describe('Registro usuario', () => {
    describe('POST /registrar de forma exitosa', () => {
        it('debe devolver un 200 en status', (done) => {
            const usuario = {
                nombreusuario: 'testuser',
                nombrescompletos: 'testnombres',
                email: 'test@test.com',
                telefono: "585889",
                direccion: "Colombia",
                contrasena: 'test',

            };
            chai.request(app)
                .post('/usuario/registrar')
                .send(usuario)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done();
                });
        });

        after(async () => {
            await Usuario.deleteOne({ email: 'test@test.com' });
        });
    });
})
