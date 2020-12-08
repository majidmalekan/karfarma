import React, {Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import axios from 'axios';
import Top from './Top'
import Modal from 'react-modal';
import {ClassicSpinner, MagicSpinner} from "react-spinners-kit";
import {Line} from 'rc-progress';
import FeatherIcon from 'feather-icons-react';
import {Link, useLocation} from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import NumberFormat from "react-number-format";

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
const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
            width: '100%',
        },
    },
}));

class singleProject extends Component {
    state = {
        pic: null,
        show: false,
        loading: false,
        error: '',
        showConfirm: false,
        activeClass: '3',
        payments: [],
        task: [],
        phaze: [],
        project_id:'',
        render: false,
        fullPriceDeactive:'',
        fullPricePayment:'',
        fullPricePayed:'',
        fullPriceReject:'',
        fullPrice:''
    };

    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPicChange = this.onPicChange.bind(this);
        this.onScopeChange = this.onScopeChange.bind(this);
    }

    handleClose = () => {
        this.setState({show: false});

    };
    handleShow = () => {
        this.setState({show: true});
        let element = document.querySelector(".MuiAlert-message");
        element.style.width = '100%';
    };

    onNameChange(event) {
        this.setState({name: event.target.value});
    }

    onDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    onPicChange(event) {
        this.setState({pic: event.target.files[0]});
    }

    onScopeChange(event) {
        this.setState({scope: event.target.value});
    }

    handleShowConfirm = () => {
        this.setState({showConfirm: true});
    };
    handleCloseConfirm = () => {
        this.setState({showConfirm: false});
    };

    renderConfirmation(param) {
        if (param.confirmation === '1') {
            return (
                <div className="font-semibold text-theme-1 text-lg">
                    تایید شده
                </div>
            )
        } else if (param.confirmation === '2') {
            return (
                <div className="font-semibold text-theme-1 text-lg">
                    رد شده
                </div>
            )
        } else if (param.confirmation === '0') {
            return (
                <div className="font-semibold text-theme-1 text-lg">
                    بررسی نشده
                </div>
            )
        }
    }

    renderDownload(param) {
        if (param === null) {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}} onClick={this.handleShow}>دریافت
                    فایل</button>
            )
        } else {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}}><a href={param} target="_blank"
                                                                                       style={{outline: 'none'}}
                                                                                       download="sproc">دریافت فایل</a>
                </button>
            )
        }
    }

    renderReport(file) {
        if (file === null) {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}} onClick={this.handleShow}>دریافت
                    گزارش</button>
            )
        } else {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}}><a href={file} target="_blank"
                                                                                       style={{outline: 'none'}}
                                                                                       download="sproc">دریافت گزارش</a>
                </button>
            )
        }
    }



    renderDownloadTask(param) {
        if (param === null) {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}} onClick={this.handleShow}>
                    <FeatherIcon icon="download" className="w-4 h-4 "/>
                </button>
            )
        } else {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}}><a href={param} target="_blank"
                                                                                       style={{outline: 'none'}}
                                                                                       download="sproc">
                    <FeatherIcon icon="download" className="w-4 h-4 "/>
                </a>
                </button>
            )
        }
    }

    renderReportTask(file) {
        if (file === null) {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}} onClick={this.handleShow}>
                    <FeatherIcon icon="file-text" className="w-4 h-4 mb-1"/>
                </button>
            )
        } else {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}}><a href={file} target="_blank"
                                                                                       style={{outline: 'none'}}
                                                                                       download="sproc">
                    <FeatherIcon icon="file-text" className="w-4 h-4 mb-1"/>
                </a>
                </button>
            )
        }
    }

    componentDidMount() {
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (this.props.location.state === undefined) {
            const query = new URLSearchParams(this.props.location.search);
            const project_id = query.get('project_id');
            this.setState({project_id:project_id});
            fetch('https://test.skenap.ir/api/v1/paymentDetailProject', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_token: apiToken,
                    user_id: user_id,
                    project_id: project_id
                }),
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.stats === 'success') {
                        this.setState({
                            user: result.data.user,
                            payments: result.data.arrays,
                            fullPricePayment:result.data.fullPricePayment,
                            fullPriceReject:result.data.fullPriceReject,
                            fullPricePayed:result.data.fullPricePayed,
                            fullPriceDeactive:result.data.fullPriceDeactive,
                            fullPrice:result.data.fullPrice,
                            render: true

                        });
                    } else if (result.stats === 'error') {
                        this.setState({error: result.data, showConfirm: true})
                    } else if (result.stats === 'failed') {
                        this.setState({error: result.data, showConfirm: true})
                    }
                })
                .catch((err) => {

                    alert(err);
                });
        } else {
            const project_id = this.props.location.state.project_id;
            fetch('https://test.skenap.ir/api/v1/paymentDetailProject', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_token: apiToken,
                    user_id: user_id,
                    project_id: project_id
                }),
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.stats === 'success') {
                        this.setState({
                            user: result.data.user,
                            payments: result.data.arrays,
                            fullPricePayment:result.data.fullPricePayment,
                            fullPriceRejected:result.data.fullPriceRejected,
                            fullPricePayed:result.data.fullPricePayed,
                            fullPriceDeactive:result.data.fullPriceDeactive,
                            fullPrice:result.data.fullPrice,
                            render: true

                        });
                    } else if (result.stats === 'error') {
                        this.setState({error: result.data, showConfirm: true})
                    } else if (result.stats === 'failed') {
                        this.setState({error: result.data, showConfirm: true})
                    }
                })
                .catch((err) => {

                    alert(err);
                });
        }


    }

    renderShow(param) {
        {this.state.payments.map((d, index) => {
                    if (d.status_id === 1) {
                        return (
                            <div className="flex items-center mt-5">
                                {d.orderId}
                                <div className="flex mr-4">
                                    <div className="font-medium">
                                        <NumberFormat value={d.price} displayType={'text'}
                                                      suffix={' تومان'}
                                                      thousandSeparator={true}/>
                                    </div>
                                    <div className="text-gray-600 mr-5">{d.dateExpire}</div>
                                    <div className="mr-5">{d.task}</div>
                                </div>
                                <div className="mr-auto">
                                    <Link to={"/karfarma/invoice?payment_id="+d.pay_id}>
                                        <button className="button w-full text-white bg-theme-1">
                                            پرداخت
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="intro-y box p-5 mt-12 sm:mt-5">
                                <div>
                                    <p className="text-gray-700 text-center mt-2">شما در حال حاضر فاکتور در انتظار پرداخت برای مشاهده
                                        ندارید!</p>
                                </div>
                            </div>
                        )
                    }
                }
            )
        }
    }
    renderUploadFile() {
        if (this.state.pic === null) {
            return (
                <form data-single="true"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input name="file" onChange={this.onPicChange} type="file"/>
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
        } else {
            return (
                <form data-single="true" action="/file-upload"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input name="file" onChange={this.onPicChange} type="file"/>
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
    renderStatus(param){
        if (param.status_id===1){
            return(
            <div className="text-yellow-700">
                {param.status}
            </div>
            )
        } else if (param.status_id===2){
            return(
                <p className="text-green-700">
                    {param.status}
                </p>
            )
        } else if (param.status_id===3){
            return(
                <p className="text-red-700">
                    {param.status}
                </p>
            )
        } else if (param.status_id===4){
            return(
                <div className="flex">
                <p className="mt-1 text-blue-700">
                    {param.status}
                </p>
                    <button onClick={this.active.bind(this,param.pay_id)} className=" mr-auto button text-white shadow-md bullshit-yellow w-24">
                        {
                            this.state.loading ?
                                <div className="flex justify-center text-center">
                                    <ClassicSpinner  size={10} color="#fff" />
                                </div>:
                                "فعال کردن"
                        }
                    </button>
                    </div>
            )
        }

    }
    renderAll() {
        if (this.state.render === true) {
            return (
                <body className="app just" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top/>
                        <div className="tab-content mt-5">
                            <div className="tab-content__pane active" id="profile">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="intro-y box col-span-12 lg:col-span-12">
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
                                            <h2 className="fontس-medium text-base ml-auto">
                                                پرداختی های پروژه
                                            </h2>
                                        </div>
                                        <div className="p-5">

                                                    <table className="table table-report sm:mt-2"
                                                           style={{textAlign: "right", direction: 'rtl'}}>
                                                        <thead>
                                                        <tr>
                                                            <th className="whitespace-no-wrap text-gray-700">ردیف</th>
                                                            <th className="whitespace-no-wrap text-gray-700">شماره فاکتور</th>
                                                            <th className="whitespace-no-wrap text-gray-700">نام فاز</th>
                                                            <th className="whitespace-no-wrap text-gray-700">مبلغ کلی</th>
                                                            <th className="whitespace-no-wrap text-gray-700">تاریخ سررسید فاکتور</th>
                                                            <th className=" whitespace-no-wrap text-gray-700">وضعیت</th>
                                                            <th className=" whitespace-no-wrap text-gray-700">جزییات</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.payments.map((pay, index) => {
                                                            return (
                                                        <tr className="bg-gray-200" key={index}>
                                                            <td className="border-b">
                                                                {index + 1}
                                                            </td>
                                                            <td className="border-b">
                                                                {pay.orderId}
                                                            </td>
                                                            <td className="border-b">
                                                                {pay.task}
                                                            </td>
                                                            <td className="border-b">
                                                                <NumberFormat value={pay.price} displayType={'text'}
                                                                              suffix={' تومان'}
                                                                              thousandSeparator={true}/>
                                                            </td>
                                                            <td className="border-b">
                                                                {pay.dateExpire}
                                                            </td>
                                                            <td className="border-b">
                                                                {this.renderStatus(pay)}
                                                            </td>
                                                            <td className="border-b">
                                                                <div className="flex items-center">
                                                                    <Link to={{
                                                                        pathname: '/karfarma/invoice?payment_id=' + pay.pay_id,
                                                                        state: {
	                                                                        payment_id: pay.pay_id
                                                                        },
                                                                    }} target="_parent"
                                                                          className="flex items-center mr-3">
                                                                        <FeatherIcon icon="check-square"
                                                                                     className="w-4 h-4 mr-1"/> ادامه
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                )
                                            })
                                            }
                                                        </tbody>
                                                    </table>
                                        </div>
                                    </div>
                                    <div className="intro-y box col-span-12 lg:col-span-12">
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
                                            <h2 className="font-medium text-base ml-auto">
                                               در انتظار پرداخت
                                            </h2>
                                            <button onClick={this.payAll.bind(this)} className="button  text-white bullshit-green w-24 shadow-md mr-auto">
                                                <Link to={"/karfarma/invoice?project_id="+this.state.project_id}>
                                                پرداخت انبوه
                                                </Link>
                                            </button>
                                        </div>

                                                    {this.state.payments.map((d, index) => {
                                                        if (d.status_id === 1) {
                                                            return (
	                                                            <div className="p-5 border  border-gray-300">
                                                                <div className="flex items-center">

                                                                    <div className="flex mr-4">
                                                                        {d.orderId}
                                                                        <div className="font-medium mr-4">
                                                                            <NumberFormat value={d.price} displayType={'text'}
                                                                                          suffix={' تومان'}
                                                                                          thousandSeparator={true}/>
                                                                        </div>
                                                                        <div className="text-gray-600 mr-5">{d.dateExpire}</div>
                                                                        <div className="mr-5">{d.task}</div>
                                                                    </div>
                                                                    <div className="mr-auto">
                                                                        <Link to={"/karfarma/invoice?payment_id="+d.pay_id}>
                                                                            <button className="button w-24 shadow-md text-white bullshit-blue">
                                                                                پرداخت
                                                                            </button>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                    )
                                                    }

                                    </div>
                                    <div className="intro-y box col-span-12 lg:col-span-12">
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
                                            <p className="font-medium text-base text-gray-700 ml-auto">
                                               مبلغ کل فاکتور های درانتظار پرداخت
                                            </p>
                                                <div className="font-medium  text-base mr-auto">

                                                    <NumberFormat value= {this.state.fullPricePayment} displayType={'text'}
                                                                  suffix={' تومان'}
                                                                  thousandSeparator={true}/>
                                                </div>

                                        </div>
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
                                            <p className="font-medium text-base text-gray-700 ml-auto">
                                                مبلغ کل فاکتور های غیر فعال
                                            </p>
                                            <div className="font-medium  text-base mr-auto">

                                                <NumberFormat value= {this.state.fullPriceDeactive} displayType={'text'}
                                                              suffix={' تومان'}
                                                              thousandSeparator={true}/>
                                            </div>

                                        </div>
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
                                            <p className="font-medium text-base text-gray-700 ml-auto">
                                                مبلغ کل فاکتور های لغو شده
                                            </p>
                                            <div className="font-medium  text-base mr-auto">

                                                <NumberFormat value= {this.state.fullPriceReject} displayType={'text'}
                                                              suffix={' تومان'}
                                                              thousandSeparator={true}/>
                                            </div>

                                        </div>
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
                                            <p className="font-medium text-base text-gray-700 ml-auto">
                                                مبلغ کل فاکتور های پرداخت شده
                                            </p>
                                            <div className="font-medium  text-base mr-auto">

                                                <NumberFormat value= {this.state.fullPricePayed} displayType={'text'}
                                                              suffix={' تومان'}
                                                              thousandSeparator={true}/>
                                            </div>

                                        </div>
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
                                            <p className="font-bold  text-base ml-auto">
                                                مبلغ کل پروژه
                                            </p>
                                            <div className="font-bold  text-base mr-auto">

                                                <NumberFormat value= {this.state.fullPrice} displayType={'text'}
                                                              suffix={' تومان'}
                                                              thousandSeparator={true}/>
                                            </div>

                                        </div>
                                    </div>
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

    render() {

        return (
            <>
                {this.renderAll()}
            </>
        )
    }

    download(param) {
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch(param.uploadUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((result) => {
                if (result.stats === 'success') {
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

    active(param){
        this.setState({loading:true});
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/activePay', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: apiToken,
                user_id: user_id,
                pay_id: param
            }),
        }).then((response) => response.json())
            .then((result) => {
                if (result.stats === 'success') {
                    window.location.reload();
                } else if (result.stats === 'error') {
                    this.setState({error: result.data,loading:false})
                } else if (result.stats === 'failed') {
                    this.setState({error: result.data})
                }
            })
            .catch((err) => {

                alert(err);
            });
    }

    payAll(){
        const query = new URLSearchParams(this.props.location.search);
        const project_id = query.get('project_id');
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/payAll', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: apiToken,
                user_id: user_id,
                project_id: project_id
            }),
        }).then((response) => response.json())
            .then((result) => {
                if (result.stats === 'success') {
                    window.location.reload();
                } else if (result.stats === 'error') {
                    this.setState({
                        error: result.data,
                        loading:false
                    })
                } else if (result.stats === 'failed') {
                    this.setState({error: result.data})
                }
            })
            .catch((err) => {

                alert(err);
            });
    }
    renderLine(progress) {
        if (progress<30){
            return(
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#A30015"
                    style={{width: '50%'}}
                />
            )

        }else if (progress >= 30 && progress < 70){
            return(
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#EDD83D"
                    style={{width: '50%'}}
                />
            )
        } else if (progress >= 70 && progress < 90){
            return(
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#6AB547"
                    style={{width: '50%'}}
                />
            )
        }
        else if (progress >= 90 && progress <= 100){
            return(
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#628B48"
                    style={{width: '50%'}}
                />
            )
        }
    }


    renderLinePhaze(progress) {
        if (progress<30){
            return(
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#A30015"

                />
            )

        }else if (progress >= 30 && progress < 70){
            return(
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#EDD83D"

                />
            )
        } else if (progress >= 70 && progress < 90){
            return(
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#6AB547"
                    style={{width: '50%'}}
                />
            )
        }
        else if (progress >= 90 && progress <= 100){
            return(
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#628B48"
                    style={{width: '50%'}}
                />
            )
        }
    }
}

export default singleProject
