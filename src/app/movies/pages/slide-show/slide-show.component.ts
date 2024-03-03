import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/shared/interfaces/movie.interface';
import Swiper from 'swiper';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit,AfterViewInit {

  @Input() movies?:Movie[];
  mySwiper?:Swiper;
  movie:Movie[]=[];

  constructor(private router: Router) { }
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper', {
      loop: true,
    });
  }
  ngOnInit(): void {  }

  onSlidePrev(){
    this.mySwiper?.slidePrev();
  }

  onSlideNext(){
    this.mySwiper?.slideNext();
  }

  onMovieClick(movie:Movie){
    this.router.navigate(['/movies/', movie.id])
  }
}
