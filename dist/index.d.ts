import { Transaction } from '@ethereumjs/tx';

interface Layer2TransactionsInterface {
    decodeLayer2Transaction(transaction: string, currentAddressDB: any): Promise<any>;
    encodeLayer2Transaction(transactionObject: any, currentLevelDB: any): Promise<any>;
    transactionObjectToEthereumTransactionObject(transactionObject: any): any;
    signTransaction(transactionObject: any, senderSecretKey: any): any;
    verifyTransactionSign(transactionObject: any): any;
}
declare class Layer2Transactions implements Layer2TransactionsInterface {
    constructor();
    /**
     * @description Decodes a layer 2 transaction
     * @param transaction
     * @param currentAddressDB
     */
    decodeLayer2Transaction(transaction: any, currentAddressDB: any): Promise<any>;
    /**
     * @description Encodes a layer 2 transaction
     * @param transactionObject
     * @param currentLevelDB
     */
    encodeLayer2Transaction(transactionObject: any, currentLevelDB: any): Promise<any>;
    /**
     * @description Converts a layer 2 transaction object to an ethereum transaction object
     * @param transactionObject
     * @returns
     */
    transactionObjectToEthereumTransactionObject(transactionObject: any): Transaction;
    /**
     * @description Signs a layer 2 transaction
     * @param transactionObject
     * @param senderSecretKey
     * @returns
     */
    signTransaction(transactionObject: any, senderSecretKey: any): any;
    /**
     * @description Verifies the signature of a layer 2 transaction
     * @param transactionObject
    */
    verifyTransactionSign(transactionObject: any): boolean;
    /**
     * @description
     * @param value
     * @returns
     */
    remove0X(value: string | any[]): string | any[];
    isToEmpty(transaction: string): number;
    sliceSomeBytes(transaction: string | any[], num: number): string | any[];
    createTo(transaction: string | any[]): string | any[];
    getIndex(transaction: string): string;
    getValue(transaction: string): bigint;
    getGas(transaction: string): number;
    getGasPrice(transaction: string): number;
    getNonce(transaction: string): number;
    getV(transaction: string): number;
    getR(transaction: string): bigint;
    getS(transaction: string): bigint;
    createTXObject(transactionObject: any, currentLevelDB: any, to: any, calldata: any): string;
}

export { Layer2Transactions };
