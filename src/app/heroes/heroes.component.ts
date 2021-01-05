import { Component, OnInit, AfterViewChecked } from '@angular/core';

import * as $$ from '../js/shortLib';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit, AfterViewChecked {
  heroes: Hero[];
  public $$2 = $$;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  setEvent() {
    setTimeout(() => {
      $$.qAll('.notification .delete').forEach((o) => {
        console.log(o);
        $$.oe(o, () => {
          o.parentNode.remove();
        });
      });
    }, 0.1);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      this.setEvent();
    });
  }

  ngAfterViewChecked() {
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
      this.setEvent();
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
