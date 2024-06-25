import Block from "../components/block/block";
import { BlockType } from "../components/block/block";
import { Props } from "../components/block/block";

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    if (root) {
        root.innerHTML = '';
        const content = block.getContent();
        if (content) {
            root.appendChild(content);
        }
        return root;
    }
    return null;
}


class Route {
    private _pathname: string;

    private _blockClass: BlockType;

    private _block: Block | null = null;


    private _props: Props;

    constructor(pathname: string, view: BlockType, props: Props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        this._block = null;
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
            render(this._props.rootQuery as string, this._block);
            return;
        }

        render(this._props.rootQuery as string, this._block);
    }
}

export default Route;
