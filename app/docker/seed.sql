CREATE DATABASE zstart;
CREATE DATABASE zstart_cvr;
CREATE DATABASE zstart_cdb;

\c zstart;

CREATE TABLE "module" (
    id VARCHAR PRIMARY KEY,
    data JSONB
);

-- Use the pg_read_file function to read the entire file at once
INSERT INTO module (id, data)
VALUES ('all_modules', pg_read_file('/docker-entrypoint-initdb.d/data.json')::jsonb);

-- -- Example queries to work with the JSON data:

-- -- Get all modules with their basic info
-- SELECT 
--     jsonb_array_elements(data)->>'title' as title,
--     jsonb_array_elements(data)->>'module' as module_number,
--     jsonb_array_elements(data)->>'totalLessons' as total_lessons,
--     jsonb_array_elements(data)->>'totalTime' as total_time
-- FROM module
-- ORDER BY jsonb_array_elements(data)->>'module';

-- -- Get all chapters for a specific module
-- SELECT 
--     jsonb_array_elements(jsonb_array_elements(data)->'chapters')->>'title' as chapter_title,
--     jsonb_array_elements(jsonb_array_elements(data)->'chapters')->>'totalLessons' as lessons,
--     jsonb_array_elements(jsonb_array_elements(data)->'chapters')->>'totalTime' as duration
-- FROM module 
-- WHERE jsonb_array_elements(data)->>'module' = 'Module 1';

-- -- Get all lessons for a specific chapter
-- WITH chapters AS (
--     SELECT 
--         jsonb_array_elements(data)->>'title' as module_title,
--         jsonb_array_elements(data->'chapters') as chapter
--     FROM module
-- )
-- SELECT 
--     module_title,
--     chapter->>'title' as chapter_title,
--     jsonb_array_elements(chapter->'lessons')->>'title' as lesson_title,
--     jsonb_array_elements(chapter->'lessons')->>'time' as duration
-- FROM chapters
-- WHERE chapter->>'title' = 'Getting started';

-- -- Get total duration of all lessons in minutes (requires some string processing)
-- WITH RECURSIVE lessons AS (
--     SELECT 
--         jsonb_array_elements(data->'chapters') as chapter,
--         jsonb_array_elements(data)->>'title' as module_title
--     FROM module
-- ),
-- lesson_times AS (
--     SELECT 
--         module_title,
--         chapter->>'title' as chapter_title,
--         jsonb_array_elements(chapter->'lessons')->>'time' as duration
--     FROM lessons
-- )
-- SELECT 
--     module_title,
--     chapter_title,
--     COUNT(*) as lesson_count,
--     SUM(
--         CASE 
--             WHEN duration ~ '(\d+):(\d+)' 
--             THEN (regexp_matches(duration, '(\d+):(\d+)'))[1]::integer * 60 + 
--                  (regexp_matches(duration, '(\d+):(\d+)'))[2]::integer
--             ELSE 0
--         END
--     ) as total_minutes
-- FROM lesson_times
-- GROUP BY module_title, chapter_title
-- ORDER BY module_title, chapter_title;

-- -- Mark a specific lesson as completed
-- UPDATE module 
-- SET data = jsonb_set(
--     data,
--     ARRAY['chapters', 0, 'lessons', 0, 'completed'],
--     'true'::jsonb
-- )
-- WHERE id = 'all_modules';

-- -- Get progress summary for each module
-- SELECT 
--     jsonb_array_elements(data)->>'title' as module_title,
--     jsonb_array_elements(data)->>'module' as module_number,
--     (
--         SELECT COUNT(*)
--         FROM jsonb_array_elements(jsonb_array_elements(data)->'chapters') c,
--              jsonb_array_elements(c->'lessons') l
--         WHERE l->>'completed' = 'true'
--     ) as completed_lessons,
--     (
--         SELECT COUNT(*)
--         FROM jsonb_array_elements(jsonb_array_elements(data)->'chapters') c,
--              jsonb_array_elements(c->'lessons') l
--     ) as total_lessons,
--     ROUND(
--         (
--             SELECT COUNT(*)::float
--             FROM jsonb_array_elements(jsonb_array_elements(data)->'chapters') c,
--                  jsonb_array_elements(c->'lessons') l
--             WHERE l->>'completed' = 'true'
--         ) /
--         (
--             SELECT COUNT(*)::float
--             FROM jsonb_array_elements(jsonb_array_elements(data)->'chapters') c,
--                  jsonb_array_elements(c->'lessons') l
--         ) * 100,
--         2
--     ) as completion_percentage
-- FROM module
-- ORDER BY jsonb_array_elements(data)->>'module';