export default class SwapiService {
  __apiBase = "https://swapi.dev/api/";

  async getResource(url) {
    const res = await fetch(`${this.__apiBase}${url}`);
    //if res.status NOT from 200 to 290
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recived ${res.status}`);
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`people/`);
    return res.results.map(this.__transformPerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`people/${id}`);
    return this.__transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource(`planets/`);
    return res.results.map(this.__transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`planets/${id}`);
    return this.__transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`starships/`);
    return res.results.map(this.__transformStarship);
  }

  async getStarship(id) {
    const starship = await this.getResource(`starships/${id}`);
    return this.__transformStarship(starship);
  }

  makeId(item) {
    //we dont have id from API! here we take id from URL with regular expression
    const regExp = /\/([0-9]*)\/$/;
    //match return just what we have in reg.Exp
    return item.url.match(regExp)[1];
  }

  __transformPlanet(planet) {
    return {
      id: this.makeId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  }

  __transformStarship(starship) {
    return {
      id: this.makeId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    };
  }

  __transformPerson(person) {
    return {
      id: this.makeId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    };
  }
}
