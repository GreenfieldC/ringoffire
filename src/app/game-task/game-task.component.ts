import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
	selector: 'app-game-task',
	templateUrl: './game-task.component.html',
	styleUrls: ['./game-task.component.scss'],
})
export class GameTaskComponent implements OnInit, OnChanges {
	cardAction = [
		{
			title: 'Burning thighs',
			description: '200 squads!',
		},
		{ title: 'You', description: 'You decide, who should do 20 pushups.' },
		{ title: 'Me', description: 'Take a break!' },
		{
			title: 'Burning all',
			description: '50 burpess, 50 squats, 50 pushups, 50 situps!',
		},
		{
			title: 'Burning bum',
			description: '30 lunges. ',
		},
		{ title: 'Together', description: 'Jumping Jacks as fast as possible for 2min' },
		{
			title: 'Together',
			description: 'Jump as high as possible and pull legs to the chest',
		},
		{
			title: 'Burning Abs',
			description: '100 leg levers. No break allowed.',
		},
		{ title: 'Plank', description: 'Plank for 2min' },
		{ title: 'Together', description: 'Jumping Squads for 1min' },
		{ title: 'Together', description: 'Take a 2 minutes break' },
		{
			title: 'Pushups',
			description: '20 pushups',
		},
		{
			title: 'Hanging Challenge together',
			description: 'Hang onto a bar as long as possible.',
		},
	];

	title = '';
	description = '';
	@Input() card: string;

	constructor() {}

	ngOnInit(): void {}

	ngOnChanges(): void {
		if (this.card) {
			console.log('Current card is:', this.card);
			let cardNumber = +this.card.split('_')[1];
			this.title = this.cardAction[cardNumber - 1].title;
			this.description = this.cardAction[cardNumber - 1].description;
		}
	}
}
