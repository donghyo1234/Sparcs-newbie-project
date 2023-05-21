const USERNAME_STORAGE_KEY = "username"

export const getUserName = () => {
  return window.localStorage.getItem(USERNAME_STORAGE_KEY)
}

export const setUserName = (value) => {
  window.localStorage.setItem(USERNAME_STORAGE_KEY, value)
}

export const removeUserName = () => {
  window.localStorage.removeItem(USERNAME_STORAGE_KEY)
}