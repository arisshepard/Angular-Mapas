import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css'],
})
export class MapaEditarComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MapaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) {
    // console.log('Data: ', data);
    this.formulario = formBuilder.group({
      titulo: data.titulo,
      descripcion: data.descripcion,
    });
  }

  ngOnInit(): void {}

  guardarCambios(): void {
    console.log(this.formulario.value);
    this.dialogRef.close(this.formulario.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
