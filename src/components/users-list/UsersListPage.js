import React from 'react';
import UsersTable from './UsersTable'
import UsersStatus from './UsersStatus';
import UsersDetailsGraphs from './UsersDetailsGraphs';
import {api} from '../../mock-data/api';


class UsersListPage extends React.Component{
    constructor(){
        super();
        this.state ={
            userStatuses: {
                rolesCount : 1,
                departmentsCount : 1,
                workSitesCount : 1,
                usersCount :1,
            },
            rowsPerPage:10
        }
    }


    async componentDidMount(){
       


        // let temp = [];
        // api.getUsersList().then(users=> {
        //     this.setState({users});
        // }).catch(err=>alert(err));

        // api.getCount('WorkSites').then(workSites => {
        //     this.setState({workSitesCount : workSites.length})
        // }).catch(err => alert(err));
        
        // api.getCount('roles').then(roles => {
        //     this.setState({rolesCount : roles.length})
        // }).catch(err => alert(err));

        // api.getCount('departments').then(departments => {
        //     this.setState({departmentsCount : departments.length})
        // }).catch(err => alert(err));


        // this.setState({
        //     ...this.state,
        //     dataLengths : [this.state.usersCount, 
        //         this.state.workSitesCount, 
        //         this.state.rolesCount, 
        //         this.state.departmentsCount]
        // }, ()=>console.log(this.state.departmentsCount));

        await Promise.all([
            api.getCount('countRoles'),
            api.getCount('countDepartments'),
            api.getCount('countWorkSites'),
            api.getCount('countEmployees')
        ]).then(([rolesCount, departmentsCount, workSitesCount, usersCount]) => this.setState({
            userStatuses: {
                rolesCount,
                departmentsCount,
                workSitesCount,
                usersCount
            }}));
    }


    render(){
        return (
            <div className="m-5">
                <div className="row justify-content-center">
                    <h1 className="alert alert-light" role="alert">
                        Users
                    </h1>
                </div>

                <UsersStatus userStatuses={this.state.userStatuses}/>
                <div className="row d-flex">
                    <div className="col-lg-8">
                        <UsersTable userCount={this.state.userStatuses.usersCount} rowsPerPage={this.state.rowsPerPage}/>
                    </div>
                    <div className="col-lg-4">
                        <UsersDetailsGraphs />
                    </div>
                </div>
            </div>
           
        );
    }
};


export default UsersListPage
