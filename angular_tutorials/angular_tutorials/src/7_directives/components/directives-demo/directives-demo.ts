import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-directives-demo',
  imports: [CommonModule, FormsModule],
  // imports: [NgClass, NgStyle, FormsModule],
  templateUrl: './directives-demo.html',
  styleUrl: './directives-demo.scss'
})
export class DirectivesDemo {
    num:number = 0;
    currentClasses = {green:true, large: true, small:false, red: false}

    increment(){
        this.num++;
        // update css classes
        this.updateClasses();
    }


    updateClasses(){
        if(this.num%2==0){
            // small, green
            this.currentClasses.green = true;
            this.currentClasses.small = true;
            this.currentClasses.red = false;
            this.currentClasses.large = false;
        } else {
            // large, red
            this.currentClasses.green = false;
            this.currentClasses.small = false;
            this.currentClasses.red = true;
            this.currentClasses.large = true;
        }
    }
}
