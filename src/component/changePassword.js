import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import {Button} from 'react-bootstrap'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import Top from './Top'
import Modal from 'react-modal';
import {ClassicSpinner} from "react-spinners-kit";
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
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
class changePassword extends Component {
    state={
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        show:false,
        user:[],
        imageUrl:null,
        error:'',
        showConfirm:false,
        showSuccess:false,
        loading:false,
        activeClass: '8',
    };
    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
        this.onOldPasswordChange=this.onOldPasswordChange.bind(this);
        this.onNewPasswordChange=this.onNewPasswordChange.bind(this);
        this.onConfirmPasswordChange=this.onConfirmPasswordChange.bind(this);
    }
    loginUp() {
        let {oldPassword, newPassword, confirmPassword} = this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        this.setState({loading:true})
        if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
            this.handleShow()
        } else {
            if (newPassword === confirmPassword) {
                this.setState({loading:true});
                fetch('https://test.skenap.ir/api/v1/passwordChange', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        newPassword: newPassword,
                        oldPassword: oldPassword,
                        api_token: apiToken,
                        user_id: user_id
                    }),
                }).then((response) => response.json())
                    .then((result) => {
                        console.log(result)
                        if (result.stats === 'success') {
                            this.setState({
                                loading:false,
                                showSuccess:true
                            })
                        } else if (result.stats === 'error') {
                            this.setState({error: result.data,showConfirm:true,loading:false,})
                        } else if (result.stats === 'failed') {
                            this.setState({error: result.data,showConfirm:true,loading:false,})
                        }
                    })
                    .catch((err) => {

                        alert(err);
                    });
            }
            else {
                this.setState({
                    error:'فیلد های گذرواژه یکسان نیستند',
                    showConfirm:true
                })
            }
        }
    }
    handleClose  = () =>{
        this.setState({show:false});
    };
    handleShow  = () =>{
        this.setState({show:true});
    };
    onOldPasswordChange(event) {
        this.setState({ oldPassword: event.target.value });
    }
    onNewPasswordChange(event) {
        this.setState({ newPassword: event.target.value });
    }
    onConfirmPasswordChange(event) {
        this.setState({ confirmPassword: event.target.value });
    }
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showPass', {
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
                        imageUrl:"https://test.skenap.ir/public" + result.data.avatar
                    });
                    console.log(this.state.imageUrl)
                } else if (result.stats === 'error') {
                    this.setState({error: result.data})
                } else if (result.stats === 'failed') {
                    this.setState({error: result.data})
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
    handleShowConfirm  = () =>{
        this.setState({showConfirm:true});
    };
    handleCloseConfirm  = () =>{
        this.setState({showConfirm:false});
    };
    render(){
        return(
            <>
                <body className="app just" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass} />
                    <div className="content">
                        <Top disable="yes"/>
                        <div className="intro-y flex items-center mt-8">
                            <h2 className="text-lg font-medium ml-auto">
                                تغییر گذرواژه
                            </h2>
                        </div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-4 xxl:col-span-3 flex lg:block flex-col-reverse">
                                <div className="intro-y box mt-5">
                                    <div className="relative flex items-center p-5">
                                        <div className="w-12 h-12 image-fit">
                                            {
                                                this.renderImage()
                                            }
                                        </div>
                                        <div className="mr-4 ml-auto">
                                            <div className="font-medium text-base">{this.state.user.fullName}</div>
                                            <div className="text-gray-600">{this.state.user.phone}</div>
                                        </div>

                                    </div>
                                    <div className="p-5 border-t border-gray-200">
                                        <Link className="flex items-center font-medium" to="/karfarma/profile"> <FeatherIcon icon="activity" className="w-4 h-4 ml-2"/> اطلاعات کاربری </Link>
                                        <Link className="flex items-center text-theme-1 mt-5" to="/karfarma/changePassword">
                                            <FeatherIcon icon="lock" className="w-4 h-4 ml-2"/> تغییر
                                            گذرواژه
                                        </Link>

                                    </div>
                                    <div className="p-5 border-t border-gray-200">
                                    </div>

                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-8 xxl:col-span-9">
                                <div className="intro-y box lg:mt-5">
                                    <Collapse in={this.state.show}>
                                        <Alert
                                            style={{fontFamily: 'IRANSans'}}
                                            severity="error"
                                        >
                                            <AlertTitle
                                                style={{marginRight: 8, fontFamily: 'IRANSans'}}>اخطار</AlertTitle>
                                            فیلدهای الزامی خالی می باشد
                                        </Alert>
                                    </Collapse>
                                    <Collapse in={this.state.showConfirm}>
                                        <Alert
                                            style={{fontFamily: 'IRANSans'}}
                                            severity="error"
                                        >
                                            <AlertTitle
                                                style={{marginRight: 8, fontFamily: 'IRANSans'}}>اخطار</AlertTitle>
                                            {this.state.error}
                                        </Alert>
                                    </Collapse>
                                    <Collapse in={this.state.showSuccess}>
                                        <Alert
                                            style={{fontFamily: 'IRANSans'}}
                                            severity="success"
                                        >
                                            <AlertTitle
                                                style={{marginRight: 8, fontFamily: 'IRANSans'}}>موفق</AlertTitle>
                                            تغییر گذرواژه شما با موفقیت ثبت گردید
                                        </Alert>
                                    </Collapse>
                                    <div className="flex items-center p-5 border-b border-gray-200">
                                        <h2 className="font-medium text-base ml-auto">
                                            تغییر گذرواژه
                                        </h2>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <label>گذرواژه فعلی</label>
                                            <input onChange={this.onOldPasswordChange} value={this.state.oldPassword} type="password" className="input w-full border mt-2"
                                                   placeholder="گذرواژه فعلی خود را وارد کنید"/>
                                        </div>
                                        <div className="mt-3">
                                            <label>گذرواژه جدید</label>
                                            <input onChange={this.onNewPasswordChange} value={this.state.newPassword} type="password" className="input w-full border mt-2"
                                                   placeholder="گذرواژه جدید خود را وارد کنید"/>
                                        </div>
                                        <div className="mt-3">
                                            <label>تایید گذرواژه جدید</label>
                                            <input onChange={this.onConfirmPasswordChange} value={this.state.confirmPassword} type="password" className="input w-full border mt-2"
                                                   placeholder="گذرواژه جدید خود را دوباره وارد کنید"/>
                                        </div>
                                        <button onClick={this.loginUp} type="button" className="button w-56 bg-theme-1 text-white mt-4"> {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
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
}
export default changePassword
