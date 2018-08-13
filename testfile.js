"use strict";

var btn = document.getElementById("get-records");
btn.addEventListener("click", buttonHandler);

function buttonHandler () {
  toggleButton(false, btn);
  getRecords();
};

function toggleButton (loaded, element) {
  element.innerHTML = loaded ? "Get next" : "Loading...";
  element.classList.toggle("button-not-loading");
  element.classList.toggle("button-loading");
}

function getRecords () {
  var ids = Server.getIds();
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
}

function processRecords (records) {

  toggleButton(true, btn);
  var sortedRecords = sortRecords(records);
  var html = "";
  var tr;
  sortedRecords.forEach((record) => {
    tr = "";
    tr +=
      "<tr>" +
        "<td>" + record.date + "</td>" +
        "<td>" + record.name + "</td>" +
        "<td>" + record.natInsNumber + "</td>" +
        "<td>" + record.hoursWorked + "</td>" +
        "<td>" + record.hourlyRate + "</td>" +
        "<td>" + (record.hoursWorked * record.hourlyRate) + "</td>" +
      "</tr>";
    html += tr;
  });
  document.getElementById("results-body").innerHTML = html;
  addTotals(sortedRecords);
}

function sortRecords (records) {
  records.sort((a, b) => {
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
    hours += parseInt(value.hoursWorked);
    paid += (value.hoursWorked * value.hourlyRate);
  });

  document.getElementById("totals-annot").innerHTML = "TOTALS";
  document.getElementById("totals-hours").innerHTML = hours;
  document.getElementById("totals-paid").innerHTML = paid;
}
