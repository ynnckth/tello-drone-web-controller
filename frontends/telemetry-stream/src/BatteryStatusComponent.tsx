import React from 'react';
import ReactDOM from 'react-dom';
import {BatteryStatus} from './BatteryStatus';


export class BatteryStatusComponent extends HTMLElement {
    private host: string | null;

    constructor() {
        super();
        this.host = this.getAttribute("host");
        console.log(`Battery Status: ${this.host}`);

    }

    static get observedAttributes() {
        return ['host'];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch (name) {
            case 'host':
                console.log(`Host changed from ${oldValue} to ${newValue}`);
                this.host = newValue;
                this.connectedCallback();
                break;
            default:

        }
    }

    connectedCallback() {
        ReactDOM.render(<BatteryStatus url={this.host}/>, this);
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this);
    }
}

window.customElements.define('battery-status-component',    BatteryStatusComponent);
