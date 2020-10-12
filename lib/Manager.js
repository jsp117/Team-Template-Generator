// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");
// takes properties of employee and adds office
class Manager extends Employee{
    constructor(name, id, email, office){
        // sends name id and email up to employee
        super(name, id, email);
        this.office = office;
    }
}

module.exports = Manager;