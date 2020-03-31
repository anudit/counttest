const counterABI=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "int256",
				"name": "cnt",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "counterDecremented",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "int256",
				"name": "cnt",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "counterIncremented",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "decrementCounter",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "incrementCounter",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCount",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const counterAddress="0x65CAEC30a86135c1dce58f8d4b469E67F87692c2";

CounterContract = undefined;
Counter = undefined;
let biconomy;

window.addEventListener('load', async () => {

    if (window.ethereum) {

		if (window.Biconomy) {
				let Biconomy = window.Biconomy;
				let options = {
					dappId: '5e82adf8b3b82b3bc156ca6d',
					apiKey: 'vjjhn-o_d.6932dc53-cd88-4094-aa3f-8988e6ee724e',
					strictMode: false,
					debug: true
				};
				biconomy = new Biconomy(window.ethereum, options);
				console.log(biconomy);
				console.log(biconomy.isConnected());
				web3 = new Web3(biconomy);
		}

		biconomy.onEvent(biconomy.READY, async () => {
			ethereum.enable();
			await biconomyLogin();

			web3.version.getNetwork((err, netId) => {
				if(netId != 15001){
					alert("Please switch to Matic Testnetv3");
				}
			});
			CounterContract = web3.eth.contract(counterABI);
			Counter = CounterContract.at(counterAddress);

		}).onEvent(biconomy.ERROR, (error, message) => {
			console.log("Mexa Error", error);
		});

    } else{
        alert("Get MetaMask");
	}

});

async function biconomyLogin(){

	let promise = new Promise(async (res, rej) => {

		try{
			let response = await biconomy.login('0x707aC3937A9B31C225D8C240F5917Be97cab9F20');
			if(response && response.transactionHash) {
				console.log("New User");
				res(true);
			} else if (response && response.userContract) {
			   console.log("Existing User Contract: " + response.userContract);
			   res(true);
			}

			biconomy.onEvent(biconomy.LOGIN_CONFIRMATION, (log) => {
				// User's Contract Wallet creation successful
				console.log(`User contract wallet address: ${log.userContract}`);
			});

		 } catch(error) {
			console.log(`Error Code: ${error.code} Error Message: ${error.message}`);
			rej(false);
		 }

    });
	let result = await promise;
    console.log(result);
    return result;


}

async function incrementCounter() {

    let promise = new Promise(async (res, rej) => {

		Counter.incrementCounter(function(error, result) {
			if (!error)
				res(result);
			else{
				rej(error);
			}
		});

    });
	let result = await promise;
    console.log(result);
    return result;
}

async function getCount() {

    let promise = new Promise(async (res, rej) => {

		Counter.getCount(function(error, result) {
			if (!error)
				res(result);
			else{
				rej(error);
			}
		});

    });
	let result = await promise;
    console.log(result);
    return result;
}
