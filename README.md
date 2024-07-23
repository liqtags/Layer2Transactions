# @liqtags/layer2transactions

Layer 2 transaction class for a Rollup on Bitcoin with EVM compatibility.  

## Methods

- decodeLayer2Transaction - ```Decodes a layer 2 transaction```
- encodeLayer2Transaction - ```Encodes a layer 2 transaction```
- transactionObjectToEthereumTransactionObject - ```Converts a transaction object to an layer 2 transaction```
- signTransaction - ```Signs a layer 2 transaction```
- verifyTransactionSign - ```Verifies the signature of a layer 2 transaction```
- remove0X - ```Removes the '0x' prefix from a hex string```
- isToEmpty - ```Checks if the 'to' field in the transaction is empty```
- sliceSomeBytes - ```Slices a specified number of bytes from the transaction```
- createTo - ```Creates the 'to' field for the transaction```
- getIndex - ```Gets the index from the transaction```
- getValue - ```Gets the value field from the transaction```
- getGas - ```Gets the gas limit from the transaction```
- getGasPrice - ```Gets the gas price from the transaction```
- getNonce - ```Gets the nonce from the transaction```
- getV - ```Gets the 'v' value from the transaction signature```
- getR - ```Gets the 'r' value from the transaction signature```
- getS - ```Gets the 's' value from the transaction signature```
- createTXObject - ```Creates a transaction object string from the given parameters```