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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
        show:false,
        index:[],
        loading:false,
        error:'',
        showConfirm:false,
        activeClass:'7',
        digital:true,
        guide:true,
        article:true,
        dev:true,
        seo:true,
        design:true,
        web:true,
        shop:true,
        market:true,
        su_id:''
    };
    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
        this.onClickMarket=this.onClickMarket.bind(this);
        this.onClickArticle=this.onClickArticle.bind(this);
        this.onClickGuide=this.onClickGuide.bind(this);
        this.onClickDigital=this.onClickDigital.bind(this);
        this.onClickDesign=this.onClickDesign.bind(this);
        this.onClickShop=this.onClickShop.bind(this);
        this.onClickDev=this.onClickDev.bind(this);
        this.onClickWeb=this.onClickWeb.bind(this);
        this.onClickContent=this.onClickContent.bind(this);

    }
    handleClose  = () =>{
        this.setState({show:false});
    };
    handleShow  = () =>{
        this.setState({show:true});
    };
    onClickMarket() {
        this.setState({
            status: '7' ,
            market:!this.state.market,
            digital:true,
            guide:true,
            article:true,
            dev:true,
            seo:true,
            design:true,
            web:true,
            shop:true,
        });
        this.loginUp('7')
    }
    onClickArticle() {

            this.setState({
                status: '2',
                article:!this.state.article,
                digital:true,
                guide:true,
                dev:true,
                seo:true,
                design:true,
                web:true,
                shop:true,
                market:true
            });
        this.loginUp('2');
    }
    onClickGuide() {
        this.setState({
            status: '3',
            guide:!this.state.guide,
            digital:true,
            article:true,
            dev:true,
            seo:true,
            design:true,
            web:true,
            shop:true,
            market:true
        });
        this.loginUp('3')
    }
    onClickDigital() {
        this.setState({
            status: '1' ,
            digital:!this.state.digital,
            guide:true,
            article:true,
            dev:true,
            seo:true,
            design:true,
            web:true,
            shop:true,
            market:true
        });
        this.loginUp('1')
    }
    onClickDesign() {
        this.setState({
            status: '4' ,
            design:!this.state.design,
            digital:true,
            guide:true,
            article:true,
            dev:true,
            seo:true,
            web:true,
            shop:true,
            market:true
        });
        this.loginUp('4')
    }
    onClickShop() {
        this.setState({
            status: '8',
            shop:!this.state.shop,
            digital:true,
            guide:true,
            article:true,
            dev:true,
            seo:true,
            design:true,
            web:true,
            market:true
        });
        this.loginUp('8')
    }
    onClickDev() {
        this.setState({
            status: '9',
            dev:!this.state.dev,
            digital:true,
            guide:true,
            article:true,
            seo:true,
            design:true,
            web:true,
            shop:true,
            market:true
        });
        this.loginUp('9')
    }
    onClickWeb() {
        this.setState({
            status: '5' ,
            web:!this.state.web,
            digital:true,
            guide:true,
            article:true,
            dev:true,
            seo:true,
            design:true,
            shop:true,
            market:true
        });
        this.loginUp('5')
    }
    onClickContent() {
        this.setState({
            status: '6',
            seo:!this.state.seo,
            digital:true,
            guide:true,
            article:true,
            dev:true,
            design:true,
            web:true,
            shop:true,
            market:true
        });
        this.loginUp('6')
    }
    handleShowConfirm  = () =>{
        this.setState({showConfirm:true});
    };
    handleCloseConfirm  = () =>{
        this.setState({showConfirm:false});
    };
    loginUp(param){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/suRelation', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token:apiToken,
                user_id: user_id,
                status:param
            }),
        }).then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.stats === 'success') {
                    if (this.state.digital===false){
                        history.push( {
                            pathname: './digital',
                            state: { su_id: result.data.su_id }
                        })
                    }
                    if (this.state.seo===false){
                        history.push({
                            pathname: './seo',
                            state: { su_id: result.data.su_id }
                        })
                    }
                    if (this.state.guide===false){
                        history.push({
                            pathname: './guide',
                            state: { su_id: result.data.su_id }
                        })
                    }
                    if (this.state.dev===false){
                        history.push({
                            pathname: './dev',
                            state: { su_id: result.data.su_id }
                        })
                    }
                    if (this.state.design===false){
                        history.push({
                            pathname: './design',
                            state: { su_id: result.data.su_id }
                        })
                    }
                    if (this.state.web===false){
                        history.push({
                            pathname: './web',
                            state: { su_id: result.data.su_id }
                        })
                    }
                    if (this.state.market===false){
                        history.push({
                            pathname: './market',
                            state: { su_id: result.data.su_id }
                        })
                    }
                    if (this.state.shop===false){
                        history.push({
                            pathname: './shop',
                            state: { su_id: result.data.su_id }
                        })
                    }
                    if (this.state.article===false){
                        history.push({
                            pathname: './article',
                            state: { su_id: result.data.su_id }
                        })
                    }
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
                        <Top disable="yes"/>
                        <div className="intro-y flex items-center mt-8" style={{justifyContent:"center"}}>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y col-span-12 lg:col-span-12">
                                <div className="intro-y box">
                                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200"
                                         style={{justifyContent:"center"}}>
                                    </div>
                                    <div className="p-5" id="input">
                                        <div className="flex flex-col sm:flex-col items-center p-5"
                                             style={{justifyContent:"center"}}>
                                            <h2 className="text-lg font-medium">
                                                حوزه پروژه
                                            </h2>
                                            <p className="text-gray-700 mt-3">(لطفا حوزه پروژه خود را به دقت انتخاب کنید توجه داشته باشید از میان حوزه ها فقط یک حوزه را به صورت همزمان میتوانید انتخاب کنید)</p>
                                        </div>
                                            <div className="preview mt-5" style={{display:'flex',justifyContent:'space-around'}}>
                                            <button className={this.state.digital ? 'button  shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button  mr-2 shadow-md mb-2 bg-theme-9 text-white  border-none border-4' } onClick={this.onClickDigital} style={{width:'40%',height:'150px',borderStyle:'none',borderColor:'green'}}>
                                                <div style={{display:'flex',flexDirection:'row',textAlign:'right'}}>
                                                    <p className="">بازاریابی دیجیتال</p>
                                                    <FeatherIcon className="mr-auto" size={40} icon="package"/>
                                                </div>
                                                <div className="mt-3" style={{display:'flex',flexDirection:'row',textAlign:'right'}} >
                                                    <p className="text-gray-700"> کمپین و تبلیغات - سرویس سایت - سرویس شبکه های اجتماعی - بازاریابی ایمیلی و پیامکی</p>
                                                </div>
                                            </button>
                                            <button className={this.state.article ? 'button w-100 shadow-md mr-2 mb-2 bg-gray-200 border-none border-0' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white border-none border-0' } onClick={this.onClickArticle} style={{width:'40%',height:'150px'}}>

                                                <div style={{display:'flex',flexDirection:'row',textAlign:'right'}}>
                                                    <p> مقاله نویسی</p>
                                                    <FeatherIcon className="mr-auto" size={40} icon="package"/>

                                                </div>
                                                <div className="mt-3" style={{display:'flex',flexDirection:'row',textAlign:'right'}} >
                                                    <p className="text-gray-700"> تخصصی - عمومی</p>
                                                </div>
                                            </button>
                                            <button className={this.state.guide ? 'button w-100 shadow-md mr-2 mb-2 bg-gray-200 border-none border-0' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white border-none border-0' } onClick={this.onClickGuide} style={{width:'40%',height:'150px'}}>


                                                <div style={{display:'flex',flexDirection:'row',textAlign:'right'}}>
                                                    <p>  مشاوره کسب و کار</p>
                                                    <FeatherIcon className="mr-auto" size={40} icon="package"/>
                                                </div>
                                                <div className="mt-3" style={{display:'flex',flexDirection:'row',textAlign:'right'}} >
                                                    <p className="text-gray-700"> تخصصی - عمومی</p>
                                                </div>
                                            </button>
                                        </div>
                                        <div className="preview mt-1"  style={{display:'flex',justifyContent:'space-around'}}>
                                            <button className={this.state.design ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickDesign} style={{width:'40%',height:'150px'}}>

                                                <div style={{display:'flex',flexDirection:'row',textAlign:'right'}}>
                                                    <p> طراحی گرافیکی</p>
                                                    <FeatherIcon className="mr-auto" size={40} icon="package"/>
                                                </div>
                                                <div className="mt-3" style={{display:'flex',flexDirection:'row',textAlign:'right'}} >
                                                    <p className="text-gray-700">لوگو و آرم - بنر، پوستر و اینفوگرافی و پست شبکه اجتماعی - هویت سازمانی و ست اداری - کاتالوگ و بروشور - چندرسانه ای ها</p>
                                                </div>
                                            </button>
                                            <button className={this.state.web ? 'button w-75 shadow-md mb-2 mr-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickWeb} style={{width:'40%',height:'150px'}}>

                                                <div style={{display:'flex',flexDirection:'row',textAlign:'right'}}>
                                                    <p>
                                                        طراحی وب سایت و اپلیکیشن
                                                    </p>
                                                    <FeatherIcon className="mr-auto" size={40} icon="package"/>
                                                </div>
                                                <div className="mt-3" style={{display:'flex',flexDirection:'row',textAlign:'right'}} >
                                                    <p className="text-gray-700"> طراحی وب سایت  - طراحی اپلیکیشن </p>
                                                </div>
                                            </button>
                                            <button className={this.state.seo ? 'button w-75 shadow-md mb-2 mr-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickContent} style={{width:'40%',height:'150px'}}>

                                                <div style={{display:'flex',flexDirection:'row',textAlign:'right'}}>
                                                    <p>
                                                        محتوا پردازی و سئو
                                                    </p>
                                                    <FeatherIcon className="mr-auto"  size={40} icon="package"/>
                                                </div>
                                                <div className="mt-3" style={{display:'flex',flexDirection:'row',textAlign:'right'}} >
                                                    <p className="text-gray-700"> خدمات سئو - سفارش محتوای محصول و خدمات فروش آنلاین - سفارش محتوای اختصاصی - خدمات تعیین استراتژی محتوا و برندینگ - سرویس شبکه های
                                                        اجتماعی</p>
                                                </div>
                                            </button>
                                        </div>
                                        <div className="preview mt-1"  style={{display:'flex',justifyContent:'space-around'}}>
                                            <button className={this.state.market ? 'button w-75 shadow-md mb-2 mr-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickMarket} style={{width:'40%',height:'150px'}}>

                                                <div style={{display:'flex',flexDirection:'row',textAlign:'right'}}>
                                                    <p>
                                                        بازاریابی
                                                    </p>
                                                    <FeatherIcon className="mr-auto" size={40} icon="package"/>
                                                </div>
                                                <div className="mt-3" style={{display:'flex',flexDirection:'row',textAlign:'right'}} >
                                                    <p className="text-gray-700">طراحی سیستم - تعیین استراتژی - فروش محصول یا خدمات - آموزش کانتر فروش - بازاریابی تلفنی</p>
                                                </div>
                                            </button>
                                            <button className={this.state.shop ? 'button w-75 shadow-md mb-2 mr-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' }  onClick={this.onClickShop} style={{width:'40%',height:'150px'}}>

                                                <div style={{display:'flex',flexDirection:'row',textAlign:'right'}}>
                                                    <p>طراحی فروشگاه آنلاین
                                                    </p>
                                                    <FeatherIcon className="mr-auto" size={40} icon="package"/>
                                                </div>
                                                <div className="mt-3" style={{display:'flex',flexDirection:'row',textAlign:'right'}} >
                                                    <p className="text-gray-700"> تخصصی - عمومی</p>
                                                </div>
                                            </button>
                                            <button className={this.state.dev ? 'button w-75 shadow-md mb-2 mr-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white' } onClick={this.onClickDev} style={{width:'40%',height:'150px'}}>
                                                <div style={{display:'flex',flexDirection:'row',textAlign:'right'}}>
                                                    <p> برنامه نویسی و توسعه نرم افزار</p>
                                                    <FeatherIcon className="mr-auto" size={40} icon="package"/>
                                                </div>
                                                <div className="mt-3" style={{display:'flex',flexDirection:'row',textAlign:'right'}} >
                                                    <p className="text-gray-700"> تخصصی - عمومی</p>
                                                </div>
                                            </button>
                                        </div>
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
export default sendProject
