import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

class OldSyntax {
  constructor(){
    this.name = 'ilya'
  }
}

const oldSyntax = new OldSyntax();
console.log(oldSyntax);


class NewSyntax {
  name = 'tany'
}

const newSyntax = new NewSyntax();
console.log(newSyntax);