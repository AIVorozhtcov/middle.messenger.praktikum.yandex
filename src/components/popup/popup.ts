import Block, {Props} from "../block/block";
import PopupTemplate from "./popup.hbs?raw";
class Popup extends Block {
    private popupOverlay: HTMLElement | null;

    constructor(props: Props) {
          
        super("div", props, PopupTemplate);
        this.setProps({
            attrs:{
                id: "popup-overlay",
                class: "popup-overlay"
            }           
        });
        this.popupOverlay = document.getElementById('popup-overlay');
        this.setProps({
            events:{
                click: (_event: Event) => {
                    if (_event.target === this.element) {
                        this.setProps({
                            attrs:{
                                class: "popup-overlay"
                            }
                        })
                    }
                }
            }
        })
        this.popupOverlay?.addEventListener('click', (event) => {
            if (event.target === this.popupOverlay) {
                this.setProps({
                    attrs:{
                        class: "popup-overlay"
                    }
                })
            }
        });        

    }

    public showPopup(){
        this.setProps({
            attrs:{
                class: "popup-overlay show"
            }
        })
    }
  
};

export default Popup;
