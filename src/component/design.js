import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import axios from 'axios';
import Top from './Top'
import Modal from 'react-modal';
import { ClassicSpinner } from "react-spinners-kit";
import FeatherIcon from 'feather-icons-react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import DatePicker from "react-modern-calendar-datepicker";
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

class sendProject extends Component {
    state={
        status:'',
        description:'',
        scope:'',
        name:'',
        pic:null,
        show:false,
        loading:false,
        error:'',
        showConfirm:false,
        activeClass:'7',
        campaign:true,
        email:true,
        service:true,
        social:true,
        button:false,

    };
    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
        this.onClickCampaign=this.onClickCampaign.bind(this);
        this.onClickService=this.onClickService.bind(this);
        this.onClickSocial=this.onClickSocial.bind(this);
        this.onClickEmail=this.onClickEmail.bind(this);
    }
    handleClose  = () =>{
        this.setState({show:false});
    };
    handleShow  = () =>{
        this.setState({show:true});
    };
    onClickEmail() {
        this.setState({
            email:!this.state.email,
        });
    }
    onClickSocial() {
        this.setState({
            social:!this.state.socail,
        });
    }
    onClickService() {
        this.setState({
            service:!this.state.service,
        });
    }
    onClickCampaign() {
        this.setState({
            campaign:!this.state.campaign,
        });
    }
    handleShowConfirm  = () =>{
        this.setState({showConfirm:true});
    };
    handleCloseConfirm  = () =>{
        this.setState({showConfirm:false});
    };
    loginUp(){
        this.setState({button:true})
        // let {status}=this.state;
        // let apiToken = localStorage.getItem('apiToken');
        // let user_id = localStorage.getItem('user_id');
        // fetch('https://test.skenap.ir/api/v1/firstPeriod', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         api_token:apiToken,
        //         user_id: user_id,
        //         status:status
        //     }),
        // }).then((response) => response.json())
        //     .then((result) => {
        //         console.log(result);
        //         if (result.stats === 'success') {
        //             this.setState({
        //                 index: result.data,
        //             });
        //         } else if (result.stats === 'error') {
        //             this.setState({error: result.data,showConfirm:true})
        //         } else if (result.stats === 'failed') {
        //             this.setState({error: result.data,showConfirm:true})
        //         }
        //     })
        //     .catch((err) => {
        //
        //         alert(err);
        //     });

    }
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showScopes', {
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
    renderUploadFile() {
        if (this.state.status==='') {
            return (
                <form data-single="true"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input name="file"  onChange={this.onPicChange} type="file" />
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="dz-message" data-dz-message>
                            <div className="text-lg font-medium">
                                عکس خود را میتوانید بارگذاری کنید
                            </div>
                            <div className="text-gray-600">
                                فایل مورد نظر خود را هم میتوانید در اینجا بکشید هم انتخاب کنید
                            </div>
                        </div>
                    </div>
                </form>

            );
        }
        else {
            return (
                <form data-single="true" action="/file-upload"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input name="file"  onChange={this.onPicChange} type="file" />
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            <h2>اطلاعات فایل:</h2>

                        </div>
                        <div className="text-gray-600 mt-2">
                            <p className="mt-2">نام فایل: {this.state.pic.name}</p>
                            <p>نوع فایل: {this.state.pic.type}</p>
                        </div>
                    </div>
                </form>
            );
        }
    };
    renderShow(){
        if (this.state.button===true){
            if (this.state.email===false && this.state.social===false && this.state.service && this.state.campaign===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab> کمپین و تبلیغات</Tab>
                            <Tab>سرویس سایت</Tab>
                            <Tab> سرویس شبکه های اجتماعی</Tab>
                            <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5" style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>کمی درباره مشتریان خود بنویسید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و نیاز سنجی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تحلیل رقبا و صنعت
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوا
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        برندینگ
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        پروموشن
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        بهبود رتبه سایت
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی بازاریابی
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        طراحی فروشگاه آنلاین
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ایجاد پنل کاربری
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        مدیریت ارتباط با مشتری(CRM)
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تبلیغات گوگل (گوگل ادز)
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        اینستاگرام
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تلگرام
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        لینکدین
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        توییتر
                                    </button>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        فیسبوک
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        یوتیوب
                                    </button>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و دسته بندی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        آنالیز صفحات رقبا
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوای منظم
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تحقیق کلید واژه ها
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ادمین و مدیریت صفحه
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        جذب فالوئر و مخاطب
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <div>
                                        <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                        <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>کدام یک را مد نظر داردید؟ </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        بازاریابی ایمیلی
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        بازاریابی پیامکی
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        هردو
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.email===false && this.state.social===false && this.state.service===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab>سرویس سایت</Tab>
                            <Tab> سرویس شبکه های اجتماعی</Tab>
                            <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و نیاز سنجی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تحلیل رقبا و صنعت
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوا
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        برندینگ
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        پروموشن
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        بهبود رتبه سایت
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی بازاریابی
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        طراحی فروشگاه آنلاین
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ایجاد پنل کاربری
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        مدیریت ارتباط با مشتری(CRM)
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تبلیغات گوگل (گوگل ادز)
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        اینستاگرام
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تلگرام
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        لینکدین
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        توییتر
                                    </button>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        فیسبوک
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        یوتیوب
                                    </button>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و دسته بندی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        آنالیز صفحات رقبا
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوای منظم
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تحقیق کلید واژه ها
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ادمین و مدیریت صفحه
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        جذب فالوئر و مخاطب
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <div>
                                        <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                        <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>کدام یک را مد نظر داردید؟ </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        بازاریابی ایمیلی
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        بازاریابی پیامکی
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        هردو
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.email===false && this.state.social===false && this.state.campaign===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab> کمپین و تبلیغات</Tab>
                            <Tab> سرویس شبکه های اجتماعی</Tab>
                            <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5" style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>کمی درباره مشتریان خود بنویسید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        اینستاگرام
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تلگرام
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        لینکدین
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        توییتر
                                    </button>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        فیسبوک
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        یوتیوب
                                    </button>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و دسته بندی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        آنالیز صفحات رقبا
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوای منظم
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تحقیق کلید واژه ها
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ادمین و مدیریت صفحه
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        جذب فالوئر و مخاطب
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <div>
                                        <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                        <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>کدام یک را مد نظر داردید؟ </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        بازاریابی ایمیلی
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        بازاریابی پیامکی
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        هردو
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.email===false && this.state.service===false && this.state.campaign===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab> کمپین و تبلیغات</Tab>
                            <Tab>سرویس سایت</Tab>
                            <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5" style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>کمی درباره مشتریان خود بنویسید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و نیاز سنجی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تحلیل رقبا و صنعت
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوا
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        برندینگ
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        پروموشن
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        بهبود رتبه سایت
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی بازاریابی
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        طراحی فروشگاه آنلاین
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ایجاد پنل کاربری
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        مدیریت ارتباط با مشتری(CRM)
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تبلیغات گوگل (گوگل ادز)
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>کدام یک را مد نظر داردید؟ </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        بازاریابی ایمیلی
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        بازاریابی پیامکی
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        هردو
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.social===false && this.state.service===false && this.state.campaign===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab> کمپین و تبلیغات</Tab>
                            <Tab>سرویس سایت</Tab>
                            <Tab> سرویس شبکه های اجتماعی</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5" style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>کمی درباره مشتریان خود بنویسید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و نیاز سنجی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تحلیل رقبا و صنعت
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوا
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        برندینگ
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        پروموشن
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        بهبود رتبه سایت
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی بازاریابی
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        طراحی فروشگاه آنلاین
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ایجاد پنل کاربری
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        مدیریت ارتباط با مشتری(CRM)
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تبلیغات گوگل (گوگل ادز)
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        اینستاگرام
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تلگرام
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        لینکدین
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        توییتر
                                    </button>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        فیسبوک
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        یوتیوب
                                    </button>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و دسته بندی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        آنالیز صفحات رقبا
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوای منظم
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تحقیق کلید واژه ها
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ادمین و مدیریت صفحه
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        جذب فالوئر و مخاطب
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <div>
                                        <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                        <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.social===false && this.state.service===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab>سرویس سایت</Tab>
                            <Tab> سرویس شبکه های اجتماعی</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و نیاز سنجی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تحلیل رقبا و صنعت
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوا
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        برندینگ
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        پروموشن
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        بهبود رتبه سایت
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی بازاریابی
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        طراحی فروشگاه آنلاین
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ایجاد پنل کاربری
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        مدیریت ارتباط با مشتری(CRM)
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تبلیغات گوگل (گوگل ادز)
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        اینستاگرام
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تلگرام
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        لینکدین
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        توییتر
                                    </button>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        فیسبوک
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        یوتیوب
                                    </button>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و دسته بندی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        آنالیز صفحات رقبا
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوای منظم
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تحقیق کلید واژه ها
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ادمین و مدیریت صفحه
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        جذب فالوئر و مخاطب
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <div>
                                        <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                        <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.social===false && this.state.campaign===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab> کمپین و تبلیغات</Tab>
                            <Tab> سرویس شبکه های اجتماعی</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5" style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>کمی درباره مشتریان خود بنویسید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        اینستاگرام
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تلگرام
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        لینکدین
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        توییتر
                                    </button>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        فیسبوک
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        یوتیوب
                                    </button>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و دسته بندی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        آنالیز صفحات رقبا
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوای منظم
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تحقیق کلید واژه ها
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ادمین و مدیریت صفحه
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        جذب فالوئر و مخاطب
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <div>
                                        <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                        <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.social===false && this.state.email===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            <Tab> سرویس شبکه های اجتماعی</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>کدام یک را مد نظر داردید؟ </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        بازاریابی ایمیلی
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        بازاریابی پیامکی
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        هردو
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        اینستاگرام
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تلگرام
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        لینکدین
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        توییتر
                                    </button>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        فیسبوک
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        یوتیوب
                                    </button>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و دسته بندی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        آنالیز صفحات رقبا
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوای منظم
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تحقیق کلید واژه ها
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ادمین و مدیریت صفحه
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        جذب فالوئر و مخاطب
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <div>
                                        <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                        <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.campaign===false && this.state.service===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab>سرویس سایت</Tab>
                            <Tab> کمپین و تبلیغات</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و نیاز سنجی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تحلیل رقبا و صنعت
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوا
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        برندینگ
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        پروموشن
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        بهبود رتبه سایت
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی بازاریابی
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        طراحی فروشگاه آنلاین
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ایجاد پنل کاربری
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        مدیریت ارتباط با مشتری(CRM)
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تبلیغات گوگل (گوگل ادز)
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5" style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>کمی درباره مشتریان خود بنویسید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.campaign===false && this.state.email===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab> کمپین و تبلیغات</Tab>
                            <Tab> بازاریابی ایمیلی و پیامکی</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5" style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>کمی درباره مشتریان خود بنویسید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>کدام یک را مد نظر داردید؟ </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        بازاریابی ایمیلی
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        بازاریابی پیامکی
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        هردو
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.email===false && this.state.service===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab>سرویس سایت</Tab>
                            <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و نیاز سنجی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تحلیل رقبا و صنعت
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوا
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        برندینگ
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        پروموشن
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        بهبود رتبه سایت
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی بازاریابی
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        طراحی فروشگاه آنلاین
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ایجاد پنل کاربری
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        مدیریت ارتباط با مشتری(CRM)
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تبلیغات گوگل (گوگل ادز)
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>کدام یک را مد نظر داردید؟ </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        بازاریابی ایمیلی
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        بازاریابی پیامکی
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        هردو
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if (this.state.social===false ){
                return(
                    <Tabs>
                        <TabList>
                            <Tab> سرویس شبکه های اجتماعی</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        اینستاگرام
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تلگرام
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        لینکدین
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        توییتر
                                    </button>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        فیسبوک
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        یوتیوب
                                    </button>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و دسته بندی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        آنالیز صفحات رقبا
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوای منظم
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تحقیق کلید واژه ها
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ادمین و مدیریت صفحه
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        جذب فالوئر و مخاطب
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <div>
                                        <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                        <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if( this.state.service===false){
                return(
                    <Tabs>
                        <TabList>
                            <Tab>سرویس سایت</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        شناخت و نیاز سنجی مخاطبان
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        تحلیل رقبا و صنعت
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        تولید محتوا
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی تولید محتوا
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        برندینگ
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        پروموشن
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        بهبود رتبه سایت
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        مشاوره و پیشنهاد استراتژی بازاریابی
                                    </button>
                                </div>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        طراحی فروشگاه آنلاین
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        ایجاد پنل کاربری
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        مدیریت ارتباط با مشتری(CRM)
                                    </button>
                                    <button className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickEmail} style={{width:'20%',height:'150px'}}>
                                        تبلیغات گوگل (گوگل ادز)
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if( this.state.campaign===false){
                return(
                    <Tabs>
                        <TabList>
                            <Tab> کمپین و تبلیغات</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5" style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>کمی درباره مشتریان خود بنویسید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
            else if( this.state.email===false){
                return(
                    <Tabs>
                        <TabList>
                            <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="p-5" id="input">
                                <div className="flex flex-col sm:flex-col items-center p-5"
                                     style={{justifyContent:"center"}}>
                                    <h2 className="font-medium text-base">نوع خدمات درخواستی
                                    </h2>
                                </div>
                                <div className="preview">
                                    <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <label>کدام یک را مد نظر داردید؟ </label>
                                <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                    <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                                        بازاریابی ایمیلی
                                    </button>
                                    <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                                        بازاریابی پیامکی
                                    </button>
                                    <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                                        هردو
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                    <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                           placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                </div>
                                <div className="mt-5">
                                    <label>توضیحات اختیاری</label>
                                    <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                    </div>
                                </div>
                                <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto"}}>
                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                        <ClassicSpinner  size={25} color="#fff" />
                                    </div> : "تایید"}
                                </button>

                            </div>
                        </TabPanel>
                    </Tabs>
                )
            }
        }
        else if (this.state.button===false){
            return(
                <div className="p-5" id="input">
                    <div className="flex flex-col sm:flex-col items-center p-5"
                         style={{justifyContent:"center"}}>
                        <label>نوع خدمات درخواستی</label>
                    </div>
                    <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                        <button className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center' } onClick={this.onClickCampaign} style={{width:'20%',height:'150px'}}>
                            لوگو، آرم و کاراکتر
                        </button>
                        <button className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickService} style={{width:'20%',height:'150px'}}>
                            بنر، پوستر؛ اینفوگرافی
                        </button>
                        <button className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickSocial} style={{width:'20%',height:'150px'}}>
                            چندرسانه ای

                        </button>

                    </div>
                    <div className="mt-5 flex flex-row">
                        <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            margin: "auto"}}>
                            {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                <ClassicSpinner  size={25} color="#fff" />
                            </div> : "بعدی"}
                        </button>

                    </div>
                </div>
            )
        }
    }
    render(){
        return(
            <>
                <body className="app just" dir={"rtl"}>
                <Modal
                    isOpen={this.state.show}
                    contentLabel="اخطاریه"
                    style={customStyles}
                >
                    <div className="p-5 text-center"><FeatherIcon icon="x-circle" class="w-16 h-16 text-theme-12 mx-auto mt-3"/>
                        <div className="text-3xl mt-5">لطفا موارد مورد نیاز را پر کنید</div>
                        <div className="text-gray-600 mt-2">فیلد های الزامی خالی می باشد</div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <button type="button" onClick={this.handleClose}
                                className="button w-24 bg-theme-1 text-white">بازگشت
                        </button>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.showConfirm}
                    contentLabel="اخطار"
                    style={customStyles}
                >
                    <div className="p-5 text-center"><FeatherIcon icon="x-circle" class="w-16 h-16 text-theme-6 mx-auto mt-3"/>
                        <div className="text-3xl mt-5">اخطار</div>
                        <div className="text-gray-600 mt-2">{this.state.error}</div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <button type="button" onClick={this.handleCloseConfirm}
                                className="button w-24 bg-theme-1 text-white">بازگشت
                        </button>
                    </div>
                </Modal>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top/>
                        <div className="intro-y flex items-center mt-8" style={{justifyContent:"center"}}>
                            <h2 className="text-lg font-medium">
                                ارسال پروژه
                            </h2>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y col-span-12 lg:col-span-12">
                                <div className="intro-y box">
                                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200"
                                         style={{justifyContent:"center"}}>
                                    </div>
                                    {this.renderShow()}
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
export default sendProject
