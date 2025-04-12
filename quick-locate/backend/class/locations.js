import { Alert } from "react-native";

export class Locations {

    // This method returns all available free locations
    async getAllFreeLocations() {
        try {
            const response = await fetch("https://quick-locate.onrender.com/all-free-locations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            // console.log(result);
            
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    // This method works in two different ways:
    // If no parameter is passed, it returns all locations
    // If a location is passed as parameter, it returns all items addressed in that location
    async getLocations(location = undefined) {
        if(!location) {
            try {
                const response = await fetch("https://quick-locate.onrender.com/locations", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const result = await response.json();
                // console.log(result);
                
                return result;
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await fetch(`https://quick-locate.onrender.com/locations/${location}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                return result;
            } catch (error) {
                console.log(error);
            }
        }
    }

    // async deleteFreeLocation(code, location) {
    //     if(code) {
    //         console.log("Remove all items addressed in this location before deleting it!");
    //     }
    // 
    //     try {
    //         const response = await fetch("https://quick-locate.onrender.com/delete-free-location", {
    //             method: "PUT",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(location)
    //         });
    //         const result = await response.json();
    //         console.log(result);
    //         return result;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}