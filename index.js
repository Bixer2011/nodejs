import * as Qrcode from 'qrcode';

let data =
[
    {
        name:"potato",
        Price: 700000,
    },
    {
        name:"anything",
        Price:"1m",
    }
]

let in_string = JSON.stringify(data)

Qrcode.toString(in_string,{type:'terminal'}, function (err, Qrcode){console.log(Qrcode)})
