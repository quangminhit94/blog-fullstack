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