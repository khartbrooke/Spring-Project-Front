'use strict'

let createTyranid = async () => {
    fetch("http://localhost:8080/create", { 
        method: 'post',
        headers: {
            "Content-type": "application/json" 
        },
        body: JSON.stringify( 
            {
                "name": tyranidName.value,
                "hiveFleet": hiveFleet.value,
                "points": points.value
            }
        )
    })
        .then(res => res.json())
        .then((data) => console.log(`Request succeeded with JSON response ${data}`))
        .catch((error) => console.log(`Request failed ${error}`))
}
