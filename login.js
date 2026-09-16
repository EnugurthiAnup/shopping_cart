
let email = document.getElementById('email')
let password = document.getElementById('password')
let form = document.querySelector('form')
let message = document.getElementById('message')

form.addEventListener('submit', function (e) {

    e.preventDefault()


    let users = JSON.parse(localStorage.getItem('users') || '[]')

    if (users.length > 0) {
        let match = users.filter(user => user.email == email.value)

        if (match.length > 0) {

            if (match[0].password === password.value) {
                message.style.color = 'green'

                message.textContent = 'Login done'

                form.reset()

                localStorage.setItem('currentuser', JSON.stringify({
                    email: match[0].email,
                    password: match[0].password,
                    token: Math.random().toString()
                }))

                window.location.href = './shop/index.html'
            }
            else {
                message.textContent = 'Invalid password'
            }

        }
        else {
        message.textContent = 'User not found. Please Sign Up'
    }
    }
    else {
        message.textContent = 'User not found. click on Sign Up'
    }
})