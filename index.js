class SDCardFS {
  constructor() {
    this.rootHandle = null;
  }

  // Command: ask user to pick a directory
  async pickCard() {
    this.rootHandle = await window.showDirectoryPicker();
  }

  // Boolean: has pickCard() completed?
  cardPicked() {
    return this.rootHandle !== null;
  }

  // Reporter: list file & folder names at root
  async listFiles() {
    if (!this.rootHandle) return '';
    const names = [];
    for await (const [name] of this.rootHandle.entries()) {
      names.push(name);
    }
    return names.join(', ');
  }

  // Reporter: read a file’s text
  async readFile({ NAME }) {
    if (!this.rootHandle) return '';
    try {
      const fileHandle = await this.rootHandle.getFileHandle(NAME);
      const file = await fileHandle.getFile();
      return await file.text();
    } catch (e) {
      return `Error: ${e.message}`;
    }
  }
}

Scratch.extensions.register(new SDCardFS());
