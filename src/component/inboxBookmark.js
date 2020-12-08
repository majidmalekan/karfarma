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

class inboxBookmark extends Component {
    state={
        inbox:[],
        bookmark:[],
        trash:[],
        imageUrl:null,
        currentPage: 1,
        todosPerPage: 10,
        show:false,
        activeClass:'5',
        render:false
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
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showMessageBookmark', {
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
    renderAll(){
        if (this.state.render===true){
            const { inbox, currentPage, todosPerPage } = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            const currentTodos = inbox.slice(indexOfFirstTodo, indexOfLastTodo);
            const renderTodos = currentTodos.map((todo, index) => {
                return (
                    <Link to={{pathname:'/karfarma/singleMessage', state:{
                            message_id:todo.message_id
                        }}} >
                        <div className="intro-y">
                            <div
                                className="inbox__item inbox__item--active inline-block sm:block text-gray-700 bg-gray-100 border-b border-gray-200">
                                <div className="flex px-5 py-3">
                                    <div className="w-56 flex-none flex items-center mr-2">
                                        <button
                                            className="w-5 h-5 flex-none ml-2 flex items-center justify-center text-gray-500">
                                            <FeatherIcon className="w-4 h-4" icon="bookmark"/> </button>
                                        <button className="w-5 h-5 flex-none ml-4 flex items-center justify-center text-gray-500">
                                            <FeatherIcon className="w-4 h-4" icon="trash"/> </button>

                                        <div className="w-6 h-6 flex-none image-fit relative ml-5">
                                            {this.renderImage()}
                                        </div>
                                        <div className="inbox__item--sender truncate ml-3">
                                            {todo.title}
                                        </div>
                                    </div>
                                    <div className="w-64 sm:w-auto truncate">
                                        {todo.text}
                                    </div>
                                    <div className="inbox__item--time whitespace-no-wrap mr-auto pl-10">
                                        {todo.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

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
                    <mobileMenu/>
                    <div className="flex">
                        <NavBar    activeClass={this.state.activeClass} />
                        <div className="content">
                            <Top disable="yes"/>
                            <div className="grid grid-cols-12 gap-6 mt-8">
                                <div className="col-span-12 lg:col-span-3 xxl:col-span-2">
                                    <h2 className="intro-y text-lg font-medium mr-auto mt-2">
                                        صندوق پیام
                                    </h2>
                                    <div className="intro-y box bg-theme-1 p-5 mt-6">
                                        <div className="border-t border-theme-3 mt-6 pt-6 text-white">
                                            <Link to="/karfarma/inbox" className="flex items-center px-3 py-2 rounded-md ">
                                                <FeatherIcon className="w-4 h-4 ml-2" icon="mail"/>ورودی</Link>
                                            <Link to="/karfarma/inboxBookmark" className="flex items-center px-3 py-2 mt-2 rounded-md bg-theme-22 font-medium"> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="bookmark"/>منتخب</Link>

                                            <Link to="/karfarma/inboxTrash" className="flex items-center px-3 py-2 mt-2 rounded-md"> <FeatherIcon
                                                className="w-4 h-4 ml-2" icon="trash"/>سطل آشغال</Link>
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
                                                    پیام های منتخب
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto sm:overflow-x-visible">
                                            {renderTodos}
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
        } else if (this.state.render===false){
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
export default inboxBookmark
