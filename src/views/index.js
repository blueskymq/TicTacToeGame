import React, { useState } from 'react';
import './game.css';

const NUM = 9;
const EMPTY = 'empty';
const CROSS = 'cross';
const CIRCLE = 'circle';

function Game() {
    const createInitState = () => {
        return {
            player: CIRCLE,
            positions: new Array(NUM).fill(EMPTY),
            winner: null
        }
    };
    const [initState, turnOnState] = useState(createInitState());

    const resetGame = () => {
        turnOnState(createInitState());
    };

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
        let winArr = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let circleIndexArr = [], crossIndexArr = [];
        for (let i = 0; i < NUM; i++) {
            if (positions[i] === CROSS) {
                crossIndexArr.push(i);
            }
            if (positions[i] === CIRCLE) {
                circleIndexArr.push(i);
            }
        }
        if (crossIndexArr.length > 2 && circleIndexArr.length > 2) {
            for (let i of winArr) {
                const crossRes = crossIndexArr.filter(item1 => i.some(item2 => item2 === item1));
                if (crossRes.length === 3) {
                    alert('游戏结束，叉叉获胜！');
                    return CROSS
                }
                const circleRes = circleIndexArr.filter(item1 => i.some(item2 => item2 === item1));
                if (circleRes.length === 3) {
                    alert('游戏结束，圆圆获胜！');
                    return CIRCLE
                }
            }
        }
        if (positions.every(p => p !== EMPTY)) {
            alert('游戏结束，平局！');
            return EMPTY;
        }
        return null;
    };

    return (
        <>
            <div className="game">
                {initState.positions.map((el, index) => {
                    return (
                        <Grid key={index} curVal={initState.positions[index]} executeHandle={() => executeHandle(index)}  />
                    )
                })}
            </div>
            <button onClick={resetGame}>重新开始</button>
        </>
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
