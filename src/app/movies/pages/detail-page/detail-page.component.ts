import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavService } from 'src/app/services/fav.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  public movieData?: any;
  displayedColumns: string[] = ['category', 'value'];

  esFavorita: boolean = false;
  arrayIdsMovies: string[] | number[] = [];
  idMovieToFavMap: { [key: string]: string } = {};
  id_movie_actual: string | number = "";

  userActual: User | null = null;
  id_user_Actual: any;
  currentToken: string | null = "";

  permises!: Permises | null;

  constructor(
    private movieService: MovieService,
    private usersService: UsersService,
    private favService: FavService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.getUserPorToken();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id_movie_actual = id
      this.checkFavorita(this.id_movie_actual);

      this.movieService.getMovieByID(this.id_movie_actual).subscribe(
      (respuesta) => {
        if (!respuesta) return this.router.navigate(['/movies/home']);

        this.movieData = respuesta;
        return;
      });
    }
  }

  async getUserPorToken() {
    this.currentToken = localStorage.getItem("token");
    if (this.currentToken) {
      console.log(this.currentToken);

      const RESPONSE = await this.usersService.getUserByToken(localStorage.getItem("token")).toPromise();
      if (RESPONSE !== undefined) {
        if (RESPONSE.permises !== undefined) {
          this.permises = RESPONSE.permises;

          if (RESPONSE.ok) {
            this.userActual = RESPONSE.data[0] as User;
            this.id_user_Actual = this.userActual.id_usuario
            this.usersService.currentUser = this.userActual
          }
        }
      }
    }
  }

  // Metodo para chackear si una pelicula esta como favorita
  async checkFavorita(id_movie: string | number | null) {
    console.log(localStorage.getItem('id_usuario'));
    this.id_user_Actual = localStorage.getItem('id_usuario');
    console.log(this.id_user_Actual);

    const RESPONSE = await this.favService.getFavorito(this.id_user_Actual).toPromise();
    if (RESPONSE !== undefined && RESPONSE.ok) {

      this.arrayIdsMovies = RESPONSE.data.map(
        (item: { id_movie: any, id_fav: any }) => {
          this.idMovieToFavMap[item.id_movie] = item.id_fav;
          return item.id_movie;
      });

      if (id_movie && this.idMovieToFavMap.hasOwnProperty(id_movie)) {
        this.esFavorita = true;
        const id_fav = this.idMovieToFavMap[id_movie];
        console.log(`La película con id_movie ${id_movie} tiene id_fav ${id_fav}`);
      }
    }
  }

  // Metodo para cambiar el estado a favorito o no favorito
  buttonClick(): void {
    if (this.esFavorita) {
      this.quitarFavoritaPorIdMovie(this.id_movie_actual);
      this.esFavorita = false;
    } else {
      this.agregarFavorita(this.id_movie_actual!);
      this.esFavorita = true;
    }
  }

  // metodo para agregar favorito
  async agregarFavorita(id_movie: string | number) {
    if (this.userActual) {
      let idprueba = this.userActual.id_usuario

      const response = await this.favService.addFavorito(idprueba, id_movie).toPromise();
      if (response && response.ok && response?.message) {
        this.snackBar.open("Agregada a favoritas", 'Cerrar', { duration: 5000 });
      } else {
        this.snackBar.open('Error al agregar a favoritas', 'Cerrar', { duration: 5000 });
      }
    }
  }

  // Metodo para quitar un favorito una vez pasado el id de la pelicula
  async quitarFavorita(id_fav: string | number) {
    if (this.userActual) {
      const response = await this.favService.deleteFav(id_fav).toPromise();
      if (response && response.ok && response?.message) {
        this.snackBar.open("Pelicula eliminada de favoritos", 'Cerrar', { duration: 5000 });
      } else {
        this.snackBar.open('Error al eliminar la pelicula de favoritos', 'Cerrar', { duration: 5000 });
      }
    }
  }

  // Metodo para buscar el id de una pelicula favorita
  quitarFavoritaPorIdMovie(id_movie: number | string ) {
    const id_fav = this.idMovieToFavMap[id_movie];
    if (id_fav) {
      this.quitarFavorita(id_fav);
    }
  }

  goBack(): void {
    this.router.navigate(['/movies/home'])
  }
}
