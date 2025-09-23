package com.klef.dev.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "player")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private int id;

    @Column(name = "player_name", nullable = false, length = 50)
    private String name;

    @Column(name = "player_sport", nullable = false, length = 50)
    private String sport;  // Example: Cricket, Football, Basketball

    @Column(name = "player_team", nullable = false, length = 50)
    private String team;

    @Column(name = "player_country", nullable = false, length = 50)
    private String country;

    @Column(name = "player_experience", nullable = false)
    private int experience; // years of playing

    @Column(name = "player_email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "player_contact", nullable = false, unique = true, length = 20)
    private String contact;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSport() { return sport; }
    public void setSport(String sport) { this.sport = sport; }

    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    @Override
    public String toString() {
        return "Player [id=" + id + ", name=" + name + ", sport=" + sport + ", team=" + team +
                ", country=" + country + ", experience=" + experience +
                ", email=" + email + ", contact=" + contact + "]";
    }
}
