import React from 'react';

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0, message:'Ripon'};
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    //let newLikesCount = this.state.likesCount + 1;
    //this.setState({likesCount: newLikesCount});
    this.setState(ps=>({likesCount:ps.likesCount+1}));
  }
  
  
  render() {
    return (
      <div>
        Likes : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>Like Me</button></div>
        <Hello message={this.state.message} count={this.state.likesCount}/>       
        <ListOfTenThings/>
      </div>
    );
  }

}

export default AwesomeComponent;
function Hello(props){
    return <div>Hello {props.message}! <b>{props.count}</b></div>
  }
function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
      items.push(props.children(i));
    }
    return <div>{items}</div>
 }
 function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}