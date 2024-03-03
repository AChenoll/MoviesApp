import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { Movie } from 'src/app/shared/interfaces/movie.interface';


@Component({
  selector: 'movies-home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {

  permises!: Permises | null;

  movies:Movie[] = [];
  moviesSlideShow:Movie[] = [];
  @HostListener('window:scroll',['$event'])
  onScroll(){
    //console.log('hola')

    const pos = (document.documentElement.scrollTop || document.body.scrollTop)*1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if (this.moviesService.cargando) {return;}
      this.moviesService.getPeliculas().subscribe(movies=>{
        this.movies.push(...movies);
      })
    }
  }

  constructor(
    public moviesService: MovieService,
    public usersService: UsersService,
    ) { }

  ngOnInit(): void {
    this.usersService.setUserByToken();
    this.searchTrending();

    this.moviesService.getPeliculas().subscribe(movies=>{

      this.movies = movies;
      this.moviesSlideShow = movies;
    })
  }

  // Método para buscar las peliculas trending que se muestran en el home page
  public searchTrending() {
    this.moviesService.getTrendingMovies().subscribe(
      respuesta => {
        // Almacena los resultados en la variable 'listadoMovies' del servicio
        this.moviesService.listadoMovies = [ ...this.moviesService.listadoMovies, ...respuesta.results ];
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    )
  }
}
