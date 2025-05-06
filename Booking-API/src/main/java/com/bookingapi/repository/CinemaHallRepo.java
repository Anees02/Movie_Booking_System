package com.bookingapi.repository;

import com.bookingapi.entity.CinemaHall;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaHallRepo extends JpaRepository<CinemaHall, String> {
}
