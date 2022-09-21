/* a design pattern that allows an object to completely change its behavior depending upon its current
internal state.*/

interface ATMState{
    insertDebitCard():void;
    ejectDebitCard():void;
    enterPin():void;
    withdrawMoney():void;
    getStateType():string;
}

//concrete states
//DebitCard not inserted state
class DebitCardNotInsertedState implements ATMState{
    getStateType(): string {
        return 'DebitCardNotInsertedState';
    }
    insertDebitCard(): void {
        console.log("Debit card inserted.");
    }
    ejectDebitCard(): void {
        console.log("Cannot eject.No card in ATM machine slot.");
    }
    enterPin(): void {
        console.log("Cannot enter pin.No card in ATM machine slot.");
    }
    withdrawMoney(): void {
        console.log("Cannot withdraw.No card in ATM machine slot.");
    }
}

//DebitCard not inserted state
class DebitCardInsertedState implements ATMState{
    getStateType(): string {
        return 'DebitCardInsertedState';
    }
    insertDebitCard(): void {
        console.log("Cannot insert.Debit card is already inserted.");
    }
    ejectDebitCard(): void {
        console.log("Debit card ejected");
    }
    enterPin(): void {
        console.log("Pin entered");
    }
    withdrawMoney(): void {
        console.log("Money withdrawn");
    }
}

//current state is stored in context object
//context class:
class ATMMachine implements ATMState{

    atmMachineState:ATMState;

    constructor(){
        this.atmMachineState = new DebitCardNotInsertedState();
    }
    getStateType(): string {
        return this.atmMachineState.getStateType();
    }

    insertDebitCard(): void {
        this.atmMachineState.insertDebitCard();
        if(this.atmMachineState instanceof DebitCardNotInsertedState){
            this.atmMachineState = new DebitCardInsertedState();
            console.log(`ATM machine internal state has been moved to ${this.atmMachineState.getStateType()}`);
        }        
    }

    ejectDebitCard(): void {
        this.atmMachineState.ejectDebitCard();
        if(this.atmMachineState instanceof DebitCardInsertedState){
            this.atmMachineState = new DebitCardNotInsertedState();
            console.log(`ATM machine internal state has been moved to ${this.atmMachineState.getStateType()}`);
        }
    }
    enterPin(): void {
        this.atmMachineState.enterPin();
    }
    withdrawMoney(): void {
        this.atmMachineState.withdrawMoney();
    }

}

//client
const atmMachine:ATMMachine = new ATMMachine();
console.log(`ATM machine current state: ${atmMachine.atmMachineState.getStateType()}`);
atmMachine.enterPin();
atmMachine.withdrawMoney();
atmMachine.ejectDebitCard();
atmMachine.insertDebitCard();

console.log(`ATM machine current state: ${atmMachine.atmMachineState.getStateType()}`);
atmMachine.enterPin();
atmMachine.withdrawMoney();
atmMachine.insertDebitCard();
atmMachine.ejectDebitCard(); 