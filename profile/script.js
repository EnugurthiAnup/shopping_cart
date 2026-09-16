// Write your script here

let fname = document.getElementById('fname')
let lname = document.getElementById('lname')
let update = document.getElementById('update')
let message = document.getElementById('message')
let message2 = document.getElementById('message2')
let o_password = document.getElementById('o_password')
let newpass = document.getElementById('newpass')
let cnewpassword = document.getElementById('cnewpassword')
let update_pass = document.getElementById('update_pass')
let logout_button = document.getElementById('logout_button')


let currentUser = JSON.parse(localStorage.getItem('currentuser'))

if (currentUser) {

    update.addEventListener('click', () => {

        if (fname.value == '' || lname.value == '') {
            message.innerText = 'Names cannot be Empty'
        }

        else {
            let users = JSON.parse(localStorage.getItem('users'))
            let targetUser = users.filter(user => user.email == currentUser.email)

            targetUser[0].fname = fname.value
            targetUser[0].lname = lname.value
            localStorage.setItem('users', JSON.stringify(users))



        }


    })

    update_pass.addEventListener('click', () => {

    if (
        o_password.value === '' ||
        newpass.value === '' ||
        cnewpassword.value === ''
    ) {
        message2.innerText = 'Fields cannot be empty'
    }

    else if (
        o_password.value === newpass.value ||
        cnewpassword.value !== newpass.value
    ) {
        message2.innerText = 'Check the passwords'
    }

    else {

        let users = JSON.parse(localStorage.getItem('users'))
        let targetUser = users.filter(
            user => user.email === currentUser.email
        )

        if (targetUser[0].password !== o_password.value) {
            message2.innerText = 'Old password is incorrect'
        }

        else {
            targetUser[0].password = newpass.value

            localStorage.setItem(
                'users',
                JSON.stringify(users)
            )

            message2.innerText = 'Password changed successfully'
        }
    }
})

    logout_button.addEventListener('click', () => {

       localStorage.removeItem('currentuser')
        window.location.href = '/login.html'

    })

}
else {

    window.location.href = '/login.html'
}

console.log(currentUser)