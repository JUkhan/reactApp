
import React from 'react';

class Home extends React.Component {

   constructor(props) {
    super(props);
    this.state = { list:[]};   
    this.loadData = this.loadData.bind(this);
  }  
  render() {
    return (
      <div>       
        <button onClick={this.loadData}>Load Data</button>
        <button onClick={this.stop}>Stop</button>
      <table>
                <thead>
                <tr><th>Name</th><th>Age</th><th>Address</th><th>single</th></tr>
                </thead>
                <tbody>
                    {this.state.list.map((item, index)=><this.Getrow key={index} item={item} index={index}/>)}
                </tbody>
            </table>
           
      </div>
    );
  }
   Getrow({item, index}){
        return <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.address}</td>
                    <td>{item.single}</td>
                    </tr>
    }
  loadData(){
       console.time('caltime') 
        let data=[];
        for(let i=0;i<15000;i++){
            data.push({name:'Abdulla'+i, age:32, 
            address:'2017-02-15', single:i%2?true:false,
            country:Math.floor(Math.random() * 3) + 1 });
        }
       this.setState({list: data});
    }
    stop(){
      console.timeEnd('caltime') ;
    }
}

export default Home;