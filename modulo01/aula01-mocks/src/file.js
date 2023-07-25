const { readFile } = require("fs/promises")
const { error } = require("./constants")
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ['id','name','profession','age']
}

class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, "utf8")
    const validation = this.isValid(content)
    if(!validation.valid) throw new Error(validation.error)

    const result = this.parceCSVToJSON(content)
    return result
  } 

  static isValid(csvString, options = DEFAULT_OPTION) {
    // para ver o conteudo do arquivo
    // fs.readFileSync('./mocks/threeItems-valid.csv', 'utf8')
    
    // [0] = headers
    // [1] = linha 1
    // [2] = linha 2
    // ...variavel = restante do arquivo
    const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/)
    const isHeadersValid = headers === options.fields.join(',')

    if(!isHeadersValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    if(!fileWithoutHeader.length || 
      fileWithoutHeader.length > options.maxLines) {
      return {
        error: error.FILE_LENGHT_ERROR_MESSAGE,
        valid: false
      }
    }

    return {valid: true}
  }

  static parceCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/)

    //remover a primeira linha
    const firstLine = lines.shift()
    const header = firstLine.split(',')
    
    const users = lines.map(line => {
      const columns = line.split(',')
      const user = {}
      for(const index in columns) {
        user[header[index]] = columns[index].trim()
      }

      return user
    })

    return users
  }
}

module.exports = File
