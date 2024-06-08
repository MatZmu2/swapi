import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { SwapiService } from '../../services/swapi.service';
import { EMPTY, of } from 'rxjs';
import { ApiResponse } from '../../models/api-response.interface';
import { DetailedGameResource, Person, Starship } from '../../models/resource.model';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let swapiServiceMock: SwapiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        {
          provide: SwapiService,
          useValue: {
            getStarships: jest.fn(() => EMPTY),
            getPeople: jest.fn(() => EMPTY),
          },
        },
      ],
    }).compileComponents();

    swapiServiceMock = TestBed.inject(SwapiService);

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load starships and people resources', () => {
      const mockStarshipsResponse = {
        results: [{ name: 'Starship 1', passengers: '100' }],
      } as ApiResponse<Starship>;
      const mockPeopleResponse = {
        results: [{ name: 'Person 1', mass: '70' }],
      } as ApiResponse<Person>;

      swapiServiceMock.getStarships = jest.fn(() =>
        of(mockStarshipsResponse),
      );
      swapiServiceMock.getPeople = jest.fn(() => of(mockPeopleResponse));

      component.ngOnInit();

      expect(component.detailedGameResource['starships']).toEqual([
        new DetailedGameResource('Starship 1', '100'),
      ]);
      expect(component.detailedGameResource['people']).toEqual([
        new DetailedGameResource('Person 1', '70'),
      ]);
    });
  });

  describe('resetScore', () => {
    it('should reset the score and call resetSelectedResources', () => {
      const resetSelectedResourcesSpy = jest.spyOn(
        component,
        'resetSelectedResources',
      );

      component.resetScore();

      expect(component.gameScore).toEqual({
        playerOneScore: 0,
        playerTwoScore: 0,
      });
      expect(resetSelectedResourcesSpy).toHaveBeenCalled();
    });
  });

  it('should set playerOneResource if it is undefined', () => {
    const resource = new DetailedGameResource('Resource 1', '100');

    component.selectResource(resource);

    expect(component.playerOneResource).toBe(resource);
  });

  it('should set playerTwoResource and choose winner if playerOneResource is defined', () => {
    const resource1 = new DetailedGameResource('Resource 1', '100');
    const resource2 = new DetailedGameResource('Resource 2', '200');

    component.playerOneResource = resource1;

    component.selectResource(resource2);

    expect(component.playerTwoResource).toBe(resource2);
    expect(component.winner).toBe(resource2);
  });

  it('should increase playerOneScore if playerOneResource wins', () => {
    const resource1 = new DetailedGameResource('Resource 1', '200');
    const resource2 = new DetailedGameResource('Resource 2', '100');

    component.playerOneResource = resource1;
    component.playerTwoResource = resource2;

    component['chooseWinner']();

    expect(component.winner).toBe(resource1);
    expect(component.gameScore.playerOneScore).toBe(1);
  });

  it('should increase playerTwoScore if playerTwoResource wins', () => {
    const resource1 = new DetailedGameResource('Resource 1', '100');
    const resource2 = new DetailedGameResource('Resource 2', '200');

    component.playerOneResource = resource1;
    component.playerTwoResource = resource2;

    component['chooseWinner']();

    expect(component.winner).toBe(resource2);
    expect(component.gameScore.playerTwoScore).toBe(1);
  });

  it('should not increase score if there is no winner', () => {
    const resource1 = new DetailedGameResource('Resource 1', '100');
    const resource2 = new DetailedGameResource('Resource 2', '100');

    component.playerOneResource = resource1;
    component.playerTwoResource = resource2;

    component['chooseWinner']();

    expect(component.winner).toBeUndefined();
    expect(component.gameScore.playerOneScore).toBe(0);
    expect(component.gameScore.playerTwoScore).toBe(0);
  });

});
