package com.airtribe.learntrack.entity;

public class Student extends Person {

    private String batch;
    private boolean active;

    // Constructor without email
    public Student(int id, String firstName, String lastName, String batch) {
        super(id, firstName, lastName, null);
        this.batch = batch;
        this.active = true;
    }

    // Constructor with email
    public Student(int id, String firstName, String lastName, String email, String batch) {
        super(id, firstName, lastName, email);
        this.batch = batch;
        this.active = true;
    }

    // Overriding
    @Override
    public String getDisplayName() {
        return "Student: " + firstName + " " + lastName;
    }

    public String getBatch() {
        return batch;
    }

    public boolean isActive() {
        return active;
    }

    public void deactivate() {
        this.active = false;
    }
}