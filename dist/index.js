var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Layer2Transactions: () => Layer2Transactions
});
module.exports = __toCommonJS(src_exports);
var import_util = require("@ethereumjs/util");
var import_tx = require("@ethereumjs/tx");
var Layer2Transactions = class {
  constructor() {
  }
  /**
   * @description Decodes a layer 2 transaction
   * @param transaction 
   * @param currentAddressDB 
   */
  async decodeLayer2Transaction(transaction, currentAddressDB) {
    try {
      transaction = this.remove0X(transaction);
      let transactionObject = { sig: {} };
      transactionObject.isToEmpty = this.isToEmpty(transaction);
      transaction = this.sliceSomeBytes(transaction, 1);
      if (transactionObject.isToEmpty === 0) {
        transactionObject.to = this.createTo(transaction);
        transaction = this.sliceSomeBytes(transaction, 40);
      }
      if (transactionObject.isToEmpty === 2) {
        const index = this.getIndex(transaction);
        transactionObject.to = await currentAddressDB.get(index);
        transaction = this.sliceSomeBytes(transaction, 8);
      }
      transactionObject.value = this.getValue(transaction);
      transaction = this.sliceSomeBytes(transaction, 22);
      transactionObject.gas = this.getGas(transaction);
      transaction = this.sliceSomeBytes(transaction, 1);
      transactionObject.gasPrice = this.getGasPrice(transaction);
      transaction = this.sliceSomeBytes(transaction, 1);
      transactionObject.nonce = this.getNonce(transaction);
      transaction = this.sliceSomeBytes(transaction, 6);
      transactionObject.sig.r = this.getR(transaction);
      transaction = this.sliceSomeBytes(transaction, 64);
      transactionObject.sig.s = this.getS(transaction);
      transaction = this.sliceSomeBytes(transaction, 64);
      transactionObject.sig.v = this.getV(transaction);
      transaction = this.sliceSomeBytes(transaction, 2);
      transactionObject.data = transaction;
    } catch (error) {
      throw new Error("Invalid transaction format.");
    }
  }
  /**
   * @description Encodes a layer 2 transaction
   * @param transactionObject 
   * @param currentLevelDB 
   */
  async encodeLayer2Transaction(transactionObject, currentLevelDB) {
    let calldata = transactionObject.data.toString(16);
    let to;
    switch (transactionObject.isToEmpty) {
      case 0:
        to = transactionObject.to;
        break;
      case 1:
        to = "";
        break;
      case 2:
        to = parseInt(await currentLevelDB.get(transactionObject.to)).toString(16).padStart(8, "0");
    }
    const tx = this.createTXObject(transactionObject, currentLevelDB, to, calldata);
    return "0x" + tx;
  }
  /**
   * @description Converts a layer 2 transaction object to an ethereum transaction object
   * @param transactionObject 
   * @returns 
   */
  transactionObjectToEthereumTransactionObject(transactionObject) {
    return import_tx.Transaction.fromTxData({
      to: transactionObject.isToEmpty === 0 ? new import_util.Address(Buffer.from(transactionObject.to, "hex")) : void 0,
      value: transactionObject.value,
      gasPrice: transactionObject.gasPrice,
      nonce: transactionObject.nonce,
      v: transactionObject.sig.v,
      r: transactionObject.sig.r,
      s: transactionObject.sig.s,
      data: transactionObject.data !== "" ? "0x" + transactionObject.data : "",
      gasLimit: transactionObject.gas
    });
  }
  /**
   * @description Signs a layer 2 transaction
   * @param transactionObject 
   * @param senderSecretKey 
   * @returns 
   */
  signTransaction(transactionObject, senderSecretKey) {
    const ethTx = import_tx.Transaction.fromTxData({
      to: transactionObject.isToEmpty === 0 ? new import_util.Address(Buffer.from(transactionObject.to, "hex")) : void 0,
      value: transactionObject.value,
      gasPrice: transactionObject.gasPrice,
      nonce: transactionObject.nonce,
      data: transactionObject.data !== "" ? "0x" + transactionObject.data : "",
      gasLimit: transactionObject.gas
    }).sign(senderSecretKey);
    transactionObject.sig = { v: ethTx.v, r: ethTx.r, s: ethTx.s };
    return transactionObject;
  }
  /**
   * @description Verifies the signature of a layer 2 transaction
   * @param transactionObject 
  */
  verifyTransactionSign(transactionObject) {
    return this.transactionObjectToEthereumTransactionObject(transactionObject).verifySignature();
  }
  /**
   * @description
   * @param value 
   * @returns 
   */
  remove0X(value) {
    return value.slice(2);
  }
  isToEmpty(transaction) {
    return parseInt(transaction.slice(0, 1), 16);
  }
  sliceSomeBytes(transaction, num) {
    return transaction.slice(num);
  }
  createTo(transaction) {
    return transaction.slice(0, 40);
  }
  getIndex(transaction) {
    return parseInt(transaction.slice(0, 8), 16).toString();
  }
  getValue(transaction) {
    return BigInt("0x" + transaction.slice(0, 22));
  }
  getGas(transaction) {
    return 2 ** (parseInt("0x" + transaction.slice(0, 1)) + 9);
  }
  getGasPrice(transaction) {
    return 2 ** (parseInt("0x" + transaction.slice(0, 1)) + 25);
  }
  getNonce(transaction) {
    return parseInt("0x" + transaction.slice(0, 6));
  }
  getV(transaction) {
    return parseInt("0x" + transaction.slice(0, 2));
  }
  getR(transaction) {
    return BigInt("0x" + transaction.slice(0, 64));
  }
  getS(transaction) {
    return BigInt("0x" + transaction.slice(0, 64));
  }
  createTXObject(transactionObject, currentLevelDB, to, calldata) {
    return transactionObject.isToEmpty.toString(16) + to + transactionObject.value.toString(16).padStart(22, "0") + Math.round(Math.log(transactionObject.gas) / Math.log(2) - 9).toString(16) + Math.round(Math.log(transactionObject.gasPrice) / Math.log(2) - 25).toString(16) + transactionObject.nonce.toString(16).padStart(6, "0") + transactionObject.sig.r.toString(16).padStart(64, "0") + transactionObject.sig.s.toString(16).padStart(64, "0") + transactionObject.sig.v.toString(16).padStart(2, "0") + calldata;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Layer2Transactions
});
