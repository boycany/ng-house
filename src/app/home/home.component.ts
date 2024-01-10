import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housinglocation";
import { HousingService } from "../housing.service";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [CommonModule, HousingLocationComponent],
    template: `
        <section>
            <form>
                <input type="text" placeholder="Filter by city" />
                <button class="primary" type="button">Search</button>
                <!-- <input
                    type="date"
                    class="m-5 w-80 border-solid border-2 border-sky-500 rounded-lg p-2"
                    id="datepicker"
                    name="datepicker"
                    (change)="onDateChange($event)"
                /> -->
            </form>
        </section>
        <section class="results">
            <app-housing-location
                *ngFor="let housingLocation of housingLocationList"
                [housingLocation]="housingLocation"
            ></app-housing-location>
        </section>
    `,
    styleUrls: ["./home.compoent.css"],
})
export class HomeComponent {
    housingLocationList: HousingLocation[] = [];
    housingService: HousingService = inject(HousingService);

    constructor() {
        this.housingLocationList = this.housingService.getAllHousingLocations();
    }

    // onDateChange(event: any) {
    //     console.log(event.target.value);
    // }
}
