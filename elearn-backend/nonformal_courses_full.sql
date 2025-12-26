-- Add missing columns for emoji, rating, reviews, paid
ALTER TABLE courses
  ADD COLUMN thumbnail VARCHAR(10),
  ADD COLUMN rating FLOAT,
  ADD COLUMN reviews INT,
  ADD COLUMN paid BOOLEAN DEFAULT FALSE;

-- Re-insert all 7 non-formal courses with full data
INSERT INTO courses (id, title, description, type, category, level, duration, instructor_id, thumbnail, rating, reviews, paid)
VALUES
  (1, 'Python Basics for Beginners', 'Learn Python fundamentals from scratch', 'non-formal', 'Tech Skills', 'Beginner', '4 weeks', NULL, '🐍', 4.8, 342, FALSE),
  (2, 'Digital Marketing 101', 'Master the basics of digital marketing', 'non-formal', 'Career Skills', 'Beginner', '3 weeks', NULL, '📢', 4.6, 215, FALSE),
  (3, 'UI/UX Design Fundamentals', 'Create stunning user interfaces and experiences', 'non-formal', 'Creative Skills', 'Beginner', '5 weeks', NULL, '🎨', 4.7, 298, FALSE),
  (4, 'English Conversation Skills', 'Improve your spoken English fluency', 'non-formal', 'Language Skills', 'Intermediate', '6 weeks', NULL, '🗣️', 4.5, 189, FALSE),
  (5, 'JavaScript Essentials', 'Master JavaScript from zero to hero', 'non-formal', 'Tech Skills', 'Beginner', '4 weeks', NULL, '⚙️', 4.9, 512, FALSE),
  (6, 'Startup Essentials', 'Turn your idea into a successful startup', 'non-formal', 'Entrepreneurship', 'Intermediate', '3 weeks', NULL, '🚀', 4.4, 156, FALSE),
  (7, 'Meditation & Mindfulness', 'Reduce stress and improve mental clarity', 'non-formal', 'Personal Growth', 'Beginner', '2 weeks', NULL, '🧘', 4.7, 278, FALSE);
