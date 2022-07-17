let cars = require('./db.json')
let upcomingId = 2;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req,res) => {
        const fortune = ["A beautiful, smart, and loving person will be coming into your life.", "A dubious friend may be an enemy in camouflage.", "A faithful friend is a strong defense.", "A feather in the hand is better than a bird in the air.", "A fresh start will put you on your way.", "A gambler not only will lose what he has, but also will lose what he doesn’t have."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * fortune.length);
        let randomFortune = fortune[randomIndex];
      
        res.status(200).send(randomFortune);
    },

    getCars: (req, res) => {
        res.status(200).send(cars)
    },

    createCar: (req,res) => {
        const {car, price, imageURL} = req.body;
        let newCar = {
            id: upcomingId,
            car,
            price: +price,
            imageURL
        }
        cars.push(newCar);
        upcomingId++;
        res.status(200).send(cars)
    },

    updateCar: (req,res) => {
        const {id} = req.params;
        const {type} = req.body;
        let index = cars.findIndex(elem => +elem.id === +id);

        if(type === 'minus' && cars[index].price > 10000){
            cars[index].price -= 5000
            res.status(200).send(cars)
        } else if(type === 'plus'){
            cars[index].price += 5000
            res.status(200).send(cars)
        } else {
            res.status(400).send('Not Selling Any Lower!')
        }

    },
    deleteCar: (req,res) => {
        let index = cars.findIndex(elem => elem.id === +req.params.id);
        cars.splice(index,1);
        res.status(200).send(cars)
    }

}