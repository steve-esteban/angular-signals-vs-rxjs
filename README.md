# Angular Signals vs Rxjs
Analysis comparing Signals (available in Angular v16) and Rxjs (based on [Joshua Morony's course](https://youtu.be/iA6iyoantuo)).

Example of migration from pure Rxjs to Signals (based on [Deborah Kurata's course](https://youtu.be/5SD995zKvbk)).

Original folder: *swVehicles-no-signals*

Folder with the migration from Subjects to signals: *swVehicles-with-signals*

--------------------
## Comparison
Signals are better in multiple ways over a behavior subject as a basic reactive building block for Angular, eventhough they might looks similar on the surface.

|   | Signals      | Subjects (Rxjs) |
| ----------- | ----------- | ----------- |
| Syntax | `count = signal (0);  `    | `count = new BehaviorSubject(0);`   |
| Access values | Directly calling them as a function: `count()`  | We can use the async pipe: ` count \| async ` |
| Derived values | Computed: `doubleCOunt = computed(() => this.count() * 2);`  | Pipe and map: ` doubleCount = this.cout.pipe(map((count) => count * 2)); `. The issue is that the subject gets turned into an observable. We can no longer access its value directly, we have to subscribe to it (and unsusbcribe, having possible consequences of multiple susbcriptions, etc).|
| Combining multiple values into a derived value | Computed: `derivedValue = computed(() => this.valueOne() * this.valueTwo())`. When those input value change at the same time, the derived value gets the latest updated value. There's "glitch free computation" | We need to use the combineLatest: `derivedValue = combineLatest([this.valueOne, this.valueTwo]).pipe(map(([one, two]) => one * two)`. <br />There would be an issue if one of the inputs doesn't have an initial value. CombineLatest also suffers from the **diamond problem**. If multiple streams get updated at once, there is a brief period when the combineLatest emits a technically incorrect or transitory value.|
| Side effects | effect(). The signal value inside has to change for the effect to be triggered | tap operator or manual subscribe. Dangerous if trying to access the value multiple times using the async pipe cause it will trigger the side effect as many times is trying to acess |
| Service (for sharing a state across multiple components) | Others component can access the Subject as an Observable. Code from outisde can access the values but has no power to modify those values directly.  | To read the signal, we can provide a computed value of the signal (`employees = computed(this.#employees);`), so code from outisde can access the value but no modify it. Benefit: We don't have to deal with observables and subscriptions. |

## Migration notes:

In services, we expose signals for easy access by the component, but we work with observables privately when we have to make http requests

ToSignal -> This methods subscribes/unsisbcribse from the origin Observable automatically.