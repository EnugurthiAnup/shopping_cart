let fname = document.getElementById('fname')
let lname = document.getElementById('lname')
let email = document.getElementById('email')
let password = document.getElementById('password')
let cpassword = document.getElementById('cpassword')
let message = document.getElementById('message')
let form = document.querySelector('form')


form.addEventListener('submit', function (e) {

    e.preventDefault()

    if (
        fname.value === '' ||
        lname.value === '' ||
        email.value === '' ||
        password.value === '' ||
        cpassword.value === ''
    ) {
        message.textContent = 'Enter the required fields'
    }

    else if (password.value === cpassword.value) {

        let users = JSON.parse(localStorage.getItem('users') || '[]')

        let existing = users.some((user) => user.email === email.value)

        if (existing) {
            message.textContent = 'User already exists please login'
        }

        else {
            users.push({
                fname: fname.value,
                lname: lname.value,
                email: email.value,
                password: password.value,
                time: new Date()
            }) 

            localStorage.setItem('users', JSON.stringify(users))

            message.style.color = 'green'
            message.textContent = 'sign up success please login '

             form.reset()
        }
    }

    else {  
        message.textContent = 'Match the passwords'
    }
})

