import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	collection,
	setDoc,
	doc,
	Firestore,
	addDoc,
} from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Component({
	selector: 'app-start-screen',
	templateUrl: './start-screen.component.html',
	styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
	constructor(private router: Router) {}
	private firestore: Firestore = inject(Firestore);

	ngOnInit(): void {}

	async newGame() {
		//start game
		let game = new Game(); //initiate game
		const coll = collection(this.firestore, 'games'); //get collection of games

		let gameInfo = await addDoc(coll, game.toJson()); // addDov returns gameinfo
		this.router.navigateByUrl('/game/' + gameInfo.id);
	}
}
