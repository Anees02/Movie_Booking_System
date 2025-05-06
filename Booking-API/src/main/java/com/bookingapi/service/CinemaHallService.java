package com.bookingapi.service;

import com.bookingapi.entity.CinemaHall;
import com.bookingapi.entity.Movie;
import com.bookingapi.entity.Seat;
import com.bookingapi.repository.CinemaHallRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CinemaHallService {

    @Autowired
    private CinemaHallRepo cinemaHallRepository;

    public CinemaHall createCinemaHall(CinemaHall hall) {
        List<Seat> seats = new ArrayList<>();
        for (int i = 1; i <= 30; i++) {
            Seat seat = new Seat();
            seat.setSeatNumber("s: " + i);
            seat.setBooked(false);
            seat.setCinemaHall(hall);
            seats.add(seat);
        }
        hall.updateSeats(seats);
        return cinemaHallRepository.save(hall);
    }

    public List<CinemaHall> getCinemaHalls(){
        return this.cinemaHallRepository.findAll();
    }

    public CinemaHall getCinemaHall(String id){
        return this.cinemaHallRepository.findById(id).get();
    }
}
