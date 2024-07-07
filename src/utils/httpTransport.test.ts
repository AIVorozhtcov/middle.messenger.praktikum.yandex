import { expect, use } from "chai";
import sinonChai from "sinon-chai";
import HTTPTransport from "./fetch";
import { createSandbox, SinonStub } from 'sinon';
import { afterEach } from "mocha";

describe("HTTP Transport", ()=>{
    use(sinonChai)
    const sandbox = createSandbox();
    let http: HTTPTransport;
    let request: SinonStub<any>;

    beforeEach(() => {
        http = new HTTPTransport('test');
        request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => {
            const xhr = new XMLHttpRequest();
            return Promise.resolve(xhr);
        })
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('should stringify query string parameters for GET request', async () => {
        await http.get('', {
          data: {
            a: '1',
            b: '2'
          },
        });
    
        expect(request).calledWithMatch('?a=1&b=2');
      });

      it('should send a PUT request', async () => {
        const requestData = {
            property: "value"
        }
        await http.put('', {
          data: requestData
        });
    
        expect(request).calledWithMatch("test", {
            data: requestData,
            method: 'PUT'
          });
      });

      it('should send a POST request', async () => {
        const requestData = {
            property: "value"
        }
        await http.post('', {
          data: requestData
        });
    
        expect(request).calledWithMatch("test", {
            data: requestData,
            method: 'POST'
          });
      });

      it('should send a DELETE request', async () => {
        
        await http.delete('');
    
        expect(request).calledWithMatch("test", {
            method: 'DELETE'
          });
      });


}
)
