import { getAllComputers, addComputerById, getComputerById } from "./get_computers.js"


const outstandingLoanElement = document.getElementById("outstandingLoan");
const buttonGetLoanElement = document.getElementById("buttonGetLoan");

const bankButtonElement = document.getElementById("bankButton");
const workButtonElement = document.getElementById("workButton");
const repayButtonElement = document.getElementById("repayButton");
const payidSpanElement = document.getElementById("payIdSpan");
const spanOfBalanceElement = document.getElementById("spanOfBalance");

const selectComputerElement = document.getElementById("selectComputer");
const buyComputerButtonElement = document.getElementById("buyComputer");
const loanOutstandingElement = document.getElementById("loanOutstanding");

let bankBalance = 0;
let hasLoan = false;
let workPay = 0;
let loanValue = 0;
const addInitalData = () => {

}

/**
 * Listens to a change event of the select list.
 * 
 * @type    {HTMLElement}
 * @listens document#change
 */
buttonGetLoanElement.addEventListener('click', function () {
    let saveLoan = prompt("Take loan");
    
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

/**
 * Listens to a click event of the work button.
 * 
 * @type    {HTMLElement}
 * @listens document#click
 */
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

/**
 * Listens to a click event of the repay loan button.
 * 
 * @type    {HTMLElement}
 * @listens document#click
 */
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
/**
 * Listens to a change event of the select list.
 * 
 * @type    {HTMLElement}
 * @listens document#change
 */
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






















