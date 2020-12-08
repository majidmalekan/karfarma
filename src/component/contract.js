import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import FeatherIcon from 'feather-icons-react';
import Top from './Top'
import {ClassicSpinner} from "react-spinners-kit";
import history from './history'
import Modal from "react-modal";

const customStyles = {
    content : {
        top                   : '30%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        width:'50%',
        transform             : 'translate(-50%, -50%)',
        zIndex:'80'
    }
};
class contract extends Component {
    state={
        contracts:[],
        show:false,
        user:[],
        scope:[],
        date:'',
        suRelation:[],
        message:'',
        showError:false
    };
    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
    }
    handleClose  = () =>{
        this.setState({show:false});
        history.push('./dashboard')
    };
    handleCloseConfirm  = () =>{
        this.setState({showError:false});
        history.push('./dashboard')
    };
    handleShow  = () =>{
        this.setState({show:true});
    };
    handleShowConfirm  = () =>{
        this.setState({showError:true});
    };
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        const{sus_id}=this.props.location.state
        if (this.props.location.state===undefined){
            this.setState({
                showError:true
            })
        } else {
            const { sus_id } = this.props.location.state;
            console.log('asdasdasda', sus_id);
            fetch('https://test.skenap.ir/api/v1/contractShow', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_token: apiToken,
                    user_id: user_id,
                    sus_id: sus_id
                }),
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    this.setState({
                        contracts: result.data.arrays,
                        user: result.data.user[0],
                        scope: result.data.scope[0],
                        date: result.data.date,
                        suRelation: result.data.suRelation[0],

                    })
                })
                .catch((err) => {

                    alert(err);
                });
        }
    }
    loginUp() {
        this.setState({button: true});
        let {status} = this.state;
        const{sus_id}=this.props.location.state
        console.log('sdasdasdasdasda',this.props.location.state.sus_id);
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        console.log(status);
        fetch('https://test.skenap.ir/api/v1/confirm', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: apiToken,
                user_id: user_id,
                sus_id:sus_id
            }),
        }).then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.stats === 'success') {
                    this.setState({
                        show:true,
                        message:result.data
                    })
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
    render(){
        return(
            <>
                <body className="app" dir={"rtl"}>
                <Modal
                    isOpen={this.state.show}
                    contentLabel="موفقیت"
                    style={customStyles}
                >
                    <div className="p-5 text-center"><FeatherIcon icon="x-circle" class="w-16 h-16 text-theme-12 mx-auto mt-3"/>
                        <div className="text-gray-600 mt-2">!درخواست شما ثبت شد</div>
                        <div className="text-3xl mt-5">{this.state.message}</div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <button type="button" onClick={this.handleClose}
                                className="button w-24 bg-theme-1 text-white">تایید
                        </button>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.showError}
                    contentLabel="ارور"
                    style={customStyles}
                >
                    <div className="p-5 text-center"><FeatherIcon icon="x-circle" class="w-16 h-16 text-theme-6 mx-auto mt-3"/>
                        <div className="text-gray-600 mt-2">عدم دریافت داده</div>
                        <div className="text-3xl mt-5">در دریافت اطلاعات مشکلی پیش آمده لطفا با پشتیبانی تماس بگیرید درخواست شما ثبت اما تایید نشده است</div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <button type="button" onClick={this.handleCloseConfirm}
                                className="button w-24 bg-theme-1 text-white">تایید
                        </button>
                    </div>
                </Modal>
                <Mobile/>
                <div className="flex">
                    <NavBar/>
                    <div className="content">
                        <Top disable="yes"/>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium ml-auto">
                                رسید اولیه درخواست شما
                            </h2>
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
                                    <div className="text-lg text-theme-1 font-medium mt-2">{this.state.date}</div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row border-b  px-5 sm:px-20 pb-5 sm:pb-10 text-center sm:text-center" style={{justifyContent:'center'}}>
                                <div>
                                    <div className="text-base text-gray-600">مشخصات مشتری</div>
                                    <div className="text-lg font-medium text-theme-1 mt-2">{this.state.user.fullName}</div>
                                    <div className="mt-1">{this.state.user.email}</div>
                                </div>
                            </div>
                            <div className="px-5 sm:px-16 py-10 sm:py-20">
                                <div className="overflow-x-auto">
                                    <table className="table" style={{textAlign:"right"}}>
                                        <thead>
                                        <tr>
                                            <th className="border-b-2 text-right whitespace-no-wrap">عنوان</th>
                                            <th className="border-b-2 text-right whitespace-no-wrap">تاریخ</th>
                                            <th className="border-b-2 text-right whitespace-no-wrap">دسته</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="border-b w-32">
                                                {this.state.contracts.map((contract,index)=>
                                                    {
                                                        return(
                                                            <div className="font-medium whitespace-no-wrap">
                                                                {contract.title}
                                                            </div>
                                                        )

                                                    }
                                                )}

                                            </td>
                                            <td className="text-right border-b w-32">{this.state.date}</td>
                                            <td className="text-right border-b w-32">{this.state.scope.name}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row">
                                <div className="text-center sm:text-right mt-10 sm:mt-0">
                                    <div className="text-base text-gray-600">وضعیت درخواست</div>
                                    <div className="text-lg text-theme-1 font-medium mt-2">
                                       برای تایید نهایی درخواست خود لطفا بر روی دکمه تایید بزنید
                                    </div>
                                </div>
                                <div className="text-center sm:text-center mt-1 mr-auto w-100">
                                    <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white" style={{width: "100%"}}>
                                        {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                            <ClassicSpinner  size={25} color="#fff" />
                                        </div> : "تایید"}
                                    </button>
                                </div>
                                {/*<div className="text-center sm:text-right sm:mr-auto">*/}
                                    {/*<div className="text-base text-gray-600">مبلغ کل</div>*/}
                                    {/*<div className="text-xl text-theme-1 font-medium mt-2">{this.state.payments.price}</div>*/}
                                    {/*<div className="mt-1 text-xs">واحد قیمت تومان می باشد</div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>

                </div>

                </body>
            </>
        )
    }
}
export default contract
