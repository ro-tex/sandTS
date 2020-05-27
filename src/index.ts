interface IPerson {
  firstName: string;
  lastName: string;
}

type Name = string;

class Doctor implements IPerson {
  public firstName: Name;
  public lastName: Name;
  public companion?: IPerson; // nullable
  private numHearts: 1 | 2;

  [key: string]: any; // allows additional fields

  constructor(firstName: Name, lastName: Name, numHearts: 1 | 2) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.numHearts = numHearts;
  }
}

let who = new Doctor("Doctor", "Who", 2);
who.hasTardis = true;
who.companion = undefined;

let people: IPerson[] = [who];

type MyTuple = [number, string];
let tuple: MyTuple = [5, "two"];

class Observable<T> {
  constructor(public val: T) {}
}

let x: Observable<number> = new Observable(7);
let y: Observable<IPerson>;
let z = new Observable(who); // Observable<Doctor>
