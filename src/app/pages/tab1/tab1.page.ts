import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
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
  public typeList: any[] = [];
  public abilityList: any[] = [];
  public showDetails: boolean = false;
  public currentGeneration: number = 1;

  constructor(
    private pokedex: PokedexService,
    private generic: GenericService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.getAllPokemon('1');
  }

  public getAllPokemon(gen: string): void {
    const generation = Number(gen)
    this.currentGeneration = generation;
    this.pokemonList = [];

    this.showDetails = false;
    this.generic.showLoading(true);
    this.pokedex.getAllPokemon(generation).subscribe(
      (value) => {
        console.log(value)
        Object.values(value.pokemon_species).forEach((element: any) => {
          const id = element.url.split('pokemon-species')[1].replaceAll('/', '').trim()

          this.pokemonList.push({
            id,
            name: element.name,
          });
        });
        console.log(this.pokemonList)
        this.pokemonList.sort((a,b) => Number(a.id) > Number(b.id) ? 1 : -1);
        const last = this.pokemonList.findIndex(x => x.id == 899)
        this.pokemonList.splice(last)
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
        console.log(this.pokemonDetails)
      },
      (err) => {
        this.generic.showLoading(false);
        this.generic.presentToast('Erro na conexão com o servidor.');
      }
    );
  }

  public getTypeDetails(url: string): void {
    this.typeList = [];

    this.generic.showLoading(true);
    this.pokedex.getTypesDetails(url).subscribe(
      (value: any) => {
        this.typeList.push(value);
        this.generic.showLoading(false);
        console.log(this.typeList)
      },
      (err) => {
        this.generic.showLoading(false);
        this.generic.presentToast('Erro na conexão com o servidor.');
      }
    );
  }

  public getAbilityDetails(url: string): void {
    this.abilityList = [];

    this.pokedex.getTypesDetails(url).subscribe(
      (value: any) => {
        this.abilityList.push(value);
        console.log(this.abilityList);
      },
      (err) => {
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
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }
}
