# LearnTrack – Student & Course Management System (Core Java)

LearnTrack is a console-based application built using Core Java that allows administrators to manage students, courses, and enrollments.  
This project focuses on strengthening Java fundamentals and Object-Oriented Programming concepts.

---

## 🚀 Features

### Student Management
- Add new student
- View all students
- Search student by ID
- Deactivate student

### Course Management
- Add new course
- View all courses
- Activate / Deactivate course

### Enrollment Management
- Enroll student in a course
- View enrollments for a student
- Update enrollment status (ACTIVE, COMPLETED, CANCELLED)

---

## 🛠 Tech Stack
- Java (JDK 8+)
- Core Java
- ArrayList
- Console Application

---

## 📂 Project Structure

src/  
└── com/airtribe/learntrack  
&nbsp;&nbsp;&nbsp;&nbsp;├── Main.java  
&nbsp;&nbsp;&nbsp;&nbsp;├── entity  
&nbsp;&nbsp;&nbsp;&nbsp;├── service  
&nbsp;&nbsp;&nbsp;&nbsp;├── repository  
&nbsp;&nbsp;&nbsp;&nbsp;├── util  
&nbsp;&nbsp;&nbsp;&nbsp;├── exception  
&nbsp;&nbsp;&nbsp;&nbsp;└── enums

---

## ▶ How To Run

### Using IntelliJ
1. Open project
2. Open Main.java
3. Right-click → Run

### Using Terminal

javac -d out src/com/airtribe/learntrack/Main.java  
java -cp out com.airtribe.learntrack.Main

---

## 📊 Class Diagram (Text UML)

Person  
│  
└── Student

Student 1 ----- * Enrollment  
Course  1 ----- * Enrollment

---

## 🧠 Concepts Used
- Encapsulation
- Inheritance
- Polymorphism
- Static methods
- Exception Handling
- Collections

---

## 📌 Author
Sanket

Project submitted by Sanket