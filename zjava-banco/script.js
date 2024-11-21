function verifyToken() {
    const token = localStorage.getItem("token")

    if(!token){
        window.location.href = "../login-registrar/login-regis.html"
        return
    }
}

verifyToken()