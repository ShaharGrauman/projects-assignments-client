import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class UserProfileFooter extends React.Component{

constructor(){
    super();
    this.state={
        message_title:{value:'',errors:[],validations:{}},
        message_body:{value:'',errors:[],validations:{}}
    }

    this.sendEmail= this.sendEmail.bind(this)

}

sendEmail(){
    this.props.sendEmail(this.state.message_title.value, this.state.message_body.value)
}


    render(){
        return(
            <>
                <div className="card position-relative d-flex flex-row bd-highlight p-2 mb-2" style={{bottom:"0"}}>
                    {
                        this.props.isLocked ?
                    <button className="btn btn-info ml-auto mr-2" onClick={this.props.unlockUser}>Activate</button>
                    :
                    <>
                        <div className=" ">
                            {!this.props.addUserForm && 
                            

                            <div className="btn-group dropup" style={{cursor:'pointer'}}>
                                <button type="button" className="btn btn-secondary dropdown-toggle ml-2 btn btn-warning" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Options
                                </button>
                                <div className="dropdown-menu">
                                    <h6 className="dropdown-item" onClick={this.props.deactivateUser}>Deactivate User</h6>
                                    <h6 className="dropdown-item" data-toggle="modal" data-target="#exampleModal">Direct Message</h6>
                                    <h6 className="dropdown-item" >Reset Password</h6>
                                </div>
                            </div>
                            }
                        </div>

                        <Link className="ml-auto mr-2" to="/users-list" style={{color:'white', textDecoration:'none'}}><button className='btn btn-danger'>Cancel</button></Link>
                        <div className="mr-2">
                            {this.props.addUserForm?
                            <button className="btn btn-success" onClick={this.props.addUser}>Finish</button>
                            :
                            <button className="btn btn-success" onClick={this.props.editUser}>Apply</button>
                            }
                        </div>
                    </>
                    }

                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleSendEmail" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="p-2 mx-2">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="mt-3 modal-title text-center" id="exampleModalLabel">Direct Message to {this.props.name}</h5>
                        </div>
                        <div className="modal-body">
                            
                        <div className="col-xs-12 col-10 m-auto p-1">
                            <div className="row">
                                <label htmlFor="title_" className="mb-0">Title</label>
                                <div className="input-group mb-3">
                                    <input type="text"
                                    id="title_"
                                    className="form-control"
                                    placeholder="Title"
                                    aria-label="Title"
                                    name="message_title"
                                    style={{fontSize:'20px', color:'black'}}
                                    aria-describedby="title"></input>
                                </div>
                            </div>


                            <div className="row">
                                <label htmlFor="emailBody" className="mb-0">Message</label>
                                <div className="input-group">
                                    <textarea 
                                    id="emailBody"
                                    style={{minHeight:'200px'}}
                                    className="form-control"
                                    aria-label="With textarea"
                                    name="message_body"
                                    placeholder="Message Body"
                                    ></textarea>
                                </div>
                            </div>
                        </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" onClick={this.sendEmail}>Send Message</button>
                        </div>
                        </div>
                    </div>
                </div>


               
            </>
        )
    }
}