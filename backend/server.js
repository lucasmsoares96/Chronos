const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

let resorces = [
    { name: "Salas de Aula", item: "sala" },
    { name: "Laboratórios", item: "lab" },
    { name: "Ginásio", item: "gin" },
    { name: "Veículo", item: "vei" }
];

let schedule = [
    {
        numero: 303,
        idhorario: 1,
        "07:00-07:50": 0,
        "07:50-08:40": 0,
        "09:45-10:35": 0,
        "10:50-11:40": 0,
        "11:40-12:30": 0,
        "12:30-13:50": 0,
        "13:50-14:40": 0,
        "15:50-16:40": 0,
        "16:40-17:30": 0,
        "17:30-19:00": 0,
        "19:00-19:50": 0,
        "19:50-20:40": 0,
        "20:55-21:45": 0,
        "21:45-22:35": 0
    },
    {
        numero: 303,
        idhorario: 2,
        "07:00-07:50": 0,
        "07:50-08:40": 0,
        "09:45-10:35": 0,
        "10:50-11:40": 0,
        "11:40-12:30": 0,
        "12:30-13:50": 0,
        "13:50-14:40": 0,
        "15:50-16:40": 0,
        "16:40-17:30": 0,
        "17:30-19:00": 0,
        "19:00-19:50": 0,
        "19:50-20:40": 0,
        "20:55-21:45": 0,
        "21:45-22:35": 0
    },
    {
        numero: 303,
        idhorario: 3,
        "07:00-07:50": 1,
        "07:50-08:40": 1,
        "09:45-10:35": 1,
        "10:50-11:40": 1,
        "11:40-12:30": 1,
        "12:30-13:50": 1,
        "13:50-14:40": 1,
        "15:50-16:40": 1,
        "16:40-17:30": 1,
        "17:30-19:00": 1,
        "19:00-19:50": 1,
        "19:50-20:40": 1,
        "20:55-21:45": 1,
        "21:45-22:35": 1
    },
    {
        numero: 303,
        idhorario: 4,
        "07:00-07:50": 2,
        "07:50-08:40": 2,
        "09:45-10:35": 2,
        "10:50-11:40": 2,
        "11:40-12:30": 2,
        "12:30-13:50": 2,
        "13:50-14:40": 2,
        "15:50-16:40": 2,
        "16:40-17:30": 2,
        "17:30-19:00": 2,
        "19:00-19:50": 2,
        "19:50-20:40": 2,
        "20:55-21:45": 2,
        "21:45-22:35": 2,
        _cellVariants: {}
    }
];

app.get("/data", (req, resp) => {
    // console.log(req.body)
    console.log(req.query);
    resp.json(resorces);
});
app.get("/schedule", (req, resp) => {
    // console.log(req.body)
    console.log(req.query);
    resp.json(schedule);
});

app.listen(3003);

// schedule.forEach((e, index1) => {
//     schedule[index1]["_cellVariants"] = {};
//     Object.values(e).forEach((el, index2) => {
//         if (el == 2 && Object.keys(schedule[index1])[index2] != "idhorario") {
//             let col = String(Object.keys(schedule[index1])[index2]);
//             console.log(el, col);
//             schedule[index1]["_cellVariants"][col] = "danger";
//         }else if (el == 1 && Object.keys(schedule[index1])[index2] != "idhorario") {
//             let col = String(Object.keys(schedule[index1])[index2]);
//             console.log(el, col);
//             schedule[index1]["_cellVariants"][col] = "warning";
//         } else if (el == 0 && Object.keys(schedule[index1])[index2] != "idhorario") {
//             let col = String(Object.keys(schedule[index1])[index2]);
//             console.log(el, col);
//             schedule[index1]["_cellVariants"][col] = "info";
//         }
//     });
// });
// console.log(schedule)
