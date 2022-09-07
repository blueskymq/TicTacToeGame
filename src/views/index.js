import React, { useState } from 'react';
import './game.css';

const NUM = 9;
const EMPTY = 'empty';
const CROSS = 'cross';
const CIRCLE = 'circle';

function Game() {
    const [initState, turnOnState] = useState({
        player: CIRCLE,
        positions: new Array(NUM).fill(EMPTY),
        winner: null
    });

    const executeHandle = (index) => {
        const { player, positions , winner} = initState;
        if (positions[index] !== EMPTY) return;
        if (winner !== null) return;
        const positionsTemp = positions;
        positionsTemp.splice(index, 1, player);
        turnOnState({
            player: player === CROSS ? CIRCLE : CROSS,
            positions: positionsTemp,
            winner: checkWinner()
        });
    };

    const checkWinner = () => {
        const { positions } = initState;
        if (positions.every(p => p !== EMPTY)) {
            alert('游戏结束，平局！');
            return EMPTY;
        }
        if(positions[0] === CROSS && positions[1] === CROSS && positions[2] === CROSS) {
            alert('游戏结束，叉方获胜！');
            return CROSS
        };
        if(positions[3] === CROSS && positions[4] === CROSS && positions[5] === CROSS) {
            alert('游戏结束，叉方获胜！');
            return CROSS
        };
        if(positions[6] === CROSS && positions[7] === CROSS && positions[8] === CROSS) {
            alert('游戏结束，叉方获胜！');
            return CROSS
        };
        if(positions[0] === CROSS && positions[4] === CROSS && positions[8] === CROSS) {
            alert('游戏结束，叉方获胜！');
            return CROSS
        };
        if(positions[2] === CROSS && positions[4] === CROSS && positions[6] === CROSS) {
            alert('游戏结束，叉方获胜！');
            return CROSS
        };
        if(positions[0] === CIRCLE && positions[1] === CIRCLE && positions[2] === CIRCLE) {
            alert('游戏结束，圆圈获胜！');
            return CIRCLE
        };
        if(positions[3] === CIRCLE && positions[4] === CIRCLE && positions[5] === CIRCLE) {
            alert('游戏结束，圆圈获胜！');
            return CIRCLE
        };
        if(positions[6] === CIRCLE && positions[7] === CIRCLE && positions[8] === CIRCLE) {
            alert('游戏结束，圆圈获胜！');
            return CIRCLE
        };
        if(positions[0] === CIRCLE && positions[4] === CIRCLE && positions[8] === CIRCLE) {
            alert('游戏结束，圆圈获胜！');
            return CIRCLE
        };
        if(positions[2] === CIRCLE && positions[4] === CIRCLE && positions[6] === CIRCLE) {
            alert('游戏结束，圆圈获胜！');
            return CIRCLE
        };
        return null;
    };

    return (
        <div className="game">
            {initState.positions.map((el, index) => {
                return (
                    <Grid key={index} curVal={initState.positions[index]} executeHandle={() => executeHandle(index)}  />
                )
            })}
        </div>
    );
}

function Grid(props) {
    const { curVal, index, executeHandle } = props;
    return (
        <div className="grid" onClick={() => executeHandle(index)}>
            { curVal ===  CIRCLE && <Circle />}
            { curVal ===  CROSS && <Cross />}
        </div>
    )
}

function Circle() {
    return (
        <div className="circle"></div>
    )
}

function Cross() {
    return (
        <div className="cross">x</div>
    )
}

export default Game;
