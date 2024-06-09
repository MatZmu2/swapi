import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BASE_URL } from '../configs/base-url.injection-token';
import { SwapiService } from './swapi.service';

describe('StarWarsUniverseService', () => {
  let service: SwapiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        SwapiService,
        {
          provide: BASE_URL,
          useValue: 'https://test-url/api',
        },
      ],
    });
    service = TestBed.inject(SwapiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve people list from the API via GET', () => {
    const dummyPeopleExtract = [{ name: 'Luke Skywalker' }];
    service.getPeople().subscribe((peopleList) => {
      expect(peopleList).toEqual(dummyPeopleExtract);
    });

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/people/?page=1`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyPeopleExtract);
  });

  it('should retrieve starships list from the API via GET', () => {
    const dummyStarshipsExtract = [{ name: 'X-wing' }];
    service.getStarships().subscribe((starshipsList) => {
      expect(starshipsList).toEqual(dummyStarshipsExtract);
    });

    const req = httpTestingController.expectOne(
      `${service['baseUrl']}/starships/?page=1`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyStarshipsExtract);
  });
});