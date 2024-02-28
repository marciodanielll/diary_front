const emailValidator = (email) => {
  const emailValidator = /\S+@\S+\.\S+/
  const isValid = emailValidator.test(email)

  // if (!isValid) return 'email inválido'
  // if (email !== confirmEmail) return 'email e confirmação não conferem'

  return isValid
}
export default emailValidator
