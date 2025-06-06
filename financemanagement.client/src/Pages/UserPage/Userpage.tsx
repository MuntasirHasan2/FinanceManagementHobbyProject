import { useState, useContext, useEffect } from 'react';
import './StyleSheet.css';
import { Chart } from "react-google-charts";
import SubmitErrorToast from '../../Components/SignupComponent/SubmitErrorToast';
import DarkModeVariable from '../../Navbar/DarkModeVariable';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
export default function User() {

    const sharedValue = useContext(DarkModeVariable);
    const listMonth: string[] = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useEffect(() => {
        fetchUserData();
        console.log("I am fired");
    }, [])


    //let data3 = [
    //    ["Task", "Hours per Day"],
    //    ["Work", 9],
    //    ["Eat", 2],
    //    ["Commute", 2],
    //    ["Watch TV", 2],
    //    ["Sleep", 7],
    //];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let options: any;

    if (sharedValue == false) {
        options = {
            title: "My Daily Activities",
            titleTextStyle: {
                color: 'black'
            },
            backgroundColor: "none",
            color: "white",
            heading: {
                textStyle: {
                    color: "black"
                }
            },
            legend: {
                textStyle: {
                    color: "black"
                }
            }
            ,
            chartArea: {
                width: "250", height: "250"
            },
        };

    } else {
        options = {
            title: "My Daily Activities",
            titleTextStyle: {
                color: 'white'
            },
            //backgroundColor: "#242424",
            backgroundColor: "none",
            color: "white",
            heading: {
                textStyle: {
                    color: "white"
                }
            },
            legend: {
                textStyle: {
                    color: "white"
                }
            },
            chartArea: {
                width: "250", height: "250"
            },

        };
    }

    type Transaction = {
        UserId: number;
        BulkSQLString: string;
    }

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [occurranceType, setOccurranceType] = useState("Occurance Type");
    const [recurringType, setRecurringType] = useState("Recurring Type");

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
    const [pieData, setPieData] = useState(new Map());
    const [transactionList, setTransactionList] = useState<string[]>([]);
    //const [categoryList, setCategoryList] = useState(new Map());

    const [isCategoryAddActive, setIsCategoryAddActive] = useState(false);
    function updateCategoryList(item: string) {

        categoryList.push(item)
        setCategoryList([...categoryList])
    }



    type expenses_data = {
        transaction_id: number;
        name: string;
        description: string;
        amount: number;
        category: string;
        occuranceType: string;
        recurringType: string;
        month: number;
        year: number;
    }

    useEffect((updatePieChart), [income]);


    const [expense, setExpense] = useState<expenses_data[]>([]);
    const [recurringExpense, setRecurringExpense] = useState<expenses_data[]>([]);
    const [allData, setAllData] = useState<expenses_data[]>([]);


    async function fetchUserData() {

        const url: string = "https://localhost:7091/Transaction/GetTransaction";
        const transactionSQL: string = "";



        const bodyData: Transaction = {
            UserId: 1,
            BulkSQLString: transactionSQL,
        }

        try {
            const response = await fetch(url, {
                //mode: 'no-cors',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: formData,
                body: JSON.stringify(bodyData),
            }
            );
            //const data = response.json();
            if (response.ok) {
                const data = await response.json();

                while (allData.length > 0) {
                    allData.pop();
                }
                for (let i = 0; i < data.length; i++) {

                    const transaction_id: number = data[i].transactionId;
                    const transaction_name: string = data[i].name;
                    const transaction_category: string = data[i].category;
                    const transaction_description: string = data[i].description;
                    const transaction_amount: number = data[i].amount;
                    //const transaction_recurring_type: string = data[i].recurring_type;
                    //const transaction_occorance_type: string = data[i].occorance_type;
                    const transaction_month: number = data[i].month;
                    const transaction_year: number = data[i].year;


                    const temp_transaction_obj: expenses_data = {
                        transaction_id: transaction_id,
                        name: transaction_name,
                        description: transaction_description,
                        amount: transaction_amount,
                        category: transaction_category,
                        occuranceType: "",
                        recurringType: "",
                        month: transaction_month,
                        year: transaction_year,
                    }
                    allData.push(temp_transaction_obj);
                }

                setAllData([...allData]);
                InitializeTable();



            } else {
                console.log("not ok");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error :", error.message);
        }
        const url_recurring: string = "https://localhost:7091/Transaction/GetTransactionRecurring";

        try {
            const response = await fetch(url_recurring, {
                //mode: 'no-cors',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: formData,
                body: JSON.stringify(bodyData),
            }
            );
            //const data = response.json();
            if (response.ok) {
                const response_data = await response.json();

                while (recurringExpense.length > 0) {
                    recurringExpense.pop();
                }
                for (let i = 0; i < response_data.length; i++) {

                    const transaction_id: number = response_data[i].transactionId;
                    const transaction_name: string = response_data[i].name;
                    const transaction_category: string = response_data[i].category;
                    const transaction_description: string = response_data[i].description;
                    const transaction_amount: number = response_data[i].amount;
                    //const transaction_recurring_type: string = data[i].recurring_type;
                    //const transaction_occorance_type: string = data[i].occorance_type;



                    const temp_transaction_obj: expenses_data = {
                        transaction_id: transaction_id,
                        name: transaction_name,
                        description: transaction_description,
                        amount: transaction_amount,
                        category: transaction_category,
                        occuranceType: "",
                        recurringType: "",
                        month: -1,
                        year: -1,
                    }

                    recurringExpense.push(temp_transaction_obj);

                    //allData?.push(temp_transaction_obj);
                }

                InitializeTable();



            } else {
                console.log("not ok");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error :", error.message);
        }



    }

    function InitializeTable() {
        const screen_size: number = window.screen.width;
        if (screen_size < 900) {
            setPieWidth(390)
        }
        const d = new Date();
        setMonth(d.getMonth());
        setYear(d.getFullYear());
        const temp_expense: expenses_data[] = filterData(d.getMonth());
        while (expense.length > 0) {
            expense.pop();
        }
        temp_expense.forEach((value: expenses_data) => {
            expense.push(value);
        })
        //expense = temp_expense;
        setExpense([...expense]);

        GetCategory();
        InitializePieChart();
    }

    function addNewExpense() {

        console.log(data);
        if (name == "") {

            const empty_field = document.getElementById("empty_field");
            if (empty_field) {
                empty_field.classList.add("error-active");

                setTimeout(() => {
                    empty_field.classList.remove("error-active");
                }, 3000)
            }
            return;
        }
        let temp_recurring: string = "Nan";
        if (occurranceType == "One Off") {
            temp_recurring = "Not Applicable";
        } else {
            temp_recurring = recurringType;
        }
        const newData: expenses_data = {
            transaction_id: -1,
            name: name,
            description: description,
            amount: amount,
            category: category,
            occuranceType: occurranceType,
            recurringType: temp_recurring,
            month: month,
            year: year
        }
        let temp_sql: string = "";
        if (occurranceType.toLowerCase() == "one off") {

            temp_sql = "INSERT INTO Transaction(user_id, category_name, name, description, amount, month, year)"
                + " VALUES('" + 1 + "' ,'" + category + "','" + name + "','" + description + "'," + amount + ",'" + month + "' , '" + year + "' ); ";
            allData.push(newData);
            setAllData([...allData]);
            expense.push(newData);
            setExpense([...expense]);

        } else {
            temp_sql = "INSERT INTO Transaction_Recurring(user_id, category_name, name, description, amount)"
                + " VALUES('" + 1 + "' ,'" + category + "','" + name + "','" + description + "'," + amount + ",'" + month + "' , '" + year + "'); ";
            recurringExpense.push(newData);
            setRecurringExpense([...recurringExpense]);
        }
        addToQueue(temp_sql);
        addToPieChart(category, amount);

        setName(""); setDescription(""); setAmount(0); setCategory("");

    }



    function removeExponse(index: string, event: Event) {
        const i: number = Number(index);
        if (i != -1) {
            const temp_sql: string = "DELETE FROM Transaction WHERE id = " + i + " ; ";
            addToQueue(temp_sql);
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
        }


        //console.log("Eventt", event.target.parentElement.parentElement);
        //removeFromPieChart();
        const updatedExpense = [...expense.slice(0, i), ...expense.slice(i + 1)];
        setExpense(updatedExpense);
    }





    function showType() {
        const type = document.getElementById("type");
        if (type) {

            if (type.classList.contains("show-dropdown")) {
                type.classList.remove("show-dropdown");
            } else {

                type.classList.add("show-dropdown");
            }
        }


    }
    function showCategoryType() {
        const type = document.getElementById("category_type");
        if (type) {

            if (type.classList.contains("show-dropdown")) {
                type.classList.remove("show-dropdown");
            } else {

                type.classList.add("show-dropdown");
            }
        }
    }


    function AddNewCategory() {
        if (newCategory == "") {
            console.log("Category cannot be empty");
            return;
        }
        updateCategoryList(newCategory);
        AddToCategoryDB(newCategory);
        setNewCategory("");
    }

    function updatePieChart() {
        //categoryList.forEach((element: ListCategory) => {
        //    data = [];
        //    const temp = [element.name, element.amount];
        //    data.push(temp);
        //})
        while (data.length > 0) {
            data.pop();
        }
        //setData([...data]);
        data.push(["Task", "Hours per Day"]);
        pieData.clear();
        let sum: number = 0;
        expense.forEach((value: expenses_data) => {
            if (pieData.has(value.category)) {
                const temp_sum: number = pieData.get(value.category);
                const new_sum: number = value.amount + temp_sum;
                pieData.set(value.category, new_sum);
                sum = sum + new_sum;
            } else {
                pieData.set(value.category, value.amount);
                sum = sum + value.amount;
            }
        })
        recurringExpense.forEach((value: expenses_data) => {
            if (pieData.has(value.category)) {
                const temp_sum: number = pieData.get(value.category);
                const new_sum: number = value.amount + temp_sum;
                pieData.set(value.category, new_sum);
                sum = sum + new_sum;
            } else {
                pieData.set(value.category, value.amount);
                sum = sum + value.amount;
            }
        })

        pieData.forEach((val: string, key: number) => {
            const temp = [key, val];
            data.push(temp);
        })
        const temp_balance: number = Number(income) - sum;
        setData([...data]);
        setAllExpenses(sum);
        setBalance(temp_balance);
    }

    function InitializePieChart() {
        expense.forEach((item: expenses_data) => {
            const temp_category: string = item.category;
            const temp_amount: number = item.amount;
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

    function addToQueue(temp_sql: string) {
        transactionList.push(temp_sql);
        setTransactionList(transactionList);
    }

    async function SaveToDatabase() {
        const url: string = "https://localhost:7091/Transaction/BulkRequestTransaction";
        let transactionSQL: string = "";
        transactionList.forEach((value: string) => {
            transactionSQL = transactionSQL + value;
        })

        console.log(transactionSQL);

        const bodyData: Transaction = {
            UserId: 1,
            BulkSQLString: transactionSQL,
        }

        try {
            const response = await fetch(url, {
                //mode: 'no-cors',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: formData,
                body: JSON.stringify(bodyData),
            }
            );
            //const data = response.json();
            console.log("Reponse : ", response);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.log("not ok");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error :", error.message);
        }
        //"INSERT INTO Transaction(user_id,category_name,name,description,amount,month,year,occorance_type,recurring_type) ";
    }
    //InitializePieChart();

    type CategoryDataType = {
        UserId: number;
        name: string;
    }

    async function AddToCategoryDB(categoryToAdd: string) {
        const url: string = "https://localhost:7091/Category/AddCategory";
        const categoryData: CategoryDataType = {
            //username: username,
            UserId: 1,
            name: categoryToAdd,
        }
        try {
            const response = await fetch(url, {
                //mode: 'no-cors',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: formData,
                body: JSON.stringify(categoryData),
            }
            );
            //const data = response.json();
            console.log("Reponse : ", response);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.log("not ok");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error :", error.message);
        }
    }

    async function GetCategory() {
        const url: string = "https://localhost:7091/Category/GetCategory";
        const categoryData: CategoryDataType = {
            //username: username,
            UserId: 1,
            name: "",
        }
        try {
            const response = await fetch(url, {
                //mode: 'no-cors',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: formData,
                body: JSON.stringify(categoryData),
            }
            );
            //const data = response.json();

            if (response.ok) {
                const data = await response.json();
                while (categoryList.length > 0) {
                    categoryList.pop();
                }
                for (let i = 0; i < data.length; i++) {
                    categoryList.push(data[i].name)
                }
                setCategoryList([...categoryList]);
            } else {
                console.log("not ok");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error :", error.message);
        }
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

        const temp_expense: expenses_data[] = filterData(temp_month);
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
        const temp_expense: expenses_data[] = filterData(temp_month);
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
        const filter_data: expenses_data[] = [];
        allData.forEach((value: expenses_data) => {

            if (value.month == month_filter) {
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
                        <table className="large-screen">
                            <thead>
                                <tr>
                                    <td>
                                        <div className="name">
                                            <input type="text" name="name" id="name"
                                                placeholder='Name'
                                                value={name}
                                                onChange={(e) => setName(e.currentTarget.value)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="description">
                                            <input type="text" name="description" id="description"
                                                placeholder='Description'
                                                value={description}
                                                onChange={(e) => setDescription(e.currentTarget.value)} />
                                        </div>
                                    </td>

                                    <td>
                                        <div className="amount">
                                            <input type="text" name="amount" id="amount"
                                                placeholder='Amount'
                                                value={amount}
                                                onChange={(e) => setAmount(Number(e.currentTarget.value))} />
                                        </div>
                                    </td>

                                    <td>

                                        <div className="type-category">

                                            <div
                                                onClick={showCategoryType}
                                            >{category != "" ? category : "Select Category"} <IoMdArrowDropdownCircle /> </div>

                                            <div className="dropdown-content-category" id="category_type">

                                                {categoryList.map((item: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        onClick={(e) => {
                                                            setCategory(e.currentTarget.innerText);
                                                            showCategoryType();
                                                        }}                                                    >
                                                        {item}
                                                    </div>
                                                ))}

                                                <div
                                                    className={isCategoryAddActive ? "" : "hidden"}
                                                    onClick={() => setIsCategoryAddActive(false)}>
                                                    <IoMdAddCircle />
                                                </div>

                                                <div
                                                    className={isCategoryAddActive ? "hidden" : ""}
                                                    onClick={() => setIsCategoryAddActive(true)}>
                                                    <IoIosCloseCircle />
                                                </div>
                                                <div id="addNewCategory" className={isCategoryAddActive ? "hidden" : ""}>
                                                    <input type="text" name="newCategory" id="newCategory"
                                                        placeholder="Enter Category"
                                                        value={newCategory} onChange={(e) => setNewCategory(e.currentTarget.value)} />
                                                    <span id="addCategory"
                                                        onClick={AddNewCategory}>
                                                        Add
                                                    </span>
                                                </div>


                                            </div>

                                        </div>

                                    </td>

                                    <td>
                                        <div className="type">

                                            <div
                                                onClick={showType}
                                            >{occurranceType} <IoMdArrowDropdownCircle /> </div>

                                            <div className="dropdown-content" id="type">
                                                <div
                                                    onClick={() => { setOccurranceType("One Off"); showType(); }}>
                                                    One-off
                                                </div>
                                                <div
                                                    onClick={() => { setOccurranceType("Every Month"); showType(); }}>
                                                    Every Month
                                                </div>
                                            </div>

                                        </div>
                                    </td>

                                    {/*<td>*/}
                                    {/*    <div className="recurring-type">*/}
                                    {/*        <div*/}
                                    {/*            onClick={showRecurringType}*/}
                                    {/*            className={occurranceType === "One Off"?"hidden":"" }*/}
                                    {/*        >{recurringType} <IoMdArrowDropdownCircle /></div>*/}

                                    {/*        <div className="dropdown-content" id="recurringType">*/}

                                    {/*            <div*/}
                                    {/*                onClick={() => setRecurringType("Every Day")}>*/}
                                    {/*                Every Day*/}
                                    {/*            </div>*/}
                                    {/*            <div*/}
                                    {/*                onClick={() => setRecurringType("Every Week")}>*/}
                                    {/*                Every Week*/}
                                    {/*            </div>*/}
                                    {/*            <div*/}
                                    {/*                onClick={() => setRecurringType("Every Month")}>*/}
                                    {/*                Every Month*/}
                                    {/*            </div>*/}
                                    {/*            <div*/}
                                    {/*                onClick={() => setRecurringType("Every Year Same Date")}>*/}
                                    {/*                Every Year Same Date*/}
                                    {/*            </div>*/}

                                    {/*        </div>*/}

                                    {/*    </div>*/}
                                    {/*</td>*/}

                                    <td>
                                        <div className="add-item"
                                            onClick={addNewExpense}>
                                            Add
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>


                                {expense.map((element: expenses_data, index: number) =>
                                (
                                    <tr
                                        key={index}>
                                        <td>
                                            <div className="name">
                                                {element.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="description">
                                                {element.description}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="amount">
                                                {element.amount}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="category">
                                                {element.category}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="type">
                                                {element.occuranceType}
                                            </div>
                                        </td>

                                        {/*<td>*/}
                                        {/*    <div className="recurring-type">*/}
                                        {/*        {element.recurringType}*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}

                                        <td>
                                            <div
                                                className="remove-item"
                                                id={index.toString()}
                                                onClick={(e) => removeExponse(e.currentTarget.id, e)}>
                                                Remove
                                            </div>
                                        </td>
                                    </tr>
                                )
                                )}

                                {recurringExpense.map((element: expenses_data, index: number) =>
                                (
                                    <tr
                                        key={index}>
                                        <td>
                                            <div className="name">
                                                {element.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="description">
                                                {element.description}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="amount">
                                                {element.amount}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="category">
                                                {element.category}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="type">
                                                {element.occuranceType}
                                            </div>
                                        </td>

                                        {/*<td>*/}
                                        {/*    <div className="recurring-type">*/}
                                        {/*        {element.recurringType}*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}

                                        <td>
                                            <div
                                                className="remove-item"
                                                id={index.toString()}
                                                onClick={(e) => removeExponse(e.currentTarget.id, e)}>
                                                Remove
                                            </div>
                                        </td>
                                    </tr>
                                )
                                )}



                            </tbody>
                        </table>











                        {/*mobile*/}


                        <table className="mobile-screen">
                            <thead>
                                <tr>
                                    <td>
                                        <div className="name">
                                            <input type="text" name="name" id="name"
                                                placeholder='Name'
                                                value={name}
                                                onChange={(e) => setName(e.currentTarget.value)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="description">
                                            <input type="text" name="description" id="description"
                                                placeholder='Description'
                                                value={description}
                                                onChange={(e) => setDescription(e.currentTarget.value)} />
                                        </div>
                                    </td>

                                    <td>
                                        <div className="amount">
                                            <input type="text" name="amount" id="amount"
                                                placeholder='Amount'
                                                value={amount}
                                                onChange={(e) => setAmount(Number(e.currentTarget.value))} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                        <div className="type-category">

                                            <div
                                                onClick={showCategoryType}
                                            >{category != "" ? category : "Select Category"} <IoMdArrowDropdownCircle /> </div>

                                            <div className="dropdown-content-category" id="category_type">

                                                {categoryList.map((item: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        onClick={(e) => {
                                                            setCategory(e.currentTarget.innerText);
                                                        }}                                                    >
                                                        {item}
                                                    </div>
                                                ))}

                                                <div
                                                    className={isCategoryAddActive ? "" : "hidden"}
                                                    onClick={() => setIsCategoryAddActive(false)}>
                                                    <IoMdAddCircle />
                                                </div>

                                                <div
                                                    className={isCategoryAddActive ? "hidden" : ""}
                                                    onClick={() => setIsCategoryAddActive(true)}>
                                                    <IoIosCloseCircle />
                                                </div>
                                                <div id="addNewCategory" className={isCategoryAddActive ? "hidden" : ""}>
                                                    <input type="text" name="newCategory" id="newCategory"
                                                        placeholder="Enter Category"
                                                        value={newCategory} onChange={(e) => setNewCategory(e.currentTarget.value)} />
                                                    <span id="addCategory"
                                                        onClick={AddNewCategory}>
                                                        Add
                                                    </span>
                                                </div>


                                            </div>

                                        </div>

                                    </td>

                                    <td>
                                        <div className="type">

                                            <div
                                                onClick={showType}
                                            >{occurranceType} <IoMdArrowDropdownCircle /> </div>

                                            <div className="dropdown-content" id="type">
                                                <div
                                                    onClick={() => setOccurranceType("One Off")}>
                                                    One-off
                                                </div>
                                                <div
                                                    onClick={() => setOccurranceType("Every Month")}>
                                                    Every Month
                                                </div>
                                            </div>

                                        </div>
                                    </td>


                                    <td>
                                        <div className="add-item"
                                            onClick={addNewExpense}>
                                            Add
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>


                                {expense.map((element: expenses_data, index: number) =>
                                (
                                    <>
                                        <tr
                                            key={index}
                                            onClick={(event) => {
                                                const temp_target = (event.target as HTMLInputElement);
                                                if (temp_target) {
                                                    const temp_nextElement: HTMLElement = temp_target.parentElement.parentElement.nextElementSibling;
                                                    if (temp_nextElement) {
                                                        if (temp_nextElement.classList.contains("hidden")) {
                                                            temp_nextElement.classList.remove("hidden");
                                                        } else {
                                                            temp_nextElement.classList.add("hidden");
                                                        }
                                                    }
                                                }

                                            }}>
                                            <td>
                                                <div className="name">
                                                    {element.name}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="description">
                                                    {element.description}
                                                </div>
                                            </td>

                                            <td>
                                                <div className="amount">
                                                    {element.amount}
                                                </div>
                                            </td>


                                        </tr>
                                        <tr className="hidden">
                                            <td>
                                                <div className="category">
                                                    {element.category}
                                                </div>
                                            </td>

                                            <td>
                                                <div className="type">
                                                    {element.occuranceType}
                                                </div>
                                            </td>

                                            <td>
                                                <div
                                                    className="remove-item"
                                                    id={index.toString()}
                                                    onClick={(e) => removeExponse(e.currentTarget.id, e)}>
                                                    Remove
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                                )}

                                {recurringExpense.map((element: expenses_data, index: number) =>
                                (
                                    <>
                                        <tr
                                            key={index}
                                            onClick={(event) => {
                                                const temp_target = (event.target as HTMLInputElement);
                                                if (temp_target) {
                                                    const temp_nextElement: HTMLElement = temp_target.parentElement.parentElement.nextElementSibling;
                                                    if (temp_nextElement) {
                                                        if (temp_nextElement.classList.contains("hidden")) {
                                                            temp_nextElement.classList.remove("hidden");
                                                        } else {
                                                            temp_nextElement.classList.add("hidden");
                                                        }
                                                    }
                                                }

                                            }}>
                                            <td>
                                                <div className="name">
                                                    {element.name}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="description">
                                                    {element.description}
                                                </div>
                                            </td>

                                            <td>
                                                <div className="amount">
                                                    {element.amount}
                                                </div>
                                            </td>

                                        </tr>
                                        <tr className="hidden">
                                            <td>
                                                <div className="category">
                                                    {element.category}
                                                </div>
                                            </td>

                                            <td>
                                                <div className="type">
                                                    {element.occuranceType}
                                                </div>
                                            </td>



                                            <td>
                                                <div
                                                    className="remove-item"
                                                    id={index.toString()}
                                                    onClick={(e) => removeExponse(e.currentTarget.id, e)}>
                                                    Remove
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                                )}



                            </tbody>
                        </table>









                    </div>

                </div>
            </div>

        </>
    );
}
