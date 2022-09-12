
const List = require('../list') // 載入 todo model
const restaurantList = require("../../restaurant.json").results

const db = require('../../config/mongoose')

db.once('open', () => {

    List.create(restaurantList)
        .then(() => {
            console.log("listSeeder done!")
            db.close()
        })
        .catch(err => console.log(err))
})