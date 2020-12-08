import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import Top from './Top'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import axios from "axios";
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

class completeProfile extends Component {
    state={
        nationalId:'',
        cardBank:'',
        cardBanks:[],
        show:false,
        showSuccessCard:false,
        showCard:false,
        showConfirm:false,
        loading:false,
        loadingCard:false,
        picNationalId:null,
        picBankAccount:null,
        error:'',
        activeClass:'2',
        showSuccess:false,
        currentPage: 1,
        todosPerPage: 5,
        nationals:''
    };
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showAuth', {
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
                if (result.stats === 'success') {
                    this.setState({
                        cardBanks: result.data.account,
                        nationals: result.data.national,
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
    handleShowSuccess  = () =>{
        this.setState({showSuccess:true});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleCloseSuccess  = () =>{
        this.setState({
            showSuccess:false
        })
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
    handleBack(number) {
        let a = Number(number);
        a=a-1;
        this.setState({
            currentPage: a
        });
    }
    handleClick(number) {
        let a =Number(number);
        a=a+1;
        this.setState({
            currentPage: a
        });
    }
    handleNext(number) {
        let a =Number(number);
        this.setState({
            currentPage: a
        });
    }
    handlePrev(number) {
        let a =Number(number);
        this.setState({
            currentPage: a
        });
    }
    constructor(props){
        super(props);
        this.nationalId=this.nationalId.bind(this);
        this.bankAccount=this.bankAccount.bind(this);
        this.onNationalIdChange=this.onNationalIdChange.bind(this);
        this.onCardBankChange=this.onCardBankChange.bind(this);
        this.onPicBankAccountChange=this.onPicBankAccountChange.bind(this);
        this.onPicNationalIdChange=this.onPicNationalIdChange.bind(this);
    }

    handleClose  = () =>{
        this.setState({show:false});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
	handleCloseCard  = () =>{
		this.setState({showCard:false});
		let element = document.querySelector(".MuiAlert-message");
		element.style.width = '100%';
	};
	handleCloseSuccessCard  = () =>{
		this.setState({showSuccessCard:false});
		let element = document.querySelector(".MuiAlert-message");
		element.style.width = '100%';
	};
    handleShow  = () =>{
        this.setState({show:true});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleShowCard  = () =>{
        this.setState({showCard:true});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    renderConfirm(confirmation) {
        if (confirmation===0){
            return(
                <div className="flex text-yellow-600">
                    در دست بررسی
                </div>
            )
        } else  if (confirmation===1){
            return(
                <div className="flex text-green-700">
                    تایید شده
                </div>
            )
        }
        else  if (confirmation===2){
            return(
                <div className="flex text-red-700">
                    تایید نشده
                </div>
            )
        }
    }
    renderShow() {
        if (this.state.cardBanks === "") {
            return (
                <div className="intro-y box p-5 mt-12 sm:mt-5">
                    <div>
                        <p className="text-gray-700 text-center mt-2">شما در حال حاضر کارت بانکی برای مشاهده
                            ندارید!</p>
                    </div>
                </div>
            )
        } else {
            const {cardBanks, currentPage, todosPerPage} = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            const currentTodos = cardBanks.slice(indexOfFirstTodo, indexOfLastTodo);
            const renderTodos = currentTodos.map((todo, index) => {
                const card=todo.cardBank.slice(0,4)+' - '+todo.cardBank.slice(4,8)+' - '+todo.cardBank.slice(8,12)+' - '+todo.cardBank.slice(12,16);
                console.log(card);
                return (
                    <tr className="bg-gray-200" key={index}>
                        <td className="border-b">
                            {index + indexOfFirstTodo + 1}
                        </td>
                        <td className="border-b" style={{direction:'ltr'}}>
                            {card}
                        </td>
                        <td className="border-b">
                            {this.renderConfirm(todo.confirmation)}
                        </td>
                        <td className="border-b">
                            <div className="flex items-center">
                                <button onClick={this.delete.bind(this,todo.account_id)} className="flex items-center mr-3">
                                    <FeatherIcon icon="check-square" className="w-4 h-4 ml-2 text-gray-600"/> حذف </button>
                            </div>
                        </td>
                    </tr>
                )
                    ;
            });
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(cardBanks.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            return (
                <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                    <table className="table table-report sm:mt-2"
                           style={{textAlign: "right", direction: 'rtl'}}>
                        <thead>
                        <tr>
                            <th className="whitespace-no-wrap text-gray-600 ">ردیف</th>
                            <th className="whitespace-no-wrap text-gray-600">شماره کارت</th>
                            <th className=" whitespace-no-wrap text-gray-600">وضعیت</th>
                            <th className=" whitespace-no-wrap text-gray-600">حذف</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderTodos}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
    renderUploadFile() {
        if (this.state.picNationalId===null) {
            return (
                <form data-single="true"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input onChange={this.onPicNationalIdChange} name="file" type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            عکس خود را میتوانید بارگذاری کنید
                        </div>
                        <div className="text-gray-600">
                            فایل مورد نظر خود را هم میتوانید در اینجا بکشید هم انتخاب کنید
                        </div>
                    </div>
                </form>

            );
        } else {
            return (
                <form data-single="true" action="/file-upload"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input onChange={this.onPicNationalIdChange} name="file" type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            <h2>اطلاعات فایل:</h2>

                        </div>
                        <div className="text-gray-600">
                            <p>نام فایل: {this.state.picNationalId.name}</p>
                            <p>نوع فایل: {this.state.picNationalId.type}</p>
                        </div>
                    </div>
                </form>

            );
        }
    };
    renderUploadFileCard() {
        if (this.state.picBankAccount===null) {
            return (
                <form data-single="true"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input onChange={this.onPicBankAccountChange} name="file" type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            عکس خود را میتوانید بارگذاری کنید
                        </div>
                        <div className="text-gray-600">
                            فایل مورد نظر خود را هم میتوانید در اینجا بکشید هم انتخاب کنید
                        </div>
                    </div>
                </form>

            );
        } else {
            return (
                <form data-single="true" action="/file-upload"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input onChange={this.onPicBankAccountChange} name="file" type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            <h2>اطلاعات فایل:</h2>

                        </div>
                        <div className="text-gray-600">
                            <p>نام فایل: {this.state.picBankAccount.name}</p>
                            <p>نوع فایل: {this.state.picBankAccount.type}</p>
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
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top />
                        <div className="tab-content mt-5">
                            <div className="tab-content__pane active" id="profile">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="intro-y box col-span-12 lg:col-span-6">
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 bullshit">
                                            <h2 className="font-medium text-base ml-auto">
                                                کارت ملی
                                            </h2>
                                        </div>
                                        <div className={useStyles.root}>
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
                                                        فایلی برای دریافت بارگذاری نشده است.
                                                    </div>

                                                </Alert>
                                            </Collapse>
                                        </div>
	                                    <div className={useStyles.root}>
                                            <Collapse style={{width: '100%'}} in={this.state.showSuccess}>
                                                <Alert
	                                                style={{fontFamily: 'IRANSans', width: '100%'}}
                                                    severity="success"
                                                >
	                                                <div style={{display: 'flex', width: '100%'}}>
		                                                <div className="mr-auto">
			                                                <button className="mr-auto" style={{outline: 'none'}} onClick={this.handleCloseSuccess}>
                                                                <FeatherIcon icon="x"/>
			                                                </button>
		                                                </div>
	                                                </div>
                                                    <div style={{display: 'flex'}}>
	                                                    اطلاعات کارت ملی شما با موفقیت ثبت گردید
                                                    </div>

                                                </Alert>
                                            </Collapse>
                                        </div>
                                        <div className="p-5" id="input">
                                            <div className="preview">
                                                <div>
                                                    <label>شماره کارت ملی*</label>
                                                    <input onChange={this.onNationalIdChange} value={this.state.nationalId} type="text" className="input w-64 mr-3 border mt-2"
                                                           maxLength={10}/>
                                                </div>
                                                <div className="mt-5">
                                                    <div className="p-5" id="single-file-upload" style={{textAlign:"center"}}>
                                                        <label >عکس کارت ملی*</label>
                                                        <div className="preview">
                                                            {this.renderUploadFile()}
                                                        </div>
                                                    </div>

                                                </div>
                                                <button onClick={this.nationalId}  className="button flex justify-center m-auto w-24 shadow-md text-white bullshit-green" >
                                                    {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                                        <ClassicSpinner  size={25} color="#fff" />
                                                    </div> : "تایید"}
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="intro-y box col-span-12 lg:col-span-6">
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 bullshit">
                                            <h2 className="font-medium text-base ml-auto">
                                                کارت بانکی
                                            </h2>
                                        </div>
                                        <div className={useStyles.root}>
	                                        <Collapse style={{width: '100%'}} in={this.state.showCard}>
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
				                                        فایلی برای دریافت بارگذاری نشده است.
			                                        </div>

		                                        </Alert>
	                                        </Collapse>
                                        </div>
	                                    <div className={useStyles.root}>
                                            <Collapse in={this.state.showSuccessCard}>
                                                <Alert
                                                    style={{fontFamily: 'IRANSans'}}
                                                    severity="success"
                                                >
	                                                <div style={{display: 'flex', width: '100%'}}>
		                                                <div className="mr-auto">
			                                                <button className="mr-auto" style={{outline: 'none'}}
			                                                        onClick={this.handleCloseSuccessCard}><FeatherIcon icon="x"/>
			                                                </button>
		                                                </div>
	                                                </div>
                                                    اطلاعات کارت بانکی شما با موفقیت ثبت گردید
                                                </Alert>
                                            </Collapse>
                                        </div>
                                        <div className="p-5" id="input">
                                            {this.renderShow()}
                                            <div className="preview p-5">
                                                <div>
                                                    <label >شماره کارت بانکی*</label>
                                                    <input onChange={this.onCardBankChange} value={this.state.cardBank} type="text" className="input w-64 mr-3 border mt-2"
                                                           maxLength={16}/>
                                                </div>
                                                <div className="mt-5">
                                                    <div className="p-5" id="single-file-upload" style={{textAlign:"center"}}>
                                                        <label >عکس کارت بانکی*</label>
                                                        <div className="preview">
                                                            {this.renderUploadFileCard()}
                                                        </div>
                                                    </div>

                                                </div>
                                                <button onClick={this.bankAccount} className="button flex justify-center m-auto w-24 shadow-md text-white bullshit-green">
                                                    {this.state.loadingCard ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
                                                        <ClassicSpinner  size={25} color="#fff" />
                                                    </div> : "تایید"}
                                                </button>

                                            </div>
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
    onNationalIdChange(event) {
        this.setState({ nationalId: event.target.value });
    }
    onCardBankChange(event) {
        this.setState({ cardBank: event.target.value });
    }
    onPicNationalIdChange(event) {
        this.setState({ picNationalId: event.target.files[0] });
    }
    onPicBankAccountChange(event) {
        this.setState({ picBankAccount: event.target.files[0] });
    }
    nationalId(){
        let {picNationalId,nationalId}=this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (picNationalId === null || nationalId === '' ) {
            this.handleShow()
        } else
        {
            this.setState({loading:true});
            let data = new FormData();
            data.append('api_token', apiToken);
            data.append('nationalId', nationalId);
            data.append('user_id', user_id);
            data.append('file', picNationalId);
            axios.post("https://test.skenap.ir/api/v1/nationalId", data).then(res => {
                console.log(res);
                if (res.data.stats === 'success') {
                    this.setState({
                        showSuccess:true,
                        loading:false
                    });
	                let element = document.querySelector(".MuiAlert-message");
	                element.style.width = '100%';
                }else if (res.data.stats==='error') {
                    this.setState({
                        error:res.data,
                        showConfirm:true,
                        loading:false
                    })
                }
            })
        }
    }

    bankAccount(){
        let {picBankAccount,cardBank}=this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (picBankAccount === null || cardBank === '' ) {
	        let element = document.querySelector(".MuiAlert-message");
	        element.style.width = '100%';
            this.handleShowCard()
        } else
        {
            this.setState({loadingCard:true});
            let data = new FormData();
            data.append('api_token', apiToken);
            data.append('cardBank', cardBank);
            data.append('user_id', user_id);
            data.append('file', picBankAccount);
            axios.post("https://test.skenap.ir/api/v1/bankAccount", data).then(res => {
                console.log(res);
                if (res.data.stats === 'success') {
                    this.setState({
                        showSuccessCard:true,
                        loadingCard:false
                    });
	                let element = document.querySelector(".MuiAlert-message");
	                element.style.width = '100%';
                    window.location.reload();
                }else if (res.data.stats==='error') {
                    this.setState({
                        error:res.data,
                        showCard:true,
                        loadingCard:false
                    })
                }
            })
        }
    }
    delete(param){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        this.setState({loadingCard:true});
        let data = new FormData();
        data.append('api_token', apiToken);
        data.append('account_id', param);
        data.append('user_id', user_id);
        axios.post("https://test.skenap.ir/api/v1/deleteAccount", data).then(res => {
            if (res.data.stats === 'success') {
	            window.location.reload();
            }else if (res.data.stats==='error') {
                this.setState({
                    error:res.data,
                    showCard:true,
                    loadingCard:false
                })
            }
        })
    }
}
export default completeProfile
