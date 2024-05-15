import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../features/rating/rating.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,HeaderComponent,RatingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  trendingMovies: any;
  theatreMovies: any;
  popularMovies: any;
  constructor(private router: Router,private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getPopularMovies();
    this.getTheatreMovies();
  }
  getTrendingMovies() {
    this.http
      .get('http://localhost:4200/assets/data/trending-movies.json')
      .subscribe((movies) => {
        this.trendingMovies = movies;
        console.log('trendingMovies', this.trendingMovies)
      });
  }

  getTheatreMovies() {
    this.http
      .get('http://localhost:4200/assets/data/theatreMovies.json')
      .subscribe((movies) => {
        this.theatreMovies = movies;
      });
  }

  getPopularMovies() {
    this.http
      .get('http://localhost:4200/assets/data/popularMovies.json')
      .subscribe((movies) => {
        this.popularMovies = movies;
      });
  }

  goToMovie(type: string,id: string) {
    this.router.navigate(['movie',type,id]);
  }
}
