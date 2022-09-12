const express = require('express')
const router = express.Router()

const List = require('../../models/list')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return List.create({ name, name_en, category, image, location, phone, google_map, rating, description })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})


router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return List.findById(id)
    .lean()
    .then((list) => res.render('edit', { list }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return List.findById(id)
    .then(list => {
      list.name = name
      list.name_en = name_en
      list.category = category
      list.image = image
      list.location = location
      list.phone = phone
      list.google_map = google_map
      list.rating = rating
      list.description = description
      return list.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return List.findById(id)
    .then(list => list.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


router.get('/:id', (req, res) => {
  const id = req.params.id
  return List.findById(id)
    .lean()
    .then((list) => res.render('show', { list }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

module.exports = router