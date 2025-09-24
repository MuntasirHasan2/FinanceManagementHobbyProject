import type { TransactionRecurringRequest, TransactionRequest } from "../../types/FinanceType";

export async function AddToTransactionDB(transactions: TransactionRequest[]) {
    const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/Transaction/AddBulk";

    try {
        const response = await fetch(url, {
            //mode: 'no-cors',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //body: formData,
            body: JSON.stringify(transactions),
        }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log("not ok");
        }
    } catch (error: any) {
        console.log("Error :", error.message);
    }
}



export async function AddToTransactionRecurringDB(transactions: TransactionRecurringRequest[]) {
    const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/Transaction/AddBulkRecurring";

    try {
        const response = await fetch(url, {
            //mode: 'no-cors',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //body: formData,
            body: JSON.stringify(transactions),
        }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log("not ok");
        }
    } catch (error: any) {
        console.log("Error :", error.message);
    }
}



export async function AddToCategoryDB(categoryList: string[]) {
    const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/Category/AddBulk";

    try {
        const response = await fetch(url, {
            //mode: 'no-cors',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //body: formData,
            body: JSON.stringify(categoryList),
        }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log("not ok");
        }
    } catch (error: any) {
        console.log("Error :", error.message);
    }
}


export async function DeleteTransactionDB(transactions: number[]) {
    const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/Transaction/BulkDelete";

    try {
        const response = await fetch(url, {
            //mode: 'no-cors',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //body: formData,
            body: JSON.stringify(transactions),
        }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log("not ok");
        }
    } catch (error: any) {
        console.log("Error :", error.message);
    }
}

export async function DeleteTransactionRecurringDB(transactions: number[]) {
    const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/Transaction/BulkRecurringDelete";

    try {
        const response = await fetch(url, {
            //mode: 'no-cors',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //body: formData,
            body: JSON.stringify(transactions),
        }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log("not ok");
        }
    } catch (error: any) {
        console.log("Error :", error.message);
    }
}

export async function GetCategoryDB(userId: number) {
    const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/Category/GetCategory";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userId),
        }
        );

        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log("Error :", error.message);
        return null;
    }
}

export async function fetchUserDataDB(userIdToCheck: number) {

    const url: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/Transaction/GetTransaction";

    if (userIdToCheck == -1) {
        return [null,null];
    }
    let transactionList: TransactionRequest[] = [];

    try {
        const response = await fetch(url, {
            //mode: 'no-cors',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //body: formData,
            body: JSON.stringify(userIdToCheck),
        }
        );
        //const data = response.json();
        if (response.ok) {
            const data = await response.json();
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
                    UserId: userIdToCheck
                }
                transactionList.push(temp_transaction_obj);
            }

        } else {
            console.log("not ok");
            return transactionList
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log("Error :", error.message);
        return transactionList;

    }
    return transactionList;
}
export async function fetchUserDataRecurringDB(userIdToCheck : number){
    let transactionRecurringList: TransactionRecurringRequest[] = [];

    const url_recurring: string = "https://financemanagementbymuntasir-csa4dmeab7akbdbp.southafricanorth-01.azurewebsites.net/Transaction/GetTransactionRecurring";

    try {
        const response = await fetch(url_recurring, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userIdToCheck),
        }
        );
        if (response.ok) {
            const response_data = await response.json();

            for (let i = 0; i < response_data.length; i++) {

                const transaction_id: number = response_data[i].transactionId;
                const transaction_name: string = response_data[i].name;
                const transaction_category: string = response_data[i].category;
                const transaction_description: string = response_data[i].description;
                const transaction_amount: number = response_data[i].amount;

                const temp_transaction_obj: TransactionRecurringRequest = {
                    Id: transaction_id,
                    Name: transaction_name,
                    Description: transaction_description,
                    Amount: transaction_amount,
                    Category: transaction_category,
                    UserId: userIdToCheck
                }

                transactionRecurringList.push(temp_transaction_obj);
            }


        } else {
            return [null, null]

        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log("Error :", error.message);
        return [null, null]

    }
    return  transactionRecurringList;
}