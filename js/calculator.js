class Module {
    constructor() {
        this.name = "";
        this.CATS = 0;
        this.weightings = [];
        this.marks = [];
        this.percentageDone = 0;
        this.catsDone = 0;
        
        this.scaledPercentageDone = 0;
        this.scaledCATS = 0;
        this.scaledWeightings = [];
    }
    add_assessment(weight, mark) {
        this.weightings.push(weight);
        this.marks.push(mark);
    }

    percentage_done() {
        let total = 0;
        for (var i = 0; i < this.weightings.length; i++) {
            total += this.weightings[i] * this.marks[i];
        }
        this.percentageDone = total / 100;
        this.catsDone
    }

    CATS_done() {
        let temp = 0
        for (var i = 0; i < this.weightings.length; i++) {
            temp += this.weightings[i];
        }
        this.catsDone = (temp * this.CATS) / 100;
    }

    scale_data(scaleFactor) {
        this.scaledWeightings = [];
        console.log("ScaleFactor " + scaleFactor)
        var scaler = this.CATS / scaleFactor;

        for (var i = 0; i < this.weightings.length; i++) {
            this.scaledWeightings.push(this.weightings[i] * scaler);
        }
        console.log("scaled weighting" + this.scaledWeightings);
        this.scaledPercentageDone = this.percentageDone * scaler;
        this.scaledCATS = this.CATS * scaler;
    }
}

var modules = [];
function test() {
    m = new Module();
    m.name = "graphics";
    m.CATS = 15;
    m.add_assessment(20, 90);
    m.percentage_done();
    m.CATS_done();
    modules.push(m);

    m = new Module();
    m.name = "Compilers";
    m.CATS = 15;
    m.add_assessment(30, 82);
    m.percentage_done();
    m.CATS_done();
    modules.push(m);

    m = new Module();
    m.name = "Project Management";
    m.CATS = 15;
    m.add_assessment(5, 74);
    m.add_assessment(15, 63);
    m.percentage_done();
    m.CATS_done();
    modules.push(m);

    m = new Module();
    m.name = "Digital Forensics";
    m.CATS = 15;
    m.add_assessment(15, 73);
    m.add_assessment(15, 58);
    m.percentage_done();
    m.CATS_done();
    modules.push(m);

    m = new Module();
    m.name = "Machine Learning";
    m.CATS = 15;
    m.add_assessment(40, 85);
    m.percentage_done();
    m.CATS_done();
    modules.push(m);

    m = new Module();
    m.name = "Social Informatics";
    m.CATS = 15;
    m.add_assessment(30, 73);
    m.percentage_done();
    m.CATS_done();
    modules.push(m);

    m = new Module();
    m.name = "Third Year Project";
    m.CATS = 30;
    m.add_assessment(5, 70);
    m.add_assessment(15, 73);
    m.percentage_done();
    m.CATS_done();
    modules.push(m);
}



var firstYear = {
    "mark": 0,
    "weighting": 0
};
var secondYear = {
    "mark": 0,
    "weighting": 0
};
var thirdYear = {
    "mark": 0,
    "weighting": 0,
    "percentageDone": 0
};
var thirdYearActual = {
    "mark": 0,
    "weighting": 0
};

function calculateGB() {
    firstYear["mark"] = document.getElementById("mark-first-year").value;
    firstYear["weighting"] = document.getElementById("weight-first-year").value / 100;

    secondYear["mark"] = document.getElementById("mark-second-year").value;
    secondYear["weighting"] = document.getElementById("weight-second-year").value / 100;

    var scaleFactor = 99999999999999;
    for (var i = 0; i < modules.length; i++) {
        if (scaleFactor > modules[i].CATS) {
            scaleFactor = modules[i].CATS;
        }
    }
    
    console.log(scaleFactor);
    for (var i = 0; i < modules.length; i++) {
        modules[i].scale_data(scaleFactor);
    }

    var percent_of_third_year_completed = 0;
    var total_cats = 1;
    for (var i = 0; i < modules.length; i++) {
        percent_of_third_year_completed += modules[i].catsDone;
        total_cats += modules[i].CATS;
    }
    percent_of_third_year_completed /= total_cats;
    console.log(modules);
// this.scaledWeighting
    // this.scaledPercentageDone
    // this.scaledCATS
    var a = modules.reduce((prev, cur) => prev + cur.scaledPercentageDone, 0);

    var b = modules.reduce((prev, cur) => prev + cur.scaledWeightings.reduce((a, b) => a + b, 0), 0);
    console.log("percentage done " + a);
    console.log("weighted module totals " + b);

    var current_third_year = (a / b) * 100;

    thirdYear.mark = current_third_year;
    thirdYear.weighting = document.getElementById('weight-third-year').value / 100;
    thirdYear.percentageDone = percent_of_third_year_completed;
    console.log(thirdYear);
    console.log(secondYear);
    console.log(firstYear);
    graduationBenchmark = (firstYear.mark * firstYear.weighting + secondYear.mark * secondYear.weighting +
        (thirdYear.mark * thirdYear.weighting * thirdYear.percentageDone)) /
        (firstYear.weighting + secondYear.weighting + (thirdYear.weighting * thirdYear.percentageDone));

    // actualGrade =  (firstYear.mark*firstYear.weighting + secondYear.mark*secondYear.weighting +
    //     thirdYearActual.mark*thirdYearActual.weighting) / 
    //     (firstYear.weighting + secondYear.weighting + thirdYear.weighting);

    document.getElementById('gb').innerHTML = "Graduation Benchmark: " + graduationBenchmark;
    document.getElementById('y3avg').innerHTML = "Year 3 Average: " + current_third_year + "%";
    console.log("Graduation Benchmark: " + graduationBenchmark);
    // console.log("Actual Grade: " + actualGrade);
}



var moduleCount = 1;
var moduleAssignments = { "1": 1 };
function add_assignment(id) {
    num = id.slice(1, 2);
    moduleAssignments[num] += 1;
    document.getElementById("suckass-" + num).innerHTML +=
        `<hr>
        <div class="control">
        Weighting: <input id="weight-`+ num + `-` + moduleAssignments[num] + `" class="input" type="number" placeholder="e.g. 30"> <br><br>
        Mark: <input id="mark-`+ num + `-` + moduleAssignments[num] + `" class="input" type="number" placeholder="e.g. 70">
        </div>`;
}

function create_module(id) {
    m = new Module();
    num = id.slice(1, 2);
    console.log(num);
    m.name = document.getElementById('name-' + num).value;
    m.CATS = document.getElementById('cats-' + num).value;
    var assessTotal = 0;
    for (var i = 1; i <= moduleAssignments[num]; i++) {
        var w = document.getElementById('weight-' + num + '-' + i).value;
        var mark = document.getElementById('mark-' + num + '-' + i).value;
        m.add_assessment(w, mark);
    }
    m.percentage_done();
    m.CATS_done();
    modules.push(m);

    document.getElementById('module-' + num).innerHTML =
        "<b>Module</b>: " + m.name +
        "<br><b>CATS</b>: " + m.CATS +
        "<br><b>Achieved</b>: " + m.percentageDone + "%";
    console.log(modules);
}


function add_module() {
    moduleCount += 1;
    moduleAssignments[moduleCount] = 1;
    document.getElementById("modules").innerHTML +=
        `<div class="box" id="module-` + moduleCount + `">
    <div class="field">
        <label class="label">Module</label>
        <div class="control">
            Name:
            <input class="input" id='name-`+ moduleCount + `' type="text" placeholder="e.g. CS324 Graphics">
        </div>
        <div class="control">
            CATS:
            <input class="input" id='cats-`+ moduleCount + `' type="text" placeholder="e.g. 15">
        </div>
    </div>

    <div class="field" id='suckass-`+ moduleCount + `'>
        <label class="label">Assignment</label>
        <div class="control">
            Weighting: 
            <input id="weight-`+ moduleCount + `-` + moduleAssignments[moduleCount] + `" class="input" type="number" placeholder="e.g. 30">
             <br><br>
            Mark: 
            <input id="mark-`+ moduleCount + `-` + moduleAssignments[moduleCount] + `" class="input" type="number" placeholder="e.g. 70">
        </div>

    </div>
    <div class="control">
        <button id="a`+ moduleCount + `" onclick="add_assignment(this.id)" class="button is-link">Add assigment</button>
    </div>
    <br>
    <br>
    <div class="control">
        <button id="m`+ moduleCount + `" onclick="create_module(this.id)" class="button is-link">Done</button>
    </div>
</div>`;
}