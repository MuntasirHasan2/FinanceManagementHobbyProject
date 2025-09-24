import { useState, useContext, useEffect } from 'react';
import './StyleSheet.css';
import { Chart } from "react-google-charts";
import SubmitErrorToast from '../../Components/SignupComponent/SubmitErrorToast';
import DarkModeVariable from '../../Navbar/DarkModeVariable';
import { FaSave } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useLocalStorage } from '@rehooks/local-storage';
import { pieShareFalseOption, pieShareTrueOption } from '../Demo/Data';
import ExpensesTable from '../../Components/Expenses/ExpensesTable';
import ExpensesTableMobile from '../../Components/Expenses/ExpensesTableMobile';
import type { TransactionRequest, TransactionRecurringRequest } from '../../types/FinanceType';
import { AddToCategoryDB, AddToTransactionDB, AddToTransactionRecurringDB, DeleteTransactionRecurringDB, fetchUserDataDB, fetchUserDataRecurringDB, GetCategoryDB } from './DBConnection';

export default function User() {
    const navigate = useNavigate();
    const [local_username] = useLocalStorage('username');
    const [local_userid] = useLocalStorage('userid');

    const sharedValue = useContext(DarkModeVariable);
    const listMonth: string[] = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useEffect(() => {
        const temp_uid: number = checkIfLogIn();
        if (temp_uid != -1) {
            fetchUserData(temp_uid);
        }
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let options: any;

    if (sharedValue == false) {
        options = pieShareFalseOption
    } else {
        options = pieShareTrueOption
    }


    const [amount] = useState(0);
    const [category] = useState("");

    const [pieWidth, setPieWidth] = useState(400);

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    const [transactionListToAdd, setTransactionListToAdd] = useState<TransactionRequest[]>([]);
    const [transactionRecurringListToAdd, setTransactionRecurringListToAdd] = useState<TransactionRecurringRequest[]>([]);

    const [transactionListToRemove, setTransactionListToRemove] = useState<number[]>([]);
    const [transactionRecurringListToRemove, setTransactionRecurringListToRemove] = useState<number[]>([]);

    const [allExpenses, setAllExpenses] = useState(0);
    const [income, setIncome] = useState("");
    const [balance, setBalance] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<(string | any)[]>([]);

    const [categoryList, setCategoryList] = useState<string[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pieData,] = useState(new Map());

    function updateCategoryList(item: string) {
        categoryList.push(item)
        setCategoryList([...categoryList])
    }

    const [expense, setExpense] = useState<TransactionRequest[]>([]);
    const [recurringExpense, setRecurringExpense] = useState<TransactionRecurringRequest[]>([]);
    const [allData, setAllData] = useState<TransactionRequest[]>([]);

    const [userId, setUserId] = useState(1);
    async function fetchUserData(userIdToCheck: number) {

        const response = await fetchUserDataDB(userIdToCheck);
        if (response != null) {
            while (allData.length > 0) {
                allData.pop();
            }
            let tsc = response as TransactionRequest[];
            for (let i = 0; i < tsc.length; i++) {
                allData.push(tsc[i]);
            }

            setAllData([...allData]);
        }
        InitializeTable();
        const responseRecurring = await fetchUserDataRecurringDB(userIdToCheck);
        if (responseRecurring != null) {
            while (recurringExpense.length > 0) {
                recurringExpense.pop();
            }
            let transactionRecurringTemp = responseRecurring as TransactionRecurringRequest[];
            for (let i = 0; i < transactionRecurringTemp.length; i++) {
                recurringExpense.push(transactionRecurringTemp[i]);
            }
            setRecurringExpense([...recurringExpense]);
        }
        InitializeTable();
    }

    function checkIfLogIn(): number {
        console.log("user id ", local_userid);
        if (local_username != undefined) {
            if (local_username) {
                setUserId(Number(local_userid));
                console.log("user id after set : ", userId);
                return Number(local_userid);
            }
        } else {
            setUserId(1);
            navigate("/");
        }
        return -1;
    }

    function addTransaction(newTransaction: TransactionRequest) {
        transactionListToAdd.push(newTransaction);
        setTransactionListToAdd([...transactionListToAdd])
        allData.push(newTransaction);
        setAllData([...allData]);
        expense.push(newTransaction);
        setExpense([...expense]);
        //addToQueue(temp_sql);
        addToPieChart(category, amount);
    }

    function addRecurringTransaction(newRecurringExpense: TransactionRecurringRequest) {
        transactionRecurringListToAdd.push(newRecurringExpense);
        setTransactionRecurringListToAdd([...transactionRecurringListToAdd]);
        recurringExpense.push(newRecurringExpense);
        setRecurringExpense([...recurringExpense]);
        //addToQueue(temp_sql);
        addToPieChart(category, amount);
    }

    function InitializeTable() {
        const screen_size: number = window.screen.width;
        if (screen_size < 900) {
            setPieWidth(390)
        }
        const d = new Date();
        setMonth(d.getMonth());
        setYear(d.getFullYear());
        const temp_expense: TransactionRequest[] = filterData(d.getMonth());
        while (expense.length > 0) {
            expense.pop();
        }
        temp_expense.forEach((value: TransactionRequest) => {
            expense.push(value);
        })
        //expense = temp_expense;
        setExpense([...expense]);

        GetCategory();
        InitializePieChart();
    }

    function removeExponse(index: string, event: React.MouseEvent<HTMLElement>) {
        const i: number = Number(index);
        if (i != -1) {
            transactionListToRemove.push(i);
            setTransactionListToRemove(...[transactionListToRemove]);
        }
        const temp_target = (event.target as HTMLInputElement);
        if (temp_target) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const transactionElement: HTMLElement = temp_target.parentElement.parentElement;
            if (transactionElement) {

                const temp_category_name: string = transactionElement.getElementsByClassName("category")[0].innerHTML;
                const temp_amount: number = Number(transactionElement.getElementsByClassName("amount")[0].innerHTML);
                removeFromPieChart(temp_category_name, temp_amount);
            }

            let indexToRemove: number = 0;


            for (let j = 0; j < allData.length; j++) {
                //const temp_jsonObj = allData[j];

                if ((expense[i]["Month"] == allData[j]["Month"]) && (expense[i]["Year"] == allData[j]["Year"])) {

                    if ((expense[i]["Name"] == allData[j]["Name"]) && (expense[i]["Description"] == allData[j]["Description"])
                        && (expense[i]["Category"] == allData[j]["Category"]) && (expense[i]["Amount"] == allData[j]["Amount"])) {

                        indexToRemove = j;
                        console.log("index : ", indexToRemove)

                    }

                }

            }

            //maybe

            allData.splice(indexToRemove, 1);
            setAllData([...allData]);

            const updatedExpense = [...expense.slice(0, i), ...expense.slice(i + 1)];
            setExpense(updatedExpense);
        }

    }

    function removeExponseRecurring(index: string, event: React.MouseEvent<HTMLElement>) {
        const i: number = Number(index);
        if (i != -1) {
            transactionRecurringListToRemove.push(i);
            setTransactionRecurringListToRemove(...[transactionRecurringListToRemove]);
        }
        const temp_target = (event.target as HTMLInputElement);
        if (temp_target) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const transactionElement: HTMLElement = temp_target.parentElement.parentElement;
            if (transactionElement) {

                const temp_category_name: string = transactionElement.getElementsByClassName("category")[0].innerHTML;
                const temp_amount: number = Number(transactionElement.getElementsByClassName("amount")[0].innerHTML);
                removeFromPieChart(temp_category_name, temp_amount);
            }

            const updatedExpense = [...recurringExpense.slice(0, i), ...recurringExpense.slice(i + 1)];
            setRecurringExpense(updatedExpense);
        }

    }


    function removeExponseMobile(index: string, event: React.MouseEvent<HTMLElement>) {
        const i: number = Number(index);
        if (i != -1) {
            transactionListToRemove.push(i);
            setTransactionListToRemove(...[transactionListToRemove]);
        }
        const temp_target = (event.target as HTMLInputElement);
        if (temp_target) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const transactionElement: HTMLElement = temp_target.parentElement.parentElement;
            // @ts-expect-error
            const transactionElementAmount: HTMLElement = temp_target.parentElement?.parentElement?.previousElementSibling;

            if (transactionElement && transactionElementAmount) {

                const temp_category_name: string = transactionElement.getElementsByClassName("category")[0].innerHTML;
                const temp_amount: number = Number(transactionElementAmount.getElementsByClassName("amount")[0].innerHTML);
                console.log(temp_category_name);
                console.log(temp_amount);
                removeFromPieChart(temp_category_name, temp_amount);
            }
            console.log("index : ", i);

            const updatedExpense = [...expense.slice(0, i), ...expense.slice(i + 1)];
            setExpense(updatedExpense);
            console.log("expense : ", updatedExpense);
        }

    }

    function removeExponseMobileRecurring(index: string, event: React.MouseEvent<HTMLElement>) {
        const i: number = Number(index);
        if (i != -1) {
            transactionRecurringListToRemove.push(i);
            setTransactionRecurringListToRemove(...[transactionRecurringListToRemove]);
        }
        const temp_target = (event.target as HTMLInputElement);
        if (temp_target) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const transactionElement: HTMLElement = temp_target.parentElement.parentElement;
            // @ts-expect-error
            const transactionElementAmount: HTMLElement = temp_target.parentElement?.parentElement?.previousElementSibling;

            if (transactionElement && transactionElementAmount) {

                const temp_category_name: string = transactionElement.getElementsByClassName("category")[0].innerHTML;
                const temp_amount: number = Number(transactionElementAmount.getElementsByClassName("amount")[0].innerHTML);
                console.log(temp_category_name);
                console.log(temp_amount);
                removeFromPieChart(temp_category_name, temp_amount);
            }
            console.log("index : ", i);

            const updatedExpense = [...recurringExpense.slice(0, i), ...recurringExpense.slice(i + 1)];
            setRecurringExpense(updatedExpense);
        }
    }

    function updatePieChart() {
        while (data.length > 0) {
            data.pop();
        }
        //setData([...data]);
        data.push(["Task", "Hours per Day"]);
        pieData.clear();
        let sum: number = 0;
        expense.forEach((value: TransactionRequest) => {
            if (pieData.has(value.Category)) {
                const temp_sum: number = pieData.get(value.Category);
                const new_sum: number = value.Amount + temp_sum;
                pieData.set(value.Category, new_sum);
                sum = sum + new_sum;
            } else {
                pieData.set(value.Category, value.Amount);
                sum = sum + value.Amount;
            }
        })
        recurringExpense.forEach((value: TransactionRecurringRequest) => {
            if (pieData.has(value.Category)) {
                const temp_sum: number = pieData.get(value.Category);
                const new_sum: number = value.Amount + temp_sum;
                pieData.set(value.Category, new_sum);
                sum = sum + new_sum;
            } else {
                pieData.set(value.Category, value.Amount);
                sum = sum + value.Amount;
            }
        })

        pieData.forEach((val: string, key: number) => {
            const temp = [key, val];
            data.push(temp);
        })
        const temp_balance: number = Number(income) - sum;
        setData([...data]);
        setAllExpenses(Number(sum.toFixed(2)));
        setBalance(Number(temp_balance.toFixed(2)));
    }

    function InitializePieChart() {
        expense.forEach((item: TransactionRequest) => {
            const temp_category: string = item.Category;
            const temp_amount: number = item.Amount;
            let current_amount: number = 0;
            if (pieData.has(temp_category)) {
                current_amount = pieData.get(temp_category);
            } else {
                current_amount = 0;
            }
            const total: number = temp_amount + current_amount;
            pieData.set(temp_category, total);
        })

        updatePieChart();
    }

    function addToPieChart(categoryName: string, categoryAmount: number) {
        let total: number = 0;
        if (pieData.has(categoryName)) {
            total = categoryAmount + pieData.get(categoryName);
        } else {
            total = categoryAmount;
        }
        pieData.set(categoryName, total);
        updatePieChart();
    }

    function removeFromPieChart(categoryName: string, categoryAmount: number) {
        let total: number = 0;
        if (pieData.has(categoryName)) {
            total = pieData.get(categoryName) - categoryAmount;
        } else {
            total = categoryAmount;
        }
        pieData.set(categoryName, total);
        updatePieChart();
    }

    async function SaveToDatabase() {
        AddToTransactionDB(transactionListToAdd);
        AddToTransactionRecurringDB(transactionRecurringListToAdd);
        AddToCategoryDB(categoryList);
        DeleteTransactionRecurringDB(transactionListToRemove);
        DeleteTransactionRecurringDB(transactionRecurringListToRemove);
    }

    async function GetCategory() {
        const data = await GetCategoryDB(userId);
        if (data == null)
            return;
        while (categoryList.length > 0) {
            categoryList.pop();
        }
        for (let i = 0; i < data.length; i++) {
            categoryList.push(data[i].name)
        }
        setCategoryList([...categoryList]);
    }

    function PreviousMonth() {
        let temp_month: number = month;
        temp_month--;
        if (temp_month < 0) {
            temp_month = 11;
            let tempYear: number = year;
            tempYear--;
            setYear(tempYear);
        }
        setMonth(temp_month);
        //const current_month: string = listMonth[temp_month];

        const temp_expense: TransactionRequest[] = filterData(temp_month);
        while (expense.length > 0) {
            expense.pop();
        }

        for (let i = 0; i < temp_expense.length; i++) {
            expense.push(temp_expense[i]);
        }
        setExpense([...expense]);



        updatePieChart();
    }

    function NextMonth() {
        let temp_month: number = month;
        temp_month++;
        if (temp_month > 11) {
            temp_month = 0;
            let tempYear: number = year;
            tempYear++;
            setYear(tempYear);
        }
        setMonth(temp_month);
        //const current_month: string = listMonth[temp_month];
        const temp_expense: TransactionRequest[] = filterData(temp_month);
        while (expense.length > 0) {
            expense.pop();
        }

        for (let i = 0; i < temp_expense.length; i++) {
            expense.push(temp_expense[i]);
        }
        setExpense([...expense]);

        updatePieChart();
    }

    function filterData(month_filter: number) {
        const filter_data: TransactionRequest[] = [];
        allData.forEach((value: TransactionRequest) => {

            if (value.Month == month_filter.toString()) {
                filter_data.push(value);
            }
        })
        return filter_data;
    }
    function setIncomeFieldEditable(): void {
        const income_element_input: HTMLElement = document.getElementById("inccomeId")!;
        if (income_element_input) {
            if (income_element_input.getAttribute("disabled")) {
                income_element_input.removeAttribute("disabled");
                income_element_input.classList.remove("input-active");

            } else {

                income_element_input.setAttribute("disabled", "true");
                income_element_input.classList.add("input-active");
            }
        }
    }
    useEffect((updatePieChart), [income]);

    return (
        <>
            <div className="demo-container">
                <div
                    className="Errors"
                >
                    <div
                        className="Errors-list">

                        <div className="mail-exist" id="empty_field">
                            <SubmitErrorToast message={"Some fields are empty!"} />
                        </div>

                    </div>
                </div>
                <div className="top-content">
                    <div
                        className="currentData">
                        <div
                            onClick={PreviousMonth}
                            className="changeMonthButton"
                            id="previous"> <span> <GrFormPrevious /> </span>Previous Month </div>
                        <div className="title">{year} - {listMonth[month]}</div>
                        <div
                            onClick={NextMonth}
                            className="changeMonthButton">Next Month <span><MdNavigateNext /></span>  </div>
                    </div>
                    <div className="content-expenses">


                        <div className="summary-expenses">
                            <div className="expense">
                                All Expenses
                                <div className="expenses-value">
                                    Rs {allExpenses}
                                </div>
                            </div>

                            <div className="expense">
                                All Income
                                <div className="expenses-value">
                                    <span>Rs <input
                                        id="inccomeId"
                                        type="text" value={income}
                                        onChange={(e) => setIncome(e.currentTarget.value)} />
                                    </span>   <span onClick={setIncomeFieldEditable}> <MdEdit /></span>
                                </div>
                            </div>

                            <div className="expense">
                                Balance
                                <div className="expenses-value">
                                    Rs {balance}
                                </div>
                            </div>


                        </div>
                        <div className="summary-piechart">
                            <Chart
                                chartType="PieChart"
                                data={data}
                                options={options}
                                width={pieWidth}
                                height={"100%"}
                                style={{ color: 'white' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="expenses">
                    <div className="expenses-tracking">Expense Tracking  <span
                        style={{ fontSize: '20px' }}
                        onClick={SaveToDatabase}> Save Changes  <FaSave /></span></div>
                    <div className="expenses-table">
                        <ExpensesTable categoryList={categoryList} addRecurringTransaction={addRecurringTransaction}
                            addTransaction={addTransaction} expense={expense} recurringExpense={recurringExpense}
                            removeExponse={removeExponse} removeExponseRecurring={removeExponseRecurring} updateCategoryList={updateCategoryList}
                        />
                        {/*mobile*/}
                        <ExpensesTableMobile addRecurringTransaction={addRecurringTransaction} addTransaction={addTransaction}
                            categoryList={categoryList} expense={expense} recurringExpense={recurringExpense}
                            removeExponseMobile={removeExponseMobile} removeExponseMobileRecurring={removeExponseMobileRecurring}
                            updateCategoryList={updateCategoryList} />
                    </div>

                </div>
            </div>

        </>
    );
}
