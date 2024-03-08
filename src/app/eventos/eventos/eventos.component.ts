import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit{

  public eventos: any = [];
  larguraImagem: number = 150;
  margemImagem: number = 2;
  exibirImagem: boolean = true;
  private _filtroLista: string = '';
  public eventosFiltrados: any = [];

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtarPor: string): any {
    filtarPor = filtarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local:string }) => evento.tema.toLocaleLowerCase().indexOf(filtarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtarPor) !== -1
    )
  }

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.getEventos();
  }

  alterarImagem(){
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.http.get("http://localhost:5210/api/evento").subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );

  }

}
