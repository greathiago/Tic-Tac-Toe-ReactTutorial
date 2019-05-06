import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Writable } from 'stream';


function Square(props)
{
  return (
    <button 
    className="square" 
    onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
  
  class Board extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            player: 'X',
            squares: Array(9).fill(null)
        };
    }

    handleClick(i) {

        const squares = this.state.squares.slice();
        const player = this.state.player;

        const winner = CalculateWinner(squares);
        if(winner || squares[i] ) return;

        squares[i] = player;
        this.setState({
            squares: squares,
            player: player === 'X'? 'O' : 'X'
        });
    }

    renderSquare(i) {
      return <Square 
      value = {this.state.squares[i]}
      onClick = { () => this.handleClick(i) }
      />;
    }
  
    renderBtnReset(winner){
      if(winner)
      {
        return <button className = "btn-reset" onClick ={() => this.clickReset()}>{"Resetar"}</button>
      }
      return ;
    }
    
    clickReset(){
      this.setState({
          squares: Array(9).fill(null),
          player: 'X'
        });
    }

    render() {
      var winner = CalculateWinner(this.state.squares);
      let status;
      if(winner)
      {
        status = winner + " win!"
        
      }
      else
      status = 'Next player: '+ this.state.player;
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-grid">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          {this.renderBtnReset(winner)}
        </div>
      );
    }
  }
  
  function CalculateWinner(squares)
  {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],

      [0,3,6],
      [1,4,7],
      [2,5,8],

      [0,4,8],
      [2,4,6]
    ];
    let count = 0;
    for(let i = 0; i < lines.length; i++)
    {
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c])
      {
        return squares[a];
      }
      if(squares[a] && squares[b] && squares[c])
      {
        count++;
      }
    }
    if(count >= lines.length-1)
    {
      return "Nobody";
    }
    return null;  
  }

  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-info">
            <p>{"game... start!"}</p>
            <ol>{/* TODO */}</ol>
          </div>
          <div className="game-board">
            <Board />
          </div>
        </div>
      );
    }
  }
  
ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
