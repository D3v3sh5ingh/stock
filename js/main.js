const alpha = require('alphavantage')({ key: 'ZT190HZDN99BS851' });
import swal from 'sweetalert';




  
  
jQuery(function($, undefined) {
    $('#term').terminal(function(command) {

        
            if (command == 'daily stock') {
                this.echo("Welcome to daily stock values");
                swal("Enter stock code (If BSE add .BO in end for ex : IDEA.BO):", {
                    content: "input",
                  })
                  .then((value) => {
                    alpha.data.daily(value).then(data=>{
                        var s=document.getElementById("apnamaal");
                        s.innerHTML =JSON.stringify(data);
                    
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
        greetings: 'Stoc Command Line',
        name: 'js_demo',
        height: 200,
        prompt: 'js> '
    },{
        autocompleteMenu: true,
        completion: ['foo', 'bar', 'baz']
    });

});
