const {checkSchema, check} = require('express-validator');

module.exports = {
    editAction: checkSchema({
        token: {
            notEmpty: true
        },
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: {min: 2}
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail enválido!'
        },
        password: {
            optional: true,
            isLength: {
                options: {min: 4},
                errorMessage: 'Senha precisa ter pelo menos 4 caracteres'
            }
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    })
};