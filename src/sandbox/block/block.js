import EventBus from "../utils/eventBus";
import {v4 as makeUUID} from 'uuid';

import Handlebars from 'handlebars';

class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };

  _template = '<div>{{props.text}}</div>';  
  _element = null;
  _meta = null;
  
  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
  constructor(tagName = "div", propsAndChildren = {}, template) {
    const eventBus = new EventBus();
    
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    this._meta = {
        tagName,
        props
      };

    this._template = template;
    this._id = makeUUID();
    props._id = this._id;
  
    this.props = this._makePropsProxy(props);
  
    this.eventBus = () => eventBus;
  
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }
  
  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }
  
  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _getChildren(propsAndChildren) {
        const children = {};
        const props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
    if (value instanceof Block) {
                children[key] = value;
    } else {
                props[key] = value;
            }
    });

        return { children, props };
    }
  
  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  
  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {
        child.dispatchComponentDidMount();
    });
  }
  
  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {
    
  }
  
  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
  
  _componentDidUpdate(oldProps, newProps) {
    if (this.componentDidUpdate(oldProps, newProps)){
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }
  
  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    if (oldProps == newProps){
      return false
    } else {
      return true
    }
  }
  
  setProps = nextProps => {
    if (!nextProps) {
      return;
    }
  
    Object.assign(this.props, nextProps);
  };
  
  get element() {
    return this._element;
  }

  compile(template, props) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    
    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(template)({props: propsAndStubs});  

    Object.values(this.children).forEach(child => {
        console.log(child.getContent());
        console.log(child.getContent() instanceof Node);
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        stub.replaceWith(child.getContent());
    });

    return fragment.content;
}
  
  _render() {
    const block = this.render();

    this._removeEvents();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    //this.setProps({value1: "render value"});
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this._addEvents();
  }
  
  // Может переопределять пользователь, необязательно трогать
  render() { return this.compile(this._template, this.props);}
  
  getContent() {
    return this.element;
  }
  
  _makePropsProxy(props) {
      const self = this;
  
      const proxyProps = new Proxy(props, {
        get(target, prop) {
                  const value = target[prop];
                  return typeof value === 'function' ? value.bind(target) : value;
              },
        
        set: function (target, prop, value) {
          const oldProps = { ...target };
          target[prop] = value;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
          return true;
        },
        deleteProperty: function (target, prop) {
          throw new Error(`Нет прав`);
        },
  
      });
  
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    
    
  
    return proxyProps;
  }
  
  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков

    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }
  
  show() {
    this._element.style.display='block';
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  
  hide() {
    this._element.style.display='none';
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  }


  export default Block;
