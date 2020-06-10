import validator from 'validator';

/**
 * @description - checks if email is valid or not.
 */
const validateEmail = (errors, email) => {
    if (!email) {
      errors.push("email is required");
    }
    if (email && !validator.isEmail(email)) {
      errors.push("email is invalid");
    }
  };
  
  
  
  /**
   * @description - checks if password is valid or not
   */
  const validatePassword = (errors, password) => {
    if (!password) {
      errors.push("Password is required");
    }
    if (password && password.length < 6) {
      errors.push("Password must be a minimum of 6 characters");
    }
  };