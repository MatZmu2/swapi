import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { GameMode } from '../../models/resource.model';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  @Input() gameScore = { playerOneScore: 0, playerTwoScore: 0 };
  @Input() isPlaying = false;

  @Output() gameModeChanged = new EventEmitter<GameMode>();
  @Output() resetScore = new EventEmitter<void>();
  @Output() playAgain = new EventEmitter<void>();

  gameMode: GameMode = 'people';
}
