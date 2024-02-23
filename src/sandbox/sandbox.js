import EventBus from "./utils/eventBus"; 

import Block from "./block/block";

import Button from "./button/button";

const eventBus = new EventBus();

const blockButton = new Block('button', {text: "testBlockButton"}
);

blockButton.render = () => {
    console.log('in render');
    blockButton._element.innerHTML = `<div>${blockButton.props.text}</div>`;
    document.body.appendChild(blockButton._element);
};

blockButton.render();


function testRender(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;


};

const classButton = new Button;

classButton.setProps({
    text: "Button from proper component",
    value1: 42})

testRender("main", classButton);

function sendTest() {
    console.log('Test completed');
};


eventBus.on("test", sendTest);

const testButton = document.createElement('button');

testButton.textContent = "Click this";

testButton.addEventListener("click", ()=> {
    classButton.setProps({text: "new text"});
    eventBus.emit("test");
}
);

document.body.appendChild(testButton);
