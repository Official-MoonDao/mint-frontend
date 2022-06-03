import React, { useEffect, useState } from "react";
import { Contract, ethers, BigNumber } from "ethers";
import Head from "next/head";
import Image from "next/image";
import useMedia from "use-media";
import { ToastContainer, toast } from "react-toastify";
import AnimatedNumber from "@jhonnold/react-animated-number";
import numeral from "numeral";
import { MerkleTree } from "merkletreejs";

import styles from "../styles/Home.module.css";
import "react-toastify/dist/ReactToastify.css";

import whiteList from "../public/assets/json/whitelist.json";

const env = "production";
const config = {
  test: {
    chainId: 4,
    contractAddress: "0x3c0cb52a81bde105a319cda7473ae8ccd620e238",
    contractABI: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "ApprovalCallerNotOwnerNorApproved",
        type: "error",
      },
      {
        inputs: [],
        name: "ApprovalQueryForNonexistentToken",
        type: "error",
      },
      {
        inputs: [],
        name: "ApprovalToCurrentOwner",
        type: "error",
      },
      {
        inputs: [],
        name: "ApproveToCaller",
        type: "error",
      },
      {
        inputs: [],
        name: "BalanceQueryForZeroAddress",
        type: "error",
      },
      {
        inputs: [],
        name: "MintToZeroAddress",
        type: "error",
      },
      {
        inputs: [],
        name: "MintZeroQuantity",
        type: "error",
      },
      {
        inputs: [],
        name: "OwnerQueryForNonexistentToken",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferCallerNotOwnerNorApproved",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferFromIncorrectOwner",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferToNonERC721ReceiverImplementer",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferToZeroAddress",
        type: "error",
      },
      {
        inputs: [],
        name: "URIQueryForNonexistentToken",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleGranted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleRevoked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [],
        name: "OPERATOR_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "_merkleRoot",
            type: "bytes32",
          },
        ],
        name: "addMerkleRoot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "addOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32[]",
            name: "merkleProof",
            type: "bytes32[]",
          },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "claimedCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getApproved",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "hasRole",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "isApprovedForAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_address",
            type: "address",
          },
        ],
        name: "isClaimed",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "isOperator",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32[]",
            name: "merkleProof",
            type: "bytes32[]",
          },
        ],
        name: "isWhitelist",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "merkleRoot",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "revokeOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "_data",
            type: "bytes",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
        ],
        name: "setImage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "switch_",
            type: "uint256",
          },
        ],
        name: "setSwitch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    etherscanUrl: "https://rinkeby.etherscan.io/address/",
    openseaUrl: "https://testnets.opensea.io/collection/ticket-to-space-nft",
  },
  production: {
    chainId: 1,
    contractAddress: "0x3c0cb52a81bde105a319cda7473ae8ccd620e238",
    contractABI: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "ApprovalCallerNotOwnerNorApproved",
        type: "error",
      },
      {
        inputs: [],
        name: "ApprovalQueryForNonexistentToken",
        type: "error",
      },
      {
        inputs: [],
        name: "ApprovalToCurrentOwner",
        type: "error",
      },
      {
        inputs: [],
        name: "ApproveToCaller",
        type: "error",
      },
      {
        inputs: [],
        name: "BalanceQueryForZeroAddress",
        type: "error",
      },
      {
        inputs: [],
        name: "MintToZeroAddress",
        type: "error",
      },
      {
        inputs: [],
        name: "MintZeroQuantity",
        type: "error",
      },
      {
        inputs: [],
        name: "OwnerQueryForNonexistentToken",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferCallerNotOwnerNorApproved",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferFromIncorrectOwner",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferToNonERC721ReceiverImplementer",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferToZeroAddress",
        type: "error",
      },
      {
        inputs: [],
        name: "URIQueryForNonexistentToken",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleGranted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "RoleRevoked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [],
        name: "OPERATOR_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "_merkleRoot",
            type: "bytes32",
          },
        ],
        name: "addMerkleRoot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "addOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32[]",
            name: "merkleProof",
            type: "bytes32[]",
          },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "claimedCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getApproved",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "role",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "hasRole",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "isApprovedForAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_address",
            type: "address",
          },
        ],
        name: "isClaimed",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "isOperator",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32[]",
            name: "merkleProof",
            type: "bytes32[]",
          },
        ],
        name: "isWhitelist",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "merkleRoot",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "revokeOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "_data",
            type: "bytes",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
        ],
        name: "setImage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "switch_",
            type: "uint256",
          },
        ],
        name: "setSwitch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    etherscanUrl: "https://etherscan.io/address/",
    openseaUrl: "https://opensea.io/collection/ticket-to-space-nft",
  },
};

const formatAddress = (address, subLength) => {
  if (!address || address.length < 20 || subLength === address?.length) {
    return address;
  }
  const length = address.length;
  return `${address.slice(0, Math.min(subLength || 5, length))}...${address.slice(length - Math.min(subLength || 5, length), length)}`;
};

const gasOptions = (gas) => {
  const multiplied = Math.floor(gas.toNumber() * 2);
  return BigNumber.from(multiplied);
};

export default function Home() {
  const isMobile = useMedia({ maxWidth: "1024px" });

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [userClaimed, setUserClaimed] = useState(false);
  const [claimedCount, setClaimedCount] = useState(0);

  const connectWallet = async () => {
    if (window.ethereum) {
      const { chainId } = window.ethereum;
      if (Number(chainId) !== config[env].chainId) {
        await switchNetwork(config[env].chainId);
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAccount = await signer.getAddress();
      setAccount(userAccount);
      return provider;
    }
  };

  const switchNetwork = async (targetChainId) => {
    if (targetChainId === 4) {
      window?.ethereum
        ?.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x4",
            },
          ],
        })
        .then(() => {});
    } else {
      window?.ethereum
        ?.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x1",
            },
          ],
        })
        .then(() => {});
    }
  };

  const handleMint = async () => {
    try {
      setLoading(true);
      const { keccak256 } = ethers.utils;
      const leaves = whiteList.map((account) => keccak256(account));
      const tree = new MerkleTree(leaves, keccak256, { sort: true });
      // const merkleRoot = tree.getHexRoot();
      // console.debug(`merkleroot: ${merkleRoot}`);
      const merkleProof = tree.getHexProof(keccak256(account));
      const provider = await connectWallet();
      const signer = provider.getSigner();
      const MoonNFTContract = new Contract(config[env].contractAddress, config[env].contractABI, signer);
      console.debug("MoonNFTContract", MoonNFTContract);
      const estimateGas = await MoonNFTContract.estimateGas.claim(merkleProof);
      const result = await MoonNFTContract.claim(merkleProof, {
        gasLimit: gasOptions(estimateGas),
      });
      await result.wait();
      setLoading(false);
      setComplete(true);
      toast.success("Mint Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (e) {
      console.error("Error to mint", e);
      setLoading(false);
      if (e.message.includes("error:10000")) {
        toast.error("You're not on the whitelist!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (e.message.includes("error:10001")) {
        toast.error("You have already minted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        //  "execution reverted: error:10002 switch off"
      } else if (e.code === 4001) {
        toast.error("User denied!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Unkown Error!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const fetchMintedCount = async () => {
    const provider = await connectWallet();
    const signer = provider.getSigner();
    const MoonNFTContract = new Contract(config[env].contractAddress, config[env].contractABI, signer);
    const claimedCount = await MoonNFTContract.claimedCount();
    setClaimedCount(claimedCount.toNumber());
  };

  const fetchUserHasMinted = async () => {
    const provider = await connectWallet();
    const signer = provider.getSigner();
    const MoonNFTContract = new Contract(config[env].contractAddress, config[env].contractABI, signer);
    const userAccount = await signer.getAddress();
    const userIsClaimed = await MoonNFTContract.isClaimed(userAccount);
    setUserClaimed(userIsClaimed);
  };
  useEffect(() => {
    try {
      fetchMintedCount();
      fetchUserHasMinted();
    } catch (e) {
      console.error("e", e);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (account) {
      window.ethereum.on("networkChanged", function (chainId) {
        if (document.visibilityState === "visible") {
          window.location.reload();
        }
      });

      window.ethereum.on("chainChanged", function () {
        if (document.visibilityState === "visible") {
          window.location.reload();
        }
      });

      window.ethereum.on("accountsChanged", function (chainId) {
        if (document.visibilityState === "visible") {
          window.location.reload();
        }
      });
    }
  }, [account]);

  if (isMobile) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Moon</title>
        </Head>
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <video class='${styles.video}' autoplay loop muted playsinline>
              <source src='assets/video/h5.mp4' type="video/mp4" />
            </video>
          `,
          }}
        />
        <main className={styles.mainH5}>
          <div className={styles.headerH5}>
            <div className={styles.logo}>
              <a href="https://moondao.com">
                <Image src="/assets/img/logo.png" alt="Logo" layout="fill" />
              </a>
            </div>
            {account ? (
              <div className={styles.connected} onClick={() => window.open(`${config[env].etherscanUrl}${account}#tokentxnsErc721`)}>
                <div>
                  <Image src="/assets/img/icon-wallet.png" alt="wallet" layout="fill" />
                </div>
                <span>{formatAddress(account)}</span>
              </div>
            ) : (
              <div className={styles.connect} onClick={() => connectWallet()}>
                CONNECT WALLET
              </div>
            )}
          </div>
          <div className={styles.contentH5}>
            <div className={styles.title}>To The</div>
            <div className={styles.contentSubtitle}>MOON</div>
            <p className={styles.tips}>Mint for a chance to go to space</p>
            <p className={styles.smtips}>MINT NOW – Read the
              <a className={styles.register} href="https://moondao.com/docs/nft-owner-agreement"> Terms and Conditions</a>
            </p>
          </div>
          <div className={styles.form}>
            <div className={styles.mintTitle}>TICKET TO SPACE</div>
            <div className={styles.mintSubTitle}>Enter for a chance to go to space with our Ticket to Space NFT</div>
            <div className={styles.mintWhitelist}>
              Not on the whitelist? <a className={styles.register} href="https://app.verisoul.xyz/moondao">Register Here</a>
            </div>
            <div className={styles.mintForm}>
              <div className={styles.mint}>
                <div className={styles.videoContainer}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `
                    <video class='${styles.mintVideo}' autoplay loop muted playsinline>
                      <source src="assets/video/nft.mp4" type="video/mp4" />
                    </video>
                  `,
                    }}
                  />
                  <div className={styles.ticket}>
                    <span className={styles.ticketTitle}>TICKET TO SPACE</span>
                    <div className={styles.opensea} onClick={() => window.open(config[env].openseaUrl)}>
                      <div>
                        <Image src="/assets/img/icon-opensea.svg" alt="opensea" layout="fill" />
                      </div>
                      <span>Opensea</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.input}>
                <input value={1} readOnly />
                <span>
                  <AnimatedNumber
                    key="claimed"
                    component="text"
                    number={claimedCount}
                    style={{
                      transition: "0.8s ease-out",
                      transitionProperty: "background-color, color, opacity",
                      transitionDelay: "3s",
                    }}
                    duration={300}
                    format={(n) => numeral(n).format("(0)")}
                  />
                  /
                  <AnimatedNumber
                    key="total"
                    component="text"
                    number={9060}
                    style={{
                      transition: "0.8s ease-out",
                      transitionProperty: "background-color, color, opacity",
                      transitionDelay: "3s",
                    }}
                    duration={300}
                    format={(n) => numeral(n).format("(0)")}
                  />
                </span>
              </div>
              <div
                className={complete || userClaimed ? styles.complete : loading ? styles.mintingBtn : styles.mintBtn}
                onClick={() => {
                  if (!loading && !complete && !userClaimed) {
                    handleMint();
                  }
                }}
              >
                {complete || userClaimed ? "COMPLETED" : loading ? "MINTING..." : "MINT"}
              </div>
              <div className={styles.termsAndConditions}>
                Please read the <a className={styles.register} href="https://moondao.com/docs/ticket-to-space-sweepstakes-rules">Terms and Conditions</a>
              </div>
              <div className={styles.desc}>
                <div className={styles.descTitle}>
                  Sending a lucky winner to space in <span style={{ color: "#0AFFE2" }}>2022</span>
                </div>
                <div className={styles.descTips}>
                  MoonDAO's Ticket to Space NFT collection has 9060 digital tickets that give you a chance of flying to space. MoonDAO has purchased tickets to space with Blue origin, and will select one astronaut through a public sweepstakes drawing. You could be that lucky winner that flies!
                </div>
                <div className={styles.descTips}>
                  <p className={styles.disclaimerTitle}>Disclaimer for sweepstakes</p>
                  NO PURCHASE OF A TICKET TO SPACE NFT IS NECESSARY TO ENTER THE SWEEPSTAKES OR WIN A
                  CHANCE TO FLY TO SPACE.  PURCHASE OF A TICKET TO SPACE NFT WILL NOT INCREASE YOUR ODDS OF
                  WINNING A PRIZE. Sweepstakes are open only to individuals who are 18 years of age or older, or the age
                  of majority if greater than 18 in their respective jurisdictions. Sweepstakes is void in Florida, New York,
                  Puerto Rico and where otherwise prohibited by law. Alternate prize winners are responsible for taxes
                  associated with the prizes. Odds of winning depend on the number of entries received during the
                  contest period, but can be calculated by dividing the number of prizes by the total number of entries
                  received. Sponsor: LuckDAO Limited d/b/a MoonDAO. Contest ends on June 4, 2022.
                  * For Alternative Method of Entry, click here.
                </div>
                <div className={styles.descTipsSecurities}>
                  <p className={styles.disclaimerTitle}>Disclaimer for securities</p>
                  MoonDAO NFTS are not meant to be investment vehicles. We make absolutely no promise or guarantee that
                  MoonDAO NFTs will increase in value or maintain the same value as their purchase price. No element of
                  MoonDAO NFTs qualifies or is intended to be an offering of securities in any jurisdiction, nor does it constitute
                  an offer or an invitation to purchase shares, securities or other financial products. NFTs, cryptocurrencies and
                  blockchain technology are relatively new technologies and the regulatory landscape is unsettled. New
                  regulations applicable to these technologies could negatively impact the value of your MoonDAO NFTs.
                </div>
              </div>
            </div>
          </div>
          <div className={styles.socials}>
            <div onClick={() => window.open("https://twitter.com/OfficialMoonDAO")}>
              <Image src="/assets/img/icon-social-twitter.png" alt="twitter" layout="fill" />
            </div>
            <div onClick={() => window.open("https://discord.com/invite/5nAu7K9aES")}>
              <Image src="/assets/img/icon-social-discord.png" alt="discord" layout="fill" />
            </div>
            <div onClick={() => window.open("https://github.com/Official-MoonDao")}>
              <Image src="/assets/img/icon-social-github.png" alt="github" layout="fill" />
            </div>
          </div>
          <div className={styles.copyright}>Copyright © 2022 MoonDAO.</div>
        </main>
        <ToastContainer />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Moon</title>
      </Head>
      <video id="bgVideo" poster="/assets/img/poster-pc.jpg" className={styles.video} autoPlay="autoplay" muted loop>
        <source src={`assets/video/pc.mp4`} type="video/mp4" />
      </video>
      <div className={styles.blur}></div>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <a href="https://moondao.com">
              <Image src="/assets/img/logo.png" alt="Logo" layout="fill" />
            </a>
          </div>
          <div className={styles.title}>To The</div>
          <div className={styles.contentSubtitle}>MOON</div>
          <p className={styles.tips}>Mint for a chance to go to space</p>
          <p className={styles.smtips}>MINT FOR FREE (ONLY GAS) – Read the
            <a className={styles.register} href="https://moondao.com/docs/ticket-to-space-sweepstakes-rules"> Terms and Conditions</a>
          </p>
          <div className={styles.socials}>
            <div onClick={() => window.open("https://twitter.com/OfficialMoonDAO")}>
              <Image src="/assets/img/icon-social-twitter.png" alt="twitter" layout="fill" />
            </div>
            <div onClick={() => window.open("https://discord.com/invite/5nAu7K9aES")}>
              <Image src="/assets/img/icon-social-discord.png" alt="discord" layout="fill" />
            </div>
            <div onClick={() => window.open("https://github.com/Official-MoonDao")}>
              <Image src="/assets/img/icon-social-github.png" alt="github" layout="fill" />
            </div>
          </div>
          <div className={styles.copyright}>Copyright © 2022 MoonDAO.</div>
        </div>
        <div className={styles.form}>
          {account ? (
            <div className={styles.connected} onClick={() => window.open(`${config[env].etherscanUrl}${account}#tokentxnsErc721`)}>
              <div>
                <Image src="/assets/img/icon-wallet.png" alt="wallet" layout="fill" />
              </div>
              <span>{formatAddress(account)}</span>
            </div>
          ) : (
            <div className={styles.connect} onClick={() => connectWallet()}>
              CONNECT WALLET
            </div>
          )}
          <div className={styles.mint}>
            <div className={styles.videoContainer}>
              <video className={styles.mintVideo} autoPlay="autoplay" muted loop id="mintVideo">
                <source src="assets/video/nft.mp4" type="video/mp4" />
              </video>
              <div className={styles.ticket}>
                <span className={styles.ticketTitle}>TICKET TO SPACE</span>
                <div className={styles.opensea} onClick={() => window.open(config[env.openseaUrl])}>
                  <div>
                    <Image src="/assets/img/icon-opensea.svg" alt="opensea" layout="fill" />
                  </div>
                  <span>Opensea</span>
                </div>
              </div>
            </div>
            <div className={styles.mintForm}>
              <div className={styles.mintTitle}>TICKET TO SPACE</div>
              <div className={styles.mintSubTitle}>Enter for a chance to go to space with our Ticket to Space NFT</div>
              <div className={styles.mintWhitelist}>
                Not on the whitelist? <a className={styles.register} href="https://app.verisoul.xyz/moondao">Register Here</a>
              </div>
              <div className={styles.input}>
                <input value={1} readOnly />
                <span>
                  <AnimatedNumber
                    key="claimed"
                    component="text"
                    number={claimedCount}
                    style={{
                      transition: "0.8s ease-out",
                      transitionProperty: "background-color, color, opacity",
                      transitionDelay: "3s",
                    }}
                    duration={300}
                    format={(n) => numeral(n).format("(0)")}
                  />
                  /
                  <AnimatedNumber
                    key="total"
                    component="text"
                    number={9060}
                    style={{
                      transition: "0.8s ease-out",
                      transitionProperty: "background-color, color, opacity",
                      transitionDelay: "3s",
                    }}
                    duration={300}
                    format={(n) => numeral(n).format("(0)")}
                  />
                </span>
              </div>
              <div
                className={complete || userClaimed ? styles.complete : loading ? styles.mintingBtn : styles.mintBtn}
                onClick={() => {
                  if (!loading && !complete && !userClaimed) {
                    handleMint();
                  }
                }}
              >
                {complete || userClaimed ? "COMPLETED" : loading ? "MINTING..." : "MINT"}
              </div>
              <div className={styles.termsAndConditions}>
                Please read the <a className={styles.register} href="https://moondao.com/docs/nft-owner-agreement">Terms and Conditions</a>
              </div>
              {/* <p className={styles.error}>{error}</p> */}
              <div className={styles.nftDesc}>
                <Image src="/assets/img/nft-desc.png" alt="github" layout="fill" />
              </div>
            </div>
          </div>
          <div className={styles.desc}>
            <div className={styles.descTitle}>
              We are sending lucky NFT holders to space in <span style={{ color: "#0AFFE2" }}>2022</span>
            </div>
          </div>
          <div className={styles.descTips}>
            MoonDAO's Ticket to Space NFT collection has 9060 digital tickets that give you a chance of flying to space. MoonDAO has purchased tickets to space with Blue origin, and will select one winner through a public sweepstakes drawing. You could be that lucky winner that flies!
          </div>
          <div className={styles.descTips}>
            <p className={styles.disclaimerTitle}>Disclaimer for sweepstakes</p>
            NO PURCHASE OF A TICKET TO SPACE NFT IS NECESSARY TO ENTER THE SWEEPSTAKES OR WIN A
            CHANCE TO FLY TO SPACE.  PURCHASE OF A TICKET TO SPACE NFT WILL NOT INCREASE YOUR ODDS OF
            WINNING A PRIZE. Sweepstakes are open only to individuals who are 18 years of age or older, or the age
            of majority if greater than 18 in their respective jurisdictions. Sweepstakes is void in Florida, New York,
            Puerto Rico and where otherwise prohibited by law. Alternate prize winners are responsible for taxes
            associated with the prizes. Odds of winning depend on the number of entries received during the
            contest period, but can be calculated by dividing the number of prizes by the total number of entries
            received. Sponsor: LuckDAO Limited d/b/a MoonDAO. Contest ends on June 4, 2022.
            * For Alternative Method of Entry, 
            <a className={styles.register} href="https://moondao.com/docs/ticket-to-space-sweepstakes-rules#how-to-enter"> click here</a>
          </div>
          <div className={styles.descTipsSecurities}>
            <p className={styles.disclaimerTitle}>Disclaimer for securities</p>
            MoonDAO NFTS are not meant to be investment vehicles. We make absolutely no promise or guarantee that
            MoonDAO NFTs will increase in value or maintain the same value as their purchase price. No element of
            MoonDAO NFTs qualifies or is intended to be an offering of securities in any jurisdiction, nor does it constitute
            an offer or an invitation to purchase shares, securities or other financial products. NFTs, cryptocurrencies and
            blockchain technology are relatively new technologies and the regulatory landscape is unsettled. New
            regulations applicable to these technologies could negatively impact the value of your MoonDAO NFTs.
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
