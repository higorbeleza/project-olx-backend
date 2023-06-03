const {checkSchema, check} = require('express-validator');

module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: {min: 2}
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail enválido!'
        },
        password: {
            isLength: {
                options: {min: 4},
                errorMessage: 'Senha precisa ter pelo menos 4 caracteres'
            }
        },
        state: {
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    })
};