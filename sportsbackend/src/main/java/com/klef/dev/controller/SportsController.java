package com.klef.dev.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.entity.Player;
import com.klef.dev.service.PlayerService;

@RestController
@RequestMapping("/sportsapi")
@CrossOrigin(origins = "*")
public class SportsController {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/")
    public String home() {
        return "Sports Application Backend API is Running!";
    }

    @PostMapping("/add-player")
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        Player savedPlayer = playerService.addPlayer(player);
        return new ResponseEntity<>(savedPlayer, HttpStatus.CREATED);
    }

    @GetMapping("/players")
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerService.getAllPlayers();
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @GetMapping("/player/{id}")
    public ResponseEntity<?> getPlayerById(@PathVariable int id) {
        Player player = playerService.getPlayerById(id);
        if (player != null) {
            return new ResponseEntity<>(player, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Player with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update-player")
    public ResponseEntity<?> updatePlayer(@RequestBody Player player) {
        Player existing = playerService.getPlayerById(player.getId());
        if (existing != null) {
            Player updatedPlayer = playerService.updatePlayer(player);
            return new ResponseEntity<>(updatedPlayer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Player with ID " + player.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete-player/{id}")
    public ResponseEntity<String> deletePlayer(@PathVariable int id) {
        Player existing = playerService.getPlayerById(id);
        if (existing != null) {
            playerService.deletePlayerById(id);
            return new ResponseEntity<>("Player with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Player with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
