
class RegisterScript {

    constructor() {
        this.bindButtons();
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
        const registerButton = document.getElementById('registerButton');
        registerButton.addEventListener('click', () => this.register());
    }


}

document.addEventListener("DOMContentLoaded", function() {
    const registerScript = new RegisterScript();
});
