package com.bookingapi.service;


import com.bookingapi.entity.Movie;
import com.bookingapi.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;


    public void addMovie(Movie movie){
        this.movieRepository.save(movie);
    }

    public Movie getMovie(Long id){
        return this.movieRepository.findById(id).get();
    }
}
