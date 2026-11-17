CREATE TABLE classrooms (id TEXT PRIMARY KEY NOT NULL, owner_id TEXT NOT NULL, name TEXT NOT NULL, grade INTEGER NOT NULL, join_code TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL);
--> statement-breakpoint
CREATE INDEX classrooms_owner ON classrooms(owner_id);
--> statement-breakpoint
CREATE TABLE students (id TEXT PRIMARY KEY NOT NULL, class_id TEXT NOT NULL REFERENCES classrooms(id), name TEXT NOT NULL, token_hash TEXT NOT NULL UNIQUE, created_at INTEGER NOT NULL, last_seen INTEGER NOT NULL);
--> statement-breakpoint
CREATE INDEX students_class ON students(class_id);
--> statement-breakpoint
CREATE TABLE study_events (id TEXT NOT NULL, student_id TEXT NOT NULL REFERENCES students(id), lesson_id TEXT, word_id TEXT, kind TEXT NOT NULL, known INTEGER, created_at INTEGER NOT NULL, PRIMARY KEY(student_id,id));
--> statement-breakpoint
CREATE INDEX study_events_student_lesson ON study_events(student_id,lesson_id);
--> statement-breakpoint
CREATE TABLE attempts (id TEXT NOT NULL, student_id TEXT NOT NULL REFERENCES students(id), kind TEXT NOT NULL, created_at INTEGER NOT NULL, PRIMARY KEY(student_id,id));
--> statement-breakpoint
CREATE TABLE answers (student_id TEXT NOT NULL, attempt_id TEXT NOT NULL, word_id TEXT NOT NULL, lesson_id TEXT NOT NULL, choice_id TEXT NOT NULL, correct INTEGER NOT NULL, PRIMARY KEY(student_id,attempt_id,word_id), FOREIGN KEY(student_id,attempt_id) REFERENCES attempts(student_id,id));
--> statement-breakpoint
CREATE INDEX answers_student_lesson ON answers(student_id,lesson_id);
