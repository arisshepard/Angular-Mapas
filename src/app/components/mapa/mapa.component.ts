import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from '../../classes/marcador.class';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit, OnDestroy {
  marcadores: Marcador[] = [];
  map: google.maps.Map;
  mapClickListener: google.maps.MapsEventListener;
  // zone: NgZone;

  lat = 51.678418;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    // Inicializamos el mapa con un marcadorC
    // const nuevoMarcador = new Marcador(this.lat, this.lng);
    // this.marcadores.push(nuevoMarcador);

    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit(): void {}

  public ngOnDestroy(): void {
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }

  // No funciona de momento a 21/10/2020
  // agregarMarcador(
  //   evento: google.maps.MouseEvent | google.maps.IconMouseEvent
  // ): void {
  //   console.log(evento);
  // }

  // Esto es porque lo otro no funciona
  public agregarMarcador(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener(
      'click',
      (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => {
        const nuevoMarcador = new Marcador(e.latLng.lat(), e.latLng.lng());
        this.marcadores.push(nuevoMarcador);
        this.guardarStorage();
        this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
      }
    );
  }

  public borrarMarcador(i: number): void {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }

  public editarMarcador(marcador: Marcador): void {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '300px',
      data: { titulo: marcador.titulo, descripcion: marcador.descripcion },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;

      this.guardarStorage();

      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });
    });
  }

  private guardarStorage(): void {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
}
