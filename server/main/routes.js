const express = require('express')

const router = express.Router()
const pool = require('./db');

router.get('/hello', (req, res) => {
  res.json('hello world')
})

router.get('/callback', (req, res) => {
  res.json('callback')
})

/**
  POSTS ROUTES SECTION
*/

router.get('/api/get/all_posts', (req, res, next) => {
  pool.query('SELECT * FROM posts ORDER BY date_created DESC', (q_error, q_response) => {
    res.json(q_response.rows)
  })
})

// router.post('/api/posts/post_to_db', (req, res, next) => {
//   const values = [req.body.title, req.body.body, req.body.uid, req.body.username]
//   pool.query(`INSERT INTO posts (title, body, user_id, author, date_created)
//               VALUES($1, $2, $3, $4, NOW())`, values, (q_error, q_response) => {
//     // with next() basically better version to easy handing asynchronous error cause q_error is asynchronous of express
//     if (q_error) return next(q_error)
//     res.json(q_response.rows)
//   })
// });

router.post('/api/posts/post_to_db', (req, res, next) => {
  const body_vector = String(req.body.body)
  const title_vector = String(req.body.title)
  const user_vector = String(req.body.username)

  const search_vector = [title_vector, body_vector, user_vector]
  const values = [req.body.title, req.body.body, search_vector, req.body.uid, req.body.username]
  pool.query(`INSERT INTO posts (title, body, search_vector, user_id, author, date_created)
              VALUES($1, $2, to_tsvector($3), $4, $5, NOW())`, values, (q_error, q_response) => {
    // with next() basically better version to easy handing asynchronous error cause q_error is asynchronous of express
    if (q_error) return next(q_error)
    res.json(q_response.rows)
  })
});

router.get('/api/get/search_posts', (req, res, next) => {
  const search_query = String(req.query.search_query)
  console.log(search_query)
  pool.query(`SELECT * FROM posts
              WHERE search_vector @@ to_tsquery($1)`,
    [search_query], (q_error, q_response) => {
      if (q_error) return next(q_error)
      res.json(q_response.rows)
    })
})

router.put('/api/put/post', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
  pool.query(`UPDATE posts SET title = $1, body = $2, user_id = $3, author = $5, date_created = NOW()
              WHERE pid = $4`, values, (q_error, q_response) => {
    if (q_error) return next(q_error)
    res.json(q_response.rows)
  })
})

router.delete('/api/delete/post_comments', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query(`DELETE FROM comments
              WHERE post_id = $1`, [post_id], (q_error, q_response) => {
    if (q_error) return next(q_error)
    res.json(q_response.rows)
  })
})

router.delete('/api/delete/post', (req, res, next) => {
  const post_id = req.body.post_id
  pool.query(`DELETE FROM posts
              WHERE pid = $1`, [post_id], (q_error, q_response) => {
    if (q_error) return next(q_error)
    res.json(q_response.rows)
  })
})

/**
  COMMENT ROUTES SECTION
*/
router.post('/api/posts/comment_to_db', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.username, req.body.post_id]
  pool.query(`INSERT INTO comments(comment, user_id, author, post_id, date_created)
              VALUES($1, $2, $3, $4, NOW())`, values, (q_error, q_response) => {
    if (q_error) return next(q_error)
    res.json(q_response.rows)
  })
})


router.put('/api/put/comment_to_db', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]
  pool.query(`UPDATE comments SET 
              comment = $1, user_id = $2, post_id = $3, author = $4, date_created = NOW()
              WHERE cid = $5`, values, (q_error, q_response) => {
    if (q_error) return next(q_error)
    res.json(q_response.rows)
  })
})

router.delete('/api/delete/comment', (req, res, next) => {
  const cid = req.body.cid
  pool.query(`DELETE FROM comments
              WHERE cid = $1`, [cid], (q_error, q_response) => {
    if (q_error) return next(q_error)
    res.json(q_response.rows)
  })
})

router.get('/api/get/all_post_comments', (req, res, next) => {
  const post_id = req.query.post_id
  pool.query(`SELECT * FROM comments
              WHERE post_id = $1`, [post_id], (q_error, q_response) => {
    if (q_error) return next(q_error)
    res.json(q_response.rows)
  })
})

/**
 * USER PROFILE SECTION
 */
router.post('/api/posts/user_profile_to_db', (req, res, next) => {
  const values = [req.body.profile.nickname, req.body.profile.email, req.body.profile.email_verified]
  pool.query(`INSERT INTO users(username, email, email_verified, date_created)
              VALUES($1, $2, $3, NOW())
              ON CONFLICT DO NOTHING`, values,
    (q_error, q_response) => {
      if (q_error) return next(q_error)
      res.json(q_response.rows)
    })
})

router.get('/api/get/user_profile_from_db', (req, res, next) => {
  const email = req.query.email
  pool.query(`SELECT * FROM users
              WHERE email = $1`, [email], (q_error, q_response) => {
    res.json(q_response.rows)
  })
})

router.get('/api/get/user_posts', (req, res, next) => {
  const user_id = req.query.user_id
  pool.query(`SELECT * FROM posts
              WHERE user_id = $1`, [user_id], (q_error, q_response) => {
    res.json(q_response.rows)
  })
})

router.put('/api/put/likes', (req, res, next) => {
  const uid = [req.body.uid]
  const post_id = String(req.body.post_id)
  const values = [uid, post_id]

  pool.query(`UPDATE posts
              SET like_user_id = like_user_id || $1, likes = likes + 1
              WHERE NOT(like_user_id @> $1)
              AND pid = $2`,
    values, (q_error, q_response) => {
      if (q_error) return next(q_error)
      res.json(q_response.rows)
    }
  )
})

/**
 * OTHER USER PROFILE
 */

router.get('/api/get/other_user_profile_from_db', (req, res, next) => {
  const username = String(req.query.username)

  pool.query(`SELECT * FROM users
              WHERE username = $1`,
    [username], (q_error, q_response) => {
      if (q_error) return next(q_error)
      res.json(q_response.rows)
    })
})

router.get('/api/get/other_user_posts_from_db', (req, res, next) => {
  const username = String(req.query.username)

  pool.query(`SELECT * FROM posts
              WHERE author = $1`,
    [username], (q_error, q_response) => {
      if (q_error) return next(q_error)
      res.json(q_response.rows)
    })
})

router.post('/api/post/message_to_db', (req, res, next) => {
  const from_username = String(req.body.message_sender)
  const to_username = String(req.body.message_to)
  const title = String(req.body.message_title)
  const body = String(req.body.message_body)

  const values = [from_username, to_username, title, body]

  pool.query(`INSERT INTO messages(message_sender, message_to, message_title, message_body, date_created)
              VALUES($1, $2, $3, $4, NOW())`,
    values, (q_error, q_response) => {
      if (q_error) return next(q_error)
      res.json(q_response.rows)
    })
})


router.get('/api/get/user_messages', (req, res, next) => {
  const username = String(req.query.username)

  pool.query(`SELECT * FROM messages
              WHERE message_to = $1`,
    [username], (q_error, q_response) => {
      if (q_error) return next(q_error)
      res.json(q_response.rows)
    })
})

router.delete('/api/delete/user_messages', (req, res, next) => {
  const mid = req.body.mid

  pool.query(`DELETE FROM messages
              WHERE mid = $1`,
    [mid], (q_error, q_response) => {
      if (q_error) return next(q_error)
      res.json(q_response.rows)
    })
})

module.exports = router