class Style {
  constructor(data) {
    this.data = data
  }

  render() {
    return `<link rel="stylesheet" href="${this.data.path}"/>`
  }
}

module.exports = Style