
class ShopScript{

    constructor() {
        this.bindButtonLogout();
    }

    logout(){
        window.location.href = "login.html";
    }

    bindButtonLogout() {
        const button = document.getElementById('logoutButton');
        button.addEventListener('click', () => this.logout());
    }

}

document.addEventListener("DOMContentLoaded", function() {
    const shopScript = new ShopScript();
});