import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import {Button} from 'react-bootstrap'
import history from "./history";
import {Link} from "react-router-dom";
import Top from './Top'
import FeatherIcon from 'feather-icons-react';
import axios from "axios";
import Modal from 'react-modal';
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
class profile extends Component {
    state={
        firstName:'',
        lastName:'',
        phone:'',
        city:'',
        state:'',
        zipCode:'',
        show:false,
        address:'',
        email:'',
        companyName:'',
        username:'',
        ID:'',
        pic:null,
        user:[],
        imageUrl:null,
        national:[],
        error:'',
        showConfirm: false,
        showSuccess: false,
        loading: false,
        activeClass: '2',
        edit:false

    };
    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
        this.edit=this.edit.bind(this);
        this.onFirstNameChange=this.onFirstNameChange.bind(this);
        this.onLastNameChange=this.onLastNameChange.bind(this);
        this.onPhoneChange=this.onPhoneChange.bind(this);
        this.onAddressChange=this.onAddressChange.bind(this);
        this.onEmailChange=this.onEmailChange.bind(this);
        this.onCompanyNameChange=this.onCompanyNameChange.bind(this);
        this.onPicChange=this.onPicChange.bind(this);
        this.onUsernameChange=this.onUsernameChange.bind(this)


    }
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showProfilePass', {
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
                console.log(result);
                if (result.stats === 'success') {
                    this.setState({
                        user: result.data.user[0],
                        imageUrl:"https://test.skenap.ir/public" + result.data.avatar,
                        national:result.data.national[0]
                    });
                    this.setState({
                        firstName: this.state.user.firstName,
                        lastName: this.state.user.lastName,
                        email: this.state.user.email,
                        address: this.state.user.address,
                        companyName: this.state.user.companyName,
                        username: this.state.user.username,
                        phone: this.state.user.phone,
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
    renderImage(){
        if (this.state.imageUrl!=='0'){
            return(
                <img alt="" className="rounded-full"
                     src={this.state.imageUrl}/>
            )
        } else if (this.state.imageUrl==='0'){
            return(
                <img alt="" src={require("./../images/profile-12.jpg")}/>
            )
        }
    }
    renderImageProfile(){
        if (this.state.imageUrl!=='0'){
            return(
                <img className="rounded-md"
                     alt=""
                     src={this.state.imageUrl}/>
            )
        } else if (this.state.imageUrl==='0'){
            return(
                <img className="rounded-md" alt="" src={require("./../images/profile-11.jpg")}/>
            )
        }
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

    renderUploadFile() {
        if (this.state.pic) {
            return (
                <form data-single="true" action="/file-upload"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input name="file" type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">                            عکس خود را میتوانید بارگذاری کنید
                        </div>
                        <div className="text-gray-600">                             فایل مورد نظر خود را هم میتوانید در اینجا بکشید هم انتخاب کنید

                        </div>
                    </div>
                </form>

            );
        } else {
            return (
                <form data-single="true" action="/file-upload"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            <h2>اطلاعات فایل:</h2>

                        </div>
                        <div className="text-gray-600">
                            <p>نام فایل: {this.state.file.name}</p>
                            <p>نوع فایل: {this.state.file.type}</p>
                        </div>
                    </div>
                </form>
            );
        }
    };
    renderShow(){
        if (this.state.edit===true){
            return(
                <div className="col-span-12 lg:col-span-8 xxl:col-span-9">
                    <div className="intro-y box">
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
                            <h2 className="font-medium text-base ml-auto">
                                اطلاعات کاربری
                            </h2>
                            <button className="font-medium text-base text-gray-700 mr-auto" style={{outline:'none'}} onClick={this.edit}>
                                نمایش اطلاعات
                            </button>
                        </div>
                        <Collapse style={{width: '100%'}} in={this.state.show}>
                            <Alert
                                style={{fontFamily: 'IRANSans', width: '100%'}}
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
                                    لطفا تمامی فیلد های الزامی را پر کنید.
                                </div>

                            </Alert>
                        </Collapse>
                        <div className="p-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-4">
                                    <div className="border border-gray-200 rounded-md p-5">
                                        <div className="w-40 h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                                            {this.renderImageProfile()}
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-8">
                                    <div>
                                        <label>نام</label>
                                        <input onChange={this.onFirstNameChange}  type="text" className="input w-full placeholder-gray-700    mt-2" placeholder={this.state.user.firstName}  value={this.state.firstName}/>
                                    </div>
                                    <div className="mt-3">
                                        <label>نام خانوادگی</label>
                                        <input onChange={this.onLastNameChange}  type="text" className="input w-full placeholder-gray-700   mt-2" placeholder={this.state.user.lastName}  value={this.state.lastName}/>
                                    </div>
                                    <div className="mt-3">
                                        <label>نام کاربری</label>
                                        <input onChange={this.onUsernameChange} value={this.state.username} placeholder={this.state.user.username}   type="text" className="input w-full placeholder-gray-700   mt-2"/>
                                    </div>
                                    <div className="mt-3">
                                        <label>نام شرکت</label>
                                        <input onChange={this.onCompanyNameChange} value={this.state.companyName} type="text" className="input w-full placeholder-gray-700   mt-2"
                                               placeholder={this.state.user.companyName}  />
                                    </div>

                                    <div className="mt-3">
                                        <label>آدرس</label>
                                        <textarea onChange={this.onAddressChange} value={this.state.address} className="input w-full placeholder-gray-700 mt-2"  placeholder={this.state.user.address} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro-y box lg:mt-5">
                        <div className="flex items-center p-5 border-b border-gray-200">
                            <h2 className="font-medium text-base ml-auto">
                                اطلاعات فردی
                            </h2>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-6">
                                    <div>
                                        <label>ایمیل</label>
                                        <input onChange={this.onEmailChange} value={this.state.email} type="email" className="input w-full placeholder-gray-700 mt-2"
                                               placeholder={this.state.user.email} />
                                    </div>
                                    <div className="mt-3">
                                        <label>شماره تماس</label>
                                        <input onChange={this.onPhoneChange} value={this.state.phone} type="tel" className="input w-full placeholder-gray-700 mt-2"
                                               placeholder={this.state.user.phone} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <button onClick={this.loginUp} className="button w-24 bullshit-blue flex justify-center m-auto shadow-md text-white">
                            {this.state.loading ?  <div className="flex justify-center items-center text-center">
                                <ClassicSpinner  size={25} color="#fff" />
                            </div> : "تایید"}
                        </button>
                    </div>

                </div>
            )
        }
        else {
            return(
                <div className="col-span-12 lg:col-span-8 xxl:col-span-9">
                    <div className="intro-y box lg:mt-5">
                        <div className="flex items-center p-5 border-b border-gray-200 bullshit">
                            <h2 className="font-medium text-base ml-auto">
                                اطلاعات کاربری
                            </h2>
                            <button className="font-medium text-base text-gray-700 mr-auto" style={{outline:'none'}} onClick={this.edit}>
                                ویرایش
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-4">
                                    <div className="border border-gray-200 rounded-md p-5">
                                        <div className="w-40 h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                                            {this.renderImageProfile()}
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-8">
                                    <div>
                                        <label>نام</label>
                                        <input onChange={this.onFirstNameChange}  type="text" className="input w-full placeholder-gray-700    mt-2" placeholder={this.state.user.firstName} readOnly />
                                    </div>
                                    <div className="mt-3">
                                        <label>نام خانوادگی</label>
                                        <input onChange={this.onLastNameChange}  type="text" className="input w-full placeholder-gray-700   mt-2" placeholder={this.state.user.lastName} readOnly />
                                    </div>
                                    <div className="mt-3">
                                        <label>نام کاربری</label>
                                        <input onChange={this.onUsernameChange}  placeholder={this.state.user.username} readOnly  type="text" className="input w-full placeholder-gray-700   mt-2"/>
                                    </div>
                                    <div className="mt-3">
                                        <label>نام شرکت</label>
                                        <input onChange={this.onCompanyNameChange}  type="text" className="input w-full placeholder-gray-700   mt-2"
                                               placeholder={this.state.user.companyName} readOnly />
                                    </div>

                                    <div className="mt-3">
                                        <label>آدرس</label>
                                        <textarea onChange={this.onAddressChange}  className="input w-full placeholder-gray-700 mt-2"  placeholder={this.state.user.address} readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro-y box lg:mt-5">
                        <div className="flex items-center p-5 border-b border-gray-200">
                            <h2 className="font-medium text-base ml-auto">
                                اطلاعات فردی
                            </h2>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-6">
                                    <div>
                                        <label>ایمیل</label>
                                        <input onChange={this.onEmailChange}  type="text" className="input w-full placeholder-gray-700  mt-2"
                                               placeholder={this.state.user.email} readOnly/>
                                    </div>
                                    <div className="mt-3">
                                        <label>شماره تماس</label>
                                        <input onChange={this.onPhoneChange}  type="text" className="input w-full placeholder-gray-700 mt-2"
                                               placeholder={this.state.user.phone} readOnly/>
                                    </div>
                                    <div className="mt-3">
                                        <label>کد ملی</label>
                                        <div className="flex">
                                            <input type="text" className="input w-full mt-2 placeholder-gray-700"
                                                   placeholder={this.state.national.nationalId} readOnly maxLength={11}/>
                                            {this.renderConfirm()}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    render(){
        return(
                <body className="app just" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top disable="yes"/>
                        <div className="intro-y flex items-center mt-8 ">
                            <h2 className="text-lg font-medium ml-auto">
                                اطلاعات کاربری
                            </h2>
                        </div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-4 xxl:col-span-3 flex lg:block flex-col-reverse">
                                <div className="intro-y box mt-5">
                                    <div className="relative flex items-center p-5">
                                        <div className="w-12 h-12 image-fit">
                                            {this.renderImage()}
                                        </div>
                                        <div className="mr-4 ml-auto">
                                            <div className="font-medium text-base">{this.state.user.fullName}</div>
                                            <div className="text-gray-600">{this.state.user.phone}</div>
                                        </div>

                                    </div>
                                    <div className="p-5 border-t border-gray-200">
                                        <Link className="flex items-center font-medium text-theme-1" to="/karfarma/profile"> <FeatherIcon icon="activity" className="w-4 h-4 ml-2"/> اطلاعات کاربری </Link>
                                        <Link className="flex items-center  mt-5" to="/karfarma/changePassword">
                                            <FeatherIcon icon="lock" className="w-4 h-4 ml-2"/> تغییر
                                            گذرواژه
                                        </Link>
                                    </div>
                                    <div className="p-5 border-t border-gray-200">
                                    </div>

                                </div>
                            </div>
                            {this.renderShow()}
                        </div>

                    </div>

                </div>
                </body>
        )
    }
	handleShowSuccess  = () =>{
		this.setState({showSuccess:true});
		let element = document.querySelector(".MuiAlert-message");
		element.style.width = '100%';
	};
	handleCloseSuccess = () =>{
		this.setState({showSuccess:false});
		let element = document.querySelector(".MuiAlert-message");
		element.style.width = '100%';
	};
    onFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }
    onLastNameChange(event) {
        this.setState({ lastName: event.target.value });
    }
    onPhoneChange(event) {
        this.setState({ phone: event.target.value });
    }
    edit() {
        this.setState({
            edit: !this.state.edit,
            showSuccess:false,
            showConfirm:false,
            show:false
        });
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
        if (this.state.edit===true){
            this.setState({
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                email: this.state.user.email,
                address: this.state.user.address,
                companyName: this.state.user.companyName,
                username: this.state.user.username,
                phone: this.state.user.phone,
            });
        }
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
    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }
    loginUp(){
        let {firstName,lastName,phone,address,email,companyName,username}=this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        console.log(this.state);
        if (firstName === '' || phone === '' || lastName === ''|| address === ''||email === '' || companyName === ''||username==='') {
            this.handleShow()
        } else
        {
            this.setState({loading:true});
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('phone', phone);
                data.append('firstName', firstName);
                data.append('lastName', lastName);
                data.append('user_id', user_id);
                data.append('address', address);
                data.append('email', email);
                data.append('companyName', companyName);
                data.append('username', username);
                axios.post("https://test.skenap.ir/api/v1/changeProfile", data).then(res => {
                    console.log(res)
                    if (res.data.stats === 'success') {
                        this.setState({
                            edit:false,
                            showSuccess:true,
                            loading:false
                        });
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
                        window.location.reload()
                    }else if (res.data.stats==='error') {
                        this.setState({
                            error:res.data,
                            showConfirm:true,
                            loading:false
                        });
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
                    }
                })

        }
    }

    renderConfirm() {
        if (this.state.national.confirmation===0){
            return(
                <FeatherIcon icon="x" className="w-4 h-4 mt-4 text-red-700"/>
            )
        } else  if (this.state.national.confirmation===1){
            return(
                <FeatherIcon icon="check" className="w-4 h-4 mt-4 text-green-700"/>
            )
        }
    }
}
export default profile
