import { useState, useContext, useEffect } from 'react';
import './Demo.css';
import { Chart } from "react-google-charts";
import SubmitErrorToast from '../../Components/SignupComponent/SubmitErrorToast';
import DarkModeVariable from '../../Navbar/DarkModeVariable';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import type { TransactionRequest, TransactionRecurringRequest } from '../../types/FinanceType';
import { DummyTransactionData, pieShareFalseOption, pieShareTrueOption } from './Data';
import { setIncomeFieldEditable } from './DemoFunction';
import ExpensesTable from '../../Components/Expenses/ExpensesTable';
import ExpensesTableMobile from '../../Components/Expenses/ExpensesTableMobile';

export default function Demo() {

    const sharedValue = useContext(DarkModeVariable);
    const listMonth: string[] = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useEffect(() => {
        fetchUserData();
        console.log("I am fired");
    }, [])


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let options: any;

    if (sharedValue == false) {
        options = pieShareFalseOption

    } else {
        options = pieShareTrueOption
    }
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");

    const [pieWidth, setPieWidth] = useState(400);

    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);


    const [allExpenses, setAllExpenses] = useState(0);
    const [income, setIncome] = useState("");
    const [balance, setBalance] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<(string | any)[]>([]);

    const [categoryList, setCategoryList] = useState<string[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pieData,] = useState(new Map());
    const [transactionList, setTransactionList] = useState<string[]>([]);

    const [transactionListToRemove, setTransactionListToRemove] = useState<number[]>([]);
    const [transactionRecurringListToRemove, setTransactionRecurringListToRemove] = useState<number[]>([]);

    const [expense, setExpense] = useState<TransactionRequest[]>([]);
    const [recurringExpense, setRecurringExpense] = useState<TransactionRecurringRequest[]>([]);
    const [allData, setAllData] = useState<TransactionRequest[]>([]);

    useEffect((updatePieChart), [income]);

    function updateCategoryList(item: string) {

        categoryList.push(item)
        setCategoryList([...categoryList])
    }

    async function fetchUserData() {

        while (allData.length > 0) {
            allData.pop();
        }
        const data = DummyTransactionData;

        for (let i = 0; i < data.length; i++) {

            const transaction_id: number = data[i].transactionId;
            const transaction_name: string = data[i].name;
            const transaction_category: string = data[i].category;
            const transaction_description: string = data[i].description;
            const transaction_amount: number = data[i].amount;

            const transaction_month: number = data[i].month;
            const transaction_year: number = data[i].year;


            const temp_transaction_obj: TransactionRequest = {
                Id: transaction_id,
                Name: transaction_name,
                Description: transaction_description,
                Amount: transaction_amount,
                Category: transaction_category,
                Month: transaction_month.toString(),
                Year: transaction_year.toString(),
                UserId: -1
            }
            allData.push(temp_transaction_obj);
        }

        setAllData([...allData]);
        InitializeTable();


        while (recurringExpense.length > 0) {
            recurringExpense.pop();
        }
        const response_data = [
    {
        transactionId: 101,
        name: "Electricity Bill",
        category: "Utilities",
        description: "Electricity",
        amount: 230.45
    },
    {
        transactionId: 102,
        name: "Netflix Subscription",
        category: "Entertainment",
        description: "Monthly streaming service",
        amount: 15.99
    },
    {
        transactionId: 103,
        name: "Coffee Shop",
        category: "Food",
        description: "Morning coffee and pastry",
        amount: 8.75
    },
    {
        transactionId: 104,
        name: "Water Bill",
        category: "Utilities",
        description: "Water necessity",
        amount: 34.20
    }
];

        for (let i = 0; i < response_data.length; i++) {

            const transaction_id: number = response_data[i].transactionId;
            const transaction_name: string = response_data[i].name;
            const transaction_category: string = response_data[i].category;
            const transaction_description: string = response_data[i].description;
            const transaction_amount: number = response_data[i].amount;
            //const transaction_recurring_type: string = data[i].recurring_type;
            //const transaction_occorance_type: string = data[i].occorance_type;



            const temp_transaction_obj: TransactionRequest = {
                Id: transaction_id,
                Name: transaction_name,
                Description: transaction_description,
                Amount: transaction_amount,
                Category: transaction_category,
                Month: "-1",
                Year: "-1",
                UserId: -1
            }

            recurringExpense.push(temp_transaction_obj);

            //allData?.push(temp_transaction_obj);
        }

        InitializeTable();
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

    function addTransaction(newTransaction: TransactionRequest) {

        allData.push(newTransaction);
        setAllData([...allData]);
        expense.push(newTransaction);
        setExpense([...expense]);
        //addToQueue(temp_sql);
        addToPieChart(category, amount);
    }

    function addRecurringTransaction(newRecurringExpense: TransactionRecurringRequest) {
        recurringExpense.push(newRecurringExpense);
        setRecurringExpense([...recurringExpense]);
        //addToQueue(temp_sql);
        addToPieChart(category, amount);
    }

    function removeExponse(index: string, event: React.MouseEvent<HTMLElement>) {
        const i: number = Number(index);
        if (i != -1) {
            transactionListToRemove.push(i);
            setTransactionListToRemove(...[transactionListToRemove]);
            // const temp_sql: string = "DELETE FROM Transaction WHERE id = " + i + " ; ";
            // addToQueue(temp_sql);
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
            const updatedExpense = [...recurringExpense.slice(0, i), ...recurringExpense.slice(i + 1)];
            setRecurringExpense(updatedExpense);
        }
    }


    function updatePieChart() {

        while (data.length > 0) {
            data.pop();
        }
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

    async function GetCategory() {


        //const data = response.json();

        const data = [
            {
                name: "Accessories",
            },
            {
                name: "Entertainment",
            },
            {
                name: "Education",
            },
            {
                name: "Transport",
            },
            {
                name: "Miscellaneous",
            },
            {
                name: "Electronics"
            }

        ];

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

            if (Number.parseInt(value.Month) == month_filter) {
                filter_data.push(value);
            }
        })
        return filter_data;
    }


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
                    <div className="expenses-tracking">Expense Tracking  </div>
                    <div className="expenses-table">

                        <ExpensesTable categoryList={categoryList} addRecurringTransaction={addRecurringTransaction} 
                        addTransaction={addTransaction} expense={expense} recurringExpense={recurringExpense}
                        removeExponse={removeExponse} removeExponseRecurring={removeExponseRecurring} updateCategoryList={updateCategoryList}
                        />
                        {/*mobile*/}
                        <ExpensesTableMobile addRecurringTransaction={addRecurringTransaction} addTransaction={addTransaction}
                        categoryList={categoryList} expense={expense} recurringExpense={recurringExpense} 
                        removeExponseMobile={removeExponseMobile} removeExponseMobileRecurring={removeExponseMobileRecurring}
                        updateCategoryList={updateCategoryList}  />
                    </div>
                </div>
            </div>

        </>
    );
}
