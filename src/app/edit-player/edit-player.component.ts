import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-edit-player',
	templateUrl: './edit-player.component.html',
	styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent implements OnInit {
	allProfileImages: Array<string> = [
		/* 	'dwarf.png',
		'man_red.png',
		'man_sunglasses.png',
		'woman_blue.png',
		'woman_grey.png', */
		'warrior.png',
		'warrior_horse.png',
		'warrior_red.png',
		'warrior_lion.png',
		'female.png',
		'roman.png',
		'ninja.png',
	];

	constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}

	ngOnInit(): void {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
