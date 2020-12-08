import React, {Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import Top from './Top'
import Pagination from "../../node_modules/react-bootstrap/cjs/Pagination";
import {MagicSpinner} from "react-spinners-kit";

class showMeetinng extends Component {
    state = {
        meetings: [],
        show: false,
        index: [],
        currentPage: 1,
        todosPerPage: 10,
        activeClass: '12',
        render:false
    };

    constructor(props) {
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
    renderAll(){
        if (this.state.render===true){
            return(
                <body className="app" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top disable="yes"/>
                        {this.renderShow()}
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
    onChange(event){
        this.setState({todosPerPage: parseInt(event.target.value)});
        console.log(this.state.todosPerPage);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentDidMount() {
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showMeeting', {
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
                    this.setState({
                        meetings: result.data,
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
    renderDescription(param){
	    if (param === null) {
		    return (
                <div className="text-red-700">
				   توضیحات ندارد
                </div>
		    )

	    } else if (param !== null) {
		    return (
                <div className="text-green-700">
	                توضیحات دارد
                </div>
		    )
	    }
    }
    renderStatus(param) {
        if (param.status === 0) {
            return (

                <div className="flex  text-red-700">
                    تایید نشده
                </div>
            )
        } else if (param.status === 1) {
            return (
                <div className="flex text-green-700">
                    تعیین زمان
                </div>
            )
        }
    }

    renderScope(param) {
        if (param.scope === '1') {
            return (
                <>
                    حضوری
                </>
            )

        } else if (param.scope === '2') {
            return (
                <>
                    تلفنی
                </>
            )
        } else if (param.scope === '3') {
            return (
                <>
                    آنلاین
                </>
            )
        }
    }

    renderShow() {
        if (this.state.meetings === "") {
            return (
                <div className="intro-y box p-5 mt-12 sm:mt-5">
                    <div>
                        <p className="text-gray-700 text-center mt-2">شما در حال حاضر جلسه فعالی برای مشاهده ندارید!</p>
                    </div>
                </div>
            )
        } else {
            const {meetings, currentPage, todosPerPage} = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            const currentTodos = meetings.slice(indexOfFirstTodo, indexOfLastTodo);
            const renderTodos = currentTodos.map((todo, index) => {
                return (
                    <tr className="bg-gray-200" key={index}>
                        <td className="border-b">
                            {index + 1}
                        </td>
                        <td className="border-b">
                            {this.renderScope(todo)}
                        </td>
                        <td className="border-b">
                            { todo.startDate}
                        </td>
                        <td className="border-b">
                            {todo.finishDate}
                        </td>
                        <td className="border-b">
                            {this.renderFixedDate(todo.fixedDate)}
                        </td>
                        <td className="border-b">

                            {this.renderDescription(todo.whatFor)}
                        </td>
                        <td className="border-b">
                            {todo.date}
                        </td>
                        <td className="border-b">
                            {this.renderStatus(todo)}
                        </td>
                        <td className="border-b">
                            <div className="flex sm:justify-center items-center">
                                <Link to={{
                                    pathname: '/karfarma/meetingDetail?meet_id=' + todo.call_id, state: {
                                        meet_id: todo.call_id
                                    }
                                }} target="_parent" className="flex">
                                    <FeatherIcon icon="check-square" className="w-4 h-4 mr-1"/> ادامه </Link>
                            </div>
                        </td>
                    </tr>
                )
                    ;
            });
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(meetings.length / todosPerPage); i++) {
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
            return (
                <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                    <table className="table table-report sm:mt-2"
                           style={{textAlign: "right", direction: 'rtl'}}>
                        <thead>
                        <tr>
                            <th className="whitespace-no-wrap text-gray-700">ردیف</th>
                            <th className="whitespace-no-wrap text-gray-700">نوع جلسه</th>
                            <th className="whitespace-no-wrap text-gray-700">بازه زمانی اول</th>
                            <th className="whitespace-no-wrap text-gray-700">بازه زمانی دوم</th>
                            <th className="whitespace-no-wrap text-gray-700">تاریخ جلسه</th>
                            <th className="whitespace-no-wrap text-gray-700">توضیحات</th>
                            <th className="whitespace-no-wrap text-gray-700">تاریخ</th>
                            <th className=" whitespace-no-wrap text-gray-700">وضعیت</th>
                            <th className=" whitespace-no-wrap text-gray-700">جزییات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderTodos}
                        </tbody>
                    </table>
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

    renderFixedDate(fixedDate) {
        if (fixedDate===null){
            return(
            <>
                معین نشده
                </>
            )
        } else {
            return(
            <>
                {fixedDate}
            </>
            )
        }
    }
}

export default showMeetinng
