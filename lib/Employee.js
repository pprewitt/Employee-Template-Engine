// TODO: Write code to define and export the Employee class

class Employee {
  constructor(id, email, name) {
    this.name= name;
    this.id= id;
    this.email= email;
  }

  getName(){
      return (this.name);
  }

  getId(){
    return (this.id);
  }

  getEmail(){
    return (this.email);
  }

  getRole(){
    return (this.name);
  } 
  
}
module.exports = Employee;
// Returns 'Employee'