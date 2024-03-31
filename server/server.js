import express from 'express';
import AppDAO from './dao.js';

const app = express();
const PORT = process.env.PORT || 3000;

const dao = new AppDAO('./DATABASE.db');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.get('/api/login', (req, res) => {
    console.log("login request")
    const login = req.query.login; // Получаем логин из строки запроса
    const password = req.query.password; // Получаем пароль из строки запроса

    let sql = 'SELECT type FROM client WHERE login=? AND password=?'; // SQL запрос для поиска пользователя по логину и паролю
    dao.db.get(sql, [login, password], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (!row) {
                res.status(404).json({ type: null }); // Если пользователь не найден, возвращаем null
                console.log("Answer 404")
            } else {
                const type = row.type; // Получаем тип пользователя из результата запроса
                console.log("Answer 200")
                res.status(200).json({ type: type }); // Возвращаем тип пользователя
            }
        }
    });
});

app.get('/api/register', (req, res) => {
    console.log("register request");
    const login = req.query.login; // Получаем логин из строки запроса
    const password = req.query.password; // Получаем пароль из строки запроса

    // Проверяем, существует ли пользователь с таким логином
    let sqlCheckUser = 'SELECT * FROM client WHERE login=?';
    dao.db.get(sqlCheckUser, [login], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (row) {
                // Пользователь с таким логином уже существует
                res.status(409).json({ error: 'User with this login already exists' });
                console.log("Answer 409: User with this login already exists");
            } else {
                // Пользователя с таким логином нет, добавляем нового пользователя
                let sqlAddUser = 'INSERT INTO client (login, password, type) VALUES (?, ?, "user")';
                dao.db.run(sqlAddUser, [login, password], function(err) {
                    if (err) {
                        console.error(err.message);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        // Новый пользователь успешно добавлен
                        console.log("New user registered: ", login);
                        res.status(200).json({ success: true });
                        console.log("Answer 200: New user registered successfully");
                    }
                });
            }
        }
    });
});



