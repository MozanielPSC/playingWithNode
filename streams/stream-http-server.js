import http from 'node:http';
import { Transform } from 'node:stream';
class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        callback(null,Buffer.from(String(transformed)));
    }
}
const server = http.createServer( async (request, response)=>{
    const buffers = [];
    for await(const chunk of request){
        buffers.push(chunk);
    }
    const fullStreamContent= Buffer.concat(buffers).toString();
    console.log(fullStreamContent);
    response.end(fullStreamContent);
    //return request.pipe(new InverseNumberStream()).pipe(response);
});

server.listen(3334);