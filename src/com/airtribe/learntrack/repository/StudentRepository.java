package com.airtribe.learntrack.repository;

import java.util.ArrayList;
import com.airtribe.learntrack.entity.Student;

public class StudentRepository {

    private ArrayList<Student> students = new ArrayList<>();

    public void save(Student student) {
        students.add(student);
    }

    public ArrayList<Student> findAll() {
        return students;
    }

    public Student findById(int id) {
        for (Student s : students) {
            if (s.getId() == id) {
                return s;
            }
        }
        return null;
    }
}