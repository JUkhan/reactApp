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
  
  clickHandler(row, index){
    alert(row.name+index);
  }
  render() {
   
    let columns=[
      {header:'Name', field:'name', render:(row, index)=>{return <button onClick={this.clickHandler.bind(this,row, index)}>{row.name}</button>;}},
      {header:'Age', field:'age'},
      {header:'Address', field:'address'}
    ];
    let data=[
      {name:'Abdulla', age:36, address:'Tangail' },
      {name:'Abdul Razzak', age:32, address:'Borisal' }
    ]
    return (
      <div>
        Likes : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>Like Me</button></div>
        <Hello message={this.state.message} count={this.state.likesCount}/>       
        <ListOfTenThings/>
        <JUGrid columns={columns} data={data}/>
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

class JUGrid extends React.Component{

      constructor(props){
        super(props);  
            
      }
      // getInitialState(){
      //     return { /* something here */};
      // }
      // getDefaultProps(){
      //     this.props= { columns:[], data:[]};
      //     return this.props;
      // }
      getTDContent(row, col, index){
        if(col.render){
          return col.render(row, index);
        }else{
          return row[col.field];
        }
      }
      getTDS(row, rindex){
          let tds=[];
          this.props.columns.forEach((col, index)=>{
            tds.push(<td key={index}>{this.getTDContent(row, col, rindex)}</td>);
          });
          return tds;
      }
      render(){
          return <table>
            <thead>
                <tr>
                    {this.props.columns.map((col, index)=><th key={index}>{col.header}</th>)}
                </tr>
            </thead>
            <tbody>
            {this.props.data.map((row, index)=>{
              return <tr key={index}>{this.getTDS(row, index)}</tr>
            })}
            </tbody>
          </table>
      }
}