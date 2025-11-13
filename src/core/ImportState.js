export default class ImportState {
    #page = 1
    #headers = []
    #rows = []
    #columns = {}

    set page(value) { this.#page = value }
    get page() { return this.#page }

    set headers(value) { this.#headers = value }
    get headers() { return this.#headers }

    set rows(value) { this.#rows = value }
    get rows() { return this.#rows }

    set columns(value) { this.#columns = value }
    get columns() { return this.#columns }
}
