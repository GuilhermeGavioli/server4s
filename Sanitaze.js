const { body, validationResult } = require('express-validator');


const isStrongPassword = (value) => {
    // Regular expressions to check for the required conditions
    const lengthRegex = /^.{8,}$/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numericalRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  
    return (
      lengthRegex.test(value) &&
      uppercaseRegex.test(value) &&
      lowercaseRegex.test(value) &&
      numericalRegex.test(value) &&
      specialCharRegex.test(value)
    );
};

const validateAndSanitizeUserData = [
    body('email').isEmail().normalizeEmail(),
    body('password')
      .custom(isStrongPassword)
      .withMessage(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one numerical digit, and one special character.'
      )
      .trim(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];
  

  
  
  
  
  
  
  

module.exports = {
    isStrongPassword,
    validateAndSanitizeUserData,
}