"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	prevHash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	console.log("\n\nRetreiving Block Data...")
	createBlock(line)
}

// Create a function called createBlock()
function createBlock(_data) {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: _data,
		timestamp: Date.now()
	}
	block.hash = blockHash(block)

	// verify block before adding to chain
	console.log("Verifying block...")
	console.log("Block Details: ", block)
	if(verifyBlock(block)) {

		console.log(`Block is valid: ${verifyBlock(block)}`)
		console.log("\nAdding Block...")

		// once verified add to the chain
		Blockchain.blocks.push(block)
		console.log("Block added to Blockchain")

		// once block added confirm blockchain is valid
		console.log("\nVerifying Blockchain....")
		if(verifyChain(block.index)) {
			console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);
		} else {
			// error handling
		}

	} else {
		// error handling
		console.log(`Block is valid: ${verifyBlock(block)}`);
		console.log(block)
	}
	return block
}

// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		`${bl.index};${bl.prevHash};${bl.data};${bl.timestamp};`
	).digest("hex");
}

function verifyChain(_index) {

	if (Blockchain.blocks[0]) {
		return true
	} else if (Blockchain.blocks[_index].prevHash == Blockchain.blocks[_index - 1].hash) {
		return true
	}
}

function verifyBlock(block) {
	if(block.data != '' && block.prevHash != '' && block.index >= 0) {
		if(block.hash == blockHash(block)) {
			return true
		}
	}
}