export type TransactionRequest = {
    Id: number;
    Name: string;
    Description: string;
    Category: string;
    Amount: number;
    Year: string;
    Month: string;
    UserId: number;
}

export type TransactionRecurringRequest = {
    Id: number;
    Name: string;
    Description: string;
    Category: string;
    Amount: number;
    UserId: number;
}