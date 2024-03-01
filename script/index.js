console.log('index.js is working');

// listing of total sits
let availableSitCount = document.getElementById('total-sit-left');
let availableSitCountTextElement = availableSitCount.innerText;
let availableSits = 40;
// listing of sit counts
let selectedSitCount = document.getElementById('selected-sit-count');
let selectedSitCountTextElement = selectedSitCount.innerText;
let selectedSits = 0;
let totalTicketPrice = 0;


// add the click event listener for the whole document
document.addEventListener('click', getSelectedSit);

// define the collection of the ids of the sit div.
let busSitIdCollectionIds = [
    "a1", "a2", "a3", "a4",
    "b1", "b2", "b3", "b4",
    "c1", "c2", "c3", "c4",
    "d1", "d2", "d3", "d4",
    "e1", "e2", "e3", "e4",
    "f1", "f2", "f3", "f4",
    "g1", "g2", "g3", "g4",
    "h1", "h2", "h3", "h4",
    "i1", "i2", "i3", "i4",
    "j1", "j2", "j3", "j4"
];

// define an empty array that will store the ids of selected sits
let selectedSitIdArray = [];
console.log(selectedSitIdArray);

function addTicketList(data) {
    let newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'add-ticket-container');
    newDiv.setAttribute('class', 'add-ticket-container-div flex justify-between');

    newDiv.innerHTML = `<p>${data}</p><p>economy</p><p>550</p>`;
    console.log(newDiv);


    let parentDiv = document.getElementById('ticket-details');
    parentDiv.appendChild(newDiv);
    parentDiv.appendChild(newDiv);
    console.log(parentDiv);

}

// define the function that will take the click event
function getSelectedSit(event) {
    // console.log(event) will console out the whole object of the event click in the Document.

    // define variable to target the id from event occuring element.
    const clickedElementId = event.target.id;

    // check if the id is included inside the ids of our busSitCollectionIds array.
    const checkInclusion = busSitIdCollectionIds.includes(clickedElementId);

    let isSeatAlreadySelected = selectedSitIdArray.includes(clickedElementId);

    // if there is an id and is included in the array execute this
    if (checkInclusion) {

        let initialSitCount = selectedSitIdArray.length;
        console.log('initial sit count', initialSitCount);

        if (!isSeatAlreadySelected && selectedSitIdArray.length <= 4) {
            // console.log('clickedElementId :', clickedElementId);
            // push the ids into the empty array.
            selectedSitIdArray.push(clickedElementId);
            console.log(isSeatAlreadySelected);

            //if the amount of selected sit is less or equal to 4 and the selection status is true
            if (selectedSitIdArray.length <= 4) {
                // selecting a sit and other processes;

                // check the selected seat id
                console.log('clickedElementId :', clickedElementId);
                document.getElementById(clickedElementId).setAttribute('disabled', true);

                // the array containing selected seats;
                console.log('selectedSitIdArray: ', selectedSitIdArray);

                let finalSitCount = selectedSitIdArray.length;
                let sitDifference = finalSitCount - initialSitCount;
                console.log('final sit count: ', finalSitCount);
                console.log('sitCountDifference: ', sitDifference);

                // change the text ands bg color of the seat
                document.getElementById(clickedElementId).style.backgroundColor = '#1dd100';
                document.getElementById(clickedElementId).style.color = '#fff';

                // deducting the sit numbers
                // availableSits = availableSits - 1;
                availableSits = availableSits - 1;
                availableSitCount.innerText = availableSits;
                console.log(availableSits);

                // selectedSits = selectedSits + 1;
                selectedSits = selectedSits + 1;
                selectedSitCount.innerText = selectedSits;
                console.log(selectedSits);


                // adding ticket for billing
                let ticketPrice = 550;

                let newDiv = document.createElement('div');
                newDiv.setAttribute('id', 'add-ticket-container');
                newDiv.setAttribute('class', 'add-ticket-container-div flex flex-row justify-between');

                newDiv.innerHTML = `<p>${clickedElementId.toUpperCase()}</p><p>economy</p><p>${ticketPrice}</p>`;
                console.log(newDiv);

                let parentDiv = document.getElementById('ticket-details');
                parentDiv.appendChild(newDiv);
                parentDiv.appendChild(newDiv);
                console.log(parentDiv);

                totalTicketPrice = totalTicketPrice + ticketPrice;
                document.getElementById('total-ticket-price').innerText = totalTicketPrice;
                console.log('total ticket price: ', totalTicketPrice);


            } else {
                console.log('Sit limit exceeded')

            }

        } else if (isSeatAlreadySelected) {

            // disselecting a seat and other processes;
            let sitToRemove = clickedElementId;
            console.log('Sit removed of id', sitToRemove);


            let indexOfTheSitToRemove = selectedSitIdArray.indexOf(sitToRemove);
            console.log(indexOfTheSitToRemove);

            selectedSitIdArray.splice(indexOfTheSitToRemove, 1);
            console.log(selectedSitIdArray);

            // clear the bg color of deselected
            document.getElementById(clickedElementId).style.backgroundColor = '';


            // adding the sit numbers
            // availableSits = availableSits + 1;
            availableSits = availableSits + 1;
            availableSitCount.innerText = availableSits;
            console.log(availableSits);

            // selectedSits = selectedSits - 1;
            selectedSits = selectedSits - 1;
            selectedSitCount.innerText = selectedSits;
            console.log(selectedSits);


        } else {
            console.log('Hey stop selection sit for no reason');
        }


    }
    // if there is an id but does not included in the array .
    else if (clickedElementId && !checkInclusion) {
        // console.log('Not included');

    }
    // if there is no id at all 
    else {
        console.log('No id');
    }

}

console.log('selected sit idssss', selectedSitIdArray);
console.log(selectedSitIdArray.length);


// coupon status check and final calculations
document.getElementById('coupon-check-btn').addEventListener('click', function () {
    let couponInputFieldText = document.getElementById('coupon-input-field');
    let couponCodeAll = couponInputFieldText.value;
    let couponCode = couponCodeAll.toUpperCase();
    console.log('coupon code input value is: ', couponCode);
    let paymentOne = totalTicketPrice - (totalTicketPrice * (15 / 100));
    let paymentTwo = totalTicketPrice - (totalTicketPrice * (20 / 100));


    document.getElementById('total-ticket-price').innerText = totalTicketPrice;
    if (couponCode === '' && couponCode === '') {
        document.getElementById('grand-total-ticket-price').innerText = totalTicketPrice;
    } else {

        if (couponCode === 'NEW15' && totalTicketPrice > 550) {
            console.log("payment new15", paymentOne);
            document.getElementById('grand-total-ticket-price').innerText = paymentOne;

        } else if (couponCode === 'COUPLE20' && totalTicketPrice > 550) {
            console.log("payment couple20", paymentTwo);
            // document.getElementById('total-ticket-price').innerText = totalTicketPrice;
            document.getElementById('grand-total-ticket-price').innerText = paymentTwo;

        } else if (couponCode === 'NEW15' || couponCode === 'COUPLE20') {
            console.log('Please buy more tickets');
        } else if (totalTicketPrice > 550) {
            console.log('Have a great journey');

        } else if (totalTicketPrice < 550) {
            console.log('Please buy a ticket first');
        } else {
            console.log('No coupon applied');
        }

    }

})


// form validations
let nextBtn = document.getElementById('next-btn');
const userInputOne = document.getElementById('user-input-one');
const userInputTwo = document.getElementById('user-input-two');
const userInputThree = document.getElementById('user-input-three');

document.getElementById('success-popup').style.display = 'none';

nextBtn.addEventListener('click', function () {

    if (userInputOne.value.trim() !== '' || userInputTwo.value.trim() !== '' || userInputThree.value.trim() !== '') {

        document.getElementById("header-section").style.display = 'none';
        document.getElementById("main-container-section").style.display = 'none';
        document.getElementById("footer-section").style.display = 'none';

        document.getElementById('success-popup').style.display = '';
    } else {

        alert('Please fill the inputs');
    }

})

function reloadPage() {
    location.reload();
}

// function for linking to the ticketing interface
function triggerAnchorClick() {
    document.getElementById('go-to-ticketing-interface').click();
}

//continue button will continue the ticket buying process again 
document.getElementById('continue-btn').addEventListener('click', function () {

    document.getElementById("header-section").style.display = '';
    document.getElementById("main-container-section").style.display = '';
    document.getElementById("footer-section").style.display = '';

    document.getElementById('success-popup').style.display = 'none';

    triggerAnchorClick();
    reloadPage();

})