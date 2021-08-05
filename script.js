import { getAllComputers, addComputerById, getComputerById } from "./get_computers.js"


let outstandingLoanElement = document.getElementById("outstandingLoan");
let buttonGetLoanElement = document.getElementById("buttonGetLoan");

let bankButtonElement = document.getElementById("bankButton");
let workButtonElement = document.getElementById("workButton");
let repayButtonElement = document.getElementById("repayButton");
let payidSpanElement = document.getElementById("payIdSpan");
let spanOfBalanceElement = document.getElementById("spanOfBalance");

let selectComputerElement = document.getElementById("selectComputer");
let buyComputerButtonElement = document.getElementById("buyComputer");
let loanOutstandingElement = document.getElementById("loanOutstanding");

let bankBalance = 0;
let hasLoan = false;
let workPay = 0;
let loanValue = 0;
const addInitalData = () => {

}

buttonGetLoanElement.addEventListener('click', function () {
    let saveLoan = prompt("Take loan");
    //Make it a string 
    if (bankBalance !== 0) {
        let maxLoanValue = bankBalance * 2;

        console.log("hasLoan is " + hasLoan);
        console.log("saveLoan is " + saveLoan);
        console.log("maxLoanValue is " + maxLoanValue);
        if (hasLoan == false && saveLoan <= maxLoanValue) {
            loanValue = parseFloat(saveLoan);
            outstandingLoanElement.innerText = saveLoan
            bankBalance += parseFloat(saveLoan);
            spanOfBalanceElement.innerText = bankBalance;

            hasLoan = true;
            document.getElementById("repayButton").hidden = false
            loanOutstandingElement.hidden = false;


        }
        else {
            alert("You can only have one loan")
        }
    }
    else {
        alert("You cannot take a loan")
    }
});

workButtonElement.addEventListener('click', function () {
    workPay += 100;
    payidSpanElement.innerText = workPay;
});

bankButtonElement.addEventListener('click', function () {
    if (!hasLoan) {
        bankBalance += workPay;
        spanOfBalanceElement.innerText = bankBalance;
    }
    else {
        loanValue -= (workPay * 0.1)
        bankBalance += (workPay * 0.9)
    }

    workPay = 0;
    payidSpanElement.innerText = workPay;
    spanOfBalanceElement.innerText = bankBalance
    outstandingLoanElement.innerText = loanValue
});

//Bugg när lånet är betalt och pengarna blir minus blir och outstandig lån
repayButtonElement.addEventListener('click', function () {
    if (hasLoan) {
        if (workPay >= loanValue) {
            workPay -= loanValue;
            loanValue = 0;
            hasLoan = false;
            loanOutstandingElement.hidden = true;
        }
        else {
            loanValue -= workPay;
            workPay = 0;

        }
        outstandingLoanElement.innerText = loanValue;
        payidSpanElement.innerText = workPay;
    }
    else {
        hasLoan = false;
    }

});

selectComputerElement.addEventListener('change', function () {
    let id = selectComputerElement.options[selectComputerElement.selectedIndex].id;
    addComputerById(id);
    console.log(id);
    buyComputerButtonElement.addEventListener('click', function () {
        getComputerById(id).then(data => {
            if (bankBalance >= data.price) {
                bankBalance -= data.price;
                spanOfBalanceElement.innerText = bankBalance;
                alert("NICE new Kompjutro")
            }
            else {
                alert("You cant afford this Kompjutro")
            }

        })

    });

});

window.addEventListener("load", addInitalData, false);
window.addEventListener("load", getAllComputers, false);






















