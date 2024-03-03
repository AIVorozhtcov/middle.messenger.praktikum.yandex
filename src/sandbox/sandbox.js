import EventBus from "../utils/eventBus"; 

import Block from "../components/block/block";

import Button from "../components/button/button";

import InputBlock from "../components/inputBlock/inputBlock";

import MixedComponent from "../components/mixedComponent/mixedComponent";

const eventBus = new EventBus();

const blockButton = new Block('button', {text: "testBlockButton"}, '<div>{{props.text}}</div>'
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

function sendTest() {
    console.log('Test completed');
};

//classButton.setAttribute("class",'green-class');
classButton.setProps({
    attrs:{
        value: "123",
        class: "green-class"
    }
});


eventBus.on("test", sendTest);

const testButton = document.createElement('button');

testButton.textContent = "Click this";

testButton.addEventListener("click", ()=> {
    classButton.setProps({
        events: {
            click: event => {
                classButton.setProps({
                    text: "Click click",
                })
                console.log("entered click");
            }
        },
})
    eventBus.emit("test");
}
);

document.body.appendChild(testButton);


const classInput = new InputBlock({
    inputId: 1,
    inputTitle: "Ввод",
    inputType: "date",
    inputName: "Инпут"
});

const firstButton = new Button({text: "Новая кнопка"});

const mixedComponent = new MixedComponent({
    text: "Смешанный компонент",
    button1: [firstButton, classButton],
    input: classInput
});


testRender("main", mixedComponent);
