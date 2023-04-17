/**
 * Build styles
 */

import { IconText } from "@codexteam/icons";
import { default as React } from "react";
import { createRoot } from "react-dom/client";
import BudEditorPragraphView from "./BudEditorPragraphView";
import ReactDOMServer from "react-dom/server";
import { readDirectory } from "utils/fs-utils";
/**
 * Base Paragraph Block for the Editor.js.
 * Represents simple paragraph
 *
 * @author CodeX (team@codex.so)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 */

/**
 * @typedef {object} ParagraphConfig
 * @property {string} placeholder - placeholder for the empty paragraph
 * @property {boolean} preserveBlank - Whether or not to keep blank paragraphs when saving editor data
 */

/**
 * @typedef {Object} ParagraphData
 * @description Tool's input and output data format
 * @property {String} text — Paragraph's content. Can include HTML tags: <a><b><i>
 */
export default class BudEditorParagraphTool {
  /**
   * Default placeholder for Paragraph Tool
   *
   * @return {string}
   * @constructor
   */
  static get DEFAULT_PLACEHOLDER() {
    return "";
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - constructor params
   * @param {ParagraphData} params.data - previously saved data
   * @param {ParagraphConfig} params.config - user config for Tool
   * @param {object} params.api - editor.js api
   * @param {boolean} readOnly - read only mode flag
   */
  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;
    this.config = config;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-paragraph",
    };

    if (!this.readOnly) {
      this.onKeyUp = this.onKeyUp.bind(this);
    }

    /**
     * Placeholder for paragraph if it is first Block
     * @type {string}
     */
    this._placeholder = config.placeholder
      ? config.placeholder
      : BudEditorParagraphTool.DEFAULT_PLACEHOLDER;
    this._data = {};
    this.nodes = {
      holder: null,
    };

    //this._element = null;

    this._element = this.drawView();

    this._preserveBlank =
      config.preserveBlank !== undefined ? config.preserveBlank : false;

    this.data = data;
  }

  /**
   * Check if text content is empty and set empty string to inner html.
   * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
   *
   * @param {KeyboardEvent} e - key up event
   */
  onKeyUp(e) {
    if (e.key === "@") {
      console.log("The '@' key was pressed.");
    }

    if (e.code !== "Backspace" && e.code !== "Delete") {
      return;
    }

    console.log(e.code);

    if (e.code === "/") {
      alert("test");
    }

    const { textContent } = this._element;

    if (textContent === "") {
      this._element.innerHTML = "";
    }
  }

  drawView() {
    let div = document.createElement("DIV");

    // div.classList.add(this._CSS.wrapper, this._CSS.block);
    // div.contentEditable = false;
    // div.dataset.placeholder = this.api.i18n.t(this._placeholder);

    // if (!this.readOnly) {
    //   div.contentEditable = true;
    //   div.addEventListener('keyup', this.onKeyUp);
    // }

    return div;
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  render() {
    // Get All Data
    // get current project from localhost
    const currentProject = localStorage.getItem("currentProject");
    const list = readDirectory();

    console.log("Waiting For Render",this.data);

    // console.log("Data On Text Editor", this.data);
    // return this._element;
    const rootNode = document.createElement("div");
    //rootNode.setAttribute("class", this._CSS.wrapper);
    rootNode.classList.add(this._CSS.wrapper, this._CSS.block);
    this.nodes.holder = rootNode;

    const onDataChange = (newData) => {
      console.log("----", "Changing Data",newData);
      this.data.text = newData;
    };

    createRoot(rootNode).render(
      <BudEditorPragraphView
        data={this.data}
        onKeyUpHandler={this.onKeyUp}
        onDataChange={onDataChange}
        config={this.config}
        readOnly={this.readOnly}
        defaultPlaceholder={this._placeholder}
      />
    );
    return this.nodes.holder;
  }

  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   * @param {ParagraphData} data
   * @public
   */
  merge(data) {
    let newData = {
      text: this.data.text + data.text,
    };

    this.data = newData;
  }

  /**
   * Validate Paragraph block data:
   * - check for emptiness
   *
   * @param {ParagraphData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  // validate(savedData) {
  //   if (savedData.text.trim() === "" && !this._preserveBlank) {
  //     return false;
  //   }

  //   return true;
  // }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {ParagraphData} - saved data
   * @public
   */
  save() {
    console.log("From Save",this.data)
    return this.data;
  }

  /**
   * On paste callback fired from Editor.
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(event) {
    const data = {
      text: event.detail.data.innerHTML,
    };

    this.data = data;
  }

  /**
   * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
   */
  static get conversionConfig() {
    return {
      export: "text", // to convert Paragraph to other block, use 'text' property of saved data
      import: "text", // to covert other block's exported string to Paragraph, fill 'text' property of tool data
    };
  }

  /**
   * Sanitizer rules
   */
  static get sanitize() {
    return {
      text: {
        br: true,
      },
    };
  }

  /**
   * Returns true to notify the core that read-only mode is supported
   *
   * @return {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Get current Tools`s data
   * @returns {ParagraphData} Current data
   * @private
   */
  // get data() {
  //   let text = this._element.innerHTML;

  //   this._data.text = text;

  //   return this._data;
  // }

  /**
   * Store data in plugin:
   * - at the this._data property
   * - at the HTML
   *
   * @param {ParagraphData} data — data to set
   * @private
   */
  // set data(data) {
  //   this._data = data || {};

  //   this._element.innerHTML = this._data.text || "";
  // }

  /**
   * Used by Editor paste handling API.
   * Provides configuration to handle P tags.
   *
   * @returns {{tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: ["P"],
    };
  }

  /**
   * Icon and title for displaying at the Toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: IconText,
      title: "Text",
    };
  }
}