import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import {Button,Modal} from 'react-bootstrap'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import Top from './Top'
import Pagination from "../../node_modules/react-bootstrap/cjs/Pagination";
import {MagicSpinner} from "react-spinners-kit";
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
class inbox extends Component {
    state={
        inbox:[],
        bookmark:[],
        trash:[],
        imageUrl:null,
        currentPage: 1,
        todosPerPage: 10,
        show:false,
        activeClass:'5',
        render:false,
        param:0

    };
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onChange=this.onChange.bind(this);
    }
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
    onChange(event){
        this.setState({todosPerPage: parseInt(event.target.value)});
    }

    handleClose  = () =>{
        this.setState({show:false});
    };
    handleShow  = () =>{
        this.setState({show:true});
    };
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showMessage', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token:apiToken,
                user_id: user_id,
                param:0
            }),
        }).then((response) => response.json())
            .then((result) => {
                if (result.stats === 'success') {
                    this.setState({
                        inbox: result.data.message,
                        imageUrl:"https://test.skenap.ir/public" + result.data.avatar,
                        render:true
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
    updateParam(param){
        this.setState({render:false});
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showMessage', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token:apiToken,
                user_id: user_id,
                param:param
            }),
        }).then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.stats === 'success') {
                    this.setState({
                        inbox: result.data.message,
                        imageUrl:"https://test.skenap.ir/public" + result.data.avatar,
                        render:true,
                        param:param
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
    renderImage(){
        if (this.state.imageUrl!=='0'){
            return(
                <img alt=""
                    className="rounded-full"
                    src={this.state.imageUrl}/>
            )
        } else if (this.state.imageUrl==='0'){
            return(
                <img alt=""
                     className="rounded-full"
                     src={require("./../images/profile-2.jpg")}/>
            )
        }
    }
    renderPriority(){
            const { inbox, currentPage, todosPerPage } = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            const currentTodos = inbox.slice(indexOfFirstTodo, indexOfLastTodo);
            const renderTodos = currentTodos.map((todo, index) => {
                if (todo.priority===1){
                    return (
                        <div className="p-5  border border-red-600 mt-3 mx-3">
                        <div className="intro-y ">
                            <div className="inbox__item inbox__item--active inline-block sm:block text-gray-700 bg-gray-100 ">
                                <div className="flex px-5 py-3">
                                    <div className="w-48 flex-none flex items-center mr-1">
                                        <div className="w-6 h-6 flex-none image-fit relative ml-3">
                                            {this.renderImage()}
                                        </div>
                                        <div className="inbox__item--sender truncate ml-3" style={{fontSize:'14px'}}>
                                            {todo.title}
                                        </div>
                                    </div>
                                    <div className="w-64 sm:w-auto truncate">
                                    </div>
                                    <div className="w-50 mr-5 sm:w-auto truncate">
                                        {todo.text}
                                    </div>
                                    <div className="inbox__item--time whitespace-no-wrap mr-auto">
                                        {todo.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    )
                        ;
                } else if (todo.priority===2){
                    return (
	                    <div className="p-5  border border-red-600 mt-3 mx-3">
                        <div className="intro-y">
                            <div
                                className="inbox__item inbox__item--active inline-block sm:block text-gray-700 bg-gray-100 border border-yellow-500">
                                <div className="flex px-5 py-3">
                                    <div className="w-48 flex-none flex items-center mr-1">
                                        <div className="w-6 h-6 flex-none image-fit relative ml-3">
                                            {this.renderImage()}
                                        </div>
                                        <div className="inbox__item--sender truncate ml-3" style={{fontSize:'14px'}}>
                                            {todo.title}
                                        </div>
                                    </div>
                                    <div className="w-64 sm:w-auto truncate">
                                    </div>
                                    <div className="w-50 mr-5 sm:w-auto truncate">
                                        {todo.text}
                                    </div>
                                    <div className="inbox__item--time whitespace-no-wrap mr-auto">
                                        {todo.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    )
                }
                else if (todo.priority===3){
                    return (
	                    <div className="p-5  border border-red-600 mt-3 mx-3">
                        <div className="intro-y ">
                            <div
                                className="inbox__item inbox__item--active inline-block sm:block text-gray-700 bg-gray-100 border  border-gray-500">
                                <div className="flex px-5 py-3">
                                    <div className="w-48 flex-none flex items-center mr-1">
                                        <div className="w-6 h-6 flex-none image-fit relative ml-3">
                                            {this.renderImage()}
                                        </div>
                                        <div className="inbox__item--sender truncate ml-3" style={{fontSize:'14px'}}>
                                            {todo.title}
                                        </div>
                                    </div>
                                    <div className="w-64 sm:w-auto truncate">
                                    </div>
                                    <div className="w-50 mr-5 sm:w-auto truncate">
                                        {todo.text}
                                    </div>
                                    <div className="inbox__item--time whitespace-no-wrap mr-auto">
                                        {todo.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    )
                }

            });
            return(
                <>
                    {renderTodos}
                </>
            )
    }
    renderParam(){
        let {param}=this.state;
        if (param===0){
            const { inbox, currentPage, todosPerPage } = this.state;
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(inbox.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li >
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li ><div className="pagination__link"> ...</div></li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li  onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}><div className="pagination__link">{a}</div></li>
                                <li><div className="pagination__link">...</div></li>
                                <li onClick={this.handleNext.bind(this,pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link"  onClick={this.handleClick.bind(this,number)}>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-left" className="w-4 h-4"/>
                                    </div>
                                </li>
                            </>
                        )
                    }

                    else if (pageNumbers.length === number) {
                        let a = number - 2;
                        let b = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link"><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }

                    else if (number === 2) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else if (number === 3) {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        let d = number - 2;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });

            return(
                <>
                    <body className="app just" dir={"rtl"}>
                    <Mobile/>
                    <div className="flex">
                        <NavBar activeClass={this.state.activeClass}/>
                        <div className="content">
                            <Top disable="yes"/>
                            <div className="grid grid-cols-12 gap-6 mt-8">
                                <div className="col-span-12 lg:col-span-3 xxl:col-span-2">
                                    <div className="intro-y box bg-theme-1 p-5 mt-6">
                                        <div className="border-t border-theme-3 mt-6 pt-6 text-white">
                                            <button onClick={this.updateParam.bind(this,0)} className="flex items-center px-3 py-2 rounded-md bg-theme-22 w-full font-medium">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>همه پیام ها</button>
                                            <button onClick={this.updateParam.bind(this,1)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>ضروری و مهم</button>
                                            <button onClick={this.updateParam.bind(this,2)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="target"/> پروژه‌ها </button>
                                            <button onClick={this.updateParam.bind(this,3)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="pocket"/>پرداخت ها</button>
                                            <button onClick={this.updateParam.bind(this,4)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="clipboard"/>عمومی</button>
                                            <button onClick={this.updateParam.bind(this,5)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="smile"/>تبلیغات</button>
                                            <button onClick={this.updateParam.bind(this,6)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="box"/>فروش ویژه خدمات</button>
                                            <button onClick={this.updateParam.bind(this,7)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="aperture"/>آرشیو</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-9 xxl:col-span-10">
                                    <div className="intro-y inbox box mt-5">
                                        <div
                                            className="p-5 flex flex-col-reverse sm:flex-row  border-b border-gray-200 bullshit">
                                            <div className="flex items-center">
                                                <h2 className="intro-y text-lg font-medium mt-2">
                                                    صندوق پیام
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto sm:overflow-x-visible">
                                            {this.renderPriority()}
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                                        <ul className="pagination ml-auto">
                                            {renderPageNumbers}
                                        </ul>
                                        <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={35}>35</option>
                                            <option value={50}>50</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    </body>
                </>
            )
        }
        if (param===1){
            const { inbox, currentPage, todosPerPage } = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            const currentTodos = inbox.slice(indexOfFirstTodo, indexOfLastTodo);
            const renderTodos = currentTodos.map((todo, index) => {
                return (
                    <div className="intro-y">
                        <div
                            className="inbox__item inbox__item--active inline-block sm:block text-gray-700 bg-gray-100 border-b border-gray-200">
                            <div className="flex px-5 py-3">
                                <div className="w-48 flex-none flex items-center mr-1">

                                    <div className="w-6 h-6 flex-none image-fit relative ml-3">
                                        {this.renderImage()}
                                    </div>
                                    <div className="inbox__item--sender truncate ml-3">
                                        {todo.title}
                                    </div>
                                </div>
                                <div className="w-64 sm:w-auto truncate">
                                    {this.renderPriority(todo)}
                                </div>
                                <div className="w-50 mr-5 sm:w-auto truncate">
                                    {todo.text}
                                </div>
                                <div className="inbox__item--time whitespace-no-wrap mr-auto">
                                    {todo.date}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                    ;
            });
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(inbox.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li >
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li ><div className="pagination__link"> ...</div></li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li  onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}><div className="pagination__link">{a}</div></li>
                                <li><div className="pagination__link">...</div></li>
                                <li onClick={this.handleNext.bind(this,pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link"  onClick={this.handleClick.bind(this,number)}>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-left" className="w-4 h-4"/>
                                    </div>
                                </li>
                            </>
                        )
                    }

                    else if (pageNumbers.length === number) {
                        let a = number - 2;
                        let b = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link"><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }

                    else if (number === 2) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else if (number === 3) {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        let d = number - 2;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });

            return(
                <>
                    <body className="app just" dir={"rtl"}>
                    <Mobile/>
                    <div className="flex">
                        <NavBar activeClass={this.state.activeClass}/>
                        <div className="content">
                            <Top disable="yes"/>
                            <div className="grid grid-cols-12 gap-6 mt-8">
                                <div className="col-span-12 lg:col-span-3 xxl:col-span-2">
                                    <div className="intro-y box bg-theme-1 p-5 mt-6">
                                        <div className="border-t border-theme-3 mt-6 pt-6 text-white">
                                            <button onClick={this.updateParam.bind(this,0)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>همه پیام ها</button>
                                            <button onClick={this.updateParam.bind(this,1)} className="flex items-center px-3 py-2 rounded-md bg-theme-22 w-full font-medium">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>ضروری و مهم</button>
                                            <button onClick={this.updateParam.bind(this,2)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="target"/> پروژه‌ها </button>
                                            <button onClick={this.updateParam.bind(this,3)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="pocket"/>پرداخت ها</button>
                                            <button onClick={this.updateParam.bind(this,4)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="clipboard"/>عمومی</button>
                                            <button onClick={this.updateParam.bind(this,5)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="smile"/>تبلیغات</button>
                                            <button onClick={this.updateParam.bind(this,6)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="box"/>فروش ویژه خدمات</button>
                                            <button onClick={this.updateParam.bind(this,7)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="aperture"/>آرشیو</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-9 xxl:col-span-10">
                                    <div className="intro-y inbox box mt-5">
                                        <div
                                            className="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200"
                                            style={{justifyContent: "center"}}>
                                            <div className="flex items-center">
                                                <h2 className="intro-y text-lg font-medium mt-2">
                                                    صندوق پیام
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto sm:overflow-x-visible">
                                            {this.renderPriority()}
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                                        <ul className="pagination ml-auto">
                                            {renderPageNumbers}
                                        </ul>
                                        <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={35}>35</option>
                                            <option value={50}>50</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    </body>
                </>
            )
        }
        if (param===2){
            const { inbox, currentPage, todosPerPage } = this.state;
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(inbox.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li >
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li ><div className="pagination__link"> ...</div></li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li  onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}><div className="pagination__link">{a}</div></li>
                                <li><div className="pagination__link">...</div></li>
                                <li onClick={this.handleNext.bind(this,pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link"  onClick={this.handleClick.bind(this,number)}>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-left" className="w-4 h-4"/>
                                    </div>
                                </li>
                            </>
                        )
                    }

                    else if (pageNumbers.length === number) {
                        let a = number - 2;
                        let b = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link"><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }

                    else if (number === 2) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else if (number === 3) {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        let d = number - 2;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });

            return(
                <>
                    <body className="app just" dir={"rtl"}>
                    <Mobile/>
                    <div className="flex">
                        <NavBar activeClass={this.state.activeClass}/>
                        <div className="content">
                            <Top disable="yes"/>
                            <div className="grid grid-cols-12 gap-6 mt-8">
                                <div className="col-span-12 lg:col-span-3 xxl:col-span-2">
                                    <div className="intro-y box bg-theme-1 p-5 mt-6">
                                        <div className="border-t border-theme-3 mt-6 pt-6 text-white">
                                            <button onClick={this.updateParam.bind(this,0)} className="flex items-center px-3 py-2 rounded-md">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>همه پیام ها</button>
                                            <button onClick={this.updateParam.bind(this,1)} className="flex items-center px-3 py-2  rounded-md">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>ضروری و مهم</button>
                                            <button onClick={this.updateParam.bind(this,2)} className="flex items-center px-3 py-2 mt-2 rounded-md w-full bg-theme-22 font-medium"> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="target"/> پروژه‌ها </button>
                                            <button onClick={this.updateParam.bind(this,3)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="pocket"/>پرداخت ها</button>
                                            <button onClick={this.updateParam.bind(this,4)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="clipboard"/>عمومی</button>
                                            <button onClick={this.updateParam.bind(this,5)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="smile"/>تبلیغات</button>
                                            <button onClick={this.updateParam.bind(this,6)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="box"/>فروش ویژه خدمات</button>
                                            <button onClick={this.updateParam.bind(this,7)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="aperture"/>آرشیو</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-9 xxl:col-span-10">
                                    <div className="intro-y inbox box mt-5">
                                        <div
                                            className="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200"
                                            style={{justifyContent: "center"}}>
                                            <div className="flex items-center">
                                                <h2 className="intro-y text-lg font-medium mt-2">
                                                    صندوق پیام
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto sm:overflow-x-visible">
                                            {this.renderPriority()}
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                                        <ul className="pagination ml-auto">
                                            {renderPageNumbers}
                                        </ul>
                                        <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={35}>35</option>
                                            <option value={50}>50</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    </body>
                </>
            )
        }
        if (param===3){
            const { inbox, currentPage, todosPerPage } = this.state;
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(inbox.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li >
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li ><div className="pagination__link"> ...</div></li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li  onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}><div className="pagination__link">{a}</div></li>
                                <li><div className="pagination__link">...</div></li>
                                <li onClick={this.handleNext.bind(this,pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link"  onClick={this.handleClick.bind(this,number)}>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-left" className="w-4 h-4"/>
                                    </div>
                                </li>
                            </>
                        )
                    }

                    else if (pageNumbers.length === number) {
                        let a = number - 2;
                        let b = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link"><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }

                    else if (number === 2) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else if (number === 3) {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        let d = number - 2;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });

            return(
                <>
                    <body className="app just" dir={"rtl"}>

                    <Mobile/>
                    <div className="flex">
                        <NavBar activeClass={this.state.activeClass}/>
                        <div className="content">
                            <Top disable="yes"/>
                            <div className="grid grid-cols-12 gap-6 mt-8">
                                <div className="col-span-12 lg:col-span-3 xxl:col-span-2">
                                    <div className="intro-y box bg-theme-1 p-5 mt-6">
                                        <div className="border-t border-theme-3 mt-6 pt-6 text-white">
                                            <button onClick={this.updateParam.bind(this,0)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>همه پیام ها</button>
                                            <button onClick={this.updateParam.bind(this,1)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>ضروری و مهم</button>
                                            <button onClick={this.updateParam.bind(this,2)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="target"/> پروژه‌ها </button>
                                            <button onClick={this.updateParam.bind(this,3)} className="flex items-center px-3 py-2 mt-2 rounded-md w-full bg-theme-22 font-medium"> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="pocket"/>پرداخت ها</button>
                                            <button onClick={this.updateParam.bind(this,4)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="clipboard"/>عمومی</button>
                                            <button onClick={this.updateParam.bind(this,5)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="smile"/>تبلیغات</button>
                                            <button onClick={this.updateParam.bind(this,6)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="box"/>فروش ویژه خدمات</button>
                                            <button onClick={this.updateParam.bind(this,7)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="aperture"/>آرشیو</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-9 xxl:col-span-10">
                                    <div className="intro-y inbox box mt-5">
                                        <div
                                            className="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200"
                                            style={{justifyContent: "center"}}>
                                            <div className="flex items-center">
                                                <h2 className="intro-y text-lg font-medium mt-2">
                                                    صندوق پیام
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto sm:overflow-x-visible">
                                            {this.renderPriority()}
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                                        <ul className="pagination ml-auto">
                                            {renderPageNumbers}
                                        </ul>
                                        <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={35}>35</option>
                                            <option value={50}>50</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    </body>
                </>
            )
        }
        if (param===4){
            const { inbox, currentPage, todosPerPage } = this.state;
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(inbox.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li >
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li ><div className="pagination__link"> ...</div></li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li  onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}><div className="pagination__link">{a}</div></li>
                                <li><div className="pagination__link">...</div></li>
                                <li onClick={this.handleNext.bind(this,pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link"  onClick={this.handleClick.bind(this,number)}>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-left" className="w-4 h-4"/>
                                    </div>
                                </li>
                            </>
                        )
                    }

                    else if (pageNumbers.length === number) {
                        let a = number - 2;
                        let b = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link"><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }

                    else if (number === 2) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else if (number === 3) {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        let d = number - 2;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });

            return(
                <>
                    <body className="app just" dir={"rtl"}>
                    <Mobile/>
                    <div className="flex">
                        <NavBar activeClass={this.state.activeClass}/>
                        <div className="content">
                            <Top disable="yes"/>
                            <div className="grid grid-cols-12 gap-6 mt-8">
                                <div className="col-span-12 lg:col-span-3 xxl:col-span-2">
                                    <div className="intro-y box bg-theme-1 p-5 mt-6">
                                        <div className="border-t border-theme-3 mt-6 pt-6 text-white">
                                            <button onClick={this.updateParam.bind(this,0)} className="flex items-center px-3 py-2 rounded-md">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>همه پیام ها</button>
                                            <button onClick={this.updateParam.bind(this,1)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>ضروری و مهم</button>
                                            <button onClick={this.updateParam.bind(this,2)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="target"/> پروژه‌ها </button>
                                            <button onClick={this.updateParam.bind(this,3)} className="flex items-center px-3 py-2 mt-2 rounded-md  "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="pocket"/>پرداخت ها</button>
                                            <button onClick={this.updateParam.bind(this,4)} className="flex items-center px-3 py-2 mt-2 rounded-md w-full bg-theme-22 font-medium"> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="clipboard"/>عمومی</button>
                                            <button onClick={this.updateParam.bind(this,5)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="smile"/>تبلیغات</button>
                                            <button onClick={this.updateParam.bind(this,6)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="box"/>فروش ویژه خدمات</button>
                                            <button onClick={this.updateParam.bind(this,7)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="aperture"/>آرشیو</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-9 xxl:col-span-10">
                                    <div className="intro-y inbox box mt-5">
                                        <div
                                            className="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200"
                                            style={{justifyContent: "center"}}>
                                            <div className="flex items-center">
                                                <h2 className="intro-y text-lg font-medium mt-2">
                                                    صندوق پیام
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto sm:overflow-x-visible">
                                            {this.renderPriority()}
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                                        <ul className="pagination ml-auto">
                                            {renderPageNumbers}
                                        </ul>
                                        <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={35}>35</option>
                                            <option value={50}>50</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    </body>
                </>
            )
        }
        if (param===5){
            const { inbox, currentPage, todosPerPage } = this.state;
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(inbox.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li >
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li ><div className="pagination__link"> ...</div></li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li  onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}><div className="pagination__link">{a}</div></li>
                                <li><div className="pagination__link">...</div></li>
                                <li onClick={this.handleNext.bind(this,pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link"  onClick={this.handleClick.bind(this,number)}>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-left" className="w-4 h-4"/>
                                    </div>
                                </li>
                            </>
                        )
                    }

                    else if (pageNumbers.length === number) {
                        let a = number - 2;
                        let b = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link"><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }

                    else if (number === 2) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else if (number === 3) {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        let d = number - 2;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });

            return(
                <>
                    <body className="app just" dir={"rtl"}>
                    <Mobile/>
                    <div className="flex">
                        <NavBar activeClass={this.state.activeClass}/>
                        <div className="content">
                            <Top disable="yes"/>
                            <div className="grid grid-cols-12 gap-6 mt-8">
                                <div className="col-span-12 lg:col-span-3 xxl:col-span-2">
                                    <div className="intro-y box bg-theme-1 p-5 mt-6">
                                        <div className="border-t border-theme-3 mt-6 pt-6 text-white">
                                            <button onClick={this.updateParam.bind(this,0)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>همه پیام ها</button>
                                            <button onClick={this.updateParam.bind(this,1)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>ضروری و مهم</button>
                                            <button onClick={this.updateParam.bind(this,2)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="target"/> پروژه‌ها </button>
                                            <button onClick={this.updateParam.bind(this,3)} className="flex items-center px-3 py-2 mt-2 rounded-md  "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="pocket"/>پرداخت ها</button>
                                            <button onClick={this.updateParam.bind(this,4)} className="flex items-center px-3 py-2 mt-2 rounded-md  "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="clipboard"/>عمومی</button>
                                            <button onClick={this.updateParam.bind(this,5)} className="flex items-center px-3 py-2 mt-2 rounded-md w-full bg-theme-22 font-medium"> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="smile"/>تبلیغات</button>
                                            <button onClick={this.updateParam.bind(this,6)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="box"/>فروش ویژه خدمات</button>
                                            <button onClick={this.updateParam.bind(this,7)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="aperture"/>آرشیو</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-9 xxl:col-span-10">
                                    <div className="intro-y inbox box mt-5">
                                        <div
                                            className="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200"
                                            style={{justifyContent: "center"}}>
                                            <div className="flex items-center">
                                                <h2 className="intro-y text-lg font-medium mt-2">
                                                    صندوق پیام
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto sm:overflow-x-visible">
                                            {this.renderPriority()}
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                                        <ul className="pagination ml-auto">
                                            {renderPageNumbers}
                                        </ul>
                                        <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={35}>35</option>
                                            <option value={50}>50</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    </body>
                </>
            )
        }
        if (param===6){
            const { inbox, currentPage, todosPerPage } = this.state;
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(inbox.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li >
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li ><div className="pagination__link"> ...</div></li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li  onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}><div className="pagination__link">{a}</div></li>
                                <li><div className="pagination__link">...</div></li>
                                <li onClick={this.handleNext.bind(this,pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link"  onClick={this.handleClick.bind(this,number)}>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-left" className="w-4 h-4"/>
                                    </div>
                                </li>
                            </>
                        )
                    }

                    else if (pageNumbers.length === number) {
                        let a = number - 2;
                        let b = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link"><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }

                    else if (number === 2) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else if (number === 3) {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        let d = number - 2;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });

            return(
                <>
                    <body className="app just" dir={"rtl"}>
                    <Mobile/>
                    <div className="flex">
                        <NavBar activeClass={this.state.activeClass}/>
                        <div className="content">
                            <Top disable="yes"/>
                            <div className="grid grid-cols-12 gap-6 mt-8">
                                <div className="col-span-12 lg:col-span-3 xxl:col-span-2">
                                    <div className="intro-y box bg-theme-1 p-5 mt-6">
                                        <div className="border-t border-theme-3 mt-6 pt-6 text-white">
                                            <button onClick={this.updateParam.bind(this,0)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>همه پیام ها</button>
                                            <button onClick={this.updateParam.bind(this,1)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>ضروری و مهم</button>
                                            <button onClick={this.updateParam.bind(this,2)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="target"/> پروژه‌ها </button>
                                            <button onClick={this.updateParam.bind(this,3)} className="flex items-center px-3 py-2 mt-2 rounded-md  "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="pocket"/>پرداخت ها</button>
                                            <button onClick={this.updateParam.bind(this,4)} className="flex items-center px-3 py-2 mt-2 rounded-md  "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="clipboard"/>عمومی</button>
                                            <button onClick={this.updateParam.bind(this,5)} className="flex items-center px-3 py-2 mt-2 rounded-md  "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="smile"/>تبلیغات</button>
                                            <button onClick={this.updateParam.bind(this,6)} className="flex items-center px-3 py-2 mt-2 rounded-md w-full bg-theme-22 font-medium"> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="box"/>فروش ویژه خدمات</button>
                                            <button onClick={this.updateParam.bind(this,7)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="aperture"/>آرشیو</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-9 xxl:col-span-10">
                                    <div className="intro-y inbox box mt-5">
                                        <div
                                            className="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200"
                                            style={{justifyContent: "center"}}>
                                            <div className="flex items-center">
                                                <h2 className="intro-y text-lg font-medium mt-2">
                                                    صندوق پیام
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto sm:overflow-x-visible">
                                            {this.renderPriority()}
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                                        <ul className="pagination ml-auto">
                                            {renderPageNumbers}
                                        </ul>
                                        <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={35}>35</option>
                                            <option value={50}>50</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    </body>
                </>
            )
        }
        if (param===7){
            const { inbox, currentPage, todosPerPage } = this.state;
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(inbox.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li >
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li ><div className="pagination__link"> ...</div></li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li  onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}><div className="pagination__link">{a}</div></li>
                                <li><div className="pagination__link">...</div></li>
                                <li onClick={this.handleNext.bind(this,pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link"  onClick={this.handleClick.bind(this,number)}>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-left" className="w-4 h-4"/>
                                    </div>
                                </li>
                            </>
                        )
                    }

                    else if (pageNumbers.length === number) {
                        let a = number - 2;
                        let b = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link"><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }

                    else if (number === 2) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else if (number === 3) {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                    else {
                        let a = number + 2;
                        let b = number + 1;
                        let c = number - 1;
                        let d = number - 2;
                        return (
                            <>
                                <li className="pagination__link" onClick={this.handleBack.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-right" className="w-4 h-4"/>
                                </li>
                                <li className="pagination__link "  onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "   onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "   onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this,number)}><FeatherIcon
                                    icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });

            return(
                <>
                    <body className="app just" dir={"rtl"}>
                    <Mobile/>
                    <div className="flex">
                        <NavBar activeClass={this.state.activeClass}/>
                        <div className="content">
                            <Top disable="yes"/>
                            <div className="grid grid-cols-12 gap-6 mt-8">
                                <div className="col-span-12 lg:col-span-3 xxl:col-span-2">
                                    <div className="intro-y box bg-theme-1 p-5 mt-6">
                                        <div className="border-t border-theme-3 mt-6 pt-6 text-white">
                                            <button onClick={this.updateParam.bind(this,0)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>همه پیام ها</button>
                                            <button onClick={this.updateParam.bind(this,1)} className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="alert-circle"/>ضروری و مهم</button>
                                            <button onClick={this.updateParam.bind(this,2)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="target"/> پروژه‌ها </button>
                                            <button onClick={this.updateParam.bind(this,3)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="pocket"/>پرداخت ها</button>
                                            <button onClick={this.updateParam.bind(this,4)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="clipboard"/>عمومی</button>
                                            <button onClick={this.updateParam.bind(this,5)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="smile"/>تبلیغات</button>
                                            <button onClick={this.updateParam.bind(this,6)} className="flex items-center px-3 py-2 mt-2 rounded-md "> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="box"/>فروش ویژه خدمات</button>
                                            <button onClick={this.updateParam.bind(this,7)} className="flex items-center px-3 py-2 mt-2 rounded-md w-full bg-theme-22 font-medium w-full"> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="aperture"/>آرشیو</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-9 xxl:col-span-10">
                                    <div className="intro-y inbox box mt-5">
                                        <div
                                            className="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200"
                                            style={{justifyContent: "center"}}>
                                            <div className="flex items-center">
                                                <h2 className="intro-y text-lg font-medium mt-2">
                                                    صندوق پیام
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto sm:overflow-x-visible">
                                            {this.renderPriority()}
                                        </div>
                                    </div>
                                    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                                        <ul className="pagination ml-auto">
                                            {renderPageNumbers}
                                        </ul>
                                        <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={35}>35</option>
                                            <option value={50}>50</option>
                                        </select>

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
    renderAll(){
        if (this.state.render===true){

            return(
                <>
                    {this.renderParam()}
                </>
            )
        }
        else if (this.state.render===false){
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
    render(){
       return(
           this.renderAll()
       )
    }
}
export default inbox
