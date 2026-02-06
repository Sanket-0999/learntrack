package com.airtribe.learntrack.entity;

public class Person {

    protected int id;
    protected String firstName;
    protected String lastName;
    protected String email;

    public Person() {
    }

    public Person(int id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public String getDisplayName() {
        return firstName + " " + lastName;
    }

    // Getters & Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}