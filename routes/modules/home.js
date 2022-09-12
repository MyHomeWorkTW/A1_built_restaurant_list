const express = require('express')
const router = express.Router()

const List = require('../../models/list')

router.get('/', (req, res) => {
    List.find()
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .sort({ _id: 'asc' }) // desc
        .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
        .catch(error => console.error(error)) // 錯誤處理
})

router.get("/search", (req, res) => {
    if (!req.query.keywords) {
        res.redirect("/")
    }

    const keywords = req.query.keywords
    const keyword = req.query.keywords.toLowerCase()

    List.find({})
        .lean()
        .then(restaurants => {
            const filterRestaurants = restaurants.filter(
                data =>
                    data.name.toLowerCase().includes(keyword) ||
                    data.category.includes(keyword)
            )
            res.render("index", {
                restaurants: filterRestaurants,
                keywords,
            })
        })
        .catch(err => console.log(err))
})

module.exports = router