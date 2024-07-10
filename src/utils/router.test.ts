/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-expressions */
import { expect, use } from "chai";
import sinonChai from "sinon-chai";
import Router from "./router";
import { createSandbox, useFakeTimers} from 'sinon';
import { afterEach } from "mocha";
import Block, {Props} from "../components/block/block";
import Route from "./route";

describe("Router", () => {
    use(sinonChai)
    const sandbox = createSandbox();        

    class TestBlock extends Block{
        constructor(props: Props){
            super("div", props)
        }
    }

    class Error404Block extends Block{
        constructor(props: Props){
            super('div', props)
        }
    }              

    const clock = useFakeTimers();

    
    const testRouter = new Router('body');

    before(() => {        
        testRouter.use('/page1', TestBlock)        
        testRouter.use('/page2', TestBlock)
        testRouter.use('/error404', Error404Block)        
        testRouter.start()
    });

    afterEach(() => {
        sandbox.restore();
    })

    it('should render the page when going to it', () => {  
        const block = testRouter.getRoute('/page1') as Route;
        const render = sandbox.stub(block, 'render');
        testRouter.go('/page1');
        expect(render).to.have.been.calledOnce
    });

    it('should go to error page when route is wrong', () => {  
        const block = testRouter.getRoute('/error404') as Route;
        const render = sandbox.stub(block, 'render');
        testRouter.go('/wrong_route');
        expect(render).to.have.been.calledOnce
    });

    it('should render multiple pages', () => {  
        const block1 = testRouter.getRoute('/page1') as Route;
        const render1 = sandbox.stub(block1, 'render');
        const block2 = testRouter.getRoute('/page2') as Route;
        const render2 = sandbox.stub(block2, 'render');
        testRouter.go('/page1');
        testRouter.go('/page2')
        expect(render1.calledOnce && render2.calledOnce).to.be.true;
    });

    it('should render page on refresh', () => {  
        const block = testRouter.getRoute('/page1') as Route;
        const render = sandbox.stub(block, 'render');
        testRouter.go('/page1');
        window.dispatchEvent(new window.PopStateEvent('popstate'));
        expect(render).to.have.been.calledTwice
    });

    it('should render on go back', async () => {  
        testRouter.go('/page1');
        testRouter.go('/page2');
        testRouter.back();   
        await clock.tickAsync(1);
        expect(window.location.pathname).to.contain('/page1')
    });

    it('should render on go forward', async () => {    
        testRouter.go('/page1');
        testRouter.go('/page2');        
        testRouter.back();               
        await clock.tickAsync(1);
        testRouter.forward();   
        await clock.tickAsync(1);
        expect(window.location.pathname).to.contain('/page2')
    });    
    
})
