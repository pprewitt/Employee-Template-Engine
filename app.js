const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//while true the app will ask for new employees
let creatingEmployees = true;
// and to create objects for each team member (using the correct classes as blueprints!)
const teamArray = [];

//questions everyone gets
const employeeQuestions = [
    {
        type: "list",
        name: "role",
        message: "Create a new employee. Please select the employee role or select that you are done creating new profiles:",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: "input",
        name: "name",
        message: "Please enter the employee's name:"
    },
    {
        type: "input",
        name: "id",
        message: "Please enter the employee's assigned ID:"

    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?",
        validate: (answer) => {
            const emailCheck = answer.match(/\S+@\S+\.\S+/);
            if (emailCheck) {
                return true;
            }
            return "Please enter a valid email address.";
        }
    }
]

// manager specific question (phone number)
const managerQuestion = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter the Manager office phone number:"
        }
    ])
}
// engineer specific question (github)
const engineerQuestion = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "githubUserName",
            message: "Please enter the engineer's gitHub User Name:"
        }
    ])
}
// intern specific question (school)
const internQuestion = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "Please enter the intern's school:"
        }
    ])
}

// creates employee object to push into teamArray
const createEmployee = async () => {
    await inquirer.prompt(employeeQuestions).then((response) => {
        let role = response.role;
        let name = response.name;
        let id = response.id;
        let email = response.email;
        let github = "";
        let officeNumber = "";
        let school = "";

        if (role === "Manager") {
            managerQuestion().then((response) => {
                officeNumber = response.officeNumber;
                let employee = new Manager(name, id, email, officeNumber);
                teamArray.push(employee);
                addEmployee();
            })
        } else if (role === "Engineer") {
            engineerQuestion().then((response) => {
                github = response.githubUserName;
                let employee = new Engineer(name, id, email, github);
                teamArray.push(employee);
                addEmployee();
            })
        } else if (role === "Intern") {
            internQuestion().then((response) => {
                school = response.school;
                let employee = new Intern(name, id, email, officeNumber);
                teamArray.push(employee);
                addEmployee();
            })
        }
    })
}
const addEmployee = async () => {
    await inquirer.prompt([
        {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add another employee?",
            choices: ["Yes", "Done, build the team"]
        }
    ]).then(async (response) => {
        if (response.addEmployee === "Yes") {
            createEmployee();
        } else if (response.addEmployee === "Done, build the team") {
            buildTeam();
        }
    })
}
const buildTeam = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamArray), "utf-8");
};

createEmployee();

// Write code to use inquirer to gather information about the development team members,


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
