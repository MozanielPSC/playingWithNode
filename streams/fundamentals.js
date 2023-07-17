// process.stdin.
// pipe(process.stdout);

import {Readable, Writable, Transform} from 'node:stream';

class OneToHundredStream extends Readable{
     index = 1;
    _read(){
        const i = this.index++;
        setTimeout(()=>{
            if(i > 100){
                this.push(null);
            }else{
                const buffer = Buffer.from(`${i}\n`, 'utf-8');
                this.push(buffer);
            }
        },1000);
        // if(i > 100){
        //     this.push(null);
        // }else{
        //     const buffer = Buffer.from(`${i}\n`, 'utf-8');
        //     this.push(buffer);
        // }
    }
}

class MultiplyByTenStream extends Writable{
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString())*10);
        // const number = parseInt(chunk.toString(), 10);
        // const result = number * 10;
        // process.stdout.write(`${result}\n`);
         callback();
    }
}

class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1;
        callback(null,Buffer.from(String(transformed)));
    }
}

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream());
