const passwordValidator = (password) => {
  const minLength = 8
  const isValid = password.length >= minLength

  return isValid
}

export default passwordValidator
