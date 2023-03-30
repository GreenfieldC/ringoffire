import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collection, setDoc, doc, Firestore } from '@angular/fire/firestore';
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

	newGame() {
		//start game
		let game = new Game();
		console.log('game', game);
		const coll = collection(this.firestore, 'games');
		console.log('coll', coll);

		setDoc(doc(coll), game.toJson()).then((gameInfo: any) => {
			console.log('gameInfo is', gameInfo);
			this.router.navigateByUrl('/game' + gameInfo.id);
		});
	}
}
