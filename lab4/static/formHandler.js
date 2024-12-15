document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("registerMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (name === "") {
            showMessage("Имя пользователя не может быть пустым!", "red");
            return;
        }

        if (email === "") {
            showMessage("Email пользователя не может быть пустым!", "red");
            return;
        }

        if (password === "") {
            showMessage("Пароль не может быть пустым!", "red");
            return;
        }

        if (confirmPassword === "") {
            showMessage("Пароль не может быть пустым!", "red");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|ru)$/;
        if (!emailRegex.test(email)) {
            showMessage("Введите email, где домен .com или .ru", "red");
            return;
        }

        if (password.length < 6) {
            showMessage("Пароль должен быть не менее 6 символов!", "red");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("Пароли не совпадают!", "red");
            return;
        }

        const userData = { name, email, password };

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (response.ok) {
                    showMessage("Регистрация успешна!", "green");
                    form.reset();
                } else {
                    showMessage("Ошибка при регистрации. Проверьте данные.", "red");
                }
            })
            .catch(() => {
                showMessage("Ошибка подключения к серверу.", "red");
            });
    });

    function showMessage(text, color) {
        message.textContent = text;
        message.style.color = color;
    }
});
