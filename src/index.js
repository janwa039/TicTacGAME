
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//instead of haveing a class that extends react.components
//we can just have functional components
//that just take in props and return values to be rendered due to better optimization


function Square(props) {
    return (
        <button onClick={props.onClick} className="square">
        </button>
    );
}

function calculateWinner(squares){
    const choosenRange=[[0 ,1, 2], [3,4,5], [6,7,8],[0,3,6],[2,4,6],
        [2,5,8], [0,4,8],[1,4,7]];

    for(let i=0; i<choosenRange.length; i++) {
        const [a, b, c] = choosenRange[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
            return null;
}
//you cannot update the state of another component to another component in this situation
//because states are private
class Board extends React.Component {

    renderSquare(i) {
        return (<Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>);
    }

    render() {

        return (
            <div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                 {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                 {this.renderSquare(7)}
                {this.renderSquare(8)}
             </div>
        </div>
    );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xisNext: true,
        };
    }

    handleClick(value){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();


        if(calculateWinner(squares) || squares[value]){
            return;
        }
        squares[value]=this.state.xisNext?'X':'O';
        this.setState({history:history.concat([{
            squares:squares
        }]), xisNext:!this.state.xisNext});
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        console.log(current);
        const winner = calculateWinner(current.squares);

        let status;

        if (winner) {

            status = 'Winner: ' + winner;
        }
        else
        {
            status = 'Next player: ' + (this.state.xisNext ? 'X' : 'O');
        }
        return (
            <div className="game">
            <div className="game-board">
            <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
            </div>
            <div className="game-info">
            <div>{ status }</div>
            <ol>{/* TODO */}</ol>
            </div>
            </div>
    );
    }
}




    ReactDOM.render(<Game />, document.getElementById('root'));