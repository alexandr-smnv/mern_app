import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)
    // запись в localStorage
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, [])

  const logout = useCallback(()  => {
    setToken(null)
    setUserId(null)
    // очистка localStorage
    localStorage.removeItem(storageName)
  }, [])

  // если в localStorage есть данные то записать их в переменные
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {

      login(data.token, data.userId)
    }
  }, [login])


  return {login, logout, token, userId}
}