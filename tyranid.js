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

        showTyranids
}

let getTyranids = async () => {
    let response = await fetch('http://localhost:8080/getAll');
    if (response.status !== 200) {
        throw new Error("Request has failed!");

    }
    console.log("Request Successful");
    let jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}

const paragraphToSelect = document.querySelector("#dataPara");

let showTyranids = async () => {
    let returnedData = await getTyranids();
    //Adding additional clear to remove "no data shown about output"
    paragraphToSelect.innerHTML = "";
    //Ita through the json data
    returnedData.forEach(printTyranids);
}

function printTyranids(value) {
    let div = document.createElement("div")
    div.innerHTML = `Name: ${value.name}, HiveFleet: ${value.hiveFleet}, Points: ${value.points}, <input type="button" value="Edit" onclick="showUpdate(${value.id})"> <input type="button" value="Delete" onclick="deleteTyranid(${value.id})">`;
    paragraphToSelect.append(div);
}

let updateId = 0

function showUpdate(id) {
    updateId = id
    updateTyranidBox.style.visibility = "visible"
}

function cancelUpdate() {
    updateTyranidBox.style.visibility = "hidden"
}

function saveUpdate() {
    fetch("http://localhost:8080/replace/" + updateId, {
        method: 'put',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                "name": updateName.value,
                "hiveFleet": updateHiveFleet.value,
                "points": updatePoints.value
            }
        )
    })
        .then(res => res.json())
        .then((data) => console.log(`Request succeeded with JSON response ${data}`))
        .catch((error) => console.log(`Request failed ${error}`))
};


function deleteTyranid(id) {
    fetch("http://localhost:8080/remove/" + id, {
        method: 'delete'
    })
        .then((data) => {
            console.log(`Request succeeded with JSON response ${data}`);
            // some function to execute if successful
        })
        .catch((error) => {
            //some function to execute if error
        });
}
