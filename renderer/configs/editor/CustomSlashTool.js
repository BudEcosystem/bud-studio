export default class CustomSlashTool {
    constructor({ data, api }) {
      this.api = api;
      this.data = data;
      this.button = null;

      console.log("loaded")
    }
  
    render() {
      this.button = document.createElement('button');
      this.button.textContent = 'Press / to show this';
      this.button.style.display = 'block';
      return this.button;
    }
  
    surround(range) {

        console.log("Something happened")

      const selectedText = range.extractContents();
      const wrapper = document.createElement('span');
  
      wrapper.classList.add('custom-slash-tool');
      wrapper.appendChild(selectedText);
      range.insertNode(wrapper);
  
      this.api.selection.expandToTag(wrapper);
    }
  
    checkState(selection) {
      const text = selection.anchorNode.textContent;
      const slashIndex = text.lastIndexOf('/');
  
      if (slashIndex !== -1) {
        selection.extend(selection.anchorNode, slashIndex);
        this.surround(selection.getRangeAt(0));
  
        selection.collapseToEnd();
        this.button.style.display = 'inline';
      } else {
        this.button.style.display = 'none';
      }
    }
  }
  