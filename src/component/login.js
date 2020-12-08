import React,{Component} from 'react'
import './../css/app.css';
import history from "./history";
import {Link} from "react-router-dom";
import Modal from 'react-modal';
import { ClassicSpinner } from "react-spinners-kit";
import FeatherIcon from "feather-icons-react";
import Carousel   from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import {Alert, AlertTitle} from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import CountdownTimer from "react-component-countdown-timer";
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
class login extends Component {
    state={
        render:'1',
        loginPhone:'',
        user_id:'',
        loginPassword:'',
        loginConfirm:'',
        show:false,
        showConfirm:false,
        apiToken:'',
        loading:false,
        confirmCode:'',
        randomString:'',
        resetPhone:'',
        newPassword:'',
        newPasswordConfirm: '',
        error:'',
        count:false,
        showWrong:false,
    };
    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
        this.onLoginPasswordChange=this.onLoginPasswordChange.bind(this);
        this.onLoginPhoneChange=this.onLoginPhoneChange.bind(this);
        this.onConfirmChange=this.onConfirmChange.bind(this);
        this.register=this.register.bind(this);
        this.accept=this.accept.bind(this);
        this.onConfirmCodeChange=this.onConfirmCodeChange.bind(this);
        this.onResetPhoneChange=this.onResetPhoneChange.bind(this);
        this.reset=this.reset.bind(this);
        this.newPass=this.newPass.bind(this);
        this.resetAll=this.reset.bind(this);
        this.resetPhone=this.resetPhone.bind(this);
        this.onKeyUpLogin=this.onKeyUpLogin.bind(this);
        this.onKeyUpNewPass=this.onKeyUpNewPass.bind(this);
        this.onKeyUpAccept=this.onKeyUpAccept.bind(this);
        this.onKeyUpRegister=this.onKeyUpRegister.bind(this);
        this.onKeyUpResetAll=this.onKeyUpResetAll.bind(this);
        this.onKeyUpResetPhone=this.onKeyUpResetPhone.bind(this);

    }
    componentDidMount(){
	    let apiToken = localStorage.getItem('apiToken');
	    if (apiToken !== null) {
		    fetch('https://test.skenap.ir/api/v1/checkLogin', {
			    method: 'POST',
			    headers: {
				    Accept: 'application/json',
				    'Content-Type': 'application/json',
			    },

			    body: JSON.stringify({
				    api_token: apiToken,
			    }),
		    }).then((response) => response.json())
			    .then((result) => {
				    console.log(result);
				    if (result.stats === 'success') {
					   history.push('./dashboard')
				    }
			    })
			    .catch((err) => {

				    alert(err);
			    });
	    }
    }
    onKeyUpLogin(event) {
        if (event.key === "Enter") {
            this.loginUp();
        }
    }
    onKeyUpRegister(event) {
        if (event.key === "Enter") {
            this.register();
        }
    }
    onKeyUpNewPass(event) {
        if (event.key === "Enter") {
            this.newPass();
        }
    }
    onKeyUpAccept(event) {
        if (event.key === "Enter") {
            this.accept();
        }
    }
    onKeyUpResetPhone(event) {
        if (event.key === "Enter") {
            this.resetPhone();
        }
    }
    onKeyUpResetAll(event) {
        if (event.key === "Enter") {
            this.resetAll();
        }
    }
    newPass(){
        let {confirmCode,randomString} = this.state;
        if (confirmCode === '') {
            this.handleShow()
        } else if (parseInt(confirmCode)===parseInt(randomString)) {
            try {
               this.setState({
                   render:'6'
               })
            } catch (error) {
                alert(error);

            }
        }
    }
    handleClose  = () =>{
        this.setState({show:false});
    };
    handleCloseConfirm  = () =>{
        this.setState({showConfirm:false});
    };
    handleShow  = () =>{
        this.setState({show:true});
    };
    handleShowWrong  = () =>{
        this.setState({showWrong:true});
    };
    handleShowConfirm  = () =>{
        this.setState({showConfirm:true});
    };


    buttonSend(){
        if (this.state.count===false){
            return(
            <CountdownTimer  size={20}
                             color='#410430'
                             count={120}
                             responsive
                             hideDay
                             hideHours
                             onEnd={this.countChange.bind(this)}/>
            )
        } else if (this.state.count===true){
            return(
                <button onClick={this.sendAgain.bind(this)} className="button button--lg  text-white bg-theme-1">
                    {
                        this.state.loading ?
                            <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                <ClassicSpinner  size={25} color="#fff" />
                            </div>:
                            " ارسال مجدد"
                    }

                </button>
            )
        }
    }
    countChange(){
        this.setState({
            count:true
        })
    }
    renderComponent(){
        if (this.state.render==='1'){
            return(
                <div className="h-screen h-auto flex  py-0  my-0" style={{direction: "rtl"}}>
                    <div
                        className="my-10 mx-auto ml-20 bg-white xl:bg-transparent px-5  py-8 p-0 rounded-md shadow-none w-full  xl:w-auto"
                        style={{marginRight: 0}}>
                        <Collapse in={this.state.show}>
                            <Alert
                                style={{fontFamily:'IRANSans'}}
                                severity="error"
                            >
                                <AlertTitle style={{marginRight:8,fontFamily:'IRANSans',fontSize:'14px'}}>اخطار</AlertTitle>
                                <p style={{fontFamily:'IRANSans',fontSize:'12px'}}> {this.state.error}</p>
                            </Alert>
                        </Collapse>
                        <h2 className="intro-x font-bold text-2xl text-center xl:text-right">
                            ورود
                        </h2>
                        <div className="intro-x mt-8">

                            <input onChange={this.onLoginPhoneChange} value={this.state.loginPhone} type="tel"
                                   className="intro-x login__input input input--lg border border-gray-300 block"
                                   placeholder="شماره تماس"
                                   maxLength={11}
                                   onKeyPress={this.onKeyUpLogin}
                            />

                            <input onChange={this.onLoginPasswordChange} value={this.state.loginPassword} type="password"
                                   className="intro-x login__input input input--lg border border-gray-300 block mt-4"
                                   placeholder="گذرواژه"
                                   minLength={6}
                                   onKeyPress={this.onKeyUpLogin}
                            />

                        </div>
                        <div className="intro-x flex text-gray-700 text-xs sm:text-sm mt-4">
                            <div className="flex items-center ">
                                <button onClick={this.reset}>فراموشی رمز عبور؟</button>
                            </div>
                        </div>
                        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-center">
                            <button onClick={this.loginUp} className="button button--lg w-full text-white bg-theme-1">
                            {
                                this.state.loading ?
                                    <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                    <ClassicSpinner  size={25} color="#fff" />
                                    </div>:
                                    "ورود"
                            }
                            </button>
                        </div>
                    </div>
                </div>

            )
        }
        else if (this.state.render==='2'){
            return(
                <div className="h-screen h-auto flex py-0  my-0" style={{direction: "rtl"}}>

                    <div
                        className="my-10 mx-auto ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 p-0 rounded-md shadow-none  w-full  xl:w-auto"
                        style={{marginRight: 0}}>
                        <Collapse in={this.state.showConfirm}>
                            <Alert
                                style={{fontFamily:'IRANSans'}}
                                severity="error"
                            >
                                <AlertTitle style={{fontFamily:'IRANSans',marginRight:8}}>اخطار</AlertTitle>
                                فیلد های گذرواژه یکسان نیستند
                            </Alert>
                        </Collapse>
                        <h2 className="intro-x font-bold text-2xl text-center xl:text-right">
                            ثبت نام
                        </h2>
                        <div className="intro-x mt-8">
                            <input onChange={this.onLoginPhoneChange} value={this.state.loginPhone} type="text"
                                   className="intro-x login__input input input--lg border border-gray-300 block"
                                   placeholder="شماره تماس" maxLength={11}  onKeyPress={this.onKeyUpRegister}/>
                            <input onChange={this.onLoginPasswordChange} value={this.state.loginPassword} type="password"
                                   className="intro-x login__input input input--lg border border-gray-300 block mt-4"
                                   placeholder="گذرواژه" minLength={6}   onKeyPress={this.onKeyUpRegister}/>
                            <input onChange={this.onConfirmChange} value={this.state.loginConfirm} type="password"
                                   className="intro-x login__input input input--lg border border-gray-300 block mt-4"
                                   placeholder="تایید گذرواژه"  onKeyPress={this.onKeyUpRegister} />

                        </div>
                        <div className="intro-x flex text-gray-700 text-xs sm:text-sm mt-4">
                            <div className="flex items-center ">
                                <button onClick={this.reset}>فراموشی رمز عبور؟</button>
                            </div>
                        </div>
                        <div className="intro-x mt-2 xl:mt-2 text-gray-700 text-center xl:text-right">
                            با ثبت نام در سامانه
                            <Link className="text-theme-1" to=""> قوانین و مقررات</Link> را قبول می کنید
                        </div>
                        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-right">
                            <button onClick={this.register} className="button button--lg w-full text-white bg-theme-1">
                                {
                                    this.state.loading ?
                                        <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                            <ClassicSpinner  size={25} color="#fff" />
                                        </div>:
                                        "ثبت نام"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.render==='3'){
            return(
                <div className="h-screen h-auto flex  py-0  my-0" style={{direction: "rtl"}}>
                    <div
                        className="my-10 mx-auto ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 p-0 rounded-md shadow-none w-full  xl:w-auto"
                        style={{marginRight: 0}}>
                        <Collapse in={this.state.showWrong}>
                            <Alert
                                style={{fontFamily:'IRANSans'}}
                                severity="error"
                            >
                                <AlertTitle style={{fontFamily:'IRANSans',marginRight:8}}>اخطار</AlertTitle>
                                 کد وارد شده اشتباه است
                            </Alert>
                        </Collapse>
                        <h2 className="intro-x font-bold text-2xl text-center xl:text-right">
                            دریافت کد
                        </h2>
                        <div className="intro-x mt-8">
                            <input onChange={this.onConfirmCodeChange} value={this.state.confirmCode} type="text"
                                   className="intro-x login__input input input--lg border border-gray-300 block"
                                   placeholder="کد تایید" onKeyPress={this.onKeyUpAccept}/>
                            <div className='flex justify-center mt-5' style={{width:'100%'}}>
                                {
                                    this.buttonSend()
                                }
                            </div>


                        </div>
                        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-right">
                            <button onClick={this.accept} className="button button--lg w-full text-white bg-theme-1">تایید</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.render==='4'){
            return(
                <div className="h-screen h-auto flex  py-0  my-0" style={{direction: "rtl"}}>
                    <div
                        className="my-10 mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 p-0 rounded-md shadow-none w-full  xl:w-auto"
                        style={{marginRight: 0}}>
                        <h2 className="intro-x font-bold text-2xl text-center xl:text-right">
                            فراموشی رمز عبور
                        </h2>
                        <div className="intro-x mt-8">
                            <input onChange={this.onResetPhoneChange} value={this.state.resetPhone} type="text"
                                   className="intro-x login__input input input--lg border border-gray-300 block"
                                   placeholder="شماره تماس" maxLength={11}  onKeyPress={this.onKeyUpResetPhone}/>

                        </div>
                        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-right">
                            <button onClick={this.resetPhone} className="button button--lg w-full text-white bg-theme-1">تایید</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.render==='5'){
            return(
                <div className="h-screen h-auto flex py-0  my-0" style={{direction: "rtl"}}>
                    <div
                        className="my-10 mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 p-0 rounded-md shadow-none w-full  xl:w-auto"
                        style={{marginRight: 0}}>
                        <h2 className="intro-x font-bold text-2xl text-center xl:text-right">
                            دریافت کد
                        </h2>
                        <div className="intro-x mt-8">
                            <input onChange={this.onConfirmCodeChange} value={this.state.confirmCode} type="text"
                                   className="intro-x login__input input input--lg border border-gray-300 block"
                                   placeholder="کد تایید" maxLength={11}  onKeyPress={this.onKeyUpNewPass}/>

                        </div>
                        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-right">
                            <button onClick={this.newPass} className="button button--lg w-full text-white bg-theme-1">تایید</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.render==='6'){
            return(
                <div className="h-screen h-auto flex py-0  my-0" style={{direction: "rtl"}}>
                    <div
                        className="my-10 mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-none  w-full  xl:w-auto"
                        style={{marginRight: 0}}>
                        <h2 className="intro-x font-bold text-2xl text-center xl:text-right">
                            فراموشی رمز عبور
                        </h2>
                        <div className="intro-x mt-8">

                            <input onChange={this.onNewPassChange} value={this.state.newPassword} type="tel"
                                   className="intro-x login__input input input--lg border border-gray-300 block"
                                   placeholder="گذرواژه جدید"
                                   onKeyPress={this.onKeyUp}
                            />

                            <input onChange={this.onNewPassConfirmChange} value={this.state.newPasswordConfirm} type="password"
                                   className="intro-x login__input input input--lg border border-gray-300 block mt-4"
                                   placeholder="تایید گذرواژه"
                                   onKeyPress={this.onKeyUpResetAll}
                            />

                        </div>
                        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-center">
                            <button onClick={this.resetAll} className="button button--lg w-full text-white bg-theme-1">
                                {
                                    this.state.loading ?
                                        <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                            <ClassicSpinner  size={25} color="#fff" />
                                        </div>:
                                        "تایید"
                                }
                            </button>
                        </div>
                    </div>
                </div>

            )
        }

    }
    render(){
        return(
            <div className="login just" >
                <Link to="/karfarma/" className="-intro-x flex items-center mr-auto">
                    <img alt="" className="w-6 mr-auto" style={{width:'15%'}} src={require("./../images/logo.png")}/>
                </Link>
                <div className="container sm:px-10">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col min-h-screen">
                        <div className="my-10">
                            <Carousel
                                dots
                                infinite
                                centered
                                rtl
                                autoPlay={10000}
                                animationSpeed={1000}
                            >
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column'}}>
                                    <img alt="Midone Tailwind HTML Admin Template" className="-intro-x" src={require("./../images/3.png")} style={{width:'90%'}}/>
                                    <div className="-intro-x text-white font-medium text-4xl leading-tight mr-5 text-center mt-5" style={{fontSize:'16px',fontFamily
                                    :'IRANSansDN'}}>
                                        همه جا شعبه داشته باش(بزن)
                                    </div>
                                    <div className="-intro-x text-white font-medium text-4xl leading-tight mr-5 text-center mt-2" style={{fontSize:'0.6rem'}}>
                                        با ورود به عصر جدید دیجیتال، در هر زمان و مکانی دیده می‌شوید.
                                    </div>
                                </div>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column'}}>
                                    <img alt="Midone Tailwind HTML Admin Template" className="-intro-x" src={require("./../images/1.png")} style={{width:'90%'}}/>
                                    <div className="-intro-x text-white font-medium text-4xl leading-tight mr-5 text-center mt-5" style={{fontSize:'16px',fontFamily
                                            :'IRANSansDN'}}>
                                        شفافیت، برگ برنده‌ی ماست.
                                    </div>
                                    <div className="-intro-x text-white font-medium text-4xl leading-tight mr-5 text-center mt-2" style={{fontSize:'0.6rem'}}>
                                        ارتباط بی‌واسطه‌ی شما و مشتریان در بستر وب، سودآوری کسب و کارتان را متحول می‌کند.
                                    </div>
                                </div>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column'}}>
                                    <img alt="Midone Tailwind HTML Admin Template" className="-intro-x" src={require("./../images/2.png")} style={{width:'90%'}}/>
                                    <div className="-intro-x text-white font-medium text-4xl leading-tight mr-5 text-center mt-5" style={{fontSize:'16px',fontFamily
                                            :'IRANSansDN'}}>
                                        با فروش آنلاین، واسطه‌هارو کنار بگذار
                                    </div>
                                    <div className="-intro-x text-white font-medium text-4xl leading-tight mr-5 text-center mt-2" style={{fontSize:'0.6rem'}}>
                                        ما، به پشتوانه‌ی متخصصان اسپراک و با نظارت کامل کارفرمایان- خدمات را شخصی‌سازی می‌کنیم.
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                    {this.renderComponent()}
                </div>
            </div>
            </div>
        )
    }
    sendAgain(){
        let {loginPhone}=this.state;
        this.setState({
            loading:true,
            count:false
        });
        fetch('https://test.skenap.ir/api/v1/sendAgain', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                phone: loginPhone,
            }),
        }).then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.stats === 'success') {
                    this.setState({
                        randomString:result.data.randomString2,
                        count:false,
                        loading:false
                    });
                } else if (result.stats === 'error') {
                    this.setState({
                        error: result.data,
                        show:true,
                        loading:false
                    })
                } else if (result.stats === 'failed') {
                    this.setState({
                        error: result.data,
                        show:true

                    })
                }
            })
            .catch((err) => {

                alert(err);
            });

    }
    accept(){
        let {confirmCode,randomString,apiToken,user_id} = this.state;
        if (confirmCode === '') {
            this.handleShow()
        } else if (parseInt(confirmCode)===parseInt(randomString)) {
            try {
                localStorage.setItem('apiToken', apiToken);
                localStorage.setItem('user_id', user_id);
                history.push('./dashboard')
            } catch (error) {
                alert(error);

            }
        }else {
            this.handleShowWrong()
        }
    }

    onLoginPhoneChange(event) {
        this.setState({ loginPhone: event.target.value });
        if (event.target.value.length===11){
            this.setState({ loginPhone: event.target.value });
            fetch('https://test.skenap.ir/api/v1/checkPhone', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    phone: event.target.value,
                }),
            }).then((response) => response.json())
                .then((result) => {
                    if (result.stats === 'success') {
                        if (result.data==='1'){
                            this.setState({render:'1'})
                        } else if (result.data==='2'){
                            this.setState({
                                render:'2',
                            })
                        }
                    } else if (result.stats === 'error') {
                        this.setState({error: result.data})
                    } else if (result.stats === 'failed') {
                        this.setState({error: result.data})
                    }
                })
                .catch((err) => {

                    alert(err);
                });
        }else {
            this.setState({ loginPhone: event.target.value });
        }
    }

    onResetPhoneChange(event) {
        this.setState({ resetPhone: event.target.value });
    }

    onLoginPasswordChange(event) {
        this.setState({ loginPassword: event.target.value });
    }
    onConfirmChange(event) {
        this.setState({ loginConfirm: event.target.value });
    }
    onConfirmCodeChange(event){
        this.setState({ confirmCode: event.target.value });

    }
    onNewPassChange(event){
        this.setState({ newPass: event.target.value });
    }
    onNewPassConfirmChange(event){
        this.setState({ newPassConfirm: event.target.value });
    }
    loginUp(){
        if (this.state.loginPassword === '' || this.state.loginPhone === '') {
            this.setState({
                error:'لطفا فیلدهای مورد نیاز را تکمیل کنید',
                show:true
            })
        } else  {
            this.setState({
                loading:true,
            });
            fetch('https://test.skenap.ir/api/v1/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    phone: this.state.loginPhone,
                    password: this.state.loginPassword
                }),
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.stats === 'success') {
                        this.setState({
                            randomString:result.data.randomString2,
                            user_id:result.data.user.user_id,
                            apiToken:result.data.user.api_token,
                            render:'3',
                            loading:false

                        });
                    } else if (result.stats === 'error') {
                        this.setState({
                            error: result.data,
                            show:true,
                            loading:false
                        })
                    } else if (result.stats === 'failed') {
                        this.setState({
                            error: result.data,
                            show:true,
                            loading:false

                        })
                    }
                })
                .catch((err) => {

                    alert(err);
                });


        }
    }


    reset(){
        this.setState({
            render:'4'
        })
    }


    register(){
        let {loginPassword,loginPhone,loginConfirm}=this.state;

        if (loginPassword === '' || loginPhone === '') {
            this.handleShow()
        } else if (loginPassword===loginConfirm) {
            this.setState({
                loading:true,
            });
            fetch('https://test.skenap.ir/api/v1/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone:loginPhone,
                    password:loginPassword,
                    role_id:'1'
                }),
            }).then((response) =>response.json())
                .then((result) => {
                    console.log(result);
                    if (result.stats==='success'){
                        this.setState({
                            randomString:result.data.randomString2,
                            user_id:result.data.user.user_id,
                            apiToken:result.data.user.api_token,
                            render:'3',
                            loading:false
                        });
                    } else if (result.stats==='error') {
                        this.setState({
                            error: result.data,
                            show:true,
                            loading:false
                        })
                    }else if (result.stats==='failed'){
                        this.setState({error:result.data,loading:false})
                    }
                })
                .catch((err) => {

                    alert(err);
                });
        }else {
            this.handleShowConfirm()
        }
    };
    resetPhone(){
        let {resetPhone}=this.state;
        if (resetPhone === '') {
            this.handleShow()
        } else
            this.setState({
                loading:true,
            });
            fetch('https://test.skenap.ir/api/v1/resetPassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone:resetPhone,
                }),
            }).then((response) =>response.json())
                .then((result) => {
                    console.log(result);
                    if (result.stats==='success'){
                        this.setState({
                            randomString:result.data.randomString2,
                            render:'5',
                            loading:false
                        });
                    } else if (result.stats==='error') {
                        this.setState({error:result.data})
                    }else if (result.stats==='failed'){
                        this.setState({error:result.data})
                    }
                })
                .catch((err) => {

                    alert(err);
                });
    }
    resetAll(){
        let {newPassword,newPasswordConfirm,resetPhone}=this.state;
        if (newPassword !== newPasswordConfirm) {
            this.handleShowConfirm()
        } else if (newPassword === '' || newPasswordConfirm==='') {
            this.handleShow()
        }else
            this.setState({
                loading:true,
            });
            fetch('https://test.skenap.ir/api/v1/resetAll', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword:newPassword,
                    phone:resetPhone
                }),
            }).then((response) =>response.json())
                .then((result) => {
                    console.log(result);
                    if (result.stats==='success'){
                        this.setState({
                            render:'1',
                            loading:false
                        });
                    } else if (result.stats==='error') {
                        this.setState({error:result.data})
                    }else if (result.stats==='failed'){
                        this.setState({error:result.data})
                    }
                })
                .catch((err) => {

                    alert(err);
                });
    }
}
export default login
