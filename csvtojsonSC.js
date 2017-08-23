var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'India2011.csv');
var myReadStream = fs.readFile(filePath, 'utf8', function(err, data) {
    //console.log(data);
    data = data.split("\n");
    var result = [];
    var headers = data[0].split(",");
    for (var i = 1; i < data.length; i++) {
        var obj = {};
        var currentline = data[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj.stateCode = currentline[1];
            obj.state = currentline[3];
            obj.total = currentline[4];
            obj.age = currentline[5];
            obj.litterate = currentline[12];
            obj.withoutEducation = currentline[16];
            obj.belowPrimary = currentline[19];
            obj.primary = currentline[22];
            obj.middle = currentline[25];
            obj.MatricSecondary = currentline[28];
            obj.higherSecondary = currentline[31];
            obj.nonTechnicalDiploma = currentline[34];
            obj.technicalDiploma = currentline[37];
            obj.graduateAndAbove = currentline[40];
            obj.males = currentline[41];
            obj.females = currentline[42];
            obj.unclassified = currentline[43];
        }
        result.push(obj);
    }
    var ageData = [];
    var ageArray = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'];
    var ageSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < ageArray.length; j++) {
            if (result[i].total == 'Total') {
                if (result[i].age == ageArray[j])
                    ageSum[j] += parseFloat(result[i].litterate)
            }
        }
    }
    for (let j = 0; j < ageArray.length; j++) {
        obj = {
            age: ageArray[j],
            litterate: ageSum[j]
        }
        ageData.push(obj)
    }
    var outPath = path.join(__dirname, '/json/scage_literate.json');
    fs.writeFile(outPath, JSON.stringify(ageData, null, 2), 'utf8',
        function(err) {
            console.log(err);
        });
    /*--------------------------------------------State Wise  Data ----------------------------------------------------*/
    var graduatesData = [];
    var stateArray = ["State - JAMMU & KASHMIR", "State - HIMACHAL PRADESH", "State - PUNJAB", "State - CHANDIGARH", "State - UTTARAKHAND", "State - HARYANA", "State - NCT OF DELHI", "State - RAJASTHAN", "State - UTTAR PRADESH",
        "State - BIHAR", "State - SIKKIM", "State - ARUNACHAL PRADESH", "State - NAGALAND", "State - MANIPUR", "State - MIZORAM", "State - TRIPURA", "State - MEGHALAYA", "State - ASSAM", "State - WEST BENGAL",
        "State - JHARKHAND", "State - ODISHA", "State - CHHATTISGARH", "State - MADHYA PRADESH", "State - GUJARAT", "State - DAMAN & DIU",
        "State - DADRA & NAGAR HAVELI", "State - MAHARASHTRA", "State - ANDHRA PRADESH", "State - KARNATAKA", "State - GOA", "State - LAKSHADWEEP", "State - KERALA", "State - TAMIL NADU", "State - PUDUCHERRY", "State - ANDAMAN & NICOBAR ISLANDS"
    ]
    var maleGraduates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var femaleGraduates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < stateArray.length; j++) {
            if (result[i].total == 'Total') {
                if (result[i].age == 'All ages')
                    if (result[i].state == stateArray[j]) {
                        maleGraduates[j] += parseFloat(result[i].males);
                        femaleGraduates[j] += parseFloat(result[i].females);
                    }
            }
        }
    }
    for (let j = 0; j < stateArray.length; j++) {
        obj = {
            state: stateArray[j],
            Males: maleGraduates[j],
            Females: femaleGraduates[j]
        }
        graduatesData.push(obj)
    }
    var outPath = path.join(__dirname, '/json/scgraduates.json');
    fs.writeFile(outPath, JSON.stringify(graduatesData, null, 2), 'utf8',
        function(err) {
            console.log(err);
        });
    /*--------------------------------------------State Wise  Data ----------------------------------------------------*/
    var educationData = [];
    var cateogaryArray = ['Literate without educational level', 'Below Primary', 'Primary - Persons', 'Educational level - Middle', 'Educational level - Matric/Secondary', 'Educational level - Higher secondary', 'Educational level - Non-technical diploma', 'Educational level - Technical diploma', 'Graduate & above ', 'Unclassified'];
    var cateogarySum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < cateogaryArray.length; j++) {
            if ((result[i].total == 'Total') && (result[i].age == 'All ages')) {
                if (cateogaryArray[j] == 'Literate without educational level') cateogarySum[j] += parseFloat(result[i].withoutEducation)
                if (cateogaryArray[j] == 'Below Primary') cateogarySum[j] += parseFloat(result[i].belowPrimary)
                if (cateogaryArray[j] == 'Primary - Persons') cateogarySum[j] += parseFloat(result[i].primary)
                if (cateogaryArray[j] == 'Educational level - Middle') cateogarySum[j] += parseFloat(result[i].middle)
                if (cateogaryArray[j] == 'Educational level - Matric/Secondary') cateogarySum[j] += parseFloat(result[i].MatricSecondary)
                if (cateogaryArray[j] == 'Educational level - Higher secondary') cateogarySum[j] += parseFloat(result[i].higherSecondary)
                if (cateogaryArray[j] == 'Educational level - Non-technical diploma') cateogarySum[j] += parseFloat(result[i].nonTechnicalDiploma)
                if (cateogaryArray[j] == 'Educational level - Technical diploma') cateogarySum[j] += parseFloat(result[i].technicalDiploma)
                if (cateogaryArray[j] == 'Graduate & above ') cateogarySum[j] += parseFloat(result[i].graduateAndAbove)
                if (cateogaryArray[j] == 'Unclassified') cateogarySum[j] += parseFloat(result[i].unclassified)
            }
        }
    }
    for (let j = 0; j < cateogaryArray.length; j++) {
        obj = {
            cateogary: cateogaryArray[j],
            cateogarySum: cateogarySum[j]
        }
        educationData.push(obj)
    }
    var outPath = path.join(__dirname, '/json/sceducationCateogary.json');
    fs.writeFile(outPath, JSON.stringify(educationData, null, 2), 'utf8',
        function(err) {
            console.log(err);

        });
});