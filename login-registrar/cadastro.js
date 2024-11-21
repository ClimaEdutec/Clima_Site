async function register(){
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const passwordConfirmation = document.querySelector("#password-confirmation").value
    const date = document.querySelector("#date").value

    if(name == "" || email == "" || password == "" || passwordConfirmation =="" || date == "") {
        alert("Preencha todas as informações!")
        return
    }

    if(password !== passwordConfirmation){
        alert("As senhas não conferem. Digite as senhas novamente!")
        document.querySelector("#password").value = ""
        document.querySelector("#password-confirmation").value = ""
        return
    }

    const user = {
        name,
        email,
        password
    }


    await fetch("https://3000-climaedutec-edutecbacke-5bf85btxnqt.ws-us116.gitpod.io/register",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user})
    })
    

}



const button = document.querySelector("form button")
button.addEventListener("click", (event)=>{
    event.preventDefault()
    register()
})
