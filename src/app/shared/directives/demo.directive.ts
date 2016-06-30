import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
    selector: '[myHighlight]'
})
export class HighlightDirective {
    private _defaultColor = 'red';
    private el: HTMLElement;
    constructor(el: ElementRef) { this.el = el.nativeElement; }

    @Input('myHighlight') highlightColor: string;  //也可以直接用@Input() myHighlight: string;

    @Input() set defaultColor(colorName: string){  //defaultColor是一个变量名
        this._defaultColor = colorName || this._defaultColor;
    }

    @HostListener('mouseenter') onMouseEnter() {  //父组件触发事件
        this.highlight(this.highlightColor || this._defaultColor); //@Input注入后，变量直接变为成员变量
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }
    private highlight(color: string) {
        this.el.style.backgroundColor = color;
    }
}