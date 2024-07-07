import { expect, use } from "chai";
import sinonChai from "sinon-chai";
import { createSandbox} from 'sinon';
import { afterEach } from "mocha";
import Block, {Props} from "./block";

describe("Block", ()=>{
    use(sinonChai)
    const sandbox = createSandbox();        
    let app: Element;
    

    class TestBlock extends Block{
        constructor(props: Props){
            super("div", props, '{{props.text}}')
            this.setProps({
                attrs:{
                    id: "test"
                }
            })
        }
    }

    class TestParentBlock extends Block{
        constructor(props: Props){
            super("div", props, '{{props.text}} {{{props.child}}}')  
            this.setProps({
                attrs:{
                    id: "test-parent"
                }
            })
        }
    }


    

    before(() => {
        app = document.body;
    });


    afterEach(() => {                 
        app.innerHTML = '';
        sandbox.restore();
    })
    
    it('should render element with text prop inside', () => {  
        const testText = "test";
        const testBlock = new TestBlock({
            text: testText
        })
        testBlock.mountElement('body')
        const blockInnerHtml = app.querySelector('#test')?.innerHTML;
        return expect(blockInnerHtml).to.be.eq(testText)
    });

    it('should render element with new text after prop change', () => {  
        const testText1 = "test";
        const testText2 = "new test";
        const testBlock = new TestBlock({
            text: testText1
        });
        testBlock.mountElement('body');
        testBlock.setProps({
            text: testText2
        })
        const blockInnerHtml = app.querySelector('#test')?.innerHTML;
        return expect(blockInnerHtml).to.be.eq(testText2)
    });

    it('should render child element with text prop inside', () => {  
        const testText = "test";
        const testChildBlock = new TestBlock({
            text: testText
        });
        const testParentBlock = new TestParentBlock({
            child: testChildBlock
        })
        testParentBlock.mountElement('body');
        const parentElement = app.querySelector('#test-parent');
        const childInnerHtml = parentElement?.querySelector('#test')?.innerHTML;
        return expect(childInnerHtml).to.be.eq(testText)
    });

    it('should render new child element after prop change', () => {  
        const testText1 = "test";
        const testText2 = "new text";
        const testChildBlock1 = new TestBlock({
            text: testText1
        });
        const testChildBlock2 = new TestBlock({
            text: testText2
        });
        const testParentBlock = new TestParentBlock({
            child: testChildBlock1
        })
        testParentBlock.mountElement('body');
        testParentBlock.setProps({
            child: testChildBlock2
        })
        const parentElement = app.querySelector('#test-parent');
        const childInnerHtml = parentElement?.querySelector('#test')?.innerHTML;
        return expect(childInnerHtml).to.eq(testText2)
    });

    it('should change text after button click', () => {  
        const testText1 = "test";
        const testText2 = "new text";
        const testChildBlock = new TestBlock({
        });
        const testParentBlock = new TestParentBlock({
            text: testText1,
            child: testChildBlock
        })
        testParentBlock.mountElement('body');
        testChildBlock.setProps({
            events:{
                click: (_event: Event) => {
                    _event.preventDefault();
                    testParentBlock.setProps({
                        text: testText2
                    })
                }
            }
        })
        const parentElement = app.querySelector('#test-parent');
        const childElement = parentElement?.querySelector('#test');       
        const eventClick = new MouseEvent('click');
        childElement?.dispatchEvent(eventClick);        
        const parentInnerHtml = parentElement?.innerHTML;
        return expect(parentInnerHtml).to.contain(testText2)
    });

    it('should render children list', () => {  
        const testText1 = "test";
        const testText2 = "new text";
        const testChildBlock1 = new TestBlock({
            text: testText1
        });
        const testChildBlock2 = new TestBlock({
            text: testText2
        });
        const testParentBlock = new TestParentBlock({
            child: [ testChildBlock1, testChildBlock2]
        })
        testParentBlock.mountElement('body');
        const parentInnerHtml = app.querySelector('#test-parent')?.innerHTML;
        return expect(parentInnerHtml)
            .to.contain(testText1)
            .and.to.contain(testText2);
    });

    it('should set element attributes', () => {  
        const testText = "test";
        const testBlock = new TestParentBlock({
            attrs:{
                class: testText
            }
        })
        testBlock.mountElement('body')
        const blockElement = app.querySelector('#test-parent');
        const elementClass = blockElement?.outerHTML
        return expect(elementClass).to.contain(testText)
    });
    
    
}
)
