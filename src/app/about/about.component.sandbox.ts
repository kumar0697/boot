import { sandboxOf } from '.angular-playground';
import { AboutComponent } from "./about.component";

export default sandboxOf(AboutComponent)
.add ('About Component' , {
    template: `<app-about></app-about>`
});