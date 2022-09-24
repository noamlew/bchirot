import { makeData } from "./bchirotDate.js";

const condition1Name = document.getElementById("condition1Name");
const condition2Name = document.getElementById("condition2Name");
const condition3Name = document.getElementById("condition3Name");
const condition4Name = document.getElementById("condition4Name");

const condition1Status = document.getElementById("condition1Status");
const condition2Status = document.getElementById("condition2Status");
const condition3Status = document.getElementById("condition3Status");
const condition4Status = document.getElementById("condition4Status");

const button = document.getElementById("goButton");
const displayPName = document.getElementById("displayPName");
const displayPChoose = document.getElementById("displayPChoose");

let Data;

button.addEventListener("click", () => {
    main();
});
function main() {
    Data = makeData();
    if (condition1Status.value !== "-") {
        filter(condition1Status.value, condition1Name.value);
    }
    if (condition2Status.value !== "-") {
        filter(condition2Status.value, condition2Name.value);
    }
    if (condition3Status.value !== "-") {
        filter(condition3Status.value, condition3Name.value);
    }
    if (condition4Status.value !== "-") {
        filter(condition4Status.value, condition4Name.value);
    }
    let result = counting();
    result = arrange(result);
    display(result);
}

function filter(status, name) {
    let newData = [];
    if (status === "V") {
        Data.forEach((oneChoose) => {
            oneChoose.forEach((oneName) => {
                if (oneName === name) {
                    newData.push(oneChoose);
                }
            });
        });
    } else {
        Data.forEach((oneChoose) => {
            let notIn = false;
            oneChoose.forEach((oneName) => {
                if (oneName === name) {
                    notIn = true;
                }
            });
            if (notIn === false) {
                newData.push(oneChoose);
            }
        });
    }
    Data = newData;
}

function counting() {
    let count = {};
    Data.forEach((oneChoose) => {
        oneChoose.forEach((oneName) => {
            if (count[oneName] === undefined) {
                count[oneName] = 1;
            } else {
                count[oneName] = count[oneName] + 1;
            }
        });
    });
    return count;
}

function arrange(res) {
    let newResult = {};
    let bigest = [0, ""];
    while (Object.keys(res).length !== 0) {
        for (const oneName in res) {
            if (res[oneName] > bigest[0]) {
                bigest[0] = res[oneName];
                bigest[1] = oneName;
            }
        }
        newResult[bigest[1]] = bigest[0];
        delete res[bigest[1]];
        bigest[0] = 0;
    }
    return newResult;
}

function display(res) {
    let str = "";
    for (const oneName in res) {
        str += `${oneName} : ${res[oneName]} <br />`;
    }
    displayPName.innerHTML = str;
    str = "";
    Data.forEach((oneChoose) => {
        oneChoose.forEach((oneName) => {
            if (oneName !== oneChoose[oneChoose.length - 1]) {
                str += `${oneName}, `;
            } else {
                str += `${oneName}`;
            }
        });
        str += `<br />`;
    });
    console.log(str);
    displayPChoose.innerHTML = str;
}
