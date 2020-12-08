import React,{Component} from 'react'
import './../css/app.css';

import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import Badge from "../../node_modules/react-bootstrap/cjs/Badge";

class navbar extends Component {
    state= {
        messageCount:'',
        imageUrl:null,
        activeClass:this.props.activeClass,
        navbarProject:false,
        navbarMeeting:false,
        navbarPayment:false,
        navbarSupport:false,
        navbarUser:false
    };
    constructor(props){
        super(props);
        this.navbarProject=this.navbarProject.bind(this);
        this.navbarMeeting=this.navbarMeeting.bind(this);
        this.navbarPaymnet=this.navbarPaymnet.bind(this);
        this.navbarSupport=this.navbarSupport.bind(this);
        this.navbarUser=this.navbarUser.bind(this);

    }
    componentDidMount(){
        console.log('active',this.state.activeClass);
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showDashboard', {
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
                        messageCount:result.data.messageCount,
                        imageUrl:"https://test.skenap.ir/public" + result.data.avatar

                    });
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
    navbarProject(){
        this.setState({
            navbarProject:!this.state.navbarProject
        })
    }
    navbarSupport(){
        this.setState({
            navbarSupport:!this.state.navbarSupport
        })
    }
    navbarUser(){
        this.setState({
            navbarUser:!this.state.navbarUser
        })
    }
    navbarMeeting(){
        this.setState({
            navbarMeeting:!this.state.navbarMeeting
        })
    }
    navbarPaymnet(){
        this.setState({
            navbarPayment:!this.state.navbarPayment
        })
    }
    renderNavbar(){
        if (this.state.activeClass==='1'){
            return(
                <ul className="side-nav__devider my-6">
                    <li className="pr-5">
                        <Link to="/karfarma/dashboard" className="side-menu side-menu--active">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                            <div className="side-menu__title"> داشبورد </div>
                        </Link>
                    </li>
                    <li  className="pr-5">
                        <button onClick={this.navbarProject} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پروژه</div>
                            {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/projects" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/category" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li  className="pr-5">
                        <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                            <div className="side-menu__title">حساب کاربری</div>
                            {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                            <li className="pr-5">
                                <Link to="/karfarma/profile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/completeProfile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/auth" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li  className="pr-5">
                        <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                            <div className="side-menu__title">پرداخت ها</div>
                            {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/payed" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/payment" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده فاکتورها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/bills" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <Link to="/karfarma/inbox" className="side-menu">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                            <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                        </Link>
                    </li>
                    <li  className="pr-5">
                        <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                            <div className="side-menu__title">جلسات</div>
                            {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showMeeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/meeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پشتیبانی</div>
                            {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showSupport" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/ticket" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>

            )
        }
        else if (this.state.activeClass==='2'){
            return(
                <ul className="side-nav__devider my-6">
                    <li  className="pr-5">
                        <Link to="/karfarma/dashboard" className="side-menu" >
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                            <div className="side-menu__title"> داشبورد </div>
                        </Link>
                    </li>
                    <li  className="pr-5">
                        <button onClick={this.navbarProject} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پروژه</div>
                            {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/projects" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/category" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="pr-5">
                        <a onClick={this.navbarUser} className="side-menu side-menu--active border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                            <div className="side-menu__title">حساب کاربری</div>
                            {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </a>
                        <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                            <li className="pr-5">
                                <Link to="/karfarma/profile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/completeProfile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/auth" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                            <div className="side-menu__title">پرداخت ها</div>
                            {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/payed" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/payment" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/bills" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <Link to="/karfarma/inbox" className="side-menu">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                            <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                            <div className="side-menu__title">جلسات</div>
                            {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showMeeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/meeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon  className="w-4 h-4" icon="umbrella"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پشتیبانی</div>
                            {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showSupport" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/ticket" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>

            )
        }
        else if (this.state.activeClass==='3'){
            return(
                <ul className="side-nav__devider my-6">
                    <li className="pr-5">
                        <Link to="/karfarma/dashboard" className="side-menu ">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                            <div className="side-menu__title"> داشبورد </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarProject} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پروژه</div>
                            {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/projects" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/category" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon  className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                            <div className="side-menu__title">حساب کاربری</div>
                            {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                            <li className="pr-5">
                                <Link to="/karfarma/profile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/completeProfile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/auth" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                            <div className="side-menu__title">پرداخت ها</div>
                            {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/payed" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/payment" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/bills" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <Link to="/karfarma/inbox" className="side-menu">
                            <div className="side-menu__icon"> <FeatherIcon  className="w-4 h-4" icon="inbox"/> </div>
                            <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                            <div className="side-menu__title">
                            جلسات
                        </div>
                            {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showMeeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/meeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پشتیبانی</div>
                            {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showSupport" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/ticket" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )
        }
        else if (this.state.activeClass==='4'){
            return(
                <ul className="side-nav__devider my-6">
                    <li className="pr-5">
                        <Link to="/karfarma/dashboard" className="side-menu ">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                            <div className="side-menu__title"> داشبورد </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarProject} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پروژه</div>
                            {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/projects" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/category" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                            <div className="side-menu__title">حساب کاربری</div>
                            {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                            <li className="pr-5">
                                <Link to="/karfarma/profile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/completeProfile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/auth" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <a onClick={this.navbarPaymnet} className="side-menu side-menu--active border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                            <div className="side-menu__title">پرداخت ها</div>
                            {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </a>
                        <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/payed" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/payment" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/bills" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <Link to="/karfarma/inbox" className="side-menu">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                            <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                            <div className="side-menu__title">جلسات</div>
                            {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showMeeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/meeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>  درخواست جلسه </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پشتیبانی</div>
                            {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showSupport" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/ticket" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )
        }
        else if (this.state.activeClass==='5'){
            return(
                <ul className="side-nav__devider my-6">
                    <li className="pr-5">
                        <Link to="/karfarma/dashboard" className="side-menu ">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                            <div className="side-menu__title"> داشبورد </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarProject} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پروژه</div>
                            {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/projects" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/category" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                            <div className="side-menu__title">حساب کاربری</div>
                            {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                            <li className="pr-5">
                                <Link to="/karfarma/profile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/completeProfile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/auth" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                            <div className="side-menu__title">پرداخت ها</div>
                            {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/payed" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/payment" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/bills" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <Link to="/karfarma/inbox" className="side-menu side-menu--active">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                            <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                            <div className="side-menu__title">جلسات</div>
                            {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showMeeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/meeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پشتیبانی</div>
                            {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showSupport" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/ticket" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )
        }
        else if (this.state.activeClass==='6'){
            return(
                <ul className="side-nav__devider my-6">
                    <li className="pr-5">
                        <Link to="/karfarma/dashboard" className="side-menu ">
                            <div className="side-menu__icon"> <FeatherIcon  className="w-4 h-4" icon="home"/> </div>
                            <div className="side-menu__title"> داشبورد </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarProject} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پروژه</div>
                            {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/projects" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/category" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                            <div className="side-menu__title">حساب کاربری</div>
                            {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                            <li className="pr-5">
                                <Link to="/karfarma/profile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/completeProfile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon  className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/auth" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                            <div className="side-menu__title">پرداخت ها</div>
                            {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/payed" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/payment" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/bills" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <Link to="/karfarma/inbox" className="side-menu">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                            <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                            <div className="side-menu__title">جلسات</div>
                            {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showMeeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/meeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پشتیبانی</div>
                            {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showSupport" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/ticket" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )
        }
        else if (this.state.activeClass==='7'){
            return(
                <ul className="side-nav__devider my-6">
                    <li className="pr-5">
                        <Link to="/karfarma/dashboard" className="side-menu ">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                            <div className="side-menu__title"> داشبورد </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <a onClick={this.navbarProject} className="side-menu side-menu--active border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پروژه</div>
                            {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </a>
                        <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/projects" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/category" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                </Link>
                            </li>
                        </ul>

                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                            <div className="side-menu__title">حساب کاربری</div>
                            {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                            <li className="pr-5">
                                <Link to="/karfarma/profile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/completeProfile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon  className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/auth" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                            <div className="side-menu__title">پرداخت ها</div>
                            {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5 ">
                                <Link to="/karfarma/payed" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/payment" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/bills" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <Link to="/karfarma/inbox" className="side-menu">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                            <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                            <div className="side-menu__title">جلسات</div>
                            {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showMeeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/meeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پشتیبانی</div>
                            {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showSupport" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/ticket" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )
        }
        else if (this.state.activeClass==='8'){
            return(
                <ul className="side-nav__devider my-6">
                    <li className="pr-5">
                        <Link to="/karfarma/dashboard" className="side-menu ">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                            <div className="side-menu__title"> داشبورد </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarProject} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پروژه</div>
                            {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/projects" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/category" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                </Link>
                            </li>
                        </ul>

                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                            <div className="side-menu__title">حساب کاربری</div>
                            {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                            <li className="pr-5">
                                <Link to="/karfarma/profile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/completeProfile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/auth" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon">  <FeatherIcon  className="w-4 h-4" icon="pocket"/></div>
                            <div className="side-menu__title">پرداخت ها</div>
                            {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/payed" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/payment" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/bills" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <Link to="/karfarma/inbox" className="side-menu">
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                            <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                            <div className="side-menu__title">جلسات</div>
                            {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showMeeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/meeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پشتیبانی</div>
                            {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showSupport" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/ticket" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )
        }
        else if (this.state.activeClass==='9'){
            return(
                <ul className="side-nav__devider my-6">
                    <li className="pr-5">
                        <Link to="/karfarma/dashboard" className="side-menu"  style={{cursor:'default'}} onClick={ (event) => event.preventDefault() }>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                            <div className="side-menu__title"> داشبورد </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={ (event) => event.preventDefault() } className="side-menu border-none" style={{outline:'none',width:'100%',cursor:'default'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پروژه</div>
                            {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/projects" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/category" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                            <div className="side-menu__title">حساب کاربری</div>
                            {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                            <li className="pr-5">
                                <Link to="/karfarma/profile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/completeProfile" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/auth" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                            <div className="side-menu__title">پرداخت ها</div>
                            {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/payed" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/payment" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/bills" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <Link to="/karfarma/inbox" className="side-menu"  style={{cursor:'default'}} onClick={ (event) => event.preventDefault() }>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                            <div className="side-menu__title"> صندوق پیام  </div>
                        </Link>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                            <div className="side-menu__title">جلسات</div>
                            {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showMeeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>  مشاهده جلسات </div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/meeting" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="pr-5">
                        <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                            <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                            <div className="side-menu__title">پشتیبانی</div>
                            {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                        </button>
                        <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                            <li className="pr-5">
                                <Link to="/karfarma/showSupport" className="side-menu">
                                    <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                </Link>
                            </li>
                            <li className="pr-5">
                                <Link to="/karfarma/ticket" className="side-menu">
                                    <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                    <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            )
        }
        else if (this.state.activeClass==='10'){
            return(
                    <ul className="side-nav__devider my-6">
                        <li className="pr-5">
                            <Link to="/karfarma/dashboard" className="side-menu ">
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                                <div className="side-menu__title"> داشبورد </div>
                            </Link>
                        </li>
                        <li className="pr-5">
                            <button onClick={this.navbarProject} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                                <div className="side-menu__title">پروژه</div>
                                {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/projects" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/category" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                    </Link>
                                </li>
                            </ul>


                        </li>
                        <li className="pr-5">
                            <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                                <div className="side-menu__title">حساب کاربری</div>
                                {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                                <li className="pr-5">
                                    <Link to="/karfarma/profile" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/completeProfile" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/auth" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pr-5">
                            <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                <div className="side-menu__title">پرداخت ها</div>
                                {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/payed" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/payment" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/bills" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pr-5">
                            <Link to="/karfarma/inbox" className="side-menu">
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                                <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                            </Link>
                        </li>
                        <li className="pr-5">
                            <button onClick={this.navbarMeeting} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                <div className="side-menu__title">جلسات</div>
                                {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/showMeeting" className="side-menu">
                                        <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/meeting" className="side-menu">
                                        <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pr-5">
                            <a onClick={this.navbarSupport} className="side-menu side-menu--active border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                                <div className="side-menu__title">پشتیبانی</div>
                                {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </a>
                            <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/showSupport" className="side-menu">
                                        <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/ticket" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon  className="w-4 h-4" icon="file-plus"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
            )
        }
        else if (this.state.activeClass==='11'){
            return(
                    <ul className="side-nav__devider my-6">
                        <li className="pr-5">
                            <Link to="/karfarma/dashboard" className="side-menu" onClick={ (event) => event.preventDefault() } style={{cursor:'default'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                                <div className="side-menu__title"> داشبورد </div>
                            </Link>
                        </li>
                        <li className="pr-5">
                            <button onClick={(event) => event.preventDefault()} className="side-menu border-none" style={{outline:'none',width:'100%',cursor:'default'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                                <div className="side-menu__title">پروژه</div>
                                {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/projects" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/category" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                    </Link>
                                </li>
                            </ul>

                        </li>
                        <li className="pr-5">
                            <button onClick={(event) => event.preventDefault()} className="side-menu border-none" style={{outline:'none',width:'100%',cursor:'default'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                                <div className="side-menu__title">حساب کاربری</div>
                                {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                                <li className="pr-5">
                                    <Link to="/karfarma/profile" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/completeProfile" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/auth" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pr-5">
                            <button onClick={(event) => event.preventDefault()} className="side-menu border-none" style={{outline:'none',width:'100%',cursor:'default'}}>
                                <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                <div className="side-menu__title">پرداخت ها</div>
                                {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/payed" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/payment" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/bills" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pr-5">
                            <Link to="/karfarma/inbox" className="side-menu" onClick={ (event) => event.preventDefault() } style={{cursor:'default'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                                <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                            </Link>
                        </li>
                        <li className="pr-5">
                            <button onClick={ (event) => event.preventDefault() } className="side-menu border-none" style={{outline:'none',width:'100%',cursor:'default'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                <div className="side-menu__title">جلسات</div>
                                {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/showMeeting" className="side-menu">
                                        <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/meeting" className="side-menu">
                                        <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pr-5">
                            <button onClick={(event) => event.preventDefault()} className="side-menu border-none" style={{outline:'none',width:'100%',cursor:'default'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                                <div className="side-menu__title">پشتیبانی</div>
                                {this.state.navbarSupport?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/showSupport" className="side-menu">
                                        <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/ticket" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
            )
        }
        else if (this.state.activeClass==='12')
        {
            return(
                    <ul className="side-nav__devider my-6">
                        <li className="pr-5">
                            <Link to="/karfarma/dashboard" className="side-menu">
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="home"/> </div>
                                <div className="side-menu__title"> داشبورد </div>
                            </Link>
                        </li>
                        <li className="pr-5">
                            <button onClick={this.navbarProject} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="target"/> </div>
                                <div className="side-menu__title">پروژه</div>
                                {this.state.navbarProject?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarProject?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/projects" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="target"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده پروژه ها</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/category" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>ایجاد پروژه جدید</div>
                                    </Link>
                                </li>
                            </ul>

                        </li>
                        <li className="pr-5">
                            <button onClick={this.navbarUser} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="users"/> </div>
                                <div className="side-menu__title">حساب کاربری</div>
                                {this.state.navbarUser?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarUser?'side-menu__sub-open px-2 d-block':'d-none'} >
                                <li className="pr-5">
                                    <Link to="/karfarma/profile" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="user"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>اطلاعات کاربری</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/completeProfile" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>تکمیل اطلاعات</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/auth" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="unlock"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>تایید هویت</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pr-5">
                            <button onClick={this.navbarPaymnet} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon">  <FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                <div className="side-menu__title">پرداخت ها</div>
                                {this.state.navbarPayment?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarPayment?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/payed" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="pocket"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>صورت حساب های مالی</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/payment" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="shopping-bag"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>مشاهده فاکتورها</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/bills" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="briefcase"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>پرداخت انبوه</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pr-5">
                            <Link to="/karfarma/inbox" className="side-menu">
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="inbox"/> </div>
                                <div className="side-menu__title"> صندوق پیام <div className="w-5 h-5 flex-none image-fit rounded-full  overflow-hidden" style={{bottom:'10px'}}> <Badge className="text-theme-12">{this.state.messageCount}</Badge></div> </div>
                            </Link>
                        </li>
                        <li className="pr-5">
                            <a onClick={this.navbarMeeting} className="side-menu side-menu--active border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                <div className="side-menu__title">جلسات</div>
                                {this.state.navbarMeeting?<FeatherIcon className="side-menu__icon" icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </a>
                            <ul className={this.state.navbarMeeting?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/showMeeting" className="side-menu">
                                        <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="navigation"/> </div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}> مشاهده جلسات </div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/meeting" className="side-menu">
                                        <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="umbrella"/> </div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}> درخواست جلسه </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pr-5">
                            <button onClick={this.navbarSupport} className="side-menu border-none" style={{outline:'none',width:'100%'}}>
                                <div className="side-menu__icon"> <FeatherIcon  className="w-4 h-4" icon="target"/> </div>
                                <div className="side-menu__title">پشتیبانی</div>
                                {this.state.navbarSupport?<FeatherIcon className="side-menu__icon"  icon="corner-left-up"/>:<FeatherIcon className="side-menu__icon" icon="corner-left-down"/>}
                            </button>
                            <ul className={this.state.navbarSupport?'side-menu__sub-open px-2 d-block':'d-none'}>
                                <li className="pr-5">
                                    <Link to="/karfarma/showSupport" className="side-menu">
                                        <div className="side-menu__icon"> <FeatherIcon className="w-4 h-4" icon="disc"/> </div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>فهرست تیکت ها</div>
                                    </Link>
                                </li>
                                <li className="pr-5">
                                    <Link to="/karfarma/ticket" className="side-menu">
                                        <div className="side-menu__icon"><FeatherIcon className="w-4 h-4" icon="file-plus"/></div>
                                        <div className="side-menu__title" style={{fontSize:'12px'}}>تیکت جدید</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
            )
        }
    }
    render(){
        return(
            <>
	            <nav className="side-nav">
		            <Link to="/karfarma/dashboard" className="intro-x flex items-center pr-5 pt-4">
			            <img alt="Midone Tailwind HTML Admin Template" className="w-6" src={require("./../images/sproc-favicon.png")}/>
			            <span className="block text-white text-lg mr-3"> سامانه <span className="font-medium" style={{fontSize:'14px'}}>کارفرما</span> </span>
		            </Link>
                    {this.renderNavbar()}
                </nav>
            </>
        )
    }
}
export default navbar
