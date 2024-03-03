import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../shared/interfaces/movie.interface';
import { Observable, map, of, tap} from 'rxjs';
import { SearchResponse } from '../shared/interfaces/search-response.interface';
import { URL_API_MOVIES, MOVIES_API_HEADERS} from 'src/environments/environment';
import { PeliculasResponse } from '../shared/interfaces/peliculas-response.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseURL:string ='https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando=false;

  public listadoMovies: Movie[] = [];

  constructor(private http: HttpClient) { }

  // Método que realiza la búsqueda por título y número de página
  getMoviesByQuery(busqueda: string, page: number): Observable<SearchResponse> {
    const busquedaTrim = busqueda.toLocaleLowerCase().trim();
    return this.http.get<SearchResponse>(
      `${URL_API_MOVIES}search/movie?query=${busquedaTrim}&page=${page}`,
      MOVIES_API_HEADERS
    );
  }

  // Método que realiza la búsqueda por titulo
  getMovieByID(id: number | string): Observable<any> {
    return this.http.get<SearchResponse>(`${URL_API_MOVIES}movie/${id}`, MOVIES_API_HEADERS);
  }

  // Método para buscar las peliculas trending que se muestran en el home page
  getTrendingMovies(): Observable<SearchResponse> {
    let randomPage = Math.floor(Math.random() * 500) + 1;
    return this.http.get<SearchResponse>(`${URL_API_MOVIES}trending/movie/week?language=en-US&page=${randomPage}`, MOVIES_API_HEADERS);
  }

  // Metodos para obtener las peliculas en cartelera para el slideshow del home page
  getPeliculas():Observable<Movie[]>{
    if (this.cargando) {
     return of([]);
    }
    this.cargando=true;

    return this.http.get<PeliculasResponse>(`${this.baseURL}/movie/now_playing`,{params:this.params}).pipe(
       map((res)=>res.results),
       tap(()=>{
         this.carteleraPage+=1;
         this.cargando=false;
       })
     );
    }

    get params(){
     return{
      api_key:'13ee2b3b1810d881d34a3d2f4351f448',
        language:'en-US',
        page:this.carteleraPage.toString()
      }
    }
}

