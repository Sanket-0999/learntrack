package com.airtribe.learntrack.util;

public class IdGenerator {

    private static int studentId = 1;
    private static int courseId = 1;
    private static int enrollmentId = 1;

    public static int getStudentId() {
        return studentId++;
    }

    public static int getCourseId() {
        return courseId++;
    }

    public static int getEnrollmentId() {
        return enrollmentId++;
    }
}