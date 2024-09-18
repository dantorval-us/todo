import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {

  slides = [
    {
      image: 'assets/images/multi-tools.jpg',
      title: '¡Bienvenido a Todo!',
      description: 'Tu aplicación multiherramienta'
    },
    {
      image: 'assets/images/to-do-list-feature.jpg',
      title: 'Lista de tareas',
      description: 'Convierte tus pendientes en logros'
    },
    {
      image: 'assets/images/temporizador-feature.jpg',
      title: 'Temporizador',
      description: 'Tu tiempo, tu control'
    }
  ];

  currentIndex = 0;
  autoplayInterval: any;
  isMouseOver = false;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 4000);
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (this.isMouseOver) {
      if (event.deltaY > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }
  
  @HostListener('mouseenter', ['$event'])
  onMouseEnter() {
    this.isMouseOver = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    this.isMouseOver = false;
  }

}