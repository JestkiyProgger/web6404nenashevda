document.addEventListener('DOMContentLoaded', function() {
    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            const users = await response.json();

            const tableBody = document.querySelector('#usersTable tbody');
            tableBody.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Ошибка:', error);
            const tableBody = document.querySelector('#usersTable tbody');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="3" style="color: red;">Не удалось загрузить данные. Пожалуйста, попробуйте позже.</td>
            `;
            tableBody.appendChild(row);
        }
    }

    fetchUsers();
});