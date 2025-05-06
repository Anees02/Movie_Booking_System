package com.bookingapi.controller;


import com.bookingapi.entity.CinemaHall;
import com.bookingapi.entity.Movie;
import com.bookingapi.entity.Seat;
import com.bookingapi.repository.SeatRepo;
import com.bookingapi.service.AWSservice;
import com.bookingapi.service.CinemaHallService;
import com.bookingapi.service.MovieService;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.annotation.MultipartConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class CinemaController {
    @Autowired
    private MovieService movieService;

    @Autowired
    AWSservice awsService;

    @Autowired
    SeatRepo seatRepo;


    @Autowired
    private CinemaHallService cinemaHallService;

    @PostMapping("/movie/{cinema_hall_id}")
    public ResponseEntity<String> addMovie(@RequestPart Movie movie, @RequestPart("image") MultipartFile image, @PathVariable String cinema_hall_id){
        String url =awsService.uploadFile(image);
        movie.setUrl(url);

        movieService.addMovie(movie);

        CinemaHall currCinemaHall = this.cinemaHallService.getCinemaHall(cinema_hall_id);

        currCinemaHall.setMovie(movie);
        this.cinemaHallService.createCinemaHall(currCinemaHall);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/halls")
    public List<CinemaHall> getHalls(){
        return this.cinemaHallService.getCinemaHalls();
    }

    @PostMapping("/seat/{id}")
    public ResponseEntity<String> bookSeats(@RequestBody List<Long> seats, @PathVariable String id){
        CinemaHall hall = cinemaHallService.getCinemaHall(id);

        for(Long dd: seats){
            Seat seat = seatRepo.findById(dd).get();

            seat.setBooked(true);

            seatRepo.save(seat);
        }

        return ResponseEntity.ok("Success");
    }

}
