import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import Top from './Top'
import Modal from 'react-modal';
import {Button,Spinner} from 'react-bootstrap'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import axios from "axios";
import {ClassicSpinner} from "react-spinners-kit";
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
const customStyles = {
    content : {
        top                   : '30%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        width:'50%',
        transform             : 'translate(-50%, -50%)'
    }
};
const useStyles = makeStyles((theme) => ({
	root: {
		width:'100%',
		marginTop: theme.spacing(2),
	},
}));
class completeProfile extends Component {
    state={
        firstName:'',
        index:[],
        lastName:'',
        city:'',
        show:false,
        showConfirm:false,
        address:'',
        email:'',
        companyName:'',
        username:'',
        loading:false,
        pic:null,
        error:'',
        activeClass:'2',
        showSuccess:false
    };
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showState', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token:apiToken,
                user_id: user_id
            }),
        }).then((response) => response.json())
            .then((result) => {
                if (result.stats === 'success') {
                    this.setState({
                        index: result.data,
                    });
                } else if (result.stats === 'error') {
                    this.setState({error: result.data,showConfirm:true})
                } else if (result.stats === 'failed') {
                    this.setState({error: result.data,showConfirm:true})
                }
            })
            .catch((err) => {

                alert(err);
            });
    }
    handleShowSuccess  = () =>{
        this.setState({showSuccess:true});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleCloseSuccess  = () =>{
        this.setState({
            showSuccess:false
        })
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleShowConfirm  = () =>{
        this.setState({showConfirm:true});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleCloseConfirm  = () =>{
        this.setState({showConfirm:false});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };

    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
        this.onFirstNameChange=this.onFirstNameChange.bind(this);
        this.onLastNameChange=this.onLastNameChange.bind(this);
        this.onAddressChange=this.onAddressChange.bind(this);
        this.onEmailChange=this.onEmailChange.bind(this);
        this.onCompanyNameChange=this.onCompanyNameChange.bind(this);
        this.onPicChange=this.onPicChange.bind(this);
        this.onUsernameChange=this.onUsernameChange.bind(this);
    }

    handleClose  = () =>{
        this.setState({show:false});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleShow  = () =>{
        this.setState({show:true});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };

    renderUploadFile() {
        if (this.state.pic===null) {
            return (
                <form data-single="true"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input onChange={this.onPicChange} name="file" type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            عکس خود را میتوانید بارگذاری کنید
                        </div>
                        <div className="text-gray-600">
                            فایل مورد نظر خود را هم میتوانید در اینجا بکشید هم انتخاب کنید
                        </div>
                    </div>
                </form>

            );
        } else {
            return (
                <form data-single="true" action="/file-upload"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input onChange={this.onPicChange} name="file" type="file"/>
                    </div>
                <div className="dz-message" data-dz-message>
                    <div className="text-lg font-medium">
                        <h2>اطلاعات فایل:</h2>

                    </div>
                    <div className="text-gray-600">
                        <p>نام فایل: {this.state.pic.name}</p>
                        <p>نوع فایل: {this.state.pic.type}</p>
                    </div>
                </div>
                </form>

            );
        }
    };

    render(){
        return(
            <>
                <body className="app just" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top disable="yes"/>

                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y box col-span-12">
	                            <div className={useStyles.root}>
		                            <Collapse in={this.state.show}>
			                            <Alert
				                            style={{fontFamily: 'IRANSans'}}
				                            severity="error"
			                            >
				                            فیلدهای الزامی خالی می باشد
			                            </Alert>
		                            </Collapse>
		                            <Collapse in={this.state.showConfirm}>
			                            <Alert
				                            style={{fontFamily: 'IRANSans'}}
				                            severity="error"
			                            >
				                            <div style={{display: 'flex', width: '100%'}}>
					                            <div className="mr-auto">
						                            <button className="mr-auto" style={{outline: 'none'}}
						                                    onClick={this.handleClose}><FeatherIcon icon="x"/>
						                            </button>
					                            </div>
				                            </div>
				                            <div style={{display: 'flex'}}>
					                            {this.state.error}
				                            </div>
			                            </Alert>
		                            </Collapse>
		                            <Collapse in={this.state.showSuccess}>
			                            <Alert
				                            style={{fontFamily: 'IRANSans'}}
				                            severity="success"
			                            >
				                            <div style={{display: 'flex', width: '100%'}}>
					                            <div className="mr-auto">
						                            <button className="mr-auto" style={{outline: 'none'}}
						                                    onClick={this.handleClose}><FeatherIcon icon="x"/>
						                            </button>
					                            </div>
				                            </div>
				                            <div style={{display: 'flex'}}>
					                            تغییر اطلاعات کاربری شما با موفقیت ثبت گردید
				                            </div>
			                            </Alert>
		                            </Collapse>
	                            </div>
                                    <div className="flex items-center p-5 border-b border-gray-200 bullshit">
                                        <h2 className="font-medium text-lg text-base">
                                             تکمیل اطلاعات
                                        </h2>
                                    </div>
                                    <div className="p-5" id="input">

                                        <div className="preview">
                                            <div>
                                                <label>نام*</label>
                                                <input onChange={this.onFirstNameChange} value={this.state.firstName} type="text" className="input w-full border mt-2"
                                                       placeholder="لطفا نام خود را وارد کنید"/>
                                            </div>
                                            <div className="mt-3">
                                                <label>نام خانوادگی*</label>
                                                <input onChange={this.onLastNameChange} value={this.state.lastName} type="text" className="input w-full border mt-2"
                                                       placeholder="لطفا نام خانوادگی خود را وارد کنید"/>
                                            </div>
                                            <div className="mt-3">
                                                <label>نام کاربری*</label>
                                                <input onChange={this.onUsernameChange} value={this.state.username} type="text" className="input w-full border mt-2"
                                                       placeholder="لطفا نام کاربری خود را وارد کنید"/>
                                            </div>
                                            <div className="mt-3">
                                                <label>ایمیل*</label>
                                                <input onChange={this.onEmailChange} value={this.state.email} type="email" className="input w-full border mt-2"
                                                       placeholder="لطفا ایمیل خود را وارد کنید"/>
                                            </div>
                                            <div className="mt-3">
                                                <label>نام شرکت (تیم)*</label>
                                                <input onChange={this.onCompanyNameChange} value={this.state.companyName} type="text" className="input w-full border mt-2"
                                                       placeholder="لطفا نام شرکت خود را وارد کنید"/>
                                            </div>

                                            <div className="mt-5">
                                                <label>آدرس*</label>
                                                <input onChange={this.onAddressChange} value={this.state.address} type="text" className="input input--lg w-full border mt-2"
                                                       placeholder="لطفا آدرس خود را وارد کنید"/>
                                            </div>
                                            <div className="mt-5">

                                                <div className="p-5" id="single-file-upload" style={{textAlign:"center"}}>
                                                    <label style={{fontSize: "22px"}}>عکس پروفایل</label>
                                                    <div className="preview">
                                                        {this.renderUploadFile()}

                                                    </div>
                                                </div>

                                            </div>
                                            <button onClick={this.loginUp} className="button w-24 bullshit-blue shadow-md text-white m-auto flex justify-center">
                                                {this.state.loading ?  <div className="flex justify-center items-center text-center">
                                                    <ClassicSpinner  size={25} color="#fff" />
                                                </div> : "تایید"}
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

                </body>
            </>
        )
    }
    onFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }
    onLastNameChange(event) {
        this.setState({ lastName: event.target.value });
    }
    onPicChange(event) {
        this.setState({ pic: event.target.files[0] });
    }
    onAddressChange(event) {
        this.setState({ address: event.target.value });
    }
    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    onCompanyNameChange(event) {
        this.setState({ companyName: event.target.value });
    }
    onUsernameChange(event){
        this.setState({ username: event.target.value });
    }
    loginUp(){
        let {firstName,lastName,address,email,companyName,pic,username}=this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (firstName === '' || lastName === ''  || address === ''||email === '' || companyName === ''||username==='') {
            this.handleShow()
        } else
        {
            this.setState({loading:true});
            if (pic===null){
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('lastName', lastName);
                data.append('firstName', firstName);
                data.append('user_id', user_id);
                data.append('address', address);
                data.append('email', email);
                data.append('username', username);
                data.append('companyName', companyName);
                axios.post("https://test.skenap.ir/api/v1/completeProfile", data).then(res => {
                    if (res.data.stats === 'success') {
                        this.setState({
                            showSuccess:true,
                            loading:false
                        });
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
                    }else if (res.data.stats==='error') {
                        this.setState({
                            error:res.data,
                            showConfirm:true,
                            loading:false
                        })
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
                    }
                })
            }else if (pic!==null){
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('lastName', lastName);
                data.append('firstName', firstName);
                data.append('user_id', user_id);
                data.append('address', address);
                data.append('email', email);
                data.append('username', username);
                data.append('companyName', companyName);
                data.append('file', pic);
                axios.post("https://test.skenap.ir/api/v1/completeProfile", data).then(res => {
                    console.log(res)
                    if (res.data.stats === 'success') {
                        this.setState({
                            showSuccess:true,
                            loading:false
                        });
                    }else if (res.data.stats==='error') {
                        this.setState({
                            error:res.data,
                            showConfirm:true,
                            loading:false
                        })
                    }
                })
            }

        }
    }
}
export default completeProfile
