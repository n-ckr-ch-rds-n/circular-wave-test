"use strict";

var btn = document.getElementById("get-records");
btn.addEventListener("click", buttonHandler);

function buttonHandler () {
  toggleButton(false, btn);
  getRecords();
};

function toggleButton (loaded, element) {
  // fix this method to change the button text
	// should be a generic method i.e. implementation should not alter a specific element
  element.innerHTML = loaded ? "Get next" : "Loading...";
  element.classList.toggle("button-not-loading");
  element.classList.toggle("button-loading");
}

function getRecords () {

  // getting the IDs of the records to fetch is a synchronous operation
  // you don't need to change this call, it should return the IDs
  var ids = Server.getIds();
  // getting each corresponding record is an async operation

  // you can get a SINGLE record by calling Server.getRecord(recordId, callbackFunction)
  // callbackFunction takes 2 parameters, error and data
  // invocation as follows
  var allTheRecords = [];

  ids.forEach((id) => {
    Server.getRecord(id, function (error, data) {
      if (!error) {
        allTheRecords.push(data);
        if (allTheRecords.length === ids.length) {
          processRecords(allTheRecords);
        }
      } else {
        console.log(error);
      }
    });
  })


  // you need to make sure the list is not rendered until we have the records...but need to allow for any fetch errors or app will hang
	// i.e. a record you request might not exist - how would you allow for this?
	// when you have the records, call processRecords as follows
  // processRecords(allTheRecords);
}


function processRecords (records) {

  toggleButton(true, btn);
  var sortedRecords = sortRecords(records);
  var html = "";
  var tr;
  sortedRecords.forEach(function (index, value, array) {
    tr = "";
    tr +=
      "<tr>" +
        "<td>" + value.date + "</td>" +
        "<td>" + value.name + "</td>" +
        "<td>" + value.natInsNumber + "</td>" +
        "<td>" + value.hoursWorked + "</td>" +
        "<td>" + value.hourlyRate + "</td>" +
        "<td>" + (value.hoursWorked * value.hourlyRate) + "</td>" +
      "</tr>";
    html += tr;
  });
  document.getElementById("results-body").innerHTML = html;
  addTotals(sortedRecords);
}

function sortRecords (records) {
  records.sort(function(a, b) {
    a = new Date(a.date.split("/")[2], a.date.split("/")[1]-1, a.date.split("/")[0]);
    b = new Date(b.date.split("/")[2], b.date.split("/")[1]-1, b.date.split("/")[0]);
    return a>b ? 1 : a<b ? -1 : 0;
  });
  return records;
}

function addTotals (records) {

  var hours = 0;
  var paid = 0;

  records.forEach(function (value, index) {
    hours += value.hoursWorked;
    paid += (value.hoursWorked * value.hourlyRate);
  });

  document.getElementById("totals-annot").innerHTML = "TOTALS";
  document.getElementById("totals-hours").innerHTML = hours;
  document.getElementById("totals-paid").innerHTML = paid;
}
