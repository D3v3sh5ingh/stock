const alpha = require('alphavantage')({ key: 'ZT190HZDN99BS851' });

alpha.data.daily(`IDEA.BO`).then(data=>{
    var s=document.getElementById("apnamaal");
    s.innerHTML =JSON.stringify(data);

});


// alpha.data.intraday(`msft`).then(data => {
//     var s=document.getElementById("apnamaal");
//     s.innerHTML =JSON.stringify(data);
//   });
  
jQuery(function($, undefined) {
    $('#term').terminal(function(command) {

        if (command !== '') {
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
        greetings: 'JavaScript Interpreter',
        name: 'js_demo',
        height: 200,
        prompt: 'js> '
    },{
        autocompleteMenu: true,
        completion: ['foo', 'bar', 'baz']
    });

});
