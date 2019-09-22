

export const api = {
    getDepartments : async function(){ 
        const departments = await fetch('http://localhost:8080/api/employee/departments')
        return departments.json();
        }
    ,
    getRoles :async () =>{ 
        const roles = await fetch('http://localhost:8080/api/employee/roles')
        return roles.json();
        }
    ,
    getCountries :async () =>{ 
        const countries = await fetch('http://localhost:8080/api/employee/countries')
        return countries.json();
        }
    ,
    getWorkSites :async () =>{ 
        const workSites = await fetch('http://localhost:8080/api/employee/worksites')
        return workSites.json();
        }
    ,
    getManagers :async () =>{ 
        const managers = await fetch('http://localhost:8080/api/employee/managers')
        return managers.json();
        }
    ,
    getAllData: async function() {
        const  [departments,
                worksites,
                countries,
                roles,
                managers]= await Promise.all([
                        this.getDepartments(),
                        this.getWorkSites(),
                        this.getCountries(),
                        this.getRoles(),
                        this.getManagers()
                ])
        return {departments, worksites, countries, roles, managers}
    }
    ,
    getUsersList: async function() {
        const users = await fetch('http://localhost:8080/api/employee?page=2&limit=10')
            .then(response => response.json());

        return users;
    },

    getCount: (prop) => {
        return fetch(`http://localhost:8080/api/employee/${prop}`)

            .then(res => res.json());
    },

    validateLogin: (username, password)=>{
        return fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username,
                password
            }),
        })
    },
    getUserById: async (id)=>{
        const user = await fetch(`http://localhost:8080/api/employee/employeeid?employeeid=${id}`)
        return user.json();
    },


    addUser: async ({details,img,roles})=>{
        console.log(details, roles)

        const addedUser = await fetch(`http://localhost:8080/api/employee/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                employee:{
                       number:+details.employeeNumber.value,
                       firstName:details.firstName.value,
                       lastName:details.lastName.value,
                       email:details.email.value,
                       managerId:+details.manager.value,
                       department:details.department.value,
                       worksite:{
                            id:+details.workSite.value
                       },
                       country:{
                            name:details.country.value
                       },
                       phone:details.phone.value,
                       loginStatus:false,
                       locked:false,
                       deactivated:false
                },
              roles:roles
            }),
            
        })
        return addedUser;
    },

    updateUserDetails: async({details,img,roles})=>{
        const updatedUser = await fetch(`http://localhost:8080/api/employee/id?id=${details.id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                employee:{
                       id:+details.id,
                       number:+details.employeeNumber.value,
                       firstName:details.firstName.value,
                       lastName:details.lastName.value,
                       email:details.email.value,
                       managerId:+details.manager.value,
                       department:details.department.value,
                       worksite:{
                            id:+details.workSite.value
                       },
                       country:{
                            name:details.country.value
                       },
                       phone:details.phone.value,
                       loginStatus:false,
                       locked:false,
                       deactivated:false
                },
              roles:roles
            }),
            
        })
        return updatedUser;
    },

    toggleDeactivateUser: async(id)=>{
        const user = await fetch(`http://localhost:8080/api/employee/id?id=${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
               
            }),
            
        })
        return addedUser;
    },

    unlockUser: async(id)=>{
        const user = await fetch(`http://localhost:8080/api/employee/unlock/id?id=${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        return addedUser;
    },
    auditSearchByEmployeeNumber: async(id)=>{
        const result = await fetch(`http://localhost:8080/api/audit/number?number=${id}`)
        return result.json();
    },
    deactivateUser: async (id) =>{
        const deletedUser = await fetch(`http://localhost:8080/api/employee/id?id=${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        return deletedUser;
    },




    getData: async function(url) {
        console.log(url)
        const users = await fetch(url)
            .then(response => response.json());

        return users;
    },
}
