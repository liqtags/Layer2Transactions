import { Layer2Transactions } from "..";
import leveldb from "@liqtags/leveldb";

/**
 * @TODO: Write tests for the Layer2Transactions class
 */

describe("Layer2Transactions", () => {
  let layer2Transactions;
  let mockDB;

  beforeEach(() => {
    layer2Transactions = new Layer2Transactions();
    mockDB = new leveldb();
  });

  describe("decodeLayer2Transaction", () => {
    it("should decode a valid transaction string correctly", async () => {
      expect(0).toBe(0);

    });

    it("should throw an error for invalid transaction string", async () => {
      expect(0).toBe(0);
    });
  });

  describe("encodeLayer2Transaction", () => {
    it("should encode a transaction object correctly", async () => {
      expect(0).toBe(0);
    });
  });

  describe("transactionObjectToEthereumTransactionObject", () => {
    it("should convert to Ethereum transaction object correctly", () => {
      expect(0).toBe(0);
    });
  });

  describe("signTransaction", () => {
    it("should sign the transaction correctly", () => {
      expect(0).toBe(0);
    });
  });

  describe("verifyTransactionSign", () => {
    it("should verify the signature correctly", () => {
      expect(0).toBe(0);
    });

    it("should return false for tampered transaction", () => {
      expect(0).toBe(0);
    });
  });
});