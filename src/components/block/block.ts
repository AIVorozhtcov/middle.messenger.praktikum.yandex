import EventBus from "../../utils/eventBus";
import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';


export type Children = Record<string | symbol, Block>;
export type Lists = Record<string | symbol, Array<Block>>;
type EventHandlers = (evt: Event) => void;
export type Events = Record<string, EventHandlers>;
export type Attributes = Record<string | symbol, unknown>;
export type Props = Record<string | symbol, unknown> & { events?: Events }  & { attrs?: Attributes };


export type PropsWithChildren = {
    [K in string | symbol]: unknown | Block;
};

export type BlockType = {
  new(propsAndParent: Props): Block
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
  public lists: Lists;
  private _id: string;
  private eventBus: EventBus;

  constructor(tagName: string = "div", propsAndChildren: { [key: string]: unknown } = {}, template: string = '<div>{{props.text}}</div>') {
    const eventBus = new EventBus();
    
    const { children, props, lists } = this._getChildren(propsAndChildren);
    this.children = children;
    this.lists = lists;
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

  private _getChildren(propsAndChildren: { [key: string]: any }): { children: Children; props: Props, lists: Lists } {
    
        const children: Children = {};
        const props: Props = {};
        const lists: Lists = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
    if (value instanceof Block ) {
      children[key] = value;
    } else if (value instanceof Array){
      lists[key] = value;
    } else{
                props[key] = value;
            }
    });

        return { children, props, lists };
    
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

  public componentDidMount(_oldProps?: Props): void {
    
  }

  public dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props | Children | Lists, newProps: Props | Children | Lists): void {
    if (this.componentDidUpdate(oldProps, newProps)){
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: Props | Children, newProps: Props | Children): boolean {
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
    
    Object.entries(this.lists).forEach(([key, _child]) => {
      propsAndStubs[key] = `<div data-id="list__${key}"></div>`
  });

    
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)({props: propsAndStubs});  

    Object.values(this.children).forEach(child => {
        
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        
        const content = child.getContent(); 
        if (stub && content) { 
            stub.replaceWith(content);
        }
    });
    
    Object.entries(this.lists).forEach(([key, list]) => {
      
      
      const stub = fragment.content.querySelector(`[data-id="list__${key}"]`);
      
      if (!stub) {
        return
      };
      const listContent = document.createElement('template');
      
      list.forEach(child => {
        if (child instanceof Block){
          const content = child.getContent();
          if (content){            
            listContent.content.append(content);
          }
        } else{
          listContent.content.append(`${child}`);
        }
      })
      
      stub.replaceWith(listContent.content);
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
    this._addAttributes();
  }

  public render(): DocumentFragment {
    
    return this.compile(this._template, this.props);
  }

  public getContent() {
    return this._element;
  }

  private _makePropsProxy(props: Props): Props {
    const self = this;
  
      const proxyProps = new Proxy(props, {
        get(target, prop) {
                  const value = target[prop];
                  return typeof value === 'function' ? value.bind(target) : value;
              },
        
        set: function (target, prop, value) {
          if (value instanceof Block){
            const oldChildren = { ...self.children};
            self.children[prop] = value;
            self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldChildren, self.children);
            return true;
          } else if (value instanceof Array){
              const oldLists = { ...self.lists};
              self.lists[prop] = value;
              self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldLists, self.lists);
              return true;
          }else {
            const oldProps = { ...target };
            target[prop] = value;
            self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
            return true;
          }
          
        },
        deleteProperty: function (_target, _prop) {
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
    const {events} = this.props;
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

  private _addAttributes(): void {
    
    const {attrs = {}} = this.props;
    if (attrs){
      Object.keys(attrs as Record<string | symbol, unknown>).forEach(attr => {
        const attributeValue = attrs[attr] as string;
        this._element?.setAttribute(attr, attributeValue);
      });
  }
    
  }

  public mountElement(query: string){
    const content = this.getContent();
    if (content){
        document.querySelector(query)?.appendChild(content);
    }
  }
}

export default Block;
