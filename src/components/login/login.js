import React from 'react';
import InputErrors from '../shared-components/InputErrors'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBarcode, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, BrowserRouter } from 'react-router-dom';


export class login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: { value: '', errors: [], validations: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ } },
            password: { value: '', errors: [], validations: { required: true } }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this)
    }


    handleRequiredValidation(name, value) {
        if (!value) {
            return `*${name} is required`;
        }
    }

    handlePatternValidation(name, value, pattern) {
        if (pattern) {
            if (!pattern.test(value)) {
                return `*invalid ${name}`;
            }
        }
    }

    handleInputChange({ target: { name, value } }) {
        const { validations } = this.state[name];
        const errors = [];

        {/** required input validation */ }
        if (validations.required) {
            errors.push(this.handleRequiredValidation(name, value));
        }

        {/** Valid email input */ }
        errors.push(this.handlePatternValidation(name, value, validations.pattern))


        {/** Update the state with the errors if exist*/ }
        this.setState({
            [name]: {
                ...this.state[name],
                value: value,
                errors
            }
        });
    }


    loginSubmit(e) {
        e.preventDefault();
        let errors;
        // Test each field of the form for errors
        Object.keys(this.state).forEach(name => {
            const { [name]: input } = this.state
            if (this.handleRequiredValidation(name, input.value) ||
                this.handlePatternValidation(name, input.value, input.validations.pattern)) {
                errors = true
            }
        })

        if (!errors) {
            fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.email.value,
                    password: this.state.password.value
                })
            })
                .then(res => {
                    if (res.ok)
                        this.props.history.push('/')
                    else {
                        console.log('Error Logging in')
                    }
                })
                .catch(err => console.error(err));
        }
    }




    render() {
        return (
            <div
                style={{ minHeight: "82vh" }}
                className="d-flex flex-lg-row-reverse align-items-lg-center flex-column"
            >
                <div className="flex-grow-1">
                    <h3 className="text-center my-3" style={{ fontFamily: "Sans-Serif", letterSpacing: "2px" }}>
                        {/* <img style={{width:'72px', position:'relative', right:'-15px', bottom:"38px"}} src="g5185.png"></img> */}
                        <img style={{ width: "29px" }} src="a_logo.png"></img>ssign {/*<i style={{color:"teal", fontSize:"23px"}} className="fas fa-terminal"></i>  */} Me
                </h3>
                    <hr className="col-12 col-md-8"></hr>
                </div>

                {/* AVATAR */}
                <div className=" flex-grow-1 ">
                    <div className="rounded shadow pt-5 pb-2 pr-4 pl-4 mt-5 ml-auto mr-auto card col-10 col-sm-8 col-md-7">
                        <div className="d-flex justify-content-center">
                            <img className="position-absolute" src="avatar.jpg" style={{ width: "5rem", top: "-42px", border: "1px solid teal", borderRadius: "50%" }}></img>
                        </div>
                        {/* LOGIN FORM INPUT*/}
                        <form onSubmit={this.loginSubmit}>
                            {/* Input Email */}
                            <div className="form-group mb-3">
                                <label className="mb-0" htmlFor="input__email">Email address</label>
                                <div className="input-group mb-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-at"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        id="input__email"
                                        aria-label="email"
                                        name="email"
                                        defaultValue={this.state.email.value}
                                        onBlur={this.handleInputChange} ></input>
                                </div>
                                <InputErrors errors={this.state.email.errors} />
                            </div>


                            {/* Input Password */}
                            <div className="form-group">
                                <label className="mb-0" htmlFor="input__password">Password</label>
                                <div className="input-group mb-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-unlock"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        id="input__password"
                                        name="password"
                                        onBlur={this.handleInputChange}
                                        aria-label="password"></input>
                                </div>
                                <InputErrors errors={this.state.password.errors} />
                                
                                {/* Forgot ypur password? */}
                                <a className="nav-link text-left p-0 mb-3 mt-2" style={{ "color": "teal", cursor: 'pointer' }}>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                        Forgot your password?
                                    </button>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Reset Your Password</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">
                                                                <FontAwesomeIcon icon={faUserCircle} ></FontAwesomeIcon>
                                                            </span>
                                                        </div>
                                                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">
                                                                <FontAwesomeIcon icon={faBarcode} ></FontAwesomeIcon>
                                                            </span>
                                                        </div>
                                                        <input type="text" class="form-control" placeholder="Employee Number" aria-label="Employee Number" aria-describedby="basic-addon1"/>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Reset Password</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                </a>
                            </div>


                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="mr-2 mb-3 btn btn-info">Login</button>
                                </div>

                        </form>

                    </div>
                    </div>
                </div>
                )
            }
        }
        
        export default login
