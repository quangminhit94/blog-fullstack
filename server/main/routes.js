const express = require('express')

const router = express.Router()
const pool = require('./db');

router.get('/hello', (req, res) => {
  console.log(req)
  res.json('hello world')
})

/**
  POSTS ROUTES SECTION
*/

router.get('/api/get/all_posts', (req, res, next) => {
  pool.query('SELECT * FROM posts ORDER BY date_created DESC', (q_error, q_response) => {
    res.json(q_response.rows)
  })
})

router.post('/api/posts/post_to_db', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.username]
  pool.query(`INSERT INTO posts (title, body, user_id, author, date_created)
              VALUES($1, $2, $3, $4, NOW())`, values, (q_error, q_response) => {
    // with next() basically better version to easy handing asynchronous error cause q_error is asynchronous of express
    if (q_error) return next(q_error)
    res.json(q_response.rows)
  })
});

router.put('/api/put/posts', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
  pool.query(`UPDATE posts SET title = $1, body = $2, user_id = $3, author = $5, date_created = NOW()
              WHERE pid = $4`, values, (q_error, q_response) => {
    res.json(q_response.rows)
  })
})

router.delete('api/delete/post_comments', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query(`DELETE FROM comments
              WHERE post_id = $1`, [post_id], (q_error, q_response) => {
    res.json(q_response.rows)
    console.log(q_error)
  })
})

router.delete('api/delete/post', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query(`DELETE FROM posts
              WHERE post_id = $1`, [post_id], (q_error, q_response) => {
    res.json(q_response.rows)
    console.log(q_error)
  })
})

/**
  COMMENT ROUTES SECTION
*/
router.post('api/posts/comment_to_db', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.username, req.body.post_id]
  pool.query(`INSERT INTO comments(comment, user_id, author, post_id, date_created)
              VALUES($1, $2, $3, $4, NOW())`, values, (q_error, q_response) => {
    res.json(q_response.rows)
    console.log(q_error)
  })
})


router.put('api/put/comment_to_db', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]
  pool.query(`UPDATE comments SET 
              comment = $1, user_id = $2, post_id = $3, author = $4, date_created = NOW()
              WHERE cid = $5`, values, (q_error, q_response) => {
    res.json(q_response.rows)
    console.log(q_error)
  })
})

router.delete('api/delete/comment', (req, res, next) => {
  const cid = req.body.cid
  pool.query(`DELETE FROM comments
              WHERE cid = $1`, [cid], (q_error, q_response) => {
    res.json(q_response.rows)
    console.log(q_error)
  })
})

router.get('api/get/all_post_comments', (req, res, next) => {
  const post_id = String(req.query.post_id)
  pool.query(`SELECT * FROM comments
              WHERE post_id = $1`, [post_id], (q_error, q_response) => {
    res.json(q_response.rows)
    console.log(q_error)
  })
})

/**
 * USER PROFILE SECTION
 */
router.post('api/posts/user_profile_to_db', (req, res, next) => {
  const values = [req.body.profile.nickname, req.body.profile.email, req.body.profile.email_verified]
  pool.query(`INSERT INTO users(username, email, email_verified, date_created)
              VALUES($1, $2, $3, NOW())
              ON CONFLICT DO NOTHING`, values, (q_error, q_response) => {
    res.json(q_response.rows)
    console.log(q_error)
  })
})

router.get('api/get/user_profile_to_db', (req, res, next) => {
  const email = String(req.body.email)
  pool.query(`SELECT * FROM users
              WHERE email = $1`, [email], (q_error, q_response) => {
    res.json(q_response.rows)
    console.log(q_error)
  })
})

router.get('api/get/user_posts', (req, res, next) => {
  const user_id = String(req.body.user_id)
  pool.query(`SELECT * FROM posts
              WHERE user_id = $1`, [user_id], (q_error, q_response) => {
    res.json(q_response.rows)
    console.log(q_error)
  })
})

module.exports = router