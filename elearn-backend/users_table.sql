-- MySQL table for users
-- Students Table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(20),
    state VARCHAR(100),
    city VARCHAR(100),
    country_code VARCHAR(10) DEFAULT '+91',
    bio TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(20),
    state VARCHAR(100),
    city VARCHAR(100),
    country_code VARCHAR(10) DEFAULT '+91',
    bio TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);