import Cookies from "js-cookie"

const logout = () => {
	Cookies.remove("token", { path: "/" })
	window.location.href = "/"
}

export {
  logout
}