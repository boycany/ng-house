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
                <input type="text" placeholder="Filter by city" #filter />
                <button
                    class="primary"
                    type="button"
                    (click)="filterResults(filter.value)"
                >
                    Search
                </button>
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
                *ngFor="let housingLocation of filteredLocationList"
                [housingLocation]="housingLocation"
            ></app-housing-location>
        </section>
    `,
    styleUrls: ["./home.compoent.css"],
})
export class HomeComponent {
    housingLocationList: HousingLocation[] = [];
    filteredLocationList: HousingLocation[] = [];
    housingService: HousingService = inject(HousingService);

    constructor() {
        this.housingService
            .getAllHousingLocations()
            .then((housingLocationList: HousingLocation[]) => {
                this.housingLocationList = housingLocationList;
                this.filteredLocationList = housingLocationList;
            });
    }

    filterResults(text: string) {
        if (!text) {
            this.filteredLocationList = this.housingLocationList;
        } else {
            this.filteredLocationList = this.housingLocationList.filter(
                (housingLocation) => {
                    return housingLocation?.city
                        .toLowerCase()
                        .includes(text.toLowerCase());
                }
            );
        }
    }

    // onDateChange(event: any) {
    //     console.log(event.target.value);
    // }
}
