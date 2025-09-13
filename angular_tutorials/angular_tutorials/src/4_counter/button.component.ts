import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-button",
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.scss"
})
export default class ButtonComponent{
    @Input()
    text:string = "mango"

    @Output()
    hangleclick = new EventEmitter<number>();

    dotask(){
        this.hangleclick.emit();
    }
}