'use strict';

const OverlayPlugin = require('./util/OverlayPlugin');

const log = require('loglevel');
log.setDefaultLevel('debug');

/**
 * Instance fingerprint plugin.
 * Provides fingerprint authentification capability between client and instance.
 */
module.exports = class FingerPrint extends OverlayPlugin {
    /**
     * Plugin initialization.
     *
     * @param {Object} instance Associated instance.
     * @param {Object} i18n     Translations keys for the UI.
     */
    constructor(instance, i18n) {
        super(instance);

        // Reference instance
        this.instance = instance;
        this.i18n = i18n || {};

        // Register plugin
        this.instance.fingerprint = this;

        // fingerprint state
        this.state = {
            isAuthentificationRequired: false,
            isRecognizedFPByDefault: false,
            givenFeedbackURL: 'TODO',
        };

        // Display widget
        this.renderToolbarButton();
        this.renderWidget();
        console.log('--------------------------------------TODO');

        this.instance.registerEventCallback('settings', ()=>{
            console.log('--------------------------------------TODO');

            console.log('TODO');
            this.sRecognizedFPByDefault = !this.isRecognizedFPByDefault;
            const test = document.createElement('span')
            test.innerHTML = 'TODO'
            document.body.appendChild(test);
        });
        this.instance.registerEventCallback('biometrics', ()=>{
            console.log('--------------------------------------TODO');

            console.log('TODO');
            this.sRecognizedFPByDefault = !this.isRecognizedFPByDefault;
            const test = document.createElement('span')
            test.innerHTML = 'TODO'
            document.body.appendChild(test);
        });

        // Listen for framework messages: "clipboard <from_android|from_player> <base64>"
        // TODO VOIRE COMMUNICATION REDIS
        // this.instance.registerEventCallback('framework', (message) => {
        //     const values = message.split(' ');
        //     if (values.length !== 3 || values[0] !== 'clipboard') {
        //         return;
        //     }

        //     try {
        //         this.clipboard = decodeURIComponent(escape(window.atob(values[2])));
        //     } catch (error) {
        //         log.warn('Malformed clipboard content');
        //     }
        // });

        // // Listen for initial clipboard status
        // this.instance.registerEventCallback('CLIPBOARD', (text) => {
        //     this.clipboard = text;
        // });
        
    }

    /**
     * Add the button to the player toolbar.
     */
    renderToolbarButton() {
        const toolbars = this.instance.getChildByClass(this.instance.root, 'gm-toolbar');
        if (!toolbars) {
            return; // if we don't have toolbar, we can't spawn the widget
        }

        const toolbar = toolbars.children[0];
        this.toolbarBtn = document.createElement('li');
        this.toolbarBtnImage = document.createElement('div');
        this.toolbarBtnImage.className = 'gm-icon-button gm-fingerprint-button';
        this.toolbarBtnImage.title = this.i18n.FINGERPRINT_TITLE || 'FingerPrint';
        this.toolbarBtn.appendChild(this.toolbarBtnImage);
        this.toolbarBtn.onclick = this.toggleWidget.bind(this);
        toolbar.appendChild(this.toolbarBtn);
    }

    /**
     * Render the widget.
     */
    renderWidget() {
        // Create elements
        this.widget = document.createElement('div');
        this.container = document.createElement('div');

        // Generate title
        const title = document.createElement('div');
        title.className = 'gm-title';
        title.innerHTML = this.i18n.FINGERPRINT_TITLE || 'Device FingerPrint';
        this.container.appendChild(title);

        // TODO

        //header
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('gm-fingerprint-dialog-header');

        const authRequiredDiv = document.createElement('div');
        const authActiveLabel = document.createElement('label');
        authActiveLabel.innerHTML = this.i18n.FINGERPRINT_AUTH_REQUIRED_LABEL || 'Authentification required';
        const autRequiredStatus = document.createElement('span');
        autRequiredStatus.innerHTML = this.isAuthentificationRequired ? 'ON' : 'OFF';

        authRequiredDiv.appendChild(authActiveLabel);

        const recognizedFPByDefault = document.createElement('div');

        this.clipboardInput = document.createElement('textarea');
        this.clipboardInput.className = 'gm-fingerprint-input';

        // Setup
        this.container.appendChild(this.clipboardInput);
        this.widget.className = 'gm-overlay gm-fingerprint-plugin gm-hidden';

        // Add close button
        const close = document.createElement('div');
        close.className = 'gm-close-btn';
        close.onclick = this.toggleWidget.bind(this);

        this.widget.appendChild(close);
        this.widget.appendChild(this.container);

        this.widget.onclose = () => {
        };

        // Render into document
        this.overlays.push(this.widget);
        this.instance.root.appendChild(this.widget);
    }

    /**
     * Display or hide the widget.
     */
    toggleWidget() {
        // Notify other callers
        if (this.widget.classList.contains('gm-hidden')) {
            this.instance.emit('close-overlays');
            this.instance.emit('keyboard-disable');
        } else {
            this.instance.emit('keyboard-enable');
            // this.widget.onclose();
        }

        // Toggle display
        this.widget.classList.toggle('gm-hidden');
        this.toolbarBtnImage.classList.toggle('gm-active');
    }

    /**
     * Send information to instance.
     */
    sendDataToInstance() {
        const json = {
            channel: 'TODO?FINGERPRINT?', messages: [
                {
                    type: 'fingerprint',
                    content: 'TODO',
                },
            ],
        };
        this.instance.sendEvent(json);
    }
};
