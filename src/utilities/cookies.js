import Cookies from "js-cookie"

const expireCookies = 30 // day

export const getToken = () => {
	return Cookies.get("token")
}

export const setToken = (token) => {
	Cookies.set("token", token, {
		path: "/",
		expires: expireCookies,
	})
}
