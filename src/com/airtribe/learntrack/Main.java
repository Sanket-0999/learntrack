package com.airtribe.learntrack;

import java.util.Scanner;

import com.airtribe.learntrack.entity.Student;
import com.airtribe.learntrack.service.StudentService;
import com.airtribe.learntrack.util.IdGenerator;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        StudentService studentService = new StudentService();

        while (true) {
            System.out.println("\n1. Add Student");
            System.out.println("2. View Students");
            System.out.println("3. Exit");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    System.out.print("First Name: ");
                    String fn = sc.nextLine();

                    System.out.print("Last Name: ");
                    String ln = sc.nextLine();

                    System.out.print("Batch: ");
                    String batch = sc.nextLine();

                    int id = IdGenerator.getStudentId();
                    Student s = new Student(id, fn, ln, batch);

                    studentService.addStudent(s);
                    System.out.println("Student Added!");
                    break;

                case 2:
                    studentService.listStudents();
                    break;

                case 3:
                    System.out.println("Goodbye!");
                    System.exit(0);

                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}