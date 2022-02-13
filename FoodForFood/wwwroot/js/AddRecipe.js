
//==============General JS Code================
function buildDinnerSection() {
    var container = document.createElement("div");
    container.className = "text-center sections"
    container.style.display = "none";
    container.id = "DinnerSection";

    //----------Name and Times------------
    var dinTexts = document.createElement("table");
    dinTexts.style.marginLeft = "auto";
    dinTexts.style.marginRight = "auto";

    var texts = document.createElement("tr")
    texts.appendChild(createInputBoxCell("Recipe Name...", "text"))
    texts.appendChild(createSpacerCell());
    var cell = createInputBoxCell("Hours", "number", "87px")
    var cell2 = createInputBoxCell("Mins", "number", "87px", true)
    cell2.style.marginLeft = "1px"
    cell.appendChild(cell2)
    texts.appendChild(cell)
    dinTexts.appendChild(texts);
    container.appendChild(dinTexts);
    //------------------------------------

    //---------Spoons----------------------
    var dinSpoons = document.createElement("table");
    dinSpoons.style.marginLeft = "auto";
    dinSpoons.style.marginRight = "auto";

    var spoons = document.createElement("tr");
    spoons.appendChild(createSpoonCell("Cooking Effort"))
    spoons.appendChild(createSpacerCell());
    spoons.appendChild(createSpoonCell("Cleanup Required"))

    dinSpoons.appendChild(spoons);
    container.appendChild(dinSpoons);
    //-------------------------------------

    //---------Protein----------------------
    var dinProteins = document.createElement("table");
    dinProteins.style.marginLeft = "auto";
    dinProteins.style.marginRight = "auto";

    var proteins = document.createElement("tr");
    proteins.appendChild(createProteinCell("dinProteinSelect", 3))

    dinProteins.appendChild(proteins);
    dinProteins.appendChild(createSpacerRow())
    container.appendChild(dinProteins);
    //-------------------------------------
    
    //---------checkboxes----------------------
    var dinBoxes = document.createElement("table");
    dinBoxes.style.marginLeft = "auto";
    dinBoxes.style.marginRight = "auto";

    var checkboxes = document.createElement("tr");
    checkboxes.appendChild(createCheckboxCell("Novice Friendly?", "left", false));
    checkboxes.appendChild(createSpacerCell());
    checkboxes.appendChild(createCheckboxCell("Requires Side(s)?", "right", true));

    dinBoxes.appendChild(checkboxes);
    container.appendChild(dinBoxes);
    //-------------------------------------

    //---------Textareas---------------------
    var dinAreas = document.createElement("table");
    dinAreas.style.marginLeft = "auto";
    dinAreas.style.marginRight = "auto";

    var notes = document.createElement("tr")
    notes.appendChild(createTextareaCell("Notes", 60, 5, 3))
    dinAreas.appendChild(notes);

    var ingredients = document.createElement("tr")
    ingredients.appendChild(createTextareaCell("Ingredients", 25, 10, 1))
    ingredients.appendChild(createSpacerCell());
    ingredients.appendChild(createTextareaCell("Directions", 50, 10, 1))
    dinAreas.appendChild(ingredients);

    container.appendChild(dinAreas);
    //-------------------------------------
    
    document.body.appendChild(container);
    initProteinCell("#dinProteinSelect");
}

//===========Dynamic Form Functions================

function createInputBoxCell(placeholder, type, width, skipCell) {

    var td = document.createElement("td");
    var input = document.createElement("input");
    input.type = type
    input.style.width = width != undefined ? width : "175px";
    input.placeholder = placeholder
    input.className = "dataToCollect"

    if (skipCell) {
        return input;
    }

    td.appendChild(input);
    return td;
}
function createSpoonCell(label) {
    var td = document.createElement("td");

    var lbl = createLabel(label)
    var div = document.createElement("div");
    div.style.height = "10px";

    td.appendChild(lbl);
    td.appendChild(document.createElement("br"));
    td.appendChild(div)

    var span = document.createElement("span");

    for (var i = 0; i < 5; i++) {
        var img = document.createElement("img");
        img.setAttribute("order", (i + 1));
        img.style.width = "25px";
        img.style.height = "auto";
        img.src = "./Statics/spoonOutline.svg";
        span.appendChild(img);
    }

    $(span.children).on("click", function () {
        $(this).parent().children().attr("src", "./Statics/spoonOutline.svg")
        var num = parseInt($(this).attr("order"))
        $(this).parent().attr("lastClicked", num)
        $(this).parent().children(":lt(" + num + ")").attr("src", "./Statics/spoonFilled.svg")
    })

    $(span.children).hover(
        function () { //on enter
            $(this).parent().children().attr("src", "./Statics/spoonOutline.svg")
            var num = parseInt($(this).attr("order"))
            $(this).parent().children(":lt(" + num + ")").attr("src", "./Statics/spoonFilled.svg")
        },
        function () {//on exit
            var num = $(this).parent().attr("lastClicked")
            num = num != undefined ? parseInt(num) : 0;
            $(this).parent().children().attr("src", "./Statics/spoonOutline.svg")
            $(this).parent().children(":lt(" + num + ")").attr("src", "./Statics/spoonFilled.svg")
        }
    )

    td.appendChild(span)
    td.appendChild(document.createElement("br"))

    var small2 = document.createElement("small");
    var i = document.createElement("i");
    var p = document.createElement("p");

    p.style.cursor = "pointer";
    p.style.fontSize = "10px";
    p.innerText = "(Clear Selection)"

    $(p).on("click", function () {
        $(this).parent().parent().parent().children("span").attr("lastClicked", "0")
        $(this).parent().parent().parent().children("span").children().attr("src", "./Statics/spoonOutline.svg")
    })

    i.appendChild(p);
    small2.appendChild(i);
    td.appendChild(small2)

    return td;
}
function createProteinCell(guid, colspan) {
    var cell = document.createElement("td");
    cell.colSpan = colspan
    var select = document.createElement("div")
    select.width = "175px;"
    select.id = guid;
    cell.appendChild(select);
    return cell
}
function initProteinCell(guid) {
    VirtualSelect.init({
        ele: guid,
        search: true,
        multiple: true,
        placeholder: "Select the Protiens",
        options: [
            { label: "Beef", value: "Beef" },
            { label: "Lamb", value: "Lamb" },
            { label: "Pork", value: "Pork" },
            { label: "Ham", value: "Ham" },
            { label: "Chicken", value: "Chicken" },
            { label: "Turkey", value: "Turkey" },
            { label: "Duck", value: "Duck" },
            { label: "Fish", value: "Fish" },
            { label: "Shrimp", value: "Shrimp" },
            { label: "Lobster", value: "Lobster" },
            { label: "Shellfish", value: "Shellfish" },
            { label: "Eggs", value: "Eggs" },
            { label: "Milk", value: "Milk" },
            { label: "Yogurt", value: "Yogurt" },
            { label: "Cheese", value: "Cheese" },
            { label: "Nuts", value: "Nuts" },
            { label: "Beans", value: "Beans" },
            { label: "Legumes", value: "Legumes" },
            { label: "Tofu", value: "Tofu" },
            { label: "Other", value: "Other" }
        ],
    });
}
function createCheckboxCell(text, textSide, checkedByDefault) {
    var cell = document.createElement("td");

    var label = document.createElement("label");
    label.innerText = text;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    checkbox.checked = checkedByDefault;

    if (textSide.toLowerCase() == "left") {
        cell.appendChild(label);
        cell.appendChild(checkbox)
    }
    else {
        cell.appendChild(checkbox)
        cell.appendChild(label);
    }

    return cell;
}
function createTextareaCell(label, columns, rowcount, colspan) {
    var cell = document.createElement("td")
    cell.style.verticalAlign = "top";
    cell.appendChild(createLabel(label))
    cell.appendChild(document.createElement("br"))

    var textArea = document.createElement("textarea");

    if (colspan != null) { cell.colSpan = colspan; }
    if (columns != null) { textArea.cols = columns; }
    if (rowcount != null) { textArea.rows = rowcount; }

    $(textArea).on("keydown", function (e) {
        var keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
            var len = $(this).val().split("\n").length
            var lines = len < 8 ? 10 : len + (len - 8) + 1
            this.rows = lines;
        }
    })

    cell.appendChild(textArea);
    return cell;
}
function createSpacerCell() {
    var td = document.createElement("td");
    td.style.width = "25px";
    return td;
}
function createSpacerRow() {
    var tr = document.createElement("tr")
    tr.style.height = "10px"
    var td = document.createElement("td");
    td.style.width = "25px";
    tr.appendChild(td);
    return tr;
}
function createLabel(text) {
    var small = document.createElement("small");
    var h = document.createElement("h8")
    h.innerText = text;
    small.appendChild(h)
    return small;
}
//=============Utility Functions================