import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
	@Input() name: string = '';
	@Input() playerActive: boolean = false;
	@Input() image: string = 'dwarf.png';

	constructor() {}

	ngOnInit(): void {}
}
