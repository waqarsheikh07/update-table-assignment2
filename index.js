$(() => {
  $("#add").click(insertion_record);
  $("#reset").click(reset_record);

  $("#update").click(set_update);
  $("#person-table").on("click", "#remove-person", remove_record);
  $("#person-table").on("click", "#update-row", update_record);
});
$(document).ready(function () {
  $("#update").prop("disabled", true);
});
function insertion_record() {
  $("#update").prop("disabled", false);
  insertion(Date.now());
}

function update_record() {
  $("#add").prop("disabled", true);

  var btn = $(this);
  var getRow = btn.closest("tr");
  var id = getRow.attr("id");
  window.tr_id = id;
  var colVal = [];
  console.log("hi");
  $("#" + id)
    .find("td")
    .each(function (index, element) {
      colVal.push($(element).text());
    });
  console.log(colVal);
  $("#name").val(colVal[0]);

  $("#age").val(colVal[2]);
  var gender = colVal[1].toLowerCase();
  console.log("" + gender);
  $("input[value='" + gender + "']").attr("checked", true);
  var city = colVal[3].toLowerCase();
  $("input[value='" + city + "']").attr("selected", true);
  $("#city-op option[value='" + city + "']").prop("selected", true);
}
function set_update() {
  $("#add").prop("disabled", false);
  console.log(window.tr_id + "hi");
  var table_body = $("#person-table tbody");
  var name = $("#name").val();
  var gender = $("input[name='gender']:checked").val();
  var age = $("#age").val();
  var city = $("#city-op").find(":selected").text();

  person = `name:${name} gender:${gender} age:${age}city${city}`;

  var flag =
    isAlpha(name) &&
    letterUPcaseOrLOcase(name) &&
    isAgeLimit(age) &&
    gender &&
    name.length <= 10;
  if (!flag) {
    alert("  characters limit < 10 \n 10 < age < 50\n fill complete");
    return;
  }
  var action = `<button type="button" id="update-row">Update</button>/<button type="button" id="remove-person">Remove</button>`;
  var person_data = ` <tr class="person-row" id=${window.tr_id}>
                  <td><span class="td-font">${name}</span></td>
                  <td><span class="td-font">${gender}</span></td>
                  <td><span class="td-font">${age}</span></td>
                  <td><span class="td-font">${city}</span></td>
                  <td class='action'>${action}</td>
                </tr>`;

  $("#" + window.tr_id).replaceWith(person_data);
}
function remove_record() {
  var id = get_parent("id", "tr", this);

  $("#" + id).remove();
}
function reset_record() {
  $("input[value='male']").attr("checked", false);
  $("input[value='female']").attr("checked", false);

  $("#myform").trigger("reset");
}
// insert
function insertion(id) {
  var table_body = $("#person-table tbody");
  var name = $("#name").val();
  var gender = $("input[name='gender']:checked").val();
  var age = $("#age").val();
  var city = $("#city-op").find(":selected").text();

  person = `name:${name} gender:${gender} age:${age}city${city}`;

  var flag =
    isAlpha(name) &&
    letterUPcaseOrLOcase(name) &&
    isAgeLimit(age) &&
    gender &&
    name.length <= 10;
  if (!flag) {
    alert(
      " characters upCase or lowCase\n characters limit < 10 \n 10 < age < 50\n fill complete"
    );
    return;
  }
  var action = `<button type="button" id="update-row">Update</button>/<button type="button" id="remove-person">Remove</button>`;
  var person_data = ` <tr class="person-row" id=${id}>
                  <td><span class="td-font">${name}</span></td>
                  <td><span class="td-font">${gender}</span></td>
                  <td><span class="td-font">${age}</span></td>
                  <td><span class="td-font">${city}</span></td>
                  <td class='action'>${action}</td>
                </tr>`;
  table_body.append(person_data);
}

function get_parent(child, prent, refrence) {
  return $(refrence).closest(prent).attr(child);
}

// Function to check letters and numbers
function isAlpha(value) {
  //alert(inputtxt);
  var letters = /^[a-zA-Z]+$/;
  if (value.match(letters)) {
    return true;
  } else {
    return false;
  }
}

// Function to check letters and numbers
function isAgeLimit(value) {
  var age = parseFloat(value);
  if (age >= 10 && age <= 50) {
    return true;
  } else {
    return false;
  }
}
function letterUPcaseOrLOcase(name) {
  if (name == name.toUpperCase() || name == name.toLowerCase()) {
    console.log("hi");
    return true;
  }
  return false;
}
