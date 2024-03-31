
class LoginScript {

    constructor() {
        this.bindButton();
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

    bindButton() {
        const button = document.getElementById('button');
        button.addEventListener('click', () => this.login());
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const loginScript = new LoginScript();
});
