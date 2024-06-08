import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { NgClass, NgForOf, NgStyle } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NgForOf,
    NgClass,
    NgStyle,
    GameComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent { }
