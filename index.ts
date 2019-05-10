interface IInt {
  getVal(): string;
}

function foo(): IInt {
  return {
    getVal() { return "hi from ts edited" }
  };
}

let a: string = foo().getVal()
console.log(a)
