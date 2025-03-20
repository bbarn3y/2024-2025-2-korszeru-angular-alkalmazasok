import {Directive, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appSelected]',
  standalone: false
})
export class SelectedDirective implements OnInit, OnChanges {
  @Input() color: string = 'black';
  @Input() selected = false;

  constructor() { }

  ngOnInit() {
    this.highlight();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.highlight();
  }

  highlight() {
    // @todo
  }

}
