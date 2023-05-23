const express = require('express');
const app = express();
app.use(express.json());


let users = [
    {
        id: 1,
        name : 'Вася Петров',
        email : 'qqq@www.ru'
       },
    {
        id: 2,
        name : 'Петя Петров',
        email : 'llll@www.ru'
       },
    {
        id: 3,
        name : 'Маша Галкина',
        email : 'sfdfd@www.ru'
       },
]


let appointments = [
{   
    id: 1,
    userEm: 2,
    doctor: 'Олег Олегович',
    date: '12.09.2001'
},
{   
    id: 2,
    userEm: 2,
    doctor: 'Максим Максимович',
    date: '12.05.2011'
},
{   
    id: 3,
    userEm: 1,
    doctor: 'Клара Степанвна',
    date: '12.09.2023'
},

];

app.post('/users', (req, res) => {
 console.log('aaaaaa',req.body)
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Имя и email являются обязательными полями' });
  }
  
  const user = { id: Date.now().toString(), name, email };
  
  users.push(user);
  res.json(user);
});

app.post('/appointments', (req, res) => {
  const { userEm, doctor, date } = req.body;

  if (!userEm || !doctor || !date) {
    return res.status(400).json({ error: 'Email пользователя, имя доктора и дата являются обязательными полями' });
  }
  
  const user = users.find(el => el.email == userEm);
  
  if (!user) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  
  const appointment = { id: Date.now().toString(), userEm, doctor, date };
  
  appointments.push(appointment);
  
  res.json(appointment);
});


app.get('/appointments', (req, res) => {
  res.json(appointments);
});


app.delete('/appointments/:id', (req, res) => {
  const appointmentId = req.params.id;
  const appointmentIndex = appointments.findIndex(appointment => appointment.id == appointmentId);
  if (appointmentIndex == -1) {
    return res.status(404).json({ error: 'Запись не найдена' });
  }
  
  appointments.splice(appointmentIndex, 1);
  
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});