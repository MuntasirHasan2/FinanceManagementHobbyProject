import { useState } from "react";
import { IoMdArrowDropdownCircle, IoMdAddCircle, IoIosCloseCircle } from "react-icons/io";
import type { TransactionRequest, TransactionRecurringRequest } from "../../types/FinanceType";
import { showCategoryTypeMobile, showTypeMobile } from "./ExpensesTableFunction";

type props = {
    categoryList: string[],
    updateCategoryList: (item: string) => void,
    addRecurringTransaction : (NewTransactionRecurring :TransactionRecurringRequest) => void,
    addTransaction : (newTransaction: TransactionRequest) => void,
    removeExponseMobile : (index: string, event: React.MouseEvent<HTMLElement>) => void, 
    removeExponseMobileRecurring : (index: string, event: React.MouseEvent<HTMLElement>) => void,
    expense : TransactionRequest[],
    recurringExpense : TransactionRecurringRequest[],
}

export default function ExpensesTableMobile({categoryList, updateCategoryList, addRecurringTransaction, addTransaction
    , removeExponseMobile, removeExponseMobileRecurring, expense, recurringExpense} :  props) {
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [amount, setAmount] = useState(0);
        const [category, setCategory] = useState("");
        const [month, setMonth] = useState(0);
        const [year, setYear] = useState(0);
        const [isCategoryAddActive, setIsCategoryAddActive] = useState(false);
        const [occurranceType, setOccurranceType] = useState("Occurance Type");
        const [newCategory, setNewCategory] = useState("");

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


    function AddNewCategory() {
        if (newCategory == "") {
            console.log("Category cannot be empty");
            return;
        }
        updateCategoryList(newCategory);
        setNewCategory("");
    }
    return (
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
                                onClick={showCategoryTypeMobile}
                            >{category != "" ? category : "Select Category"} <IoMdArrowDropdownCircle /> </div>

                            <div className="dropdown-content-category" id="category_type_mobile">

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
                                onClick={showTypeMobile}
                            >{occurranceType} <IoMdArrowDropdownCircle /> </div>

                            <div className="dropdown-content" id="type-mobile">
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


                {expense.map((element: TransactionRequest, index: number) =>
                (
                    <>
                        <tr
                            key={index}
                            onClick={(event: React.MouseEvent<HTMLTableRowElement>) => {
                                const row = event.currentTarget; // HTMLTableRowElement � never null
                                const nextRow = row.nextElementSibling as HTMLElement | null;

                                if (nextRow) nextRow.classList.toggle('hidden');
                            }}
                        >
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


                        </tr>
                        <tr className="hidden">
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
                                    onClick={(e) => removeExponseMobile(e.currentTarget.id, e)}>
                                    Remove
                                </div>
                            </td>
                        </tr>
                    </>
                )
                )}

                {recurringExpense.map((element: TransactionRecurringRequest, index: number) =>
                (
                    <>
                        <tr
                            key={index}
                            onClick={(event: React.MouseEvent<HTMLTableRowElement>) => {
                                const row = event.currentTarget; // HTMLTableRowElement � never null
                                const nextRow = row.nextElementSibling as HTMLElement | null;

                                if (nextRow) nextRow.classList.toggle('hidden');
                            }}
                        >
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

                        </tr>
                        <tr className="hidden">
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
                                    onClick={(e) => removeExponseMobileRecurring(e.currentTarget.id, e)}>
                                    Remove
                                </div>
                            </td>
                        </tr>
                    </>
                )
                )}
            </tbody>
        </table>
    )
}

