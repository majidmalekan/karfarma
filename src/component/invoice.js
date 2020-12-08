import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import {Button,Modal} from 'react-bootstrap'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import Top from './Top'
import {ClassicSpinner, MagicSpinner} from "react-spinners-kit";
import NumberFormat from "react-number-format";

class invoice extends Component {
    state={
        payments:[],
        show:false,
        user:[],
        loading:false,
        render:false,
        fullPrice:'',
        date:'',
    };
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (this.props.location.state===undefined){
            const query = new URLSearchParams(this.props.location.search);
            const  payment_id  = query.get('payment_id');
            const query2 = new URLSearchParams(this.props.location.search);
            const  project_id  = query2.get('project_id');
            const query3 = new URLSearchParams(this.props.location.search);
            const  user  = query3.get('user');
            if (payment_id!==null){
                console.log('aaaaaaa')
                fetch('https://test.skenap.ir/api/v1/paymentDetail', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_token:apiToken,
                        user_id:user_id,
                        payment_id:payment_id
                    }),
                }).then((response) =>response.json())
                    .then((result) => {
                        console.log(result)
                        this.setState({
                            payments:result.data.arrays,
                            user:result.data.user[0],
                            date:result.data.date,
                            fullPrice:result.data.fullPrice,
                            render:true
                        })
                    })
                    .catch((err) => {

                        alert(err);
                    });
            }
            else if (project_id!==null){
                console.log('bbbbbbbb');
                fetch('https://test.skenap.ir/api/v1/payAll', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_token:apiToken,
                        user_id:user_id,
                        project_id:project_id
                    }),
                }).then((response) =>response.json())
                    .then((result) => {
                        console.log(result)
                        this.setState({
                            payments:result.data.arrays,
                            user:result.data.user[0],
                            date:result.data.date,
                            fullPrice:result.data.fullPrice,
                            render:true
                        })
                    })
                    .catch((err) => {

                        alert(err);
                    });
            }
            else if (user!==null){
                console.log('bbbbbbbbcccccc');
                fetch('https://test.skenap.ir/api/v1/allIn', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_token:apiToken,
                        user_id:user_id,
                    }),
                }).then((response) =>response.json())
                    .then((result) => {
                        console.log(result)
                        this.setState({
                            payments:result.data.arrays,
                            user:result.data.user[0],
                            date:result.data.date,
                            fullPrice:result.data.fullPrice,
                            render:true
                        })
                    })
                    .catch((err) => {

                        alert(err);
                    });
            }

        }else {
            const  payment_id  = this.props.location.state.payment_id;
            const  project_id  = this.props.location.state.project_id;
            const  user  = this.props.location.state.user;
            if (payment_id!==null){
                console.log('ccccccccccccccc');
                fetch('https://test.skenap.ir/api/v1/paymentDetail', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_token:apiToken,
                        user_id:user_id,
                        payment_id:payment_id
                    }),
                }).then((response) =>response.json())
                    .then((result) => {
                        console.log(result)
                        this.setState({
                            payments:result.data.arrays,
                            user:result.data.user[0],
                            date:result.data.date,
                            fullPrice:result.data.fullPrice,
                            render:true
                        })
                    })
                    .catch((err) => {

                        alert(err);
                    });
            }
            else if (project_id!==null){
                console.log('dddddddds');
                fetch('https://test.skenap.ir/api/v1/payAll', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_token:apiToken,
                        user_id:user_id,
                        project_id:project_id
                    }),
                }).then((response) =>response.json())
                    .then((result) => {
                        console.log(result)
                        this.setState({
                            payments:result.data.arrays,
                            user:result.data.user[0],
                            date:result.data.date,
                            fullPrice:result.data.fullPrice,
                            render:true
                        })
                    })
                    .catch((err) => {

                        alert(err);
                    });
            }
            else if (user!==null){
                fetch('https://test.skenap.ir/api/v1/payAll', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_token:apiToken,
                        user_id:user_id,
                    }),
                }).then((response) =>response.json())
                    .then((result) => {
                        console.log(result)
                        this.setState({
                            payments:result.data.arrays,
                            user:result.data.user[0],
                            date:result.data.date,
                            fullPrice:result.data.fullPrice,
                            render:true
                        })
                    })
                    .catch((err) => {

                        alert(err);
                    });
            }
        }

    }

    renderPay(param){
        if (param.status_id===1){
            return(
                <button className="button w-24 shadow-md bullshit-blue text-white">
                    {this.state.loading ?  <div className="flex justify-center text-center">
                        <ClassicSpinner  size={25} color="#fff" />
                    </div> : "پرداخت"}
                </button>
            )
        }
    }

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
                <p className="text-blue-700">
                    {param.status}
                </p>
            )
        }

    }


    renderAll(){
        if (this.state.render===true){
            return(
                <body className="app" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    {/*<NavBar/>*/}
                    <div className="content">
                        {/*<Top/>*/}
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium ml-auto">
                                فاکتور پرداخت
                            </h2>
                            <button onClick={history.goBack}
                                    className="flex items-center block p-2 transition  duration-300 ease-in-out hover:bg-theme-1 rounded-md mr-auto" style={{backgroundColor:'#410430',color:'#fff'}}>
                                بازگشت
                            </button>
                        </div>
                        <div className="intro-y box overflow-hidden mt-5">
                            <div
                                className="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 text-right sm:text-right">
                                <div className="mt-20 lg:mt-0 lg:ml-auto lg:text-right">
                                    <div className="text-xl text-theme-1 font-medium">اسپراک</div>
                                    <div className="mt-1">sproc@gmail.com</div>
                                    <div className="mt-1">دانشگاه شریف کوچه صادقی پلاگ 26</div>
                                </div>
                                <div className="mt-20 lg:mt-0 lg:mr-auto lg:text-right sm:text-right">
                                    <div className="mt-1">{this.state.date}</div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row border-b  px-5 sm:px-20 pb-5 sm:pb-10 text-center sm:text-center" style={{justifyContent:'center'}}>
                                <div>
                                    <div className="text-base text-gray-600">مشخصات مشتری</div>
                                    <div className="text-lg font-medium text-theme-1 mt-2">{this.state.user.fullName}</div>
                                    <div className="mt-1">{this.state.user.email}</div>
                                    <div className="mt-1">{this.state.user.phone}</div>
                                    <div className="mt-1">{this.state.user.address}</div>
                                </div>
                            </div>
                            <div className="px-5 sm:px-16 py-10 sm:py-20">
                                <div className="overflow-x-auto">
                                    <table className="table" style={{textAlign:"right"}}>
                                        <thead>
                                        <tr>
                                            <th className="border-b-2 whitespace-no-wrap text-gray-700">توضیحات</th>
                                            <th className="border-b-2 text-right whitespace-no-wrap text-gray-700">تاریخ سررسید</th>
                                            <th className="border-b-2 text-right whitespace-no-wrap text-gray-700">شماره فاکتور</th>
                                            <th className="border-b-2 text-right whitespace-no-wrap text-gray-700">مبلغ</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.payments.map((pay,index)=>{
                                            return(
                                            <tr>
                                                <td className="border-b">
                                                    <div className="font-medium whitespace-no-wrap">
                                                        {pay.project}
                                                    </div>
                                                    <div className="text-gray-600 text-xs whitespace-no-wrap">
                                                        {pay.task}
                                                    </div>
                                                </td>
                                                <td className="text-right border-b w-32">{pay.dateExpire}</td>
                                                <td className="text-right border-b w-32">{pay.orderId}</td>
                                                <td className="text-right border-b w-32 ">
                                                    <NumberFormat value={pay.price} displayType={'text'} suffix={' تومان'}
                                                                  thousandSeparator={true}/>
                                                </td>
                                            </tr>
                                            )
                                        })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row">
                                <div className="text-center sm:text-right mt-10 sm:mt-0">
                                    <div className="text-base text-gray-600">وضعیت پرداخت</div>
                                    <div className="text-lg text-theme-1 font-medium mt-2">
                                        {
                                            this.renderStatus(this.state.payments[0])
                                        }
                                    </div>
                                </div>
                                <div className="text-center sm:text-center mt-1 mr-auto w-100">
                                    {this.renderPay(this.state.payments[0])}
                                </div>
                                <div className="text-center sm:text-right sm:mr-auto">
                                    <div className="text-base text-gray-600">مبلغ کل</div>
                                    <div className="text-xl text-theme-1 font-medium mt-2">
                                        <NumberFormat value={this.state.fullPrice} displayType={'text'} suffix={' تومان'} thousandSeparator={true}/></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                </body>
            )
        } else if (this.state.render===false){
            return(
                <body>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',height:'100vh'}}>
                    <MagicSpinner className="m-auto"  size={250} color="#410430" style={{display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center'}} />
                </div>
                </body>

            )
        }
    }
    render(){
        return(
            <>
                {this.renderAll()}
            </>
        )
    }
}
export default invoice
