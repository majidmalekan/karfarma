import React, {Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import Top from './Top'
import Pagination from "../../node_modules/react-bootstrap/cjs/Pagination";
import NumberFormat from "react-number-format";
import {MagicSpinner} from "react-spinners-kit";

class payments extends Component {
    state = {
        payments: [],
        projects: [],
        show: false,
        index: [],
        currentPage: 1,
        todosPerPage: 10,
        activeClass: '4',
        scope: '1',
        render: false
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onScopeChange = this.onScopeChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({todosPerPage: parseInt(event.target.value)});
        console.log(this.state.todosPerPage);
    }

    handleBack(number) {
        let a = Number(number);
        a = a - 1;
        this.setState({
            currentPage: a
        });
    }

    handleClick(number) {
        let a = Number(number);
        a = a + 1;
        this.setState({
            currentPage: a
        });
    }

    handleNext(number) {
        let a = Number(number);
        this.setState({
            currentPage: a
        });
    }

    handlePrev(number) {
        let a = Number(number);
        this.setState({
            currentPage: a
        });
    }

    onScopeChange(event) {
        this.setState({scope: event.target.value});
    }

    componentDidMount() {
        let {payments, projects} = this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/viewPayment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: apiToken,
                user_id: user_id,
            }),
        }).then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.stats === 'success') {
                    this.setState({
                        payments: result.data.arrayPayment,
                        projects: result.data.arrayProject,
                        render: true

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

    renderHeader() {
        if (this.state.scope === '1') {
            return (
                <>
                    <th className="border-b-2 whitespace-no-wrap text-gray-700">ردیف</th>
                    <th className="border-b-2 whitespace-no-wrap text-gray-700">شماره فاکتور</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">نام پروژه</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">دسته بندی پروژه</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">مبلغ کل</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">تاریخ سررسید</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">وضعیت پرداخت</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">جزییات</th>
                </>
            )
        } else if (this.state.scope === '2') {
            return (
                <>
                    <th className="border-b-2 whitespace-no-wrap text-gray-700">ردیف</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">عنوان پروژه</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">دسته بندی پروژه</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">مبلغ کل</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">تاریخ ایجاد پروژه</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">وضعیت پروژه</th>
                    <th className="border-b-2  whitespace-no-wrap text-gray-700">جزییات</th>
                </>
            )
        }
    }


    renderAll() {
        if (this.state.render === true) {
            return (
                <body className="app" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top disable="yes"/>
                        <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">

                            {this.renderShow()}
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
    renderTable() {
        if (this.state.scope === '1') {
            const {payments, currentPage, todosPerPage} = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            const currentTodos = payments.slice(indexOfFirstTodo, indexOfLastTodo);
            const renderTodos = currentTodos.map((todo, index) => {
                return (
                    <tr key={index}>
                        <td className=" border-b">
                            {index + indexOfFirstTodo + 1}
                        </td>
                        <td className="border-b">
                            <div className="font-medium whitespace-no-wrap">{todo.orderId}</div>
                        </td>
                        <td className="border-b">
                            {todo.project}
                        </td>
                        <td className="border-b">
                            {todo.scope}
                        </td>
                        <td className=" border-b">
                            <NumberFormat value={todo.price} displayType={'text'} suffix={' تومان'}
                                          thousandSeparator={true}/>
                        </td>
                        <td className="border-b">
                            {todo.dateExpire}
                        </td>
                        <td className="border-b">
                            {this.renderStatus(todo)}
                        </td>
                        <td className="border-b w-5">
                            <div className="flex sm:justify-center items-center">
                                <Link to={{
                                    pathname: '/karfarma/invoice?payment_id=' + todo.id, state: {
                                        payment_id: todo.id
                                    }
                                }} target="_parent" className="flex items-center mr-3">
                                    <FeatherIcon icon="check-square" className="w-4 h-4 mr-1"/> ادامه </Link>
                            </div>
                        </td>
                    </tr>

                )
            });
            return (
                <tbody>
                {
                    renderTodos
                }
                </tbody>
            )

        }
        else if (this.state.scope === '2') {
            const {currentPage, todosPerPage, projects} = this.state;
            const indexOfLastTodoo = currentPage * todosPerPage;
            const indexOfFirstTodoo = indexOfLastTodoo - todosPerPage;
            const currentTodoso = projects.slice(indexOfFirstTodoo, indexOfLastTodoo);
            const renderTodoso = currentTodoso.map((todo, index) => {
                return (
                    <tr key={index}>
                        <td className=" border-b">
                            {index + indexOfFirstTodoo + 1}
                        </td>
                        <td className="border-b">
                            <div className="font-medium whitespace-no-wrap">{todo.title}</div>
                        </td>
                        <td className=" border-b">
                            {todo.scope}
                        </td>
                        <td>
                            <div className="font-medium  whitespace-no-wrap">
                                <NumberFormat value={todo.fullPrice} displayType={'text'} suffix={' تومان'}
                                              thousandSeparator={true}/>
                            </div>
                        </td>
                        <td className=" border-b">
                            {todo.time}
                        </td>
                        <td className=" border-b">{todo.status}</td>
                        <td className="border-b w-5">
                            <div className="flex sm:justify-center items-center">
                                <Link target="_parent" to={{
                                    pathname: '/karfarma/singlePayment?project_id=' + todo.project_id, state: {
                                        project_id: todo.project_id
                                    }
                                }} className="flex items-center mr-3">
                                    <FeatherIcon icon="check-square" className="w-4 h-4 mr-1"/> ادامه </Link>
                            </div>
                        </td>
                    </tr>

                )
                    ;
            });
            return (
                <tbody>
                {
                    renderTodoso
                }
                </tbody>
            )
        }
    }

    renderPagination() {
        if (this.state.scope === '1') {
            const {payments, currentPage, todosPerPage} = this.state;
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(payments.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li>
                                    <div className="pagination__link"> ...</div>
                                </li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}>
                                    <div className="pagination__link">{a}</div>
                                </li>
                                <li>
                                    <div className="pagination__link">...</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this, number)}>
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
                                <li className="pagination__link " onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
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
                                <li className="pagination__link " onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this, number)}>
                                    <FeatherIcon
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
                                <li className="pagination__link " onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this, number)}>
                                    <FeatherIcon
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
                                <li className="pagination__link " onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });
            return (
                <ul className="pagination ml-auto">
                    {renderPageNumbers}
                </ul>
            )
        } else if (this.state.scope === '2') {
            const {currentPage, todosPerPage, projects} = this.state;
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(projects.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
                if (currentPage === number) {
                    if (currentPage === 1) {
                        let a = number + 2;
                        let b = number + 1;
                        return (
                            <>
                                <li>
                                    <div className="pagination__link">
                                        <FeatherIcon
                                            icon="chevrons-right" className="w-4 h-4"/>
                                    </div>

                                </li>
                                <li>
                                    <div className="pagination__link"> ...</div>
                                </li>
                                <li>
                                    <div className="pagination__link pagination__link--active">{number}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 1)}>
                                    <div className="pagination__link">{b}</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, number + 2)}>
                                    <div className="pagination__link">{a}</div>
                                </li>
                                <li>
                                    <div className="pagination__link">...</div>
                                </li>
                                <li onClick={this.handleNext.bind(this, pageNumbers.length)}>
                                    <div className="pagination__link">{pageNumbers.length}</div>
                                </li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this, number)}>
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
                                <li className="pagination__link " onClick={this.handlePrev.bind(this, 1)}>1</li>

                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 2)}>{a}</li>
                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 1)}>{b}</li>
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
                                <li className="pagination__link " onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this, number)}>
                                    <FeatherIcon
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
                                <li className="pagination__link " onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this, number)}>
                                    <FeatherIcon
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
                                <li className="pagination__link " onClick={this.handlePrev.bind(this, 1)}>1</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 2)}>{d}</li>

                                <li className="pagination__link "
                                    onClick={this.handlePrev.bind(this, number - 1)}>{c}</li>
                                <li className="pagination__link pagination__link--active">{number}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 1)}>{b}</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, number + 2)}>{a}</li>
                                <li className="pagination__link">...</li>
                                <li className="pagination__link "
                                    onClick={this.handleNext.bind(this, pageNumbers.length)}>{pageNumbers.length}</li>
                                <li className="pagination__link" onClick={this.handleClick.bind(this, number)}>
                                    <FeatherIcon
                                        icon="chevrons-left" className="w-4 h-4"/>
                                </li>
                            </>
                        )
                    }
                }

            });
            return (
                <ul className="pagination ml-auto">
                    {renderPageNumbers}
                </ul>
            )
        }
    }


    renderShow() {
        if (this.state.scope==='1') {
            if (this.state.payments === "") {
                return (
                    <div className="intro-y box p-5 mt-12 sm:mt-5">
                        <div>
                            <p className="text-gray-700 text-center mt-2">شما در حال حاضر فاکتور پرداخت شده ای برای مشاهده
                                ندارید!</p>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <>
                        <div className="preview mt-3">
                            <label className="text-gray-700">مرتب سازی براساس</label>
                            <select onChange={this.onScopeChange} className="input w-56 border mr-2">
                                <option value="1">پرداخت</option>
                                <option value="2">پروژه</option>
                            </select>
                        </div>
                        <table className="table table-report"
                               style={{textAlign: "right"}}>
                            <thead>
                            <tr>
                                {this.renderHeader()}
                            </tr>
                            </thead>
                            {
                                this.renderTable()
                            }
                        </table>
                        <div
                            className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                            {this.renderPagination()}
                            <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={35}>35</option>
                                <option value={50}>50</option>
                            </select>

                        </div>
                    </>
                )
            }
        }
        else if (this.state.scope==='2'){
            if (this.state.projects === "") {
                return (
                    <div className="intro-y box p-5 mt-12 sm:mt-5">
                        <div>
                            <p className="text-gray-700 text-center mt-2">شما در حال حاضر  فاکتور پرداخت شده ای برای مشاهده
                                ندارید!</p>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <>
                        <div className="preview mt-3">
                            <label className="text-gray-700">مرتب سازی براساس</label>
                            <select onChange={this.onScopeChange} className="input w-56 border mr-2">
                                <option value="1">پرداخت</option>
                                <option value="2">پروژه</option>
                            </select>
                        </div>
                        <table className="table table-report"
                               style={{textAlign: "right"}}>
                            <thead>
                            <tr>
                                {this.renderHeader()}
                            </tr>
                            </thead>
                            {
                                this.renderTable()
                            }
                        </table>
                        <div
                            className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-5">
                            {this.renderPagination()}
                            <select className="w-20 input box mt-3 sm:mt-0" onChange={this.onChange}>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={35}>35</option>
                                <option value={50}>50</option>
                            </select>

                        </div>
                    </>
                )
            }
        }
    }

    render() {
        return (
            <>
                {this.renderAll()}
            </>
        )
    }
}

export default payments
