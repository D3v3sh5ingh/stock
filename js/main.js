const alpha = require('alphavantage')({ key: 'ZT190HZDN99BS851' });
import swal from 'sweetalert';
function createMydata(data){
    return [
        
        '<h5>',    data["Meta Data"]["1. Information"]
        ,'</h5><br><h5>Stock Name <small class="text-muted">',data["Meta Data"]["2. Symbol"],'</small> </h5><br>     <h5>Last refreshed <small class="text-muted">',data["Meta Data"]["3. Last Refreshed"],'</small> </h5>'
           ].join('\n');
 }
 

function JSONToHTMLTable(jsonData, elementToBind) {
          
    //This Code gets all columns for header   and stored in array col
    var col = [];
    col.push("Date");

    col.push("Open");
    col.push("High");
    col.push("Low");
    col.push("Close");
    col.push("Volume");

    //This Code creates HTML table
    var table = document.createElement("table");

    //This Code getsrows for header creader above.
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    //This Code adds data to table as rows
    for (var i in jsonData["Time Series (Daily)"]) {

        tr = table.insertRow(-1);
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML=i;
        for (var j in jsonData["Time Series (Daily)"][i]) {
            
            var tabCell1 = tr.insertCell(-1);
            tabCell1.innerHTML = jsonData["Time Series (Daily)"][i][j];
        }
    }

    //This Code gets the all columns for header
    var divContainer = document.getElementById(elementToBind);
    
    divContainer.innerHTML = "";
    var w=document.createElement('div');
    
    var meta=createMydata(jsonData);
    w.innerHTML=meta;
    // console.log(w);
    divContainer.appendChild(w)
    divContainer.appendChild(table);
}


  
jQuery(function($, undefined) {
    $('#term').terminal(function(command) {

        
            if (command == 'daily stock') {
                this.echo("Welcome to daily stock values");
                swal("Enter stock code (If BSE add .BO in end for ex : IDEA.BO):", {
                    content: "input",
                  })
                  .then((value) => {
                    alpha.data.daily(value).then(data=>{
                        var s="apnamaal";
                        JSONToHTMLTable(data,s);
                        // console.log(data);
                        // s.innerHTML =JSON.stringify(data);
                    
                    });
                  });
                
            }
            else if (command !== '') {
            try {
                var result = window.eval(command);
                if (result !== undefined) {
                    this.echo(new String(result));
                }
            } catch(e) {
                this.error(new String(e));
            }
        } else {
           this.echo('');
        }
    }, {
        greetings: 'Stock Command Line',
        name: 'js_demo',
        height: 200,
        prompt: 'js> '
    },{
        autocompleteMenu: true,
        completion: ['foo', 'bar', 'baz']
    });

});


