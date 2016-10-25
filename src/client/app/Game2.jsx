
import React from 'react';
class Square extends React.Component {
    constructor() {
        super();
        this.state = { mode: 0, value: '' }
    }
    componentDidMount() {
        this.props.squareInfo.ref = this;
    }
    getValue() {
        if (this.state.value) {
            return this.state.value >= 100 ? '*' : this.state.value;
        }
        return '';
    }
    render() {
        return <button className={this.state.mode ? 'square' : 'square-d'} onClick={() => this.props.onClick()}>
            {this.getValue()}
        </button>
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square key={i} squareInfo={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }
    getRow(index) {
        let arr = [];
        for (let i = 0; i < 9; i++) {
            arr.push(this.renderSquare((index * 9) + i));
        }
        return <div className="board-row">{arr}</div>;
    }
    render() {

        return (
            <div>
                {this.getRow(0)}
                {this.getRow(1)}
                {this.getRow(2)}
                {this.getRow(3)}
                {this.getRow(4)}
                {this.getRow(5)}
                {this.getRow(6)}
                {this.getRow(7)}
                {this.getRow(8)}
                {this.getRow(9)}
                {this.getRow(10)}
                {this.getRow(11)}
            </div>
        );
    }
}

class Game2 extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: this.getInitialSquare()
        };
    }
    getInitialSquare() {
        let arr = [], booms = 20, squares = 108, boomObj = {};
        for (let i = 0; i < squares; i++) {
            arr.push({ value: 0, visited:false });
        }
        for (let i = 0; i < booms; i++) {
            let boomIndex = Math.round(Math.random() * 107);

            while (boomObj[boomIndex]) {
                boomIndex = Math.round(Math.random() * 107);
            }
            arr[boomIndex].value = 100;
            boomObj[boomIndex] = true;
            let rowNo = parseInt(boomIndex / 9), mod = boomIndex % 9;

            if (rowNo === 0) {
                this.setSquareValue(arr, boomIndex, mod);
                this.setSquareValue(arr, boomIndex + 9, mod);
            }
            else if (rowNo === 11) {
                this.setSquareValue(arr, boomIndex, mod);
                this.setSquareValue(arr, boomIndex - 9, mod);
            }
            else {
                this.setSquareValue(arr, boomIndex, mod);
                this.setSquareValue(arr, boomIndex + 9, mod);
                this.setSquareValue(arr, boomIndex - 9, mod);
            }


        }
        console.log(boomObj);

        return arr;
    }
    setSquareValue(arr, index, mod) {
        if (mod === 0) {
            arr[index].value++;
            arr[index + 1].value++;
        }
        else if (mod === 8) {
            arr[index].value++;
            arr[index - 1].value++;
        }
        else {

            arr[index].value++;
            arr[index + 1].value++;
            arr[index - 1].value++;
        }
    }
    handleClick(i) {
        console.log(i);
       
        let square = this.state.squares[i];
        if (square.value == 0) {
            this.updateSquare(this.state.squares, i)
        }
         else if (square.value >= 100) {
            console.log('GAME OVER');
        }
        else square.ref.setState({ mode: 1, value: square.value });
    }
    updateSquare(arr, index) {
       
        let rowNo = parseInt(index / 9), mod = index % 9;

        if (rowNo === 0) {
            this.updateSquareHelper(arr, index, mod);
            this.updateSquareHelper(arr, index + 9, mod);
        }
        else if (rowNo === 11) {
            this.updateSquareHelper(arr, index, mod);
            this.updateSquareHelper(arr, index - 9, mod);
        }
        else {
            this.updateSquareHelper(arr, index, mod);
            this.updateSquareHelper(arr, index + 9, mod);
            this.updateSquareHelper(arr, index - 9, mod);
        }

    }
    setSquareState(arr, index, ignore=false) {
        if (arr[index].value == 0) {
            arr[index].ref.setState({ mode: 1, value: 0 });
            if(!ignore &&  !arr[index].visited){
                arr[index].visited=true;
                this.updateSquare(arr, index);
            }
        }
        else if (arr[index].value <= 100) {
            arr[index].ref.setState({ mode: 1, value: arr[index].value });
        }
    }
    updateSquareHelper(arr, index, mod) {
        if (mod === 0) {
            this.setSquareState(arr, index, true);
            this.setSquareState(arr, index + 1);

        }
        else if (mod === 8) {
            this.setSquareState(arr, index, true);
            this.setSquareState(arr, index - 1);
        }
        else {
            this.setSquareState(arr, index, true);
            this.setSquareState(arr, index + 1);
            this.setSquareState(arr, index - 1);
        }
    }

    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} onClick={this.handleClick.bind(this)} />
                </div>
                <div className="game-info">
                    <div></div>
                </div>
            </div>
        );
    }
}
export default Game2;
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
