// product id
const Joi = require('joi')
const V = true;
const NV = false;

function ASSERT(er, exp) {
    let e = null;
    if (er) e = true;

    if (e) {
        if (exp == e) console.log('not expected') 
    }

    if (!e) {
        if (exp == e) console.log('not expected')
    }
}
  
function validateProductID(product_id, expectation) {
    const schema = Joi.object({
        queryParam: Joi.alternatives().try(
          Joi.string().regex(/^\d{1,3}$/), // Regex for a string representing a number with length 1 to 3
          Joi.number().integer().min(1).max(999) // Validating a number between 1 and 999
        ).required()
    });
    
    const { error, value } = schema.validate({ queryParam: product_id });
    ASSERT(error, expectation)
}

validateProductID('123', V)
validateProductID('1', V)
validateProductID('1234', NV)
validateProductID('-1', NV)
validateProductID('as', NV)
validateProductID('%#""${}', NV)
validateProductID(123, V)
validateProductID(-1, NV)

function validatePackForDatabaseQueries(pack, expectation) {
    const schema = Joi.object({
        queryParam: Joi.alternatives().try(
          Joi.string().regex(/^\d{1,2}$/), // Regex for a string representing a number with length 1 to 3
          Joi.number().integer().min(1).max(99) // Validating a number between 1 and 999
        ).required()
    });
    const { error, value } = schema.validate({ queryParam: pack });
    ASSERT(error, expectation)
}

validatePackForDatabaseQueries('12', V)
validatePackForDatabaseQueries('1', V)
validatePackForDatabaseQueries('0', NV)
validatePackForDatabaseQueries(0, NV)
validatePackForDatabaseQueries(12, V)
validatePackForDatabaseQueries('%#""${}', NV)
validatePackForDatabaseQueries(123, NV)
validatePackForDatabaseQueries(-2, NV)
validatePackForDatabaseQueries('-2', NV)


function validateSearchingStrings(search, expectation) {

    const sanitizeSearchQuery = (value) => {
        return value.replace(/[^a-zA-Z0-9 ]/g, '');
    };
      
    const searchQuerySchema = Joi.string().max(255).trim().custom(sanitizeSearchQuery).required()


    const { error, value } = searchQuerySchema.validate(search);
    if (value) {
        // console.log('true')
        return true;
    } else {
        // console.log('nd')
        return null;
    }
}


validateSearchingStrings('abc', V)
validateSearchingStrings('  ', NV)
validateSearchingStrings('', NV)


function validateGoogleOAuthCode(auth_code, expectation) {
    const schema = Joi.object({
        auth_code: Joi.alternatives().try(
            Joi.string().min(10).max(255).required(),
        ).required()
    });
    
    const { error, value } = schema.validate({ auth_code: auth_code });

    ASSERT(error, expectation)
}

const long_cde = 'acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10acbhduet10'

const valid_code = 'cbhduet10acbhduet10acbhduet10acbcbhduet10acbhduet10acbhduet10acb'
const short_code = 'cbhadcadc'
validateGoogleOAuthCode(long_cde, NV)
validateGoogleOAuthCode(valid_code, V)
validateGoogleOAuthCode(short_code, NV)



const { generateAccessToken } = require('./Utils')
require("dotenv/config");
function validateToken(id) {
    const access_token = generateAccessToken({ id: id });
    const tokenRegex = /^[A-Za-z0-9_.-]+$/;

    const tokenSchema = Joi.string().min(50).max(255).regex(tokenRegex).required()

      
      // Example usage
      
      // Validate the token
    const { error, value } = tokenSchema.validate(access_token);
}


function validateEmail(email, exp) {

    const emailSchema = Joi.object({
        email: Joi.string().email().required(),
    });
  
    // Example usage
  const userInput = { email: email };
  
  // Validate the email
    const { error, value } = emailSchema.validate(userInput);
    if (error) {
        return true;
    }
    return null;
  
 ASSERT(error, exp)
}

validateEmail('user@example.com', V)
validateEmail('example.com', NV)
validateEmail('userexample.com', NV)
validateEmail('user@examplecom', NV)
validateEmail('user@example.', NV)
validateEmail('user@example/.com', NV)

module.exports = {validateEmail}