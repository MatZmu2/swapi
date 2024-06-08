import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameMode, DetailedGameResource } from '../../models/resource.model';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() detailedGameResource?: DetailedGameResource;

  @Input() winner?: DetailedGameResource;

  @Input() selectedResource!: GameMode;

  @Input() isFlipped = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
