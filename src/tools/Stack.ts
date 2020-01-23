import { promisify } from 'util'
import { exec } from 'child_process'

export default class Stack {
  private next: any
  private execute: any
  constructor(public stack: any[]) {
    this.stack = stack
    this.next = null
    this.execute = promisify(exec)
  }

  private getCurrentIndex(index: number) {
    return this.stack[index]
  }

  private getNext(index: number) {
    this.next = this.stack[index + 1]
    return this.next
  }

  public async executeEachItem() {
    let incrementor: number = 0
    while (this.getNext(incrementor)) {
      this.getCurrentIndex(incrementor)
      incrementor++
    }
  }
}
