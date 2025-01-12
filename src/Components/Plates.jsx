import React from "react";
import hanoi from "../assets/images/icons/app-icons/hanoi.svg";
import queue from "../assets/images/icons/app-icons/queue.svg";
import stacks from "../assets/images/icons/app-icons/stacks.svg";
import tictactoe from "../assets/images/icons/app-icons/tictactoe.svg";
import binary from "../assets/images/icons/app-icons/binary.svg";
import bst from "../assets/images/icons/app-icons/bst.svg";
import sort from "../assets/images/icons/app-icons/sort.svg";

function Plates() {
  return (
    <>
      <div className="absolute mt-[-220px] flex justify-center space-x-4 z-30 gap-8 w-full">
        <a href="/stacks">
          <div className="w-52 h-80 bg-white bg-opacity-25 rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-s-white-1 hover:border-white flex items-center hover:cursor-pointer backdrop-filter backdrop-blur-lg">
            <img
              src={stacks}
              alt="stacks"
              className="w-full h-full object-contain"
            />
          </div>
        </a>
        <a href="/queue">
          <div className="w-52 h-80 bg-white bg-opacity-25 rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-s-white-1 hover:border-white flex items-center hover:cursor-pointer backdrop-filter backdrop-blur-lg">
            <img
              src={queue}
              alt="queue"
              className="w-full h-full object-contain"
            />
          </div>
        </a>
        <a href="/tic-tac-toe">
          <div className="w-52 h-80 bg-white bg-opacity-25 rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-s-white-1 hover:border-white flex items-center hover:cursor-pointer backdrop-filter backdrop-blur-lg">
            <img
              src={tictactoe}
              alt="tic-tac-toe"
              className="w-full h-full object-contain"
            />
          </div>
        </a>
        <a href="/binary-tree">
          <div className="w-52 h-80 bg-white bg-opacity-25 rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-s-white-1 hover:border-white flex items-center hover:cursor-pointer backdrop-filter backdrop-blur-lg">
            <img
              src={binary}
              alt="binary-tree"
              className="w-full h-full object-contain"
            />
          </div>
        </a>
        <a href="/bst">
          <div className="w-52 h-80 bg-white bg-opacity-25 rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-s-white-1 hover:border-white flex items-center hover:cursor-pointer backdrop-filter backdrop-blur-lg">
            <img
              src={bst}
              alt="bst"
              className="w-full h-full object-contain"
            />
          </div>
        </a>
        <a href="/towers-of-hanoi">
          <div className="w-52 h-80 bg-white bg-opacity-25 rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-s-white-1 hover:border-white flex items-center hover:cursor-pointer backdrop-filter backdrop-blur-lg">
            <img
              src={hanoi}
              alt="towers-of-hanoi"
              className="w-full h-full object-contain"
            />
          </div>
        </a>
        <a href="/sorting">
          <div className="w-52 h-80 bg-white bg-opacity-25 rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 border border-s-white-1 hover:border-white flex items-center hover:cursor-pointer backdrop-filter backdrop-blur-lg">
            <img
              src={sort}
              alt="sorting"
              className="w-full h-full object-contain"
            />
          </div>
        </a>
      </div>
    </>
  );
}

export default Plates;