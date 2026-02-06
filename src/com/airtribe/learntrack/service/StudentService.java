package com.airtribe.learntrack.service;

import com.airtribe.learntrack.entity.Student;
import com.airtribe.learntrack.repository.StudentRepository;
import com.airtribe.learntrack.exception.EntityNotFoundException;

public class StudentService {

    private StudentRepository repo = new StudentRepository();

    public void addStudent(Student student) {
        repo.save(student);
    }

    public void listStudents() {
        for (Student s : repo.findAll()) {
            System.out.println(
                    s.getId() + " | " + s.getDisplayName() +
                            " | Batch: " + s.getBatch() +
                            " | Active: " + s.isActive()
            );
        }
    }

    public Student findStudent(int id) throws EntityNotFoundException {
        Student s = repo.findById(id);
        if (s == null) {
            throw new EntityNotFoundException("Student not found!");
        }
        return s;
    }
}