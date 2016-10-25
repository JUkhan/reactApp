
import React from 'react';
class Square extends React.Component {
    constructor() {
        super();
        this.state = { mode: 0, value: '', boom:0, won:0 }
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
    contextMenu(e){
        e.preventDefault();
        this.setState({boom:true});
        console.log('rc');
    }
    render() {
        return <button  className={(this.state.mode ? 'square ' : 'square-d ')+(this.state.boom?'boom ':'')+(this.state.won?'won ':'')} 
        onClick={() => this.props.onClick()} onContextMenu={this.contextMenu.bind(this)}>
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
            squares: this.getInitialSquare(), status: ''
        };
    }
    getInitialSquare(ignoreCreation = false) {
        let arr =ignoreCreation?this.state.squares:[], booms = 20, squares = 108, boomObj = {};
        if (!ignoreCreation) {
            for (let i = 0; i < squares; i++) {
                arr.push({ value: 0, visited: false });
            }
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
    calculateWiner(){
        console.log(this.state.squares.filter(_=>_.ref.state.mode==0).length);
        return this.state.squares.filter(_=>_.ref.state.mode==0).length==20;
    }
    handleClick(i) {       
        if (this.state.status === 'GAME OVER') return;
        let square = this.state.squares[i];
        if(square.ref.state.boom){
            square.ref.setState({boom:0});
            return;
        }        
        if (square.value == 0) {
            this.updateSquare(this.state.squares, i)
        }
        else if (square.value >= 100) {
            this.state.squares.forEach(_ => { if (!_.visited) _.ref.setState({ mode: 1, value: _.value }) });
            this.setState({ status: 'GAME OVER' });
        }
        else square.ref.setState({ mode: 1, value: square.value });
        if(this.calculateWiner()){
            this.state.squares.filter(_=>_.ref.state.mode==0).forEach(_=>{
                _.ref.setState({mode: 1, boom:0, won:1, value: _.value});
            });
             this.setState({ status: 'You WON!' });
        }
        
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
    setSquareState(arr, index, ignore = false) {
        if (arr[index].value == 0) {
            arr[index].ref.setState({ mode: 1, value: 0 });
            if (!ignore && !arr[index].visited) {
                arr[index].visited = true;
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
    startGame() {
        this.state.squares.forEach(_ => {
            _.visited = false;
            _.value=0;
            _.ref.setState({ mode: 0, value:0, boom:0,won:0 });
        });
        this.setState({ squares: this.getInitialSquare(true), status: '' });
    }
    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} onClick={this.handleClick.bind(this)} />
                </div>
                <div className="game-info">
                    <div><a href="script:0;" onClick={this.startGame.bind(this)}>Start Game</a></div>
                    <div>{this.state.status}</div>
                </div>
            </div>
        );
    }
}
export default Game2;

