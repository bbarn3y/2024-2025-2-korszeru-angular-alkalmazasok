import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appSelected]',
  standalone: false
})
export class SelectedDirective implements OnInit, OnChanges {
  @Input() color: string = 'black';
  @Input() selected = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.highlight();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes, this.color);
    this.highlight();
  }

  highlight() {
    if (this.selected) {
      this.el.nativeElement.style.border = `3px solid ${this.color}`;
    } else {
      this.el.nativeElement.style.border = 'unset';
    }
  }

}
