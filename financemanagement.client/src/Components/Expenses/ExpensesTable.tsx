import { useState } from "react";
import { showCategoryType, showType } from './ExpensesTableFunction';
import { IoMdAddCircle, IoMdArrowDropdownCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import type { TransactionRequest, TransactionRecurringRequest } from "../../types/FinanceType";

type props = {
    categoryList: string[],
    updateCategoryList: (item: string) => void,
    addRecurringTransaction : (NewTransactionRecurring :TransactionRecurringRequest) => void,
    addTransaction : (newTransaction: TransactionRequest) => void,
    removeExponse : (index: string, event: React.MouseEvent<HTMLElement>) => void,
    removeExponseRecurring : (index: string, event: React.MouseEvent<HTMLElement>) => void,
    expense : TransactionRequest[],
    recurringExpense : TransactionRecurringRequest[],
}

export default function ExpensesTable({ categoryList, updateCategoryList , addRecurringTransaction
    , addTransaction, removeExponse, removeExponseRecurring, expense, recurringExpense}: props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [isCategoryAddActive, setIsCategoryAddActive] = useState(false);
    const [occurranceType, setOccurranceType] = useState("Occurance Type");
    const [newCategory, setNewCategory] = useState("");

    function AddNewCategory() {
        if (newCategory == "") {
            console.log("Category cannot be empty");
            return;
        }
        updateCategoryList(newCategory);
        setNewCategory("");
    }

    function addNewExpense() {

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
            temp_recurring = "";
        }
        const newData: TransactionRequest = {
            Id: -1,
            Name: name,
            Description: description,
            Amount: amount,
            Category: category,
            Month: month.toString(),
            Year: year.toString(),
            UserId: -1,
        }
        if (occurranceType.toLowerCase() == "one off") {
            addTransaction(newData);

        } else {
            const NewTransactionRecurring: TransactionRecurringRequest = {
                Id: -1,
                Name: name,
                Description: description,
                Amount: amount,
                Category: category,
                UserId: -1,
            }
            addRecurringTransaction(NewTransactionRecurring);
        }
        setName(""); setDescription(""); setAmount(0); setCategory("");
    }



    return (
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
                                className="categoryBox"
                            > <span className="categoryText">{category != "" ? category : "Select Category"}</span> <span><IoMdArrowDropdownCircle /></span>  </div>

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
                                    <div id="addCategory"
                                        onClick={AddNewCategory}>
                                        Add
                                    </div>
                                </div>


                            </div>

                        </div>

                    </td>

                    <td>
                        <div className="type">

                            <div
                                onClick={showType}
                                className="occuranceBox"
                            ><span className="occuranceText">{occurranceType} </span><span><IoMdArrowDropdownCircle /></span> </div>

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


                    <td>
                        <div className="add-item"
                            onClick={addNewExpense}>
                            Add
                        </div>
                    </td>
                </tr>
            </thead>
            <tbody>


                {expense.map((element: TransactionRequest, index: number) =>
                (
                    <tr
                        key={index}>
                        <td>
                            <div className="name">
                                {element.Name}
                            </div>
                        </td>
                        <td>
                            <div className="description">
                                {element.Description}
                            </div>
                        </td>

                        <td>
                            <div className="amount">
                                {element.Amount}
                            </div>
                        </td>

                        <td>
                            <div className="category">
                                {element.Category}
                            </div>
                        </td>

                        <td>
                            <div className="type">
                                One-Off
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
                )
                )}

                {recurringExpense.map((element: TransactionRecurringRequest, index: number) =>
                (
                    <tr
                        key={index}>
                        <td>
                            <div className="name">
                                {element.Name}
                            </div>
                        </td>
                        <td>
                            <div className="description">
                                {element.Description}
                            </div>
                        </td>

                        <td>
                            <div className="amount">
                                {element.Amount}
                            </div>
                        </td>

                        <td>
                            <div className="category">
                                {element.Category}
                            </div>
                        </td>

                        <td>
                            <div className="type">
                                Every Month
                            </div>
                        </td>


                        <td>
                            <div
                                className="remove-item"
                                id={index.toString()}
                                onClick={(e) => removeExponseRecurring(e.currentTarget.id, e)}>
                                Remove
                            </div>
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </table>
    )
}