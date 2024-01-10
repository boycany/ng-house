import { Injectable, inject } from "@angular/core";
import { HousingLocation } from "./housinglocation";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class HousingService {
    url = "https://my-json-server.typicode.com/boycany/json-server/locations";

    constructor() {}

    async getAllHousingLocations(): Promise<HousingLocation[]> {
        const data = await fetch(this.url);
        return (await data.json()) ?? [];
    }

    async getHousingLocationById(
        id: number
    ): Promise<HousingLocation | undefined> {
        const data = await fetch(`${this.url}/${id}`);
        return (await data.json()) ?? {};

        // return this.housingLocationList.find(
        // (housingLocation) => housingLocation.id === id
        // );
    }

    submitApplication(firstName: string, lastName: string, email: string) {
        console.log("firstName :>> ", firstName);
        console.log("lastName :>> ", lastName);
        console.log("email :>> ", email);
    }
}
