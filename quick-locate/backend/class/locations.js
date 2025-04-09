import { Alert } from "react-native";

export class Locations {

    //This method will return all the free locations available
    async getAllFreeLocations(){
        try {
            const response = await fetch("https://quick-locate.onrender.com/all-free-locations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            console.log(result);
            
            return result
        } catch (error) {
            console.error(error);
            
        }
    }


    //this method works in two different ways
    //if any paramanter is passed, it will return all the locations
    //if a location is passed as paramanter it will return all the items that are addressed in that location
    async getLocations (location = undefined){
        if(!location){
                try {
                const response = await fetch("https://quick-locate.onrender.com/locations", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const result = await response.json()
                console.log(result);
                
                return result
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await fetch(`https://quick-locate.onrender.com/locations/?location=${location}`,  {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const result = await response.json()
                return result
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    // async deleteFreeLocation(code, location){
    //     if(code){
    //         console.log("Remova todos os itens endereçados nessa localização antes de exclui-la!")
    //     }

    //     try {
    //         const response = await fetch("https://quick-locate.onrender.com/delete-free-location", {
    //             method:"PUT",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(location)
    //         })
    //         const result = await response.json()
    //         console.log(result);
    //         return result
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}