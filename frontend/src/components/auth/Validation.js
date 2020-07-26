export function validateLoginInput(loginInput) {
  if (!loginInput.phoneNumber) {
    return "Pone Number can not be empty";
  } else if (!loginInput.password) {
    return "Password can not be empty";
  }
  return "";
}
