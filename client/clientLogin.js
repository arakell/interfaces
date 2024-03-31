
class LoginScript {

    constructor() {
        this.bindButton();
    }

    login() {
        const username = encodeURIComponent(document.getElementById('username').value);
        const password = encodeURIComponent(document.getElementById('password').value);

        const url = `http://localhost:3000/api/login?login=${username}&password=${password}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при попытке входа');
                }
                return response.json();
            })
            .then(data => {
                if (data.type === "user") {
                    window.location.href = "user.html";
                } else if (data.type === "admin") {
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
