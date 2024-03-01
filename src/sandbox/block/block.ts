import EventBus from "../utils/eventBus";
import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';

export type Props = Record<string | symbol, unknown>;
export type Children = Record<string, Block>;

export type PropsWithChildren = {
    [K in string | symbol]: unknown | Block;
};

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  private _template: string;
  private _element: HTMLElement | null;
  private _meta: { tagName: string; props: Props } | null;
  public children: Children;
  public props: Props;
  private _id: string;
  private eventBus: EventBus;

  constructor(tagName: string = "div", propsAndChildren: { [key: string]: any } = {}, template: string = '<div>{{props.text}}</div>') {
    const eventBus = new EventBus();
    
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    this._meta = { tagName, props };

    this._template = template;
    this._id = makeUUID();
    props._id = this._id;
  
    this.props = this._makePropsProxy(props);
  
    this.eventBus = eventBus;
  
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta ?? {};
    if (tagName){
        this._element = this._createDocumentElement(tagName);
    }
  }

  private _getChildren(propsAndChildren: { [key: string]: any }): { children: Children; props: Props } {
    
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

  public init(): void {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {
        child.dispatchComponentDidMount();
    });
  }

  public componentDidMount(oldProps?: Props): void {
    
  }

  public dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    if (this.componentDidUpdate(oldProps, newProps)){
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps == newProps){
        return false
    } else {
        return true
    }
  }

  public setProps(nextProps: Partial<Props>): void {
    if (!nextProps) {
        return;
    }
    
    Object.assign(this.props, nextProps);
  }

  public get element(): HTMLElement | null {
    return this._element;
  }

  private compile(template: string, props: Props): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)({props: propsAndStubs});  

    Object.values(this.children).forEach(child => {
        console.log(child.getContent());
        console.log(child.getContent() instanceof Node);
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        const content = child.getContent(); 
        if (stub && content) { 
            stub.replaceWith(content);
        }
    });

    return fragment.content;
  }

  private _render(): void {
    const block = this.render();

    this._removeEvents();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    //this.setProps({value1: "render value"});
    if (this._element){
        this._element.innerHTML = '';
        this._element.appendChild(block);
    }    
    this._addEvents();
  }

  public render(): DocumentFragment {
    
    return this.compile(this._template, this.props);
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: Props): Props {
    const self = this;
  
      const proxyProps = new Proxy(props, {
        get(target, prop) {
                  const value = target[prop];
                  return typeof value === 'function' ? value.bind(target) : value;
              },
        
        set: function (target, prop, value) {
          const oldProps = { ...target };
          target[prop] = value;
          self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
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

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  private _addEvents(): void {
    const {events = {}} = this.props;

    if (events){
        Object.keys(events).forEach(eventName => {
            
            const eventHandler = events[eventName];
            
            if (this._element && typeof eventHandler === 'function') {
              this._element.addEventListener(eventName, eventHandler);
            }
          })
    }
    ;
  }

  private _removeEvents(): void {
    const {events = {}} = this.props;
    if (events){
        Object.keys(events as Record<string | symbol, unknown>).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }
    
  }

  public show(): void {
    if (this._element){
        this._element.style.display='block';
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    
  }

  public hide(): void {
    if (this._element){
        this._element.style.display='none';
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    
  }
}

export default Block;
