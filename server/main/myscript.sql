-- RENAME column name
ALTER TABLE table_name 
RENAME COLUMN column_name TO new_column_name;

-- DELETE 


-- ADD NEW COLUMN
ALTER TABLE public.posts 
  ADD like_user_id INT[] DEFAULT array[]::INT[];

ALTER TABLE public.posts 
  ADD likes INT SET DEFAULT 0;

-- EDIT DEFAUT TYPE OF COLUMN
ALTER TABLE public.posts 
  ALTER COLUMN like_user_id SET DEFAULT array[]::INT[];

-- CONCATE ARRAY
UPDATE posts
  SET like_user_id = like_user_id || $1, likes = likes + 1
-- USER ONLY INCREASE LIKE AT ONCE, @> MEANS CONTAINS 
  WHERE NOT(like_user_id @> $1) 

-- TSVECTOR
ALTER TABLE public.posts 
  ADD search_vector TSVECTOR;

-- TSVECTOR explain
INSERT INTO posts (title, body, search_vector, user_id, author, date_created)
-- to_tsvector() convert the value to TSVECTOR
    VALUES($1, $2, to_tsvector($3), $4, $5, NOW())

SELECT * FROM posts
-- to_tsquery() match column with TSVECTOR value, @@ MEANS COMPARE
  WHERE search_vector @@ to_tsquery($1)