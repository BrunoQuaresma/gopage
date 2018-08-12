class Script {
  constructor(data){
    this.data = data
  }

  isBottom() {
    return this.data.bottom
  }

  render() {
    return `<script src="${this.data.path}"></script>`
  }
}

module.exports = Script