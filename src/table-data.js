import React from 'react';

componentDidMount: function createTable(objectArray, fields, fieldTitles) {
  let bodya = React.findDOMNode(this.refs.tabledata); 
  let tbl = document.createElement('table');
  let thead = document.createElement('thead');
  let thr = document.createElement('tr');
  fieldTitles.forEach((fieldTitle) => {
    let th = document.createElement('th');
    th.appendChild(document.createTextNode(fieldTitle));
    thr.appendChild(th);
  });
  thead.appendChild(thr);
  tbl.appendChild(thead);

  let tbdy = document.createElement('tbody');
  let tr = document.createElement('tr');
  objectArray.forEach((object) => {
    let tr = document.createElement('tr');
    fields.forEach((field) => {
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(object[field]));
      tr.appendChild(td);
    });
    tbdy.appendChild(tr);    
  });
  tbl.appendChild(tbdy);
  bodya.appendChild(tbl)
  return tbl;
}

createTable([
  {PlanetName: 'Banana', price: '3.04', about:'damian'},
  {PlanetName: 'Orange', price: '2.56', about:'damian'},
  {PlanetName: 'Apple', price: '1.45', about:'michał'},
   {PlanetName: 'Apple', price: '1.45', about:'michał'},
    {PlanetName: 'Apple', price: '1.45', about:'michał'},
],
['PlanetName', 'price', 'about'], ['Planet Name', 'Rotation period', 'Orbital period', ]);


function TableData() {
    return (
    
    <div ref="tabledata"></div>
    
    
    )





}
export default TableData;

