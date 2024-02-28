const emailValidator = (email) => {
  const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/g

  const isValid = REGEX_EMAIL.test(email)

  return isValid
}
export default emailValidator
