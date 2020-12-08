import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import axios from 'axios';
import Top from './Top'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import {DateInput} from 'react-hichestan-datetimepicker';

import FeatherIcon from 'feather-icons-react';
import Modal from 'react-modal';
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
class meeting extends Component {
    state={
        description:'',
        scope:'',
        show:false,
        loading:false,
        start_date:'',
        start_date_formatted:'',
        finish_date:'',
        finish_date_formatted:'',
        error:'',
        showConfirm:false,
        showSuccess:false,
        activeClass:'12'
    };
    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
        this.onDescriptionChange=this.onDescriptionChange.bind(this);
        this.onScopeChange=this.onScopeChange.bind(this);
    }
    handleChange = (event) => {
        const newState = {};
        const t = event.target;
        console.log('target change on the example page : ', t);
        newState[t.name] = t.value;
        newState[t.name + '_formatted'] = t.formatted ? t.formatted : '';
        this.setState(newState, () => {
            console.log('after', this.state.start_date_formatted)
        });
    };
    handleClose  = () =>{
        this.setState({show:false});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleShow  = () =>{
        this.setState({show:true});
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
	handleShowSuccess  = () =>{
		this.setState({showSuccess:true});
		let element = document.querySelector(".MuiAlert-message");
		element.style.width = '100%';
	};
	handleCloseSuccess = () =>{
		this.setState({showSuccess:false});
		let element = document.querySelector(".MuiAlert-message");
		element.style.width = '100%';
	};
    onDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    onScopeChange(event) {
        this.setState({ scope: event.target.value });
    }
    loginUp(){
        let {description,scope,start_date_formatted,finish_date_formatted}=this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if ( scope === '' ||start_date_formatted === ''|| finish_date_formatted==='' || description==='') {
            this.handleShow()
        } else
        {
            this.setState({loading:true});
                let data = new FormData();
                data.append('start', start_date_formatted);
                data.append('api_token', apiToken);
                data.append('scope', scope);
                data.append('finish', finish_date_formatted);
                data.append('user_id', user_id);
                data.append('description', description);
                axios.post("https://test.skenap.ir/api/v1/meeting", data).then(res => {
                    if (res.data.stats === 'success') {
                        this.setState({
                            loading:false,
                            showSuccess:true
                        })
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
                        history.push('./showMeeting')
                    }else if (res.data.stats==='error') {
                        this.setState({
                            error:res.data,
                            showConfirm:true
                        })
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
                    }
                })
        }
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


    render(){
        return(
            <>
                <body className="app just" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top disable="yes"/>
                        <div className="intro-y flex items-center mt-8" style={{justifyContent:"center"}}>

                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y col-span-12">
                                <div className="intro-y box">
                                    <div className={useStyles.root}>

		                                <Collapse in={this.state.show}>
			                                <div className="p-3">
			                                <Alert
				                                style={{fontFamily: 'IRANSans'}}
				                                severity="error"
			                                >
				                                <div style={{display: 'flex', width: '100%'}}>
					                                <div className="mr-auto">
						                                <button className="mr-auto" style={{outline: 'none'}}
						                                        onClick={this.handleClose}><FeatherIcon icon="x"/>
						                                </button>
					                                </div>
				                                </div>
                                                <div className="flex">
	                                                فیلدهای الزامی خالی می باشد
                                                </div>

			                                </Alert>
                                            </div>
		                                </Collapse>
		                                <Collapse in={this.state.showConfirm}>
			                                <div className="p-3">
			                                <Alert
				                                style={{fontFamily: 'IRANSans'}}
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
					                                {this.state.error}
				                                </div>
			                                </Alert>
                                            </div>
		                                </Collapse>
		                                <Collapse in={this.state.showSuccess}>
			                                <div className="p-3">
			                                <Alert
				                                style={{fontFamily: 'IRANSans'}}
				                                severity="success"
			                                >
				                                <div style={{display: 'flex', width: '100%'}}>
					                                <div className="mr-auto">
						                                <button className="mr-auto" style={{outline: 'none'}}
						                                        onClick={this.handleClose}><FeatherIcon icon="x"/>
						                                </button>
					                                </div>
				                                </div>
				                                <div style={{display: 'flex'}}>
					                                تغییر اطلاعات کاربری شما با موفقیت ثبت گردید
				                                </div>
			                                </Alert>
                                            </div>
		                                </Collapse>
	                                </div>
                                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 bullshit">
                                        <h2 className="font-medium text-base">
                                            درخواست جلسه
                                        </h2>
                                    </div>
                                    <div className="p-5" id="input">
                                        <div className="preview">
                                                <label >نوع جلسه</label>
                                                <select onChange={this.onScopeChange} className="input w-75 border mr-2">
                                                    <option style={{color:'#B6C1CF'}} value="">نوع جلسه خود را انتخاب کنید</option>
                                                    <option  value="1">حضوری</option>
                                                    <option  value="2">تلفنی</option>
                                                    <option  value="3">آنلاین</option>

                                                </select>
                                        <div  className="mt-5" style={{width:'100%'}}>
                                            <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
                                                <label className="mt-2">زمان</label>
                                                <div className="mr-2"  style={{display:'flex',flexDirection:'row',width:'100%'}}>
                                                    <DateInput
                                                        value={this.state.start_date}
                                                        name={'start_date'}
                                                        className="input border"
                                                        placeholder="تاریخ آغازین مورد نظر را به صورت 1399/12/24 وارد کنید"
                                                        onChange={this.handleChange}
                                                    />
                                                    <label className="mt-2 mr-2 ml-2">یا</label>
                                                    <DateInput
                                                        value={this.state.finish_date}
                                                        name={'finish_date'}
                                                        className="input  border"
                                                        placeholder="تاریخ پایانی مورد نظر را به صورت 1399/12/24 وارد کنید"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                            </div>

                                            </div>
                                            <div className="mt-5">
                                                <label>توضیحات</label>
                                                <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                                </div>
                                            </div>
                                            <button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5" style={{width: "50%",
                                                display: "flex",
                                                justifyContent: "center",
                                                margin: "auto"}}>
                                                {this.state.loading ?  <div style={{display:'flex',justifyContent:'center',alignSelf:'center',alignItems:'center',textAlign:'center'}}>
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

                </body>
            </>
        )
    }
}
export default meeting
