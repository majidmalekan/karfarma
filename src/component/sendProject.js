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
        description:'',
        scope:'',
        name:'',
        pic:null,
        show:false,
        index:[],
        loading:false,
        error:'',
        showConfirm:false,
        activeClass:'3'

    };
    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.onDescriptionChange=this.onDescriptionChange.bind(this);
        this.onPicChange=this.onPicChange.bind(this);
        this.onScopeChange=this.onScopeChange.bind(this);
    }
    handleClose  = () =>{
        this.setState({show:false});
    };
    handleShow  = () =>{
        this.setState({show:true});
    };
    onNameChange(event) {
        this.setState({ name: event.target.value });
    }
    onDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    onPicChange(event) {
        this.setState({ pic: event.target.files[0] });
    }
    onScopeChange(event) {
        this.setState({ scope: event.target.value });
    }
    handleShowConfirm  = () =>{
        this.setState({showConfirm:true});
    };
    handleCloseConfirm  = () =>{
        this.setState({showConfirm:false});
    };
    loginUp(){
        let {description,scope,name,pic}=this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if ( scope === '' ||name === '') {
            this.handleShow()
        } else
        {
            this.setState({loading:true});
            if (description === '') {
                let data = new FormData();
                data.append('file', pic);
                data.append('api_token', apiToken);
                data.append('scope', scope);
                data.append('name', name);
                data.append('user_id', user_id);
                data.append('status', '2');
                axios.post("https://test.skenap.ir/api/v1/addProject", data).then(res => {
                    if (res.data.stats === 'success') {
                        history.push('/dashboard')
                    }else if (res.data.stats==='error') {
                        this.setState({
                            error:res.data,
                            showConfirm:true
                        })
                    }
                })
            }
            if (pic===null){
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('scope', scope);
                data.append('name', name);
                data.append('user_id', user_id);
                data.append('description', description);
                data.append('status', '2');
                axios.post("https://test.skenap.ir/api/v1/addProject", data).then(res => {
                    if (res.data.stats === 'success') {
                        history.push('/dashboard')
                    }else if (res.data.stats==='error') {
                        this.setState({
                            error:res.data,
                            showConfirm:true
                        })
                    }
                })
            }
            if (description !== '' && pic !== null){
                let data = new FormData();
                data.append('file', pic);
                data.append('api_token', apiToken);
                data.append('scope', scope);
                data.append('name', name);
                data.append('user_id', user_id);
                data.append('description', description);
                data.append('status', '2');
                axios.post("https://test.skenap.ir/api/v1/addProject", data).then(res => {
                    console.log(res);
                    if (res.data.stats === 'success') {
                        history.push('/dashboard')
                    }else if (res.data.stats==='error') {
                        this.setState({
                            error:res.data,
                            showConfirm:true
                        })
                    }
                })
            }
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

    renderUploadFile() {
        if (this.state.pic===null) {
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
        } else {
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
                        <Top/>
                        <div className="intro-y flex items-center mt-8" style={{justifyContent:"center"}}>
                            <h2 className="text-lg font-medium">
                                ارسال پروژه
                            </h2>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y col-span-12 lg:col-span-9">
                                <div className="intro-y box lg:right">
                                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200"
                                         style={{justifyContent:"center"}}>
                                        <h2 className="font-medium text-base">
                                            فرم ارسال پروژه
                                        </h2>
                                    </div>
                                    <div className="p-5" id="input">
                                        <div className="preview">

                                                <label>نام پروژه</label>
                                                <input onChange={this.onNameChange} value={this.state.name} type="text" className="input  border mt-2 mr-2" style={{width:"90%"}}
                                                       placeholder="لطفا نام پروژه خود را وارد کنید"/>
                                        </div>
                                            <div className="mt-3">
                                                    <label>حوزه نرم افزار</label>
                                                    <select onChange={this.onScopeChange} className="input w-56 border mr-2">
                                                        <option style={{color:'#B6C1CF'}} value="">حوزه پروژه خود را انتخاب کنید</option>
                                                        {this.state.index.map(dex=><option value={dex.scope_id}> {dex.name} </option>)}
                                                    </select>
                                            </div>
                                            <div className="mt-3">
                                                <label>توضیحات</label>
                                                <div className="mt-2">
                                                    <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8" className="input border mt-2"
                                                              style={{height:"180px",width:'100%'}} name="editor">
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="mt-3">

                                            </div>

                                            <div className="mt-5">

                                                <div className="p-5" id="single-file-upload" style={{textAlign:"center"}}>
                                                    <label style={{fontSize: "22px"}}>فایل پیوند</label>
                                                    <div className="preview">
                                                        {this.renderUploadFile()}
                                                    </div>
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
                </body>
            </>
        )
    }
}
export default sendProject
