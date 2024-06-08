import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi.service';
import { CardComponent } from '../card/card.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs/operators';
import { GameMode, DetailedGameResourceByMode, DetailedGameResource } from '../../models/resource.model';
import { compareStrings } from '../../utils/integer-parser.utils';
import _ from 'lodash';


interface Score {
  playerOneScore: number;
  playerTwoScore: number;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, ScoreboardComponent, CardComponent, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  selectedMode: GameMode = 'people';

  gameScore: Score = { playerOneScore: 0, playerTwoScore: 0 };

  detailedGameResource: DetailedGameResourceByMode = {
    'people': [],
    'starships': [],
  };

  playerOneResource?: DetailedGameResource;
  playerTwoResource?: DetailedGameResource;

  winner?: DetailedGameResource;

  constructor(private readonly swapiService: SwapiService) {}

  ngOnInit() {
    this.swapiService
      .getStarships()
      .pipe(
        map((starshipsResponse) => {
          return starshipsResponse.results.map(
            (starship) => new DetailedGameResource(starship.name, starship.passengers),
          );
        }),
      )
      .subscribe(
        (starships) => (this.detailedGameResource['starships'] = _.shuffle(starships)),
      );

    this.swapiService
      .getPeople()
      .pipe(
        map((peopleResponse) => {
          return peopleResponse.results.map(
            (person) => new DetailedGameResource(person.name, person.mass),
          );
        }),
      )
      .subscribe(
        (people) => (this.detailedGameResource['people'] = _.shuffle(people)),
      );
  }

  private shuffleResources() {
    this.detailedGameResource[this.selectedMode] = _.shuffle(
      this.detailedGameResource[this.selectedMode],
    );
  }

  private chooseWinner() {
    const playerOneValue = this.playerOneResource?.detailAttribute;
    const playerTwoValue = this.playerTwoResource?.detailAttribute;

    const comparisonValue = compareStrings(playerOneValue, playerTwoValue);

    if (comparisonValue === 1) this.winner = this.playerOneResource;
    else if (comparisonValue === 0) this.winner = this.playerTwoResource;
    else this.winner = undefined;

    this.increaseScore();
  }

  private increaseScore() {
    if (this.winner === this.playerOneResource) {
      this.gameScore.playerOneScore++;
    } else if (this.winner === this.playerTwoResource) {
      this.gameScore.playerTwoScore++;
    }
  }

  resetSelectedResources() {
    this.playerOneResource = undefined;
    this.playerTwoResource = undefined;
    this.winner = undefined;

    setTimeout(() => this.shuffleResources(), 500);
  }

  resetScore() {
    this.gameScore = {
      playerOneScore: 0,
      playerTwoScore: 0,
    };

    this.resetSelectedResources();
  }

  selectResource(selectedResource: DetailedGameResource) {
    if (this.playerOneResource === undefined) {
      this.playerOneResource = selectedResource;
    } else if (
      this.playerTwoResource === undefined &&
      selectedResource !== this.playerOneResource
    ) {
      this.playerTwoResource = selectedResource;
      this.chooseWinner();
    }
  }
}