const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const employees = [];


const questions = {
    q1: "What is your managers name? Letters only: ",
    q2: "What is your managers ID? Numbers only: ",
    q3: "What is your managers Email?",
    q4: "What is your managers office number? Numbers only: ",
    q5: "Which type of team member would you like to add?",
    q6: "What is your engineers name? Letters only: ",
    q7: "What is your engineers ID? Numbers only: ",
    q8: "What is your engineers Email?",
    q9: "What is your engineers github username?",
    q10: "What is your interns name? Letters only: ",
    q11: "What is your interns ID? Numbers only: ",
    q12: "What is your interns email?",
    q13: "What is your interns school? Letters only: ",
};

const checkLetters = async (input) => {
    // returns true if input only contains letters and spaces
    return /^[A-Za-z ]+$/.test(input); 
};

const checkNum = async(input)=>{
    // returns true if input only contains numbers
    return /^[0-9]+$/.test(input);
};

function managerPrompt() {


    inquirer
        .prompt([
            {
                type: "input",
                message: questions.q1,
                name: "name",
                validate: checkLetters

            },
            {
                type: "input",
                message: questions.q2,
                name: "id",
                validate: checkNum
            },
            {
                type: "input",
                message: questions.q3,
                name: "email"
            },
            {
                type: "input",
                message: questions.q4,
                name: "office",
                validate: checkNum
            },
            {
                type: "list",
                message: "Would you like to add another team member?",
                name: "team",
                choices: ["Engineer", "Intern", "Done"]
            },

        ]).then(function (data) {
            // console.log(data);
            let manager = new Manager(data.name, data.id, data.email, data.office);
            employees.push(manager);
            if (data.team === "Engineer") {
                engineerPrompt();
            } else if (data.team === "Intern") {
                internPrompt();
            } else {
                create();
            }

            // console.log(manager);
        });
}
function engineerPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: questions.q6,
                name: "name",
                validate: checkLetters

            },
            {
                type: "input",
                message: questions.q7,
                name: "id",
                validate: checkNum
            },
            {
                type: "input",
                message: questions.q8,
                name: "email"
            },
            {
                type: "input",
                message: questions.q9,
                name: "github",
            },
            {
                type: "list",
                message: "Would you like to add another team member?",
                name: "team",
                choices: ["Engineer", "Intern", "Done"]
            },
        ]).then(function (data) {
            let engineer = new Engineer(data.name, data.id, data.email, data.github);
            employees.push(engineer);
            if (data.team === "Engineer") {
                engineerPrompt();
            } else if (data.team === "Intern") {
                internPrompt();
            } else {
                create();
            }
        });

}

function internPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: questions.q10,
                name: "name",
                validate: checkLetters

            },
            {
                type: "input",
                message: questions.q11,
                name: "id",
                validate: checkNum
            },
            {
                type: "input",
                message: questions.q12,
                name: "email"
            },
            {
                type: "input",
                message: questions.q13,
                name: "school",
                validate: checkLetters
            },
            {
                type: "list",
                message: "Would you like to add another team member?",
                name: "team",
                choices: ["Engineer", "Intern", "Done"]
            },

        ]).then(function (data) {
            let intern = new Intern(data.name, data.id, data.email, data.school);
            employees.push(intern);
            if (data.team === "Engineer") {
                engineerPrompt();
            } else if (data.team === "Intern") {
                internPrompt();
            } else {
                create();
            }
        });
}

function create() {
    let final = render(employees);
    // console.log(final);

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, final, "utf-8");
}

managerPrompt();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
