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
    console.log("Get /api/login request")
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


