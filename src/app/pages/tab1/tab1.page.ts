import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ModelPokedex } from 'src/app/models/pokedex.model';
import { PokedexService } from 'src/app/services/endpoints/pokedex.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public pokemonList: ModelPokedex[] = [];
  public filteredPokemonList: ModelPokedex[] = [];
  public pokemonDetails: any[] = [];
  public showDetails: boolean = false;

  constructor(
    private pokedex: PokedexService,
    private generic: GenericService
  ) {}

  ngOnInit(): void {
    this.getAllPokemon();
  }

  public getAllPokemon(): void {
    this.showDetails = false;
    let index = 1;
    this.generic.showLoading(true);
    this.pokedex.getAllPokemon().subscribe(
      (value) => {
        Object.values(value.results).forEach((element: any) => {
          this.pokemonList.push({
            id: index,
            name: element.name,
          });
          index++;
        });
        this.generic.showLoading(false);
      },
      (err) => {
        this.generic.showLoading(false);
        this.generic.presentToast('Erro na conexão com o servidor.');
      }
    );
  }

  public getPokemonDetails(id: number): void {
    this.showDetails = true;
    this.pokemonDetails = [];

    this.generic.showLoading(true);
    this.pokedex.getPokemonDetails(id).subscribe(
      (value: any) => {
        this.pokemonDetails.push(value);
        this.generic.showLoading(false);
      },
      (err) => {
        this.generic.showLoading(false);
        this.generic.presentToast('Erro na conexão com o servidor.');
      }
    );
  }

  public filterPokemonList(filter: any): void {
    const data = String(filter.detail.value);
    const upperFilter = data.toUpperCase();
    this.filteredPokemonList = this.pokemonList.filter((attr) =>
      attr.name.toUpperCase().includes(upperFilter)
    );
  }

  public toggleShowDetails() {
    this.showDetails = !this.showDetails;
    this.filteredPokemonList = [];
  }
}
