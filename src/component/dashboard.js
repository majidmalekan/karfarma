import React, {Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import Top from './Top'
import {Circle, Line} from 'rc-progress';
import {CircleSlider} from "react-circle-slider";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import Carousel from "@brainhubeu/react-carousel";
import '@brainhubeu/react-carousel/lib/style.css';
import project from "./project";
import Modal from "react-modal";
import NumberFormat from "react-number-format";
import {MagicSpinner} from "react-spinners-kit";
import './../css/app.css';

const circleContainerStyle = {
    width: '70px',
    height: '70px',
};
const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

class dashboard extends Component {

    state = {
        showFive: [],
        showMost: [],
        projectCount: '',
        messageCount: '',
        payCount: '',
        expireCount: '',
        showMostTask: [],
        projectCarousel: [],
        message: [],
        imageUrl: null,
        activeClass: '1',
        loading: false,
        complete: '',
        show: false,
        error: '',
        render: false,
    };

    refresh() {
        window.location.reload(false)
    }

    handleClose = () => {
        this.setState({show: false});
        history.push('./')
    };
    handleCloseConfirm = () => {
        this.setState({showConfirm: false});
    };
    handleShow = () => {
        this.setState({show: true});
    };
    handleShowConfirm = () => {
        this.setState({showConfirm: true});
    };

    renderAll() {
        if (this.state.render === true) {
            return (
                <body className="app just" dir={"rtl"}>
                <Modal
                    isOpen={this.state.show}
                    contentLabel="هشدار"
                    style={customStyles}
                >
                    <div className="p-5 text-center"><FeatherIcon icon="x-circle"
                                                                  class="w-16 h-16 text-theme-6 mx-auto mt-3"/>
                        <div className="text-gray-600 mt-2">!مشکلی پیش اومده</div>
                        <div className="text-3xl mt-5">{this.state.error}</div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <button type="button" onClick={this.handleClose}
                                className="button w-24 bg-theme-1 text-white">بازگشت
                        </button>
                    </div>
                </Modal>
                <Mobile/>
                <div className="flex">
	                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top disable="yes"/>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
                                <div className="col-span-12 mt-8">
                                    <div className="intro-y flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate ml-3">
                                            اطلاعات کلی
                                        </h2>
                                        <button onClick={this.refresh.bind(this)}
                                                className="ml-auto flex text-theme-1"><FeatherIcon
                                            icon="refresh-ccw" className="w-4 h-4 ml-2"/>بارگذاری مجدد
                                        </button>
                                    </div>
                                    {this.renderCarousel()}

                                </div>
                                <div className="col-span-12 xxl:col-span-9 xxl:border-l border-theme-5 pb-10">
                                    <div className="xxl:pl-6 grid grid-cols-12 gap-6">

                                        <div className="col-span-12 md:col-span-12 xl:col-span-12 xxl:col-span-12 mt-3">
                                            <div className="intro-x flex items-center h-10">
                                                <h2 className="text-lg font-medium truncate mr-5">
                                                    اخرین پیام های شما
                                                </h2>
                                            </div>
                                            {this.renderMessageShow()}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="intro-y block sm:flex items-center h-10">
                                        <h2 className="text-lg font-medium truncate mr-5">
                                            آخرین پروژه های شما
                                        </h2>
                                    </div>
                                    {this.renderProjectShow()}
                                </div>
                                {this.renderProjectSelected()}
                            </div>
                            <div className="col-span-12 xxl:col-span-9 xxl:border-l border-theme-5 -mb-10 pb-10">
                                <div className="xxl:pl-6 grid grid-cols-12 gap-6">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </body>
            )
        } else if (this.state.render === false) {
            return (
                <body>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    height: '100vh'
                }}>
                    <MagicSpinner className="m-auto" size={250} color="#410430" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}/>
                </div>
                </body>

            )
        }
    }

    componentDidMount() {
        let apiToken = localStorage.getItem('apiToken');
	    const url=`${process.env.REACT_APP_API_PROXY}`;
	    console.log('yxfchgvjhbknkjkbjvhv',url)
        if (apiToken === null) {
            this.setState({
                show: true,
                error: '!ببخشید ولی ورود یادت رفته'
            })
        }
        let user_id = localStorage.getItem('user_id');
        this.setState({loading: true});
        fetch(`${process.env.REACT_APP_API_PROXY}showDashboard`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: apiToken,
                user_id: user_id
            }),
        }).then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.stats === 'success') {
                    if (result.data.complete === 0) {
                        history.push("./just")
                    } else if (result.data.complete === 1) {
                        history.push("./dashboard")
                    }
                    if (result.data.message === "") {
                        console.log('dassadasdasdas')
                    }
                    this.setState({
                        showMost: result.data.arrayProject,
                        showMostTask: result.data.arrayTask,
                        projectCount: result.data.projectCount,
                        messageCount: result.data.messageCount,
                        payCount: result.data.payCount,
                        expireCount: result.data.expireCount,
                        message: result.data.message,
                        imageUrl: "https://test.skenap.ir/public" + result.data.avatar,
                        complete: result.data.complete,
                        projectCarousel: result.data.arrayCarousels,
                        render: true,
                    });
                    console.log(this.state.message)
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

    renderStatus(param) {
        if (param.dateStatus === '1') {
            return (
                <div className="flex  text-theme-6">

                    <FeatherIcon
                        icon="check-square" className="w-4 h-4 ml-2"/>
                    پرداخت شده
                </div>
            )
        } else if (param.dateStatus === '2') {
            return (
                <div className="flex  text-theme-6">

                    <FeatherIcon
                        icon="check-square" className="w-4 h-4 ml-2"/>
                    منقضی شده
                </div>
            )
        } else if (param.dateStatus === '0') {
            return (
                <div className="flex text-theme-12">
                    <FeatherIcon
                        icon="check-square" className="w-4 h-4 ml-2"/>
                    در انتظار پرداخت
                </div>
            )
        }
    }

    renderPriority(param) {
        if (param.priority === 1) {
            return (
                <div className="box px-5 py-3 mr-4 flex-1 zoom-in" style={{borderColor: 'red', borderWidth: 'medium'}}>
                    <div className="flex items-center">
                        <div className="font-medium mt-4">{param.title}</div>
                        <div className="text-gray-600 mr-5 mt-4">{param.text}</div>
                        <div className="text-xs text-gray-500 mr-auto">{param.date}</div>

                    </div>

                    {this.renderButtonMessage(param)}
                </div>
            )
        } else if (param.priority === 2) {
            return (
                <div className="box px-5 py-3 mr-4 flex-1 zoom-in"
                     style={{borderColor: 'yellow', borderWidth: 'medium'}}>
                    <div className="flex items-center">
                        <div className="font-medium mt-4">{param.title}</div>
                        <div className="text-gray-600 mr-5 mt-4">{param.text}</div>
                        <div className="text-xs text-gray-500 mr-auto">{param.date}</div>

                    </div>

                    {this.renderButtonMessage(param)}
                </div>
            )
        }
    }

    renderProject(param) {
        if (param.status === 'finished') {
            return (
                <div className="flex  text-theme-6">

                    <FeatherIcon
                        icon="check-square" className="w-4 h-4 ml-2"/>
                    پایان یافته
                </div>
            )
        } else if (param.status === 'need') {
            return (
                <div className="flex  text-theme-6">

                    <FeatherIcon
                        icon="check-square" className="w-4 h-4 ml-2"/>
                    تایید نشده
                </div>
            )
        } else if (param.status === 'inProgress') {
            return (
                <div className="flex text-theme-12">
                    <FeatherIcon
                        icon="check-square" className="w-4 h-4 ml-2"/>
                    فعال
                </div>
            )
        }
    }

    renderImage() {
        if (this.state.imageUrl !== '0') {
            return (
                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                    <img alt=""
                         src={this.state.imageUrl}/>
                </div>

            )
        } else if (this.state.imageUrl === '0') {
            return (
                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                    <img alt="" src={require("./../images/profile-9.jpg")}/>
                </div>
            )
        }
    }

    renderCarousel() {

        if (this.state.projectCount === 0) {
            if (window.innerWidth === 1024 && window.innerWidth < 1440) {
                return (
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="target"
                                                     className="report-box__icon text-theme-10"/>

                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.projectCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پروژه های شما</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="mail"
                                                     className="report-box__icon text-theme-11"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.messageCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پیام های خوانده نشده
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="triangle"
                                                     className="report-box__icon text-theme-12"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.expireCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پرداختی های معوقه
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="pocket"
                                                     className="report-box__icon text-theme-9"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.payCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پرداختی های پیش رو
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            if (window.innerWidth >= 1440) {
                return (
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="target"
                                                     className="report-box__icon text-theme-10"/>

                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.projectCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پروژه های شما</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="mail"
                                                     className="report-box__icon text-theme-11"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.messageCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پیام های خوانده نشده
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="triangle"
                                                     className="report-box__icon text-theme-12"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.expireCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پرداختی های معوقه
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="pocket"
                                                     className="report-box__icon text-theme-9"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.payCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پرداختی های پیش رو
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            if (window.innerWidth < 1024 && window.innerWidth >= 768) {
                return (
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="target"
                                                     className="report-box__icon text-theme-10"/>

                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.projectCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پروژه های شما</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="mail"
                                                     className="report-box__icon text-theme-11"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.messageCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پیام های خوانده نشده
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="triangle"
                                                     className="report-box__icon text-theme-12"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.expireCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پرداختی های معوقه
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="pocket"
                                                     className="report-box__icon text-theme-9"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.payCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پرداختی های پیش رو
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            if (window.innerWidth < 768) {
                return (
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="target"
                                                     className="report-box__icon text-theme-10"/>

                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.projectCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پروژه های شما</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="mail"
                                                     className="report-box__icon text-theme-11"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.messageCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پیام های خوانده نشده
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="triangle"
                                                     className="report-box__icon text-theme-12"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.expireCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پرداختی های معوقه
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-3 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                                <div className="box p-5">
                                    <div className="flex">
                                        <FeatherIcon icon="pocket"
                                                     className="report-box__icon text-theme-9"/>
                                    </div>
                                    <div
                                        className="text-3xl font-bold leading-8 mt-6">{this.state.payCount}</div>
                                    <div className="text-base text-gray-600 mt-1">پرداختی های پیش رو
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        }
        else {
            if (window.innerWidth === 1024) {
                return (
                    <Carousel
                        dots
                        rtl
                        infinite
                        stopAutoPlayOnHover
                        autoPlay={4000}
                        slidesPerPage={3}
                        animationSpeed={3000}
                    >
                        {
                            this.state.projectCarousel.map((project, index) => {
                                return (
                                    <div className="grid grid-cols-1 gap-6 mt-5">
                                        <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                            <div className="report-box zoom-in">
                                                <div className="box p-5">
                                                    <div className="flex border-b border-gray-200"
                                                         style={{justifyContent: 'flex-start'}}>
                                                        {project.title}
                                                    </div>
                                                    <div className="leading-8 mt-3" style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        {this.renderLine(project.percent)}
                                                        {/*<SemiCircleProgressBar stroke={'#410430'} strokeWidth={12}*/}
                                                                               {/*showPercentValue*/}
                                                                               {/*percentage={project.percent}/>*/}
                                                        <p className="ml-3" style={{
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}>{project.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="target"
                                                         className="report-box__icon text-theme-10"/>

                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.projectCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پروژه های شما</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="mail"
                                                         className="report-box__icon text-theme-11"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.messageCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پیام های خوانده نشده
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="triangle"
                                                         className="report-box__icon text-theme-12"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.expireCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پرداختی های معوقه
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="pocket"
                                                         className="report-box__icon text-theme-9"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.payCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پرداختی های پیش رو
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </Carousel>
                )
            }
            else if (window.innerWidth > 1024) {
	           console.log(document.getElementsByClassName('BrainhubCarouselItem'))
                    // .style.height='200px';
                return (
                    <Carousel
                        dots
                        rtl
                        infinite
                        stopAutoPlayOnHover
                        autoPlay={4000}
                        slidesPerPage={4}
                        animationSpeed={3000}
                    >
                        {
                            this.state.projectCarousel.map((project, index) => {
                                return (
                                    <div className="grid grid-cols-1 gap-6 mt-5">
                                        <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                            <div className="report-box zoom-in">
                                                <div className="box p-5">
                                                    <div className="flex border-b border-gray-200"
                                                         style={{justifyContent: 'flex-start'}}>
                                                        {project.title}
                                                    </div>
                                                    <div className="leading-8 mt-3" style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        {this.renderLine(project.percent)}
                                                        {/*<SemiCircleProgressBar stroke={'#410430'} strokeWidth={12}*/}
                                                                               {/*showPercentValue*/}
                                                                               {/*percentage={project.percent}/>*/}
                                                        <p className="ml-3" style={{
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}>{project.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="target"
                                                         className="report-box__icon text-theme-10"/>

                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.projectCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پروژه های شما</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="mail"
                                                         className="report-box__icon text-theme-11"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.messageCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پیام های خوانده نشده
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="triangle"
                                                         className="report-box__icon text-theme-12"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.expireCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پرداختی های معوقه
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="pocket"
                                                         className="report-box__icon text-theme-9"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.payCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پرداختی های پیش رو
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </Carousel>
                )
            }
            else if (window.innerWidth < 1024 && window.innerWidth >= 768) {
                return (
                    <Carousel
                        dots
                        rtl
                        infinite
                        stopAutoPlayOnHover
                        autoPlay={4000}
                        slidesPerPage={2}
                        animationSpeed={3000}
                    >
                        {
                            this.state.projectCarousel.map((project, index) => {
                                return (
                                    <div className="grid grid-cols-1 gap-6 mt-5">
                                        <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                            <div className="report-box zoom-in">
                                                <div className="box p-5">
                                                    <div className="flex border-b border-gray-200"
                                                         style={{justifyContent: 'flex-start'}}>
                                                        {project.title}
                                                    </div>
                                                    <div className="leading-8 mt-3" style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        {this.renderLine(project.percent)}
                                                        {/*<SemiCircleProgressBar stroke={'#410430'} strokeWidth={12}*/}
                                                                               {/*showPercentValue*/}
                                                                               {/*percentage={project.percent}/>*/}
                                                        <p className="ml-3" style={{
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}>{project.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="target"
                                                         className="report-box__icon text-theme-10"/>

                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.projectCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پروژه های شما</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="mail"
                                                         className="report-box__icon text-theme-11"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.messageCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پیام های خوانده نشده
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="triangle"
                                                         className="report-box__icon text-theme-12"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.expireCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پرداختی های معوقه
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="pocket"
                                                         className="report-box__icon text-theme-9"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.payCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پرداختی های پیش رو
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </Carousel>
                )
            }
            else if (window.innerWidth < 768) {
                return (
                    <Carousel
                        dots
                        rtl
                        infinite
                        stopAutoPlayOnHover
                        autoPlay={4000}
                        slidesPerPage={1}
                        animationSpeed={3000}
                    >
                        {
                            this.state.projectCarousel.map((project, index) => {
                                return (
                                    <div className="grid grid-cols-1 gap-6 mt-5">
                                        <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                            <div className="report-box zoom-in">
                                                <div className="box p-5">
                                                    <div className="flex border-b border-gray-200"
                                                         style={{justifyContent: 'flex-start'}}>
                                                        {project.title}
                                                    </div>
                                                    <div className="leading-8 mt-3" style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column'
                                                    }}>
                                                        {this.renderLine(project.percent)}
                                                        {/*<SemiCircleProgressBar stroke={'#410430'} strokeWidth={12}*/}
                                                                               {/*showPercentValue*/}
                                                                               {/*percentage={project.percent}/>*/}
                                                        <p className="ml-3" style={{
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}>{project.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="target"
                                                         className="report-box__icon text-theme-10"/>

                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.projectCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پروژه های شما</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="mail"
                                                         className="report-box__icon text-theme-11"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.messageCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پیام های خوانده نشده
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="triangle"
                                                         className="report-box__icon text-theme-12"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.expireCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پرداختی های معوقه
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-11 xl:col-span-12 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <FeatherIcon icon="pocket"
                                                         className="report-box__icon text-theme-9"/>
                                        </div>
                                        <div
                                            className="text-3xl font-bold leading-8 mt-6">{this.state.payCount}</div>
                                        <div className="text-base text-gray-600 mt-1">پرداختی های پیش رو
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </Carousel>
                )
            }


        }

    }


    renderButtonMessage(param) {
        if (param.whatFor === 'payment') {
            return (
                <div className="mt-5 flex items-center">
                    <button className="button bg-theme-1 text-white mr-auto" style={{
                        width: "10%",
                        display: "flex", alignItems: 'center', alignSelf: 'center',
                    }}>
                        <Link style={{
                            width: '100%',
                            display: "flex", alignItems: 'center', alignSelf: 'center', justifyContent: 'center'
                        }} to={{
                            pathname: '/karfarma/invoice',
                            state: {
                                payment_id: param.pay_id
                            }
                        }}>
                            پرداخت
                        </Link>
                    </button>
                </div>
            )
        } else if (param.whatFor === 'project') {
            return (
                <div className="mt-5 flex items-center">
                    <button className="button bg-theme-1 text-white mr-auto" style={{
                        width: "10%",
                        display: "flex", alignItems: 'center', alignSelf: 'center',
                    }}>
                        <Link style={{
                            width: '100%',
                            display: "flex", alignItems: 'center', alignSelf: 'center', justifyContent: 'center'
                        }} to={{
                            pathname: '/karfarma/singleProject',
                            state: {
                                project_id: param.project_id
                            }
                        }}>
                            دانلود
                        </Link>
                    </button>
                </div>
            )
        }
        else if (param.whatFor === 'invite') {
            return (
                <div className="mt-5 flex items-center">
                    <button className="button bg-theme-1 text-white mr-auto" style={{
                        width: "10%",
                        display: "flex", alignItems: 'center', alignSelf: 'center',
                    }}>
                        <Link style={{
                            width: '100%',
                            display: "flex", alignItems: 'center', alignSelf: 'center', justifyContent: 'center'
                        }} to={{
                            pathname: '/karfarma/singleMessage',
                            state: {
                                message_id: param.message_id
                            }
                        }}>
                            جزییات
                        </Link>
                    </button>
                </div>
            )
        }
    }


    renderProjectShow() {
        if (this.state.showMost === '') {
            return (
                <div className="intro-y box p-5 mt-12 sm:mt-5">
                    <div>
                        <p className="text-gray-600 mt-2">شما در حال حاضر پروژه فعالی برای مشاهده ندارید!</p>

                    </div>
                </div>
            )
        } else {
            return (
                <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0"
                     style={{textAlign: "right"}}>
                    <table className="table" style={{textAlign: "right"}}>
                        <thead>
                        <tr>
                            <th className="whitespace-no-wrap text-gray-700">ردیف</th>
                            <th className="whitespace-no-wrap text-gray-700">نام پروژه</th>
                            <th className="whitespace-no-wrap text-gray-700">نوع پروژه</th>
                            <th className="whitespace-no-wrap text-gray-700">مبلغ کلی</th>
                            <th className=" whitespace-no-wrap text-gray-700">وضعیت</th>
                            <th className=" whitespace-no-wrap text-gray-700">جزییات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.showMost.map((todo, index) => {
                                    return (
                                        <tr className="intro-x">
                                            <td className="w-40"> {index + 1}</td>
                                            <td className="w-40">
                                                <div className="flex">
                                                    {todo.title}
                                                </div>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex">
                                                    {todo.scope}
                                                </div>
                                            </td>
                                            <td className="w-40 font-medium whitespace-no-wrap">
                                                <NumberFormat value={todo.fullPrice} displayType={'text'} suffix={' تومان'}
                                                              thousandSeparator={true}/>
                                            </td>

                                            <td className="w-40">
                                                {todo.status}
                                            </td>
                                            <td className=" w-40">
                                                <div
                                                    className="flex  items-center">
                                                    <Link target="_parent" className="flex items-center ml-3"
                                                          to={{
                                                              pathname: '/karfarma/singleProject?project_id=' + todo.project_id,
                                                              state: {
                                                                  project_id: todo.project_id
                                                              }
                                                          }}> <FeatherIcon
                                                        icon="check-square"
                                                        className="w-4 h-4 mr-1"/> ادامه
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                        ;
                                }
                            )
                        }
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    renderMessageShow() {
        if (this.state.message === "") {
            return (
                <div className="intro-y box p-5 mt-12 sm:mt-5">
                    <div>
                        <p className="text-gray-600 mt-2">شما در حال حاضر پیام ضروری برای مشاهده ندارید!</p>

                    </div>
                </div>
            )
        } else {
            return (
                <div className="report-timeline mt-5 relative">
                    {
                        this.state.message.map((todo, index) => {
                                return (
                                    <div className="intro-x relative flex items-center mb-3">
                                        <div className="report-timeline__image">
                                            {this.renderImage()}
                                        </div>
                                        {this.renderPriority(todo)}
                                    </div>

                                )
                            }
                        )
                    }
                </div>
            )
        }
    }

    renderProjectSelected() {
        if (this.state.showMostTask === "") {
            return (
                <div className="col-span-12 xl:col-span-12">
                    <div className="intro-y block sm:flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">
                            پروژه منتخب
                        </h2>
                    </div>

                    <div className="intro-y box p-5 mt-12 sm:mt-5">
                        <div>
                            <p className="text-gray-600 mt-2">شما در حال حاضر پروژه منتخب برای مشاهده ندارید!</p>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="col-span-12 xl:col-span-12 mt-6">
                    <div className="intro-y block sm:flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">
                            پروژه منتخب
                        </h2>
                    </div>
                    {this.state.showMost.map((todo, index) => {
                            return (
                                <div className="intro-y box p-5 mt-12 sm:mt-5">
                                    <div>
                                        {
                                            todo.title
                                        }
                                    </div>
                                    <div className=" mt-5 bg-gray-200 rounded-md">
                                        {
                                            this.state.showMostTask.map((todo, index) => {
                                                return (
                                                    <div className="grid grid-cols-12 gap-6 mt-5">
                                                        <div className="intro-y col-span-12 lg:col-span-12">
                                                            <div className="intro-y box p-5">
                                                                <div>
                                                                    <label>نام تسک</label>
                                                                    <input placeholder={todo.title} readOnly type="text"
                                                                           className="input w-full form-control-plaintext placeholder-gray-700   mt-2"/>

                                                                </div>
                                                                <div className="mt-3">
                                                                    <label>توضیحات تسک</label>
                                                                    <input placeholder={todo.text} readOnly type="text"
                                                                           className="input w-full form-control-plaintext placeholder-gray-700   mt-2"/>

                                                                </div>
                                                                <div className="mt-3">
                                                                    <label>زمان اتمام تسک</label>
                                                                    <input placeholder={todo.timeExpiration} readOnly
                                                                           type="text"
                                                                           className="input w-full form-control-plaintext placeholder-gray-700   mt-2"/>
                                                                    <div className="mt-2">
                                                                        <label>پیشرفت کار</label>
                                                                        <div style={circleContainerStyle}>
                                                                            <Circle
                                                                                percent={todo.percent}
                                                                                strokeWidth="6"
                                                                                strokeLinecap="round"
                                                                                strokeColor={{
                                                                                    '0%': 'rgb(40, 4, 48)',
                                                                                    '100%': 'rgb(65, 4, 48)',
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }


                                    </div>
                                </div>
                            )
                        }
                    )}

                </div>
            )
        }
    }

    render() {
        return (
            this.renderAll()
        )
    }

    renderLine(progress) {
        if (progress < 30) {
            return (
                <SemiCircleProgressBar stroke={'#A30015'} strokeWidth={12}
                                       showPercentValue
                                       percentage={progress}/>

            )

        } else if (progress >= 30 && progress < 70) {
            return (
                <SemiCircleProgressBar stroke={'#EDD83D'} strokeWidth={12}
                                       showPercentValue
                                       percentage={progress}/>
            )
        } else if (progress >= 70 && progress < 90) {
            return (
                <SemiCircleProgressBar stroke={'#6AB547'} strokeWidth={12}
                                       showPercentValue
                                       percentage={progress}/>
            )
        }
        else if (progress >= 90 && progress <= 100) {
            return (

                <SemiCircleProgressBar stroke={'#628B48'} strokeWidth={12}
                                       showPercentValue
                                       percentage={progress}/>
            )
        }
    }
}

export default dashboard
