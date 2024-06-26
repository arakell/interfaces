
class LoginScript {

    constructor() {
        this.bindButtons();
    }

    login() {
        const username = encodeURIComponent(document.getElementById('username').value);
        const password = encodeURIComponent(document.getElementById('password').value);

        const url = `http://localhost:3000/api/login?login=${username}&password=${password}`;
        console.log("Делаем запрос")
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    document.getElementById('error-message').style.display = 'block';
                    throw new Error('Ошибка при попытке входа');
                }
                return response.json();
            })
            .then(data => {
                if (data.type === "user") {
                    console.log("user")
                    window.location.href = "shop.html";
                } else if (data.type === "admin") {
                    console.log("admin")
                    window.location.href = "admin.html";
                } else {
                    document.getElementById('error-message').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Ошибка:', error.message);
            });
    }

    register(){
        const username = encodeURIComponent(document.getElementById('registerUsername').value);
        const password = encodeURIComponent(document.getElementById('registerPassword').value);

        const url = `http://localhost:3000/api/register?login=${username}&password=${password}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    document.getElementById('error-message').style.display = 'block';
                    throw new Error('Ошибка при попытке регистрации');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Регистрация прошла успешно, перенаправляем на страницу входа
                    window.location.href = "login.html";
                } else {
                    // Пользователь с таким логином уже существует
                    document.getElementById('error-message').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Ошибка:', error.message);
            });
    }

    bindButtons() {
        const loginButton = document.getElementById('loginButton');
        loginButton.addEventListener('click', () => this.login());

        const registerButton = document.getElementById('registerButton');
        registerButton.addEventListener('click', () => this.register());
    }


}

document.addEventListener("DOMContentLoaded", function() {
    const loginScript = new LoginScript();
});
